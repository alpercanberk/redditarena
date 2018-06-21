package main

import (
	"math/rand"
	"strconv"
	"time"
)

/*
Example database:

KEY             | TYPE   | VALUE
----------------+--------+------------------------
nextMatchID     | STRING | 1
nextBossID      | STRING | 8
boss:0          | HASH   | {"title": "asdfasdfa", "ups": "140", "thumbnail": "<some imgur link>", "url": "<some other imgur link>", "permalink": "<some reddit link>"}
boss:1          | HASH   |     ~"
.               |        |
.               |        |
.               |        |
boss:7          | HASH   |     ~"
----------------+--------+------------------------
match:0:date    | STRING | "<some date in DD/MM/YY format>"
match:0:quarter | SET    | [0,1,2,3,4,5,6,7]
match:0:semi    | SET    | [1,3,4,6]
match:0:final   | SET    | [3,4]
match:0:winner  | STRING | 4
*/

// initDatabase() clears the database and initializes necessary keys in the Redis database.
func initDatabase() {
	redisClient.FlushDB()                // Clear the database
	redisClient.Set("nextMatchID", 0, 0) // Set the next match ID so that runMatches() sets the match ID properly (on first run)
	redisClient.Set("nextBossID", 0, 0)  // Set the next boss  ID so thar runMatches() sets the boss  ID properly (on first run)
}

// runMatches() extracts the bosses from a given ResponseStruct, and makes the said bosses
// fight based on the rule that is coded in fight().
// All bosses are assigned to their relevant sets. If someone makes it to the finals, that bosses id
// is pushed to "match:{matchId}:quarter", "match:{matchId}:semi" and "match:{matchId}:finals".
func runMatches(d ResponseStruct) {
	rand.Seed(time.Now().UnixNano())                   // Seed the RNG gods
	matchId := redisClient.Get("nextMatchID").Val()    // Retrieve match ID to use in Redis keys
	date := time.Now().Format("020106")                // Get the formatted date to set to the match
	redisClient.Set("match:"+matchId+":date", date, 0) // Set the date of the match on the database
	redisClient.Incr("nextMatchID")                    // Increment match ID for next match
	var bosses = make([]Boss, 8, 8)                    // Make array to copy bosses out of d.Data.Children
	// If the bosses aren't copied, for some reason, the ID's don't get set properly

	for i, boss := range d.Data.Children { // Iterate over the bosses in d.Data.Children
		id := redisClient.Get("nextBossID").Val() // Assign ID
		boss.Id, _ = strconv.Atoi(id)             // ^
		bosses[i] = boss                          // This is here to copy the boss out of "d.Data.Children" to "bosses"
		// If this isn't done, for some reason, the ID's dont get set properly

		redisClient.Incr("nextBossID") // Increment ID for next boss

		redisClient.HSet("boss:"+id, "title", boss.Data.Title)         // Set title     to database
		redisClient.HSet("boss:"+id, "ups", boss.Data.Ups)             // Set ups       to database
		redisClient.HSet("boss:"+id, "thumbnail", boss.Data.Thumbnail) // Set thumbnail to database
		redisClient.HSet("boss:"+id, "url", boss.Data.Url)             // Set url       to database
		redisClient.HSet("boss:"+id, "permalink", boss.Data.Permalink) // Set permalink to database

		redisClient.SAdd("match:"+matchId+":quarter", id) // Add boss to the quarterfinalists (all competitors are QFists from the start)
	}

	finalists := fightSlice(fightSlice(bosses, matchId, "semi"), matchId, "final") // Fight and set until 2 bosses left
	champ := fight(finalists[0], finalists[1]).Id                                  // Get champion
	redisClient.Set("match:"+matchId+":winner", champ, 0)                          // Set champion to the database
}

// getBoss() is a shorthand for the sphagetti process of HGetAll("boss:" + id).
func getBoss(id string) map[string]string {
	return redisClient.HGetAll("boss:" + id).Val()
}

// getMatch() is... the ultimate shorthand. (for this project)
func getMatch(id string) map[string][]string {
	return map[string][]string{
		"quarter": redisClient.SMembers("match:" + id + ":quarter").Val(),
		"semi":    redisClient.SMembers("match:" + id + ":semi").Val(),
		"final":   redisClient.SMembers("match:" + id + ":final").Val(),
		"winner":  []string{redisClient.Get("match:" + id + ":winner").Val()},
	}
}

// getLatestMatch() is a wrapper for getMatch() that automatically gives the latest ID
// as the parameter for getMatch().
func getLatestMatch() map[string][]string {
	rawId, _ := strconv.Atoi(redisClient.Get("nextMatchID").Val())
	return getMatch(strconv.Itoa(rawId - 1))
}

// fight() makes two given bosses fight. The boss with highest upvotes has the advantage.
// Here's how it works:
// |  b1 |      b2      |
// |-----|--------------|
//
// A random number (slider) is chosen between the left bound (0) and the right bound (b1 + b2).
// If the slider is in b1's region, b1 wins. Same for b2.
func fight(b1 Boss, b2 Boss) (winner Boss) {
	one := b1.Data.Ups        // Get the upvotes of the bosses and store them.
	two := b2.Data.Ups        // "
	r := rand.Intn(one + two) // Throws the slider
	if r <= one {             // If the random number is in b1's area,
		winner = b1 // b1 wins!
	} else { // If it isn't,
		winner = b2 // b2 wins!
	}
	return
}

// fightSlice() makes a whole slice of bosses fight. 0 fights 1, 2 fights 3...
// It also adds the winners to the database using a suffix and a match ID.
func fightSlice(bosses []Boss, matchId string, suf string) (winners []Boss) {
	// I don't know how to explain this, ask me in person how it works
	l := len(bosses) / 2
	winners = make([]Boss, l, l)
	for i := 0; i < l; i++ {
		winners[i] = fight(bosses[2*i], bosses[2*i+1])
		redisClient.SAdd("match:"+matchId+":"+suf, winners[i].Id)
	}
	return
}
