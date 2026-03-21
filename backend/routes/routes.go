package routes

import (
	"backend/handlers"

	"github.com/gorilla/mux"
)

func RegisterRoutes() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/employees", handlers.CreateEmployee).Methods("POST")
	r.HandleFunc("/employees", handlers.GetEmployees).Methods("GET")
	r.HandleFunc("/employees/delete", handlers.DeleteEmployee).Methods("DELETE")
	r.HandleFunc("/employees/update", handlers.UpdateEmployee).Methods("PUT")
	r.HandleFunc("/leaves", handlers.CreateLeave).Methods("POST")
	r.HandleFunc("/leaves", handlers.GetLeaves).Methods("GET")
	r.HandleFunc("/leaves/approve", handlers.ApproveLeave).Methods("PUT")
	r.HandleFunc("/leaves/reject", handlers.RejectLeave).Methods("PUT")
	r.HandleFunc("/dashboard", handlers.GetDashboard).Methods("GET")

	return r
}
