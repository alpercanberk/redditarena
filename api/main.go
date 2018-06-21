package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-redis/redis"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

var redisClient *redis.Client = redis.NewClient(&redis.Options{
	Addr:     "localhost:6379",
	Password: "", // no password set
	DB:       0,  // use default DB
})

const port string = "1226"

func main() {
	// Standard stuff
	initDatabase()
	runMatches(parseResponse(getBosses()))

	router := mux.NewRouter()                                            // Create the router
	router.HandleFunc("/get_match", endpointGetMatch).Methods("GET")     // Set the handler for /get_match
	router.HandleFunc("/get_match/", endpointGetMatch).Methods("GET")    // Set the handler for /get_match/
	router.HandleFunc("/get_boss/{id}", endpointGetBoss).Methods("GET")  // Set the handler for /get_boss/{id}
	router.HandleFunc("/get_boss/{id}/", endpointGetBoss).Methods("GET") // Set the handler for /get_boss/{id}/

	headersOk := handlers.AllowedHeaders([]string{"Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})   // Allow requests from all origins
	methodsOk := handlers.AllowedMethods([]string{"GET"}) // Only allow GET requests (because there are only GET requests)

	corsMiddleware := handlers.CORS(originsOk, headersOk, methodsOk) // Some stupid CORS s***
	fmt.Println("Running server!")                                   // Inform the CLI user that the server is on
	log.Fatal(http.ListenAndServe(":"+port, corsMiddleware(router))) // Start the server!
}
