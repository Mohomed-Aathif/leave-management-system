package models

type LeaveRequest struct {
	ID         int    `json:"id"`
	EmployeeID int    `json:"employee_id"`
	StartDate  string `json:"start_date"`
	EndDate    string `json:"end_date"`
	Reason     string `json:"reason"`
	Status     string `json:"status"`
	ApprovedBy *int   `json:"approved_by"`
}
