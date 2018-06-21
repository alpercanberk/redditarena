package main

import (
	"encoding/json"
)

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

func parseResponse(jsonPtr *[]byte) (parsedResponse ResponseStruct) {
	parsedResponse = ResponseStruct{}
	json.Unmarshal(*jsonPtr, &parsedResponse)
	return
}
