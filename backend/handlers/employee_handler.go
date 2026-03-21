package handlers

import (
	"encoding/json"
	"net/http"

	"backend/db"
	"backend/models"
)

func CreateEmployee(w http.ResponseWriter, r *http.Request) {
	var emp models.Employee

	err := json.NewDecoder(r.Body).Decode(&emp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	query := `INSERT INTO employees (name, email, role) VALUES ($1, $2, $3) RETURNING id`

	err = db.DB.QueryRow(query, emp.Name, emp.Email, emp.Role).Scan(&emp.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(emp)
}

func UpdateEmployee(w http.ResponseWriter, r *http.Request) {
	var emp models.Employee

	json.NewDecoder(r.Body).Decode(&emp)

	query := `
		UPDATE employees
		SET name=$1, email=$2, role=$3
		WHERE id=$4
	`

	_, err := db.DB.Exec(query, emp.Name, emp.Email, emp.Role, emp.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Employee updated"))
}

func DeleteEmployee(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")

	_, err := db.DB.Exec("DELETE FROM employees WHERE id=$1", id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Employee deleted"))
}

func GetEmployees(w http.ResponseWriter, r *http.Request) {
	rows, err := db.DB.Query("SELECT id, name, email, role FROM employees")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var employees []models.Employee

	for rows.Next() {
		var emp models.Employee
		err := rows.Scan(&emp.ID, &emp.Name, &emp.Email, &emp.Role)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		employees = append(employees, emp)
	}

	json.NewEncoder(w).Encode(employees)
}
