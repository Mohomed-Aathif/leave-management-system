package handlers

import (
	"encoding/json"
	"net/http"

	"leave-management/db"
)

func GetDashboard(w http.ResponseWriter, r *http.Request) {
	var totalEmployees int
	var totalLeaves int
	var pending int
	var approved int
	var rejected int

	// Total employees
	db.DB.QueryRow("SELECT COUNT(*) FROM employees").Scan(&totalEmployees)

	// Total leaves
	db.DB.QueryRow("SELECT COUNT(*) FROM leave_requests").Scan(&totalLeaves)

	// Pending
	db.DB.QueryRow("SELECT COUNT(*) FROM leave_requests WHERE status = 'pending'").Scan(&pending)

	// Approved
	db.DB.QueryRow("SELECT COUNT(*) FROM leave_requests WHERE status = 'approved'").Scan(&approved)

	// Rejected
	db.DB.QueryRow("SELECT COUNT(*) FROM leave_requests WHERE status = 'rejected'").Scan(&rejected)

	response := map[string]int{
		"total_employees": totalEmployees,
		"total_leaves":    totalLeaves,
		"pending":         pending,
		"approved":        approved,
		"rejected":        rejected,
	}

	json.NewEncoder(w).Encode(response)
}
