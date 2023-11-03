# rummy-Project

## Eevents
- gameInitialized 
- faceDownPiles
- handCard
- drawnCard
- discardedCard
- cards

## Eemited events

- initializeGame (gameId)
```javascript
    // event - faceDdownPiles
    [{"suit":"Spades","value":"Jack"},{"suit":"Diamonds","value":"8"},{"suit":"Clubs","value":"Queen"},{"suit":"Hearts","value":"5"},{"suit":"Diamonds","value":"Ace"},{"suit":"Spades","value":"5"},{"suit":"Diamonds","value":"9"},{"suit":"Hearts","value":"Jack"},{"suit":"Clubs","value":"Ace"},{"suit":"Diamonds","value":"4"},{"suit":"Spades","value":"6"},{"suit":"Hearts","value":"8"},{"suit":"Clubs","value":"2"},{"suit":"Diamonds","value":"Queen"},{"suit":"Hearts","value":"10"},{"suit":"Spades","value":"2"},{"suit":"Spades","value":"Queen"},{"suit":"Spades","value":"10"},{"suit":"Hearts","value":"7"},{"suit":"Clubs","value":"5"}]
```

```javascript
    // event - handCard
    [{"suit":"Spades","value":"Jack"},{"suit":"Diamonds","value":"8"},{"suit":"Clubs","value":"Queen"},{"suit":"Hearts","value":"5"},{"suit":"Diamonds","value":"Ace"},{"suit":"Spades","value":"5"},{"suit":"Diamonds","value":"9"},{"suit":"Hearts","value":"Jack"},{"suit":"Clubs","value":"Ace"},{"suit":"Diamonds","value":"4"}]
```

```javascript
    // event - cards
    [{"suit":"Hearts","value":"2"},{"suit":"Hearts","value":"3"},{"suit":"Hearts","value":"4"},{"suit":"Hearts","value":"5"},{"suit":"Hearts","value":"6"},{"suit":"Hearts","value":"7"},{"suit":"Hearts","value":"8"},{"suit":"Hearts","value":"9"},{"suit":"Hearts","value":"10"},{"suit":"Hearts","value":"Jack"},{"suit":"Hearts","value":"Queen"},{"suit":"Hearts","value":"King"},{"suit":"Hearts","value":"Ace"},{"suit":"Diamonds","value":"2"},{"suit":"Diamonds","value":"3"},{"suit":"Diamonds","value":"4"},{"suit":"Diamonds","value":"5"},{"suit":"Diamonds","value":"6"},{"suit":"Diamonds","value":"7"},{"suit":"Diamonds","value":"8"},{"suit":"Diamonds","value":"9"},{"suit":"Diamonds","value":"10"},{"suit":"Diamonds","value":"Jack"},{"suit":"Diamonds","value":"Queen"},{"suit":"Diamonds","value":"King"},{"suit":"Diamonds","value":"Ace"},{"suit":"Clubs","value":"2"},{"suit":"Clubs","value":"3"},{"suit":"Clubs","value":"4"},{"suit":"Clubs","value":"5"},{"suit":"Clubs","value":"6"},{"suit":"Clubs","value":"7"},{"suit":"Clubs","value":"8"},{"suit":"Clubs","value":"9"},{"suit":"Clubs","value":"10"},{"suit":"Clubs","value":"Jack"},{"suit":"Clubs","value":"Queen"},{"suit":"Clubs","value":"King"},{"suit":"Clubs","value":"Ace"},{"suit":"Spades","value":"2"},{"suit":"Spades","value":"3"},{"suit":"Spades","value":"4"},{"suit":"Spades","value":"5"},{"suit":"Spades","value":"6"},{"suit":"Spades","value":"7"},{"suit":"Spades","value":"8"},{"suit":"Spades","value":"9"},{"suit":"Spades","value":"10"},{"suit":"Spades","value":"Jack"},{"suit":"Spades","value":"Queen"},{"suit":"Spades","value":"King"},{"suit":"Spades","value":"Ace"}]
```

## drawCard (playerIindex)
```javascript
    // event - faceDdownPiles
    [{"suit":"Diamonds","value":"2"},{"suit":"Spades","value":"7"},{"suit":"Hearts","value":"6"},{"suit":"Clubs","value":"7"},{"suit":"Hearts","value":"King"},{"suit":"Clubs","value":"3"},{"suit":"Hearts","value":"3"},{"suit":"Spades","value":"Ace"},{"suit":"Diamonds","value":"10"},{"suit":"Diamonds","value":"King"},{"suit":"Spades","value":"4"},{"suit":"Hearts","value":"Ace"},{"suit":"Clubs","value":"Jack"},{"suit":"Spades","value":"9"},{"suit":"Diamonds","value":"6"},{"suit":"Hearts","value":"Queen"},{"suit":"Hearts","value":"9"},{"suit":"Spades","value":"8"},{"suit":"Clubs","value":"6"},{"suit":"Clubs","value":"9"},{"suit":"Diamonds","value":"7"},{"suit":"Spades","value":"3"},{"suit":"Diamonds","value":"3"},{"suit":"Clubs","value":"10"},{"suit":"Spades","value":"King"},{"suit":"Clubs","value":"8"},{"suit":"Diamonds","value":"5"},{"suit":"Hearts","value":"4"},{"suit":"Clubs","value":"King"},{"suit":"Clubs","value":"4"}]
```

```javascript
    //event - drawnCard
    {"suit":"Hearts","value":"2"}

```

```javascript
    //event - handcard
    [{"suit":"Spades","value":"6"},{"suit":"Hearts","value":"8"},{"suit":"Clubs","value":"2"},{"suit":"Diamonds","value":"Queen"},{"suit":"Hearts","value":"10"},{"suit":"Spades","value":"2"},{"suit":"Spades","value":"Queen"},{"suit":"Spades","value":"10"},{"suit":"Hearts","value":"7"},{"suit":"Clubs","value":"5"},{"suit":"Diamonds","value":"Jack"},{"suit":"Hearts","value":"2"}]
```

## discardCard (playerIndex,card)

```javascript
playerIndex=1
card = {"suit":"Hearts","value":"2"}
```

```javascript
// event - handcard
[{"suit":"Spades","value":"6"},{"suit":"Hearts","value":"8"},{"suit":"Clubs","value":"2"},{"suit":"Diamonds","value":"Queen"},{"suit":"Hearts","value":"10"},{"suit":"Spades","value":"2"},{"suit":"Spades","value":"Queen"},{"suit":"Spades","value":"10"},{"suit":"Hearts","value":"7"},{"suit":"Clubs","value":"5"},{"suit":"Diamonds","value":"Jack"}]

//event - discardedcard
{"suit":"Spades","value":"6"}
```

