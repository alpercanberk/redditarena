package main

import (
	"math/rand"
	"strconv"
	"time"
)

func initDatabase() {
	redisClient.FlushDB()
	redisClient.Set("nextMatchID", 0, 0)
	redisClient.Set("nextBossID", 0, 0)
}

func runMatches(d ResponseStruct) {
	rand.Seed(time.Now().UnixNano())
	matchId := redisClient.Get("nextMatchID").Val()    // Retrieve match ID
	date := time.Now().Format("020106")                // Get the formatted date
	redisClient.Set("match:"+matchId+":date", date, 0) // Set the date of the match on the database
	redisClient.Incr("nextMatchID")                    // Increment match ID for next retrieval
	var bosses = make([]Boss, 8, 8)                    //

	for i, boss := range d.Data.Children {
		id := redisClient.Get("nextBossID").Val() // Assign ID
		boss.Id, _ = strconv.Atoi(id)             // ^
		bosses[i] = boss
		redisClient.Incr("nextBossID")                                 // Increment ID for future use
		redisClient.HSet("boss:"+id, "title", boss.Data.Title)         // Set title to database
		redisClient.HSet("boss:"+id, "ups", boss.Data.Ups)             // Set ups to database
		redisClient.HSet("boss:"+id, "thumbnail", boss.Data.Thumbnail) // Set thumbnail to database
		redisClient.HSet("boss:"+id, "image", boss.Data.Image)         // Set image to database
		redisClient.HSet("boss:"+id, "permalink", boss.Data.Permalink) // Set permalink to database
		redisClient.SAdd("match:"+matchId+":quarter", id)              // Add boss to the quarterfinalists
	}

	finalists := fightSlice(fightSlice(bosses, matchId, "semi"), matchId, "final") // Fight and set until 2 bosses left
	champ := fight(finalists[0], finalists[1]).Id                                  // Get champion
	redisClient.Set("match:"+matchId+":winner", champ, 0)                          // Set champion to the database
}

func fight(b1 Boss, b2 Boss) (winner Boss) {
	one := b1.Data.Ups
	two := b1.Data.Ups
	r := rand.Intn(one + two)
	if r <= one {
		winner = b1
	} else {
		winner = b2
	}
	return
}

func fightSlice(bosses []Boss, matchId string, suf string) (winners []Boss) {
	l := len(bosses) / 2
	winners = make([]Boss, l, l)
	for i := 0; i < l; i++ {
		winners[i] = fight(bosses[2*i], bosses[2*i+1])
		redisClient.SAdd("match:"+matchId+":"+suf, winners[i].Id)
	}
	return
}
