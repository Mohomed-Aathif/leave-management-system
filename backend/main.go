package main

import (
	"log"
	"net/http"

	"backend/db"
	"backend/routes"

	"github.com/rs/cors"
)

func main() {
	db.Connect()

	r := routes.RegisterRoutes()

	handler := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"*"},
	}).Handler(r)

	log.Println("Server running on port 8080")
	http.ListenAndServe(":8080", handler)
}
