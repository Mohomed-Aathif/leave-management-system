package main

import (
	"log"
	"net/http"

	"leave-management/db"
	"leave-management/routes"
)

func main() {
	db.Connect()

	r := routes.RegisterRoutes()

	log.Println("Server running on port 8080")
	http.ListenAndServe(":8080", r)
}
