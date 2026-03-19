package handlers

import (
	"encoding/json"
	"net/http"

	"backend/db"
)

func GetDashboard(w http.ResponseWriter, r *http.Request) {
	var totalEmployees int
	var totalLeaves int
	var pending int
	var approved int
	var rejected int

	// Total employees
	err := db.DB.QueryRow("SELECT COUNT(*) FROM employees").Scan(&totalEmployees)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Total leaves
	err = db.DB.QueryRow("SELECT COUNT(*) FROM leave_requests").Scan(&totalLeaves)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Pending
	err = db.DB.QueryRow("SELECT COUNT(*) FROM leave_requests WHERE status = 'pending'").Scan(&pending)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Approved
	err = db.DB.QueryRow("SELECT COUNT(*) FROM leave_requests WHERE status = 'approved'").Scan(&approved)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Rejected
	err = db.DB.QueryRow("SELECT COUNT(*) FROM leave_requests WHERE status = 'rejected'").Scan(&rejected)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]int{
		"total_employees": totalEmployees,
		"total_leaves":    totalLeaves,
		"pending":         pending,
		"approved":        approved,
		"rejected":        rejected,
	}

	json.NewEncoder(w).Encode(response)
}
