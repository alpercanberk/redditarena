package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

// getBosses() requests the hot 8 bossfights from the Reddit API and returns a
// pointer to a slice of bytes carrying the response
func getBosses() (jsonPtr *[]byte) {
	client := &http.Client{} // Create the client
	// Do the request
	req, err := http.NewRequest("GET", "https://reddit.com/r/BossFights/hot.json?limit=8&show=all", nil)
	if err != nil { // Handle error
		fmt.Println(err) // Print error
		os.Exit(1)       // Exit with code 1
	}

	// Set User-Agent. DO NOT DELETE. This line makes getting the response possible.
	req.Header.Add("User-Agent", "osx:redditarena:v1 (by /u/GrEnAdIfY)")
	resp, err := client.Do(req) // Do the request, GET the response.
	if err != nil {             // Handle error
		fmt.Println(err) // Print error
		os.Exit(1)       // Exit with code 1
	}
	defer resp.Body.Close() // Defer the close of the response

	byteSlice, err := ioutil.ReadAll(resp.Body) // Read the response into "byteSlice"
	if err != nil {                             // Handle error
		fmt.Println(err) // Print error
		os.Exit(1)       // Exit with code 1
	}
	jsonPtr = &byteSlice // Create and
	return               // return the pointer
}
