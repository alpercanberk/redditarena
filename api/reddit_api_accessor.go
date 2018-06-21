package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

// getBossesAndUpdateDatabase requests the hot 8 bossfights from the Reddit API.
func getBosses() (jsonPtr *[]byte) {
	// GET requests the hot 8 bossfights from the Reddit API
	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://reddit.com/r/BossFights/hot.json?limit=8&show=all", nil)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	req.Header.Add("User-Agent", "osx:redditarena:v1 (by /u/GrEnAdIfY)")
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer resp.Body.Close()

	byteSlice, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	jsonPtr = &byteSlice
	return
}
