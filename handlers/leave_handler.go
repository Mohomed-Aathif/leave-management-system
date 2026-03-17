package handlers

import (
	"encoding/json"
	"net/http"

	"leave-management/db"
	"leave-management/models"
)

func CreateLeave(w http.ResponseWriter, r *http.Request) {
	var leave models.LeaveRequest

	err := json.NewDecoder(r.Body).Decode(&leave)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `
		INSERT INTO leave_requests (employee_id, start_date, end_date, reason)
		VALUES ($1, $2, $3, $4)
		RETURNING id, status
	`

	err = db.DB.QueryRow(
		query,
		leave.EmployeeID,
		leave.StartDate,
		leave.EndDate,
		leave.Reason,
	).Scan(&leave.ID, &leave.Status)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(leave)
}

func GetLeaves(w http.ResponseWriter, r *http.Request) {
	rows, err := db.DB.Query(`
		SELECT id, employee_id, start_date, end_date, reason, status, approved_by
		FROM leave_requests
	`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var leaves []models.LeaveRequest

	for rows.Next() {
		var leave models.LeaveRequest
		err := rows.Scan(
			&leave.ID,
			&leave.EmployeeID,
			&leave.StartDate,
			&leave.EndDate,
			&leave.Reason,
			&leave.Status,
			&leave.ApprovedBy,
		)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		leaves = append(leaves, leave)
	}

	json.NewEncoder(w).Encode(leaves)
}

func ApproveLeave(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	managerID := r.URL.Query().Get("manager_id")

	query := `
		UPDATE leave_requests
		SET status = 'approved', approved_by = $1
		WHERE id = $2
	`

	_, err := db.DB.Exec(query, managerID, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Leave approved"))
}

func RejectLeave(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	managerID := r.URL.Query().Get("manager_id")

	query := `
		UPDATE leave_requests
		SET status = 'rejected', approved_by = $1
		WHERE id = $2
	`

	_, err := db.DB.Exec(query, managerID, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Leave rejected"))
}
