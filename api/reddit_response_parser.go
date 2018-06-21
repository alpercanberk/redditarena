package main

import (
	"encoding/json"
)

// The following four structs are there for json.Unmarshal() to work. There is no
// other reason.
type ResponseStruct struct {
	Data Data `json:"data"`
}
type Data struct {
	Children []Boss `json:"children"`
}
type Boss struct {
	Id   int
	Data BossData `json:"data"`
}
type BossData struct {
	Ups       int    `json:"ups"`
	Title     string `json:"title"`
	Thumbnail string `json:"thumbnail"`
	Image     string `json:"image"`
	Permalink string `json:"permalink"`
}

// parseResponse() unmarshals the response in the *[]byte, and returns a
// corresponding ResponseStruct.
func parseResponse(jsonPtr *[]byte) (parsedResponse ResponseStruct) {
	parsedResponse = ResponseStruct{}
	json.Unmarshal(*jsonPtr, &parsedResponse)
	return
}
