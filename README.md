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
    // [1{"suit":"Spades","value":"Jack"},2{"suit":"Diamonds","value":"8"},3{"suit":"Clubs","value":"Queen"},4{"suit":"Hearts","value":"5"},5{"suit":"Diamonds","value":"Ace"},6{"suit":"Spades","value":"5"},7{"suit":"Diamonds","value":"9"},8{"suit":"Hearts","value":"Jack"},9{"suit":"Clubs","value":"Ace"},10{"suit":"Diamonds","value":"4"},11{"suit":"Spades","value":"6"},12{"suit":"Hearts","value":"8"},13{"suit":"Clubs","value":"2"},14{"suit":"Diamonds","value":"Queen"},15{"suit":"Hearts","value":"10"},16{"suit":"Spades","value":"2"},17{"suit":"Spades","value":"Queen"},18{"suit":"Spades","value":"10"},19{"suit":"Hearts","value":"7"},20{"suit":"Clubs","value":"5"}]

    [1{"suit":"Clubs","value":"Jack"},2{"suit":"Diamonds","value":"2"},3{"suit":"Diamonds","value":"8"},4{"suit":"Hearts","value":"Queen"},5{"suit":"Hearts","value":"Jack"},6{"suit":"Diamonds","value":"3"},7{"suit":"Clubs","value":"7"},8{"suit":"Diamonds","value":"Queen"},9{"suit":"Diamonds","value":"7"},10{"suit":"Clubs","value":"10"},11{"suit":"Spades","value":"8"},12{"suit":"Spades","value":"7"},13{"suit":"Spades","value":"2"},14{"suit":"Diamonds","value":"Ace"},15{"suit":"Diamonds","value":"King"},16{"suit":"Spades","value":"Ace"},17{"suit":"Diamonds","value":"4"},18{"suit":"Clubs","value":"4"},19{"suit":"Spades","value":"Jack"},20{"suit":"Diamonds","value":"9"},21{"suit":"Hearts","value":"2"},22{"suit":"Diamonds","value":"Jack"},23{"suit":"Spades","value":"10"},24{"suit":"Diamonds","value":"5"},25{"suit":"Spades","value":"5"},26{"suit":"Clubs","value":"Queen"},27{"suit":"Diamonds","value":"6"},28{"suit":"Clubs","value":"5"},29{"suit":"Spades","value":"King"},30{"suit":"Hearts","value":"King"},31{"suit":"Hearts","value":"8"},32{"suit":"Spades","value":"6"}]
```

```javascript
    // event - handCard
    // [1{"suit":"Spades","value":"Jack"},2{"suit":"Diamonds","value":"8"},3{"suit":"Clubs","value":"Queen"},4{"suit":"Hearts","value":"5"},5{"suit":"Diamonds","value":"Ace"},6{"suit":"Spades","value":"5"},7{"suit":"Diamonds","value":"9"},8{"suit":"Hearts","value":"Jack"},9{"suit":"Clubs","value":"Ace"},10{"suit":"Diamonds","value":"4"}]

    [{"suit":"Clubs","value":"3"},{"suit":"Clubs","value":"Ace"},{"suit":"Spades","value":"4"},{"suit":"Spades","value":"3"},{"suit":"Clubs","value":"8"},{"suit":"Clubs","value":"King"},{"suit":"Diamonds","value":"10"},{"suit":"Spades","value":"9"},{"suit":"Clubs","value":"9"},{"suit":"Hearts","value":"7"}]
