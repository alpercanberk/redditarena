package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

// endpointGetMatch() is the handler for "/get_match".
func endpointGetMatch(writer http.ResponseWriter, request *http.Request) {
	json.NewEncoder(writer).Encode(getLatestMatch())
}

// endpointGetBoss() is the handler for "/get_boss/{id}".
func endpointGetBoss(writer http.ResponseWriter, request *http.Request) {
	id := mux.Vars(request)["id"]
	json.NewEncoder(writer).Encode(getBoss(id))
}
