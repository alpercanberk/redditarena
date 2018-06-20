package main

import (
	"fmt"

	"github.com/go-redis/redis"
)

var redisClient *redis.Client = redis.NewClient(&redis.Options{
	Addr:     "localhost:6379",
	Password: "", // no password set
	DB:       0,  // use default DB
})

func main() {
}