```

```javascript
    // event - cards
    [{"suit":"Hearts","value":"2"},{"suit":"Hearts","value":"3"},{"suit":"Hearts","value":"4"},{"suit":"Hearts","value":"5"},{"suit":"Hearts","value":"6"},{"suit":"Hearts","value":"7"},{"suit":"Hearts","value":"8"},{"suit":"Hearts","value":"9"},{"suit":"Hearts","value":"10"},{"suit":"Hearts","value":"Jack"},{"suit":"Hearts","value":"Queen"},{"suit":"Hearts","value":"King"},{"suit":"Hearts","value":"Ace"},{"suit":"Diamonds","value":"2"},{"suit":"Diamonds","value":"3"},{"suit":"Diamonds","value":"4"},{"suit":"Diamonds","value":"5"},{"suit":"Diamonds","value":"6"},{"suit":"Diamonds","value":"7"},{"suit":"Diamonds","value":"8"},{"suit":"Diamonds","value":"9"},{"suit":"Diamonds","value":"10"},{"suit":"Diamonds","value":"Jack"},{"suit":"Diamonds","value":"Queen"},{"suit":"Diamonds","value":"King"},{"suit":"Diamonds","value":"Ace"},{"suit":"Clubs","value":"2"},{"suit":"Clubs","value":"3"},{"suit":"Clubs","value":"4"},{"suit":"Clubs","value":"5"},{"suit":"Clubs","value":"6"},{"suit":"Clubs","value":"7"},{"suit":"Clubs","value":"8"},{"suit":"Clubs","value":"9"},{"suit":"Clubs","value":"10"},{"suit":"Clubs","value":"Jack"},{"suit":"Clubs","value":"Queen"},{"suit":"Clubs","value":"King"},{"suit":"Clubs","value":"Ace"},{"suit":"Spades","value":"2"},{"suit":"Spades","value":"3"},{"suit":"Spades","value":"4"},{"suit":"Spades","value":"5"},{"suit":"Spades","value":"6"},{"suit":"Spades","value":"7"},{"suit":"Spades","value":"8"},{"suit":"Spades","value":"9"},{"suit":"Spades","value":"10"},{"suit":"Spades","value":"Jack"},{"suit":"Spades","value":"Queen"},{"suit":"Spades","value":"King"},{"suit":"Spades","value":"Ace"}]
```

## drawCard (playerIindex)
```javascript
    // event - faceDdownPiles
    [1{"suit":"Diamonds","value":"2"},2{"suit":"Spades","value":"7"},3{"suit":"Hearts","value":"6"},4{"suit":"Clubs","value":"7"},5{"suit":"Hearts","value":"King"},6{"suit":"Clubs","value":"3"},7{"suit":"Hearts","value":"3"},8{"suit":"Spades","value":"Ace"},9{"suit":"Diamonds","value":"10"},10{"suit":"Diamonds","value":"King"},11{"suit":"Spades","value":"4"},12{"suit":"Hearts","value":"Ace"},13{"suit":"Clubs","value":"Jack"},14{"suit":"Spades","value":"9"},15{"suit":"Diamonds","value":"6"},16{"suit":"Hearts","value":"Queen"},17{"suit":"Hearts","value":"9"},18{"suit":"Spades","value":"8"},19{"suit":"Clubs","value":"6"},20{"suit":"Clubs","value":"9"},21{"suit":"Diamonds","value":"7"},22{"suit":"Spades","value":"3"},23{"suit":"Diamonds","value":"3"},24{"suit":"Clubs","value":"10"},25{"suit":"Spades","value":"King"},26{"suit":"Clubs","value":"8"},27{"suit":"Diamonds","value":"5"},{"suit":"Hearts","value":"4"},{"suit":"Clubs","value":"King"},{"suit":"Clubs","value":"4"}]
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

Draw Pile: []
Face Down Pile: [
  'Card1', 'Card2',  'Card3',
  'Card4', 'Card5', 'Card6',
  'Card7',  'Card8', 'Card9',
  'Card10',  'Card11', 'Card12',
  'Card13',  'Card14',  'Card15',
  'Card16', 'Card17', 'Card18',
  'Card19',  'Card20','Card21', 'Card22',  'Card23',
  'Card24', 'Card25', 'Card26',
  'Card27',  'Card28', 'Card29',
  'Card30',  'Card31', 'Card32'
]
Rakesh's hand: [
  'Card33', 'Card34',
  'Card35', 'Card36',
  'Card37', 'Card38',
  'Card39',  'Card40',
  'Card41', 'Card42'
]
Rajesh's hand: [
  'Card43',  'Card44',
  'Card45',  'Card46',
  'Card47',  'Card48',
  'Card49',  'Card19',
  'Card13', 'Card50'
  'Card51', 'Card52'
] 