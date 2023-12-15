// controllers/rummyController.js
const rummyGameModel = require('../model/rummyGame');
const io = require('socket.io');

// exports.createGames = async (req, res) => {
//   try {
//     const { selectedPlayerCount } = req.body;

//     // Define game parameters based on selectedPlayerCount
//     let gameData = [];

//     if (selectedPlayerCount === "2") {
//       gameData = [
//         {
//           pointValue: 10,
//           minEntry: 2,
//           maxPlayer: 5,
//           totalPlayers: 2,
//           selectedPlayersRange: 5,
//           players: [],
//         },
//         {
//           pointValue: 20,
//           minEntry: 5,
//           maxPlayer: 2,
//           totalPlayers: 6,
//           selectedPlayersRange: 2,
//           players: [],
//         },
//       ];
//     } else if (selectedPlayerCount === "5") {
//       gameData = [
//         {
//           pointValue: 30,
//           minEntry: 4,
//           maxPlayer: 3,
//           totalPlayers: 5,
//           selectedPlayersRange: 5,
//           players: [],
//         },
//         {
//           pointValue: 40,
//           minEntry: 5,
//           maxPlayer: 5,
//           totalPlayers: 5,
//           selectedPlayersRange: 5,
//           players: [],
//         },
//       ];
//     } else {
//       // Handle invalid selectedPlayerCount here, if needed
//       res.status(400).json({ message: 'Invalid selectedPlayerCount' });
//       return;
//     }

//     // Create new game records with calculated parameters
//     const newGames = await rummyGameModel.insertMany(gameData);

//     res.json({ games: newGames });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// exports.createGames = async (req, res) => {
//   try {
//     const { selectedPlayerCount } = req.body;

//     // Validate selectedPlayerCount
//     if (selectedPlayerCount !== "2" && selectedPlayerCount !== "5") {
//       res.status(400).json({ message: 'Invalid selectedPlayerCount' });
//       return;
//     }

//     // Query the database to find games with matching selectedPlayersRange
//     const games = await rummyGameModel.find({ selectedPlayersRange: selectedPlayerCount });
//     //console.log(games)

//     // If no games match, return an empty array
//     if (!games || games.length === 0) {
//       res.json({ games: [] });
//       return;
//     }

//     res.json({ games });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.createGames = async (req, res) => {
  try {
    const { selectedPlayerCount } = req.body;

    // Validate selectedPlayerCount
    const validPlayerCounts = ["2", "3", "4", "5", "6"];
    if (!validPlayerCounts.includes(selectedPlayerCount)) {
      res.status(400).json({ message: 'Invalid selectedPlayerCount' });
      return;
    }

    // Query the database to find games with matching selectedPlayersRange
    const games = await rummyGameModel.find({ selectedPlayersRange: selectedPlayerCount });
    
    // If no games match, return an empty array
    if (!games || games.length === 0) {
      res.json({ games: [] });
      return;
    }

    res.json({ games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// exports.createRummyGame = async (req, res) => {
//     try {
//       const createdGame = await rummyGameModel.create(req.body);
//       //console.log(createdGame)
//       res.status(201).json({
//         message: 'Game created successfully',
//         game: createdGame, 
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };

// exports.createRummyGame = async (req, res) => {
//   try {
//     const { pointValue, minEntry, maxPlayer, totalPlayers, selectedPlayersRange, players } = req.body;

//     console.log('Received data:', req.body); // Log received data

//     // Your additional logic to validate selectedPlayersRange here
//     if (selectedPlayersRange < 2) {
//       console.log('Validation failed:', selectedPlayersRange); // Log selectedPlayersRange when validation fails
//       return res.status(400).json({ error: 'Selected players range must be 2 or more.' });
//     }
    

//     // Create a new game
//     const newGame = new rummyGameModel({
//       pointValue,
//       minEntry,
//       maxPlayer,
//       totalPlayers,
//       selectedPlayersRange,
//       players,
//     });

//     // Save the game to the database
//     await newGame.save();

//     res.status(201).json({ message: 'Rummy game created successfully', game: newGame });
//   } catch (err) {
//     console.error('Error:', err); // Log any caught error
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


exports.createRummyGame = async (req, res) => {
  try {
    const { pointValue, minEntry, maxPlayer, totalPlayers, selectedPlayersRange, players } = req.body;

    console.log('Received data:', req.body); // Log received data

    // Your additional logic to validate selectedPlayersRange here
    if (selectedPlayersRange < 2) {
      console.log('Validation failed:', selectedPlayersRange); // Log selectedPlayersRange when validation fails
      return res.status(400).json({ error: 'Selected players range must be 2 or more.' });
    }

    // Create an array of combined userid and socketid strings
    const combinedPlayers = players.map(player => `${player.userid}:${player.socketid}`);

    console.log('Combined Players:', combinedPlayers);

    // Create a new game
    const newGame = new rummyGameModel({
      pointValue,
      minEntry,
      maxPlayer,
      totalPlayers,
      selectedPlayersRange,
      players: combinedPlayers, // Set the players array with combined strings
    });

    // Save the game to the database
    await newGame.save();

    res.status(201).json({ message: 'Rummy game created successfully', game: newGame });
  } catch (err) {
    console.error('Error:', err); // Log any caught error
    res.status(500).json({ error: 'Internal server error' });
  }
};

  exports.getRummyGameById = async (req, res) => {
    try {
      const gameId = req.params.id; // Assuming the ID is in the URL parameter
  
      // Find the game by its ID
      const game = await rummyGameModel.findById(gameId);
  
      if (!game) {
        // If the game with the given ID is not found, return a 404 response
        res.status(404).json({ message: 'Game not found' });
        return;
      }
  
      // If the game is found, return it in the response
      res.status(200).json({ game });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };



exports.joinGame = async (req, res) => {
  try {
    const { gameId, playerId } = req.body;

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.players.length >= game.selectedPlayersRange.max) {
      return res.status(400).json({ message: 'Game is full' });
    }

    game.players.push(playerId);

    await game.save();
    res.status(200).json({ message: 'Player joined the game' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Controller function for leaving the game with confirmation
exports.leaveGame = async (req, res) => {
  try {
    const { gameId, playerId } = req.body; // Assuming both game ID and user ID are passed in the request body

    // Find the game by its ID
    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if the player is in the game
    const playerIndex = game.players.indexOf(playerId);
    if (playerIndex === -1) {
      return res.status(404).json({ message: 'Player not found in the game' });
    }

    // Remove the player from the game
    game.players.splice(playerIndex, 1);

    // Update the game in the database
    await game.save();

    res.status(200).json({ message: 'Player left the game' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



//const pendingInvitations = [];

// Function to create and return a standard deck of cards
// function initializeDeck() {
//   const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
//   const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

//   const deck = [];

//   for (const suit of suits) {
//     for (const value of values) {
//       deck.push(`${value} of ${suit}`);
//     }
//   }

//   return deck;
// }
//  const deck = initializeDeck();
//  console.log(deck);

// //Function to shuffle the deck using the Fisher-Yates shuffle algorithm
// function shuffleDeck(deck) {
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements to shuffle
//   }
//   return deck;
// }
// const decks = [
//   'Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5',
//   'Card 6', 'Card 7', 'Card 8', 'Card 9', 'Card 10',
// ];

// shuffleDeck(decks);
// console.log('Shuffled deck:', decks);

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }
// const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// // Shuffle the array
// shuffleArray(myArray);

// // Display the shuffled array
// console.log(myArray);


// // Function to deal cards to players from the shuffled deck
// function dealCards(players, deck) {
//   const numberOfCardsPerPlayer = 10; // Adjust as needed

//   for (const player of players) {
//     player.hand = player.hand || []; // Initialize the player's hand as an empty array if not already initialized

//     for (let i = 0; i < numberOfCardsPerPlayer; i++) {
//       if (deck.length > 0) {
//         const card = deck.pop(); // Remove and get the last card from the deck
//         player.hand.push(card); // Add the card to the player's hand
//       } else {
//         break; // If the deck is empty, stop dealing cards
//       }
//     }
//   }
// }
// const players = [
//   { name: "Rakesh", hand: [] },
//   { name: "Rajesh", hand: [] },
// ];

// const deck2 = [
//   'Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5',
//   'Card 6', 'Card 7', 'Card 8', 'Card 9', 'Card 10',
// ];

// dealCards(players, deck2);
// console.log(players);



// function isValidSequence(cards) {
//   const suits = new Set(cards.map(card => card.suit));

//   if (suits.size !== 1) {
//     return false; // All cards must have the same suit for a sequence
//   }

//   const values = cards.map(card => card.value);
//   const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

//   for (let i = 0; i < values.length - 1; i++) {
//     const currentRankIndex = rankOrder.indexOf(values[i]);
//     const nextRankIndex = rankOrder.indexOf(values[i + 1]);

//     if (nextRankIndex !== currentRankIndex + 1) {
//       return false; // Cards are not in consecutive order
//     }
//   }

//   return true;
// }
// const cards = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Hearts', value: '3' },
//   { suit: 'Hearts', value: '4' },
// ];

// const isValid = isValidSequence(cards);
// console.log('Is the sequence valid?', isValid);

// //Test the function with an example sequence
// const cards1 = ['10 of Hearts', 'Jack of Hearts', 'Queen of Hearts', 'King of Hearts', 'Ace of Hearts'];
// const result = isValidSequence(cards1);
// console.log('Is the sequence valid?', result);



// function isValidSet(cards) {
//   const ranks = new Set(cards.map(card => card.value));

//   if (ranks.size !== 1) {
//     return false; // All cards must have the same rank for a set
//   }

//   return true;
// }
// const cards4 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '2' },
//   { suit: 'Clubs', value: '2' },
// ];

// const isValid1 = isValidSet(cards4);
// console.log('Is the set valid?', isValid1);
// const cards3 = ['Ace of Hearts', 'Ace of Diamonds', 'Ace of Clubs'];
// const result1 = isValidSet(cards3);
// console.log('Is the set valid?', result1);

// function isSequence(cards) {
//   // Sort the cards by value
//   cards.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

//   // Check if the cards form a consecutive sequence
//   for (let i = 1; i < cards.length; i++) {
//     const prevValue = values.indexOf(cards[i - 1].value);
//     const currValue = values.indexOf(cards[i].value);
//     if (currValue !== prevValue + 1) {
//       return false;
//     }
//   }

//   return true;
// }
// // const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
// // const cards = [
// //   { value: '2' },
// //   { value: '3' },
// //   { value: '4' },
// //   { value: '5' },
// //   { value: '6' },
// // ];

// // // Call the isSequence function with the example array
// // const result = isSequence(cards);

// // // Display the result in the console
// // console.log(result);

// function isSet(cards) {
//   // Check if all the cards have the same rank (value)
//   const firstValue = cards[0].value;
//   return cards.every((card) => card.value === firstValue);
// }
// // const cards = [
// //   { value: '2' },
// //   { value: '2' },
// //   { value: '2' },
// //   { value: '2' },
// //   { value: '2' },
// // ];

// // // Call the isSet function with the example array
// // const result = isSet(cards);

// // // Display the result in the console
// // console.log(result);


// function drawCard(playerHand, drawPile) {
//   if (drawPile.length === 0) {
//     console.log('Draw pile is empty.');
//     return null;
//   }
//   const card = drawPile.pop();
//   playerHand.push(card);
//   return card;
// }
// //testing
// const playerHand2 = [];
// const drawPile1 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '5' },
//   { suit: 'Clubs', value: '10' }
// ];

// const drawnCard = drawCard(playerHand2, drawPile1);
// console.log('Drawn Card:', drawnCard);
// console.log('Player Hand:', playerHand2);
// console.log("ghoos");
// console.log('Draw Pile:', drawPile1);



// function discardCard(playerHand, cardToDiscard, discardPile) {
//   const index = playerHand.indexOf(cardToDiscard);
//   if (index !== -1) {
//     playerHand.splice(index, 1); // Remove the card from the player's hand
//     discardPile.push(cardToDiscard); // Add the card to the discard pile
//   }
// }
// const playerHand1 = [{ suit: 'Hearts', value: '2' }, { suit: 'Diamonds', value: '5' }, { suit: 'Clubs', value: '10' }];
// const discardPile2 = [];

// discardCard(playerHand1, { suit: 'Diamonds', value: '5' }, discardPile2);
// console.log('Player Hand:', playerHand1);
// console.log('Discard Pile:', discardPile2);



// // Sample player with a hand of cards
// // const player1 = {
// //   hand: [{ value: '2', suit: 'Hearts' }, { value: '5', suit: 'Diamonds' }, { value: '8', suit: 'Clubs' }],
// // };

// // // Sample discard pile
// // const discardPiles = [];

// // // Card to discard
// // const cardToDiscard = { value: '5', suit: 'Diamonds' };

// // // Run the discardCard function
// // const result = discardCard(player1, cardToDiscard, discardPiles);

// // if (result) {
// //   console.log('Card successfully discarded.');
// //   console.log('Player\'s hand:', player1.hand);
// //   console.log('Discard pile:', discardPiles);
// // } else {
// //   console.log('Card not found in the player\'s hand.');
// // }

// function takeFromDiscardPile(playerName, playerHand, discardPile) {
//   if (discardPile.length > 0) {
//     const takenCard = discardPile.pop();
//     playerHand.push(takenCard);
//     return takenCard;
//   }
//   return null;
// }

// //Sample player name, player hand, and discard pile
// const playerName = "santanu";
// const playerHand = [];
// const discardPile1 = [
//   { value: '2', suit: 'Hearts' },
//   { value: '5', suit: 'Diamonds' },
//   { value: '8', suit: 'Clubs' },
// ];

// // Run the takeFromDiscardPile function
// const takenCard = takeFromDiscardPile(playerName, playerHand, discardPile1);

// if (takenCard) {
//   console.log(playerName + ' took a card from the discard pile.');
//   console.log(playerName + '\'s hand:', playerHand);
//   console.log('Updated discard pile:', discardPile1);
// } else {
//   console.log('The discard pile is empty. Cannot take a card.');
// }

// function displayHand(playerName, playerHand) {
//   console.log(`${playerName}'s hand:`);
//   for (const card of playerHand) {
//     console.log(`${card.suit} ${card.value}`);
//   }
// }

// // Sample player name and hand
// const playerNames = "Bikash";
// const playerHands = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '5' },
//   { suit: 'Clubs', value: '8' },
// ];

// // Display the player's hand in the console
// displayHand(playerNames, playerHands);




// function isValidMeld(cards) {
//   const rankOrder = [
//     '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'
//   ];

//   if (!Array.isArray(cards) || cards.length < 3) {
//     return false; // A meld should have at least 3 cards
//   }

//   const ranks = new Set(cards.map((card) => card.value));

//   if (ranks.size === 1) {
//     // If there is only one unique rank, it's a valid set
//     return true;
//   }

//   const sortedRanks = Array.from(ranks).sort((a, b) =>
//     rankOrder.indexOf(a) - rankOrder.indexOf(b)
//   );

//   if (sortedRanks.length < 3) {
//     return false; // Not enough unique ranks for a valid sequence
//   }

//   // Check for a valid sequence
//   for (let i = 1; i < sortedRanks.length; i++) {
//     if (rankOrder.indexOf(sortedRanks[i]) !== rankOrder.indexOf(sortedRanks[i - 1]) + 1) {
//       return false;
//     }
//   }

//   return true;
// }

// const sampleCards = [
//   { suit: 'Hearts', value: '3' },
//   { suit: 'Diamonds', value: '4' },
//   { suit: 'Clubs', value: '5' },
//   { suit: 'Spades', value: '6' },
//   { suit: 'Hearts', value: '7' },
// ];

// console.log(isValidMeld(sampleCards)); // This should return true
//  // This should return true




// // const valueToNumber = {
// //   '2': 2,
// //   '3': 3,
// //   '4': 4,
// //   '5': 5,
// //   '6': 6,
// //   '7': 7,
// //   '8': 8,
// //   '9': 9,
// //   '10': 10,
// //   'Jack': 11,
// //   'Queen': 12,
// //   'King': 13,
// //   'Ace': 14,
// // };

// // function isValidMeld(playerHand) {
// //   if (!playerHand || playerHand.length === 0) {
// //     return false; // Return false if the player's hand is undefined or empty
// //   }
  
// //   // Helper function to sort cards by value
// //   function sortByValue(cards) {
// //     return cards.slice().sort((a, b) => valueToNumber[a.value] - valueToNumber[b.value]);
// //   }

// //   // Helper function to check if cards form a valid sequence
// //   function checkForSequence(cards) {
// //     if (cards.length < 3) return false;
// //     cards = sortByValue(cards);

// //     for (let i = 1; i < cards.length; i++) {
// //       if (valueToNumber[cards[i].value] - valueToNumber[cards[i - 1].value] !== 1) {
// //         return false;
// //       }
// //     }

// //     return true;
// //   }

// //   // Helper function to check if cards form a valid set
// //   function checkForSet(cards) {
// //     if (cards.length < 3) return false;
// //     return cards.every((card) => card.value === cards[0].value);
// //   }

// //   const sequences = [];
// //   const sets = [];

// //   // Find and group sequences and sets in the player's hand
// //   const sortedHand = sortByValue(playerHand);

// //   let currentGroup = [sortedHand[0]];

// //   for (let i = 1; i < sortedHand.length; i++) {
// //     if (valueToNumber[sortedHand[i].value] === valueToNumber[sortedHand[i - 1].value]) {
// //       currentGroup.push(sortedHand[i]);
// //     } else {
// //       if (currentGroup.length >= 3) {
// //         if (checkForSequence(currentGroup)) {
// //           sequences.push(...currentGroup);
// //         } else if (checkForSet(currentGroup)) {
// //           sets.push(...currentGroup);
// //         }
// //       }
// //       currentGroup = [sortedHand[i]];
// //     }
// //   }

// //   if (currentGroup.length >= 3) {
// //     if (checkForSequence(currentGroup) || checkForSet(currentGroup)) {
// //       // Allow the last group to be a sequence or a set
// //       sequences.push(...currentGroup);
// //     }
// //   }

// //   // If there are valid sequences and sets that cover the entire hand, it's a valid meld
// //   if (sequences.length + sets.length === sortedHand.length) {
// //     return true;
// //   }

// //   return false;
// // }

// // Example usage
// // const playerHand = [
// //   { suit: 'Hearts', value: '3' },
// //   { suit: 'Diamonds', value: '4' },
// //   { suit: 'Clubs', value: '5' },
// //   { suit: 'Spades', value: '5' },
// //   { suit: 'Hearts', value: '5' },
// //   { suit: 'Diamonds', value: '5' },
// // ];

// // console.log(isValidMeld(playerHand)); // Should return true




// // announceMeld(player.cards, player.name);
// function announceMeld(player) {
//   const isValidMeldPlayer = isValidMeld(player.hand);
//   if (isValidMeldPlayer) {
//     console.log(`${player.name}'s meld is valid!`);
//   } else {
//     console.log(`${player.name}'s meld is not valid.`);
//   }
// }

// // Example usage
// const player = {
//   name: 'Alice',
//   hand: [
//     { suit: 'Hearts', value: '3' },
//     { suit: 'Diamonds', value: '4' },
//     { suit: 'Clubs', value: '5' },
//     { suit: 'Spades', value: '5' },
//     { suit: 'Hearts', value: '5' },
//     { suit: 'Diamonds', value: '5' }
//   ]
// };

// announceMeld(player);

// // Include the isValidMeld function here (either define it or import it)

// // function hasPlayerWon(playerName, playerHand) {
// //   // Call the isValidMeld function to check if the player's hand is a valid meld
// //   // and check if the player's hand is empty
// //   return isValidMeld(playerHand) && playerHand.length === 0;
// // }

// // // Sample player hand
// // const samplePlayerHand = [
// //   { suit: 'Hearts', value: '3' },
// //   { suit: 'Diamonds', value: '4' },
// //   { suit: 'Clubs', value: '5' },
// //   // Add more cards to the array as needed
// // ];

// // // Call the hasPlayerWon function with the player's name and their hand
// // const playerName = 'Alice';
// // const playerWon = hasPlayerWon(playerName, samplePlayerHand);

// // if (playerWon) {
// //   console.log(`${playerName} has won the game!`);
// // } else {
// //   console.log(`${playerName} has not won yet.`);
// // }

// // Define the calculateScore function
// function calculateScore(playerHand) {
//   let score = 0;

//   // Define scoring rules based on common Rummy rules
//   const scoringRules = {
//     'Ace': 1,
//     '2': 2,
//     '3': 3,
//     '4': 4,
//     '5': 5,
//     '6': 6,
//     '7': 7,
//     '8': 8,
//     '9': 9,
//     '10': 10,
//     'Jack': 10,
//     'Queen': 10,
//     'King': 10,
//   };

//   for (const card of playerHand) {
//     score += scoringRules[card.value];
//   }

//   return score;
// }

// // Sample player hand
// const samplePlayersHand = [
//   { value: 'Ace' },
//   { value: '2' },
//   { value: 'King' },
//   // Add more cards to the array as needed
// ];

// // Call the calculateScore function with the sample player hand
// const score = calculateScore(samplePlayersHand);

// // Display the score in the console
// console.log('Player Score:', score);



// // Include your functions for dealing cards, drawing cards, and all other game-related functions here.

// function playerTurn(playerName, playerHand, drawPile, discardPile) {
//   console.log(`${playerName}'s turn:`);

//   // Draw a card
//   const drawnCard = drawCard(playerHand, drawPile);
//   if (drawnCard) {
//     console.log(`${playerName} draws: ${drawnCard.suit} ${drawnCard.value}`);
//     displayHand(playerName, playerHand);

//     // Discard a card
//     const cardToDiscard = playerHand[Math.floor(Math.random() * playerHand.length)];
//     discardCard(playerHand, cardToDiscard, discardPile);
//     console.log(`${playerName} discards: ${cardToDiscard.suit} ${cardToDiscard.value}`);
//     displayHand(playerName, playerHand);

//     // Player can also choose to take a card from the discard pile
//     if (Math.random() < 0.5) {
//       const takenCard = takeFromDiscardPile(playerName, playerHand, discardPile);
//       if (takenCard) {
//         console.log(`${playerName} takes: ${takenCard.suit} ${takenCard.value} from the discard pile.`);
//         displayHand(playerName, playerHand);
//       }
//     }

//     // Check if the player has a valid meld
//     const isValidMeldPlayer = isValidMeld(playerHand);
//     console.log(`${playerName} has a valid meld: ${isValidMeldPlayer ? 'Yes' : 'No'}`);

//     // Check if the player has won (empty hand)
//     if (playerHand.length === 0) {
//       console.log(`${playerName} has won the game!`);
//       process.exit(); // Exit the game
//     }
//   }
// }

// // Example of a game with two players taking turns
// const player1Hand = [];
// const player2Hand = [];
// const drawPile = initializeDeck();
// const discardPile = [];

// dealCards([{ name: 'Player 1', hand: player1Hand }, { name: 'Player 2', hand: player2Hand }], drawPile);

// let turns = 0;

// while (drawPile.length > 0 && turns < 100) {

//   // Player 1's turn
//   playerTurn('Player 1', player1Hand, drawPile, discardPile);

//   // Player 2's turn
//   playerTurn('Player 2', player2Hand, drawPile, discardPile);

//   //turns++;
// }

// console.log('It\'s a draw!');



//--------------------------------------- Gamme Logic -----------------------------------------------

//--------------------- Define a function to initialize a deck of cards-----------------------------
// function initializeDeck() {
//   const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
//   const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
//   const deck = [];

//   for (const suit of suits) {
//     for (const value of values) {
//       deck.push({ suit, value });
//     }
//   }

//   return deck;
// }
// const deck = initializeDeck();
// console.log(deck);

// //----------- Function to shuffle the deck using the Fisher-Yates shuffle algorithm------------------
// function shuffleDeck(deck) {
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck[i], deck[j]] = [deck[j], deck[i]];
//   }
// }
// const decks = [
//   'Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5',
//   'Card 6', 'Card 7', 'Card 8', 'Card 9', 'Card 10',
// ];

// shuffleDeck(decks);
// console.log('Shuffled deck:', decks);


// //---------------- Function to deal cards to players from the shuffled deck-----------------------
// function dealCards(players, deck) {
//   shuffleDeck(deck);
//   let currentPlayerIndex = 0;

//   for (const card of deck) {
//     const currentPlayer = players[currentPlayerIndex];
//     currentPlayer.hand.push(card);
//     currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
//   }
// }
// const players = [
//   { name: "Rakesh", hand: [] },
//   { name: "Rajesh", hand: [] },
// ];

// const deck2 = [
//   'Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5',
//   'Card 6', 'Card 7', 'Card 8', 'Card 9', 'Card 10',
// ];

// dealCards(players, deck2);
// console.log(players);

// //----------------------- Function to draw a card from the draw pile--------------------------------
// function drawCard(playerHand, drawPile) {
//   if (drawPile.length === 0) {
//     console.log('Draw pile is empty.');
//     return null;
//   }
//   const card = drawPile.pop();
//   playerHand.push(card);
//   return card;
// }
// const playerHand2 = [];
// const drawPile1 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '5' },
//   { suit: 'Clubs', value: '10' }
// ];

// const drawnCard = drawCard(playerHand2, drawPile1);
// console.log('Drawn Card:', drawnCard);
// console.log('Player Hand:', playerHand2);
// console.log("ghoos");
// console.log('Draw Pile:', drawPile1);

// //---------------------------------- Function to discard a card-------------------------------------

// function discardCard(playerHand, cardToDiscard, discardPile) {
//   const index = playerHand.indexOf(cardToDiscard);
//   if (index !== -1) {
//     playerHand.splice(index, 1); // Remove the card from the player's hand
//     discardPile.push(cardToDiscard); // Add the card to the discard pile
//   }
// }
// const playerHand1 = [{ suit: 'Hearts', value: '2' }, { suit: 'Diamonds', value: '5' }, { suit: 'Clubs', value: '10' }];
// const discardPile2 = [];

// discardCard(playerHand1, { suit: 'Diamonds', value: '5' }, discardPile2);
// console.log('Player Hand:', playerHand1);
// console.log('Discard Pile:', discardPile2);


// //------------------------ Function to take a card from the discard pile------------------------------

// function takeFromDiscardPile(playerName, playerHand, discardPile) {
//   if (discardPile.length > 0) {
//     const takenCard = discardPile.pop();
//     playerHand.push(takenCard);
//     return takenCard;
//   }
//   return null;
// }
// const playerName = "santanu";
// const playerHand = [];
// const discardPile1 = [
//   { value: '2', suit: 'Hearts' },
//   { value: '5', suit: 'Diamonds' },
//   { value: '8', suit: 'Clubs' },
// ];
// // // Run the takeFromDiscardPile function
// const takenCard = takeFromDiscardPile(playerName, playerHand, discardPile1);

// if (takenCard) {
//   console.log(playerName + ' took a card from the discard pile.');
//   console.log(playerName + '\'s hand:', playerHand);
//   console.log('Updated discard pile:', discardPile1);
// } else {
//   console.log('The discard pile is empty. Cannot take a card.');
// }

// //--------------------------------- Function to display a player's hand--------------------------------

// function displayHand(playerName, playerHand) {
//   console.log(`${playerName}'s hand:`);
//   for (const card of playerHand) {
//     console.log(`${card.suit} ${card.value}`);
//   }
// }
// // Sample player name and hand
// // const playerNames = "Bikash";
// // const playerHands = [
// //   { suit: 'Hearts', value: '2' },
// //   { suit: 'Diamonds', value: '5' },
// //   { suit: 'Clubs', value: '8' },
// // ];

// // // Display the player's hand in the console
// // displayHand(playerNames, playerHands);



// //-------------------------- Function to check if a sequence of cards is valid--------------------------

// function isValidSequence(cards) {
//   const suits = new Set(cards.map(card => card.suit));

//   if (suits.size !== 1) {
//     return false; // All cards must have the same suit for a sequence
//   }

//   const values = cards.map(card => card.value);
//   const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

//   for (let i = 0; i < values.length - 1; i++) {
//     const currentRankIndex = rankOrder.indexOf(values[i]);
//     const nextRankIndex = rankOrder.indexOf(values[i + 1]);

//     if (nextRankIndex !== currentRankIndex + 1) {
//       return false; // Cards are not in consecutive order
//     }
//   }

//   return true;
// }
// const cards = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Hearts', value: '3' },
//   { suit: 'Hearts', value: '4' },
// ];

// const isValid = isValidSequence(cards);
// console.log('Is the sequence valid?', isValid);



// //------------------------ Function to check if a set of cards is valid------------------------------

// function isValidSet(cards) {
//   const ranks = new Set(cards.map(card => card.value));

//   if (ranks.size !== 1) {
//     return false; // All cards must have the same rank for a set
//   }

//   return true;
// }
// const cards4 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '2' },
//   { suit: 'Clubs', value: '2' },
// ];

// const isValid1 = isValidSet(cards4);
// console.log('Is the set valid?', isValid1);



// //----------------------Function to check if a meld (sequence or set) is valid-------------------------

// function isValidMeld(playerHand) {
//   // Separate cards into sequences and sets
//   const sequences = [];
//   const sets = [];

//   playerHand.sort((a, b) => {
//     if (a.suit !== b.suit) {
//       return a.suit.localeCompare(b.suit);
//     } else {
//       return a.value.localeCompare(b.value);
//     }
//   });

//   let currentMeld = [playerHand[0]];

//   for (let i = 1; i < playerHand.length; i++) {
//     if (playerHand[i].value === playerHand[i - 1].value) {
//       currentMeld.push(playerHand[i]);
//     } else {
//       if (currentMeld.length >= 3) {
//         const isSequence = isValidSequence(currentMeld);
//         const isSet = isValidSet(currentMeld);

//         if (isSequence || isSet) {
//           if (isSequence) {
//             sequences.push(currentMeld);
//           } else {
//             sets.push(currentMeld);
//           }
//         }
//       }
//       currentMeld = [playerHand[i]];
//     }
//   }

//   if (currentMeld.length >= 3) {
//     const isSequence = isValidSequence(currentMeld);
//     const isSet = isValidSet(currentMeld);

//     if (isSequence || isSet) {
//       if (isSequence) {
//         sequences.push(currentMeld);
//       } else {
//         sets.push(currentMeld);
//       }
//     }
//   }

//   // Check if all cards are part of a valid meld
//   const allCardsAreMeld = playerHand.length === (sequences.length * 3 + sets.length * 3);

//   return allCardsAreMeld;
// }

// // Example player hand with cards
// const playerHand3 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Hearts', value: '3' },
//   { suit: 'Hearts', value: '4' },
//   { suit: 'Spades', value: '4' },
//   { suit: 'Spades', value: '5' },
//   { suit: 'Spades', value: '6' },
//   { suit: 'Diamonds', value: '10' },
//   { suit: 'Diamonds', value: 'Jack' },
//   { suit: 'Diamonds', value: 'Queen' },
//   { suit: 'Clubs', value: '8' },
// ];

// // Call the isValidMeld function with the player's hand
// const isMeldValid = isValidMeld(playerHand3);

// console.log(`Is the meld valid? ${isMeldValid ? 'Yes' : 'No'}`);

// // Function for a player's turn
// function playerTurn(playerName, playerHand, drawPile, discardPile) {
//   console.log(`${playerName}'s turn:`);
//   displayHand(playerName, playerHand);

//   // Draw a card
//   const drawnCard = drawCard(playerHand, drawPile);
//   if (drawnCard) {
//     console.log(`${playerName} draws: ${drawnCard.suit} ${drawnCard.value}`);
//     displayHand(playerName, playerHand);

//     // Discard a card
//     const cardToDiscard = playerHand[Math.floor(Math.random() * playerHand.length)];
//     discardCard(playerHand, cardToDiscard, discardPile);
//     console.log(`${playerName} discards: ${cardToDiscard.suit} ${cardToDiscard.value}`);
//     displayHand(playerName, playerHand);

//     // Player can also choose to take a card from the discard pile
//     if (Math.random() < 0.5) {
//       const takenCard = takeFromDiscardPile(playerName, playerHand, discardPile);
//       if (takenCard) {
//         console.log(`${playerName} takes: ${takenCard.suit} ${takenCard.value} from the discard pile.`);
//         displayHand(playerName, playerHand);
//       }
//     }

//     // Check if the player has a valid meld
//     const isValidMeldPlayer = isValidMeld(playerHand);
//     console.log(`${playerName} has a valid meld: ${isValidMeldPlayer ? 'Yes' : 'No'}`);

//     // Check if the player has won (empty hand)
//     if (playerHand.length === 0) {
//       console.log(`${playerName} has won the game!`);
//       process.exit(); // Exit the game
//     }
//   }
// }

// // Main game loop
// let currentPlayerIndex = 0;
// let drawPile = deck;
// const discardPile = [];

// while (drawPile.length > 0) {
//   const currentPlayer = players[currentPlayerIndex];
//   playerTurn(currentPlayer.name, currentPlayer.hand, drawPile, discardPile);
//   currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
// }

// console.log('It\'s a draw!');




// // API endpoint to start the game
exports.startGame = async (req, res) => {
  try {
    const gameId = req.body.gameId; // Assuming the game ID is passed in the request body
    const playerName = req.body.playerName; // Assuming the player's name is passed in the request body

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if the game is full and all players have joined
    if (game.players.length < game.selectedPlayersRange.max) {
      return res.status(400).json({ message: 'Not all players have joined the game' });
    }

    // Check if the player initiating the game is part of the joined players
    if (!game.players.includes(playerName)) {
      return res.status(400).json({ message: 'You are not part of this game' });
    }

    // Initialize the game state
    // initializeGame(game);

    // Emit a Socket.IO event to notify all players that the game has started
    // io.to(gameId).emit('gameStarted', { gameId: game._id });

    res.status(200).json({ message: 'The game has started' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// // Handle player's turn to play a card
exports.playCard = async (req, res) => {
  try {
    const gameId = req.body.gameId; // Assuming the game ID is passed in the request body
    const playerName = req.body.playerName; // Assuming the player's name is passed in the request body
    const card = req.body.card; // Assuming the card to be played is passed in the request body

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if it's the player's turn to play
    if (game.players[game.currentPlayerIndex] !== playerName) {
      return res.status(400).json({ message: "It's not your turn to play" });
    }

    // Implement card validation and game-specific logic here
    if (!isValidCard(game, card)) {
      return res.status(400).json({ message: 'Invalid card' });
    }

    // Update the game state as needed
    game.discardPile.push(card);

    // Move to the next player's turn
    game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;

    // Emit a Socket.IO event to notify all players of the updated game state
    io.to(gameId).emit('gameStateUpdated', { gameId: game._id, gameState: game });

    res.status(200).json({ message: 'Card played successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


// Route to invite players to the game
exports.invitePlayers = async (req, res) => {
  try {
    const gameId = req.body.gameId;
    const playerName = req.body.playerName;
    const invitedPlayers = req.body.invitedPlayers;

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (!game.players.includes(playerName)) {
      return res.status(400).json({ message: 'You are not part of this game' });
    }

    const availablePlayers = game.players.filter(player => !player.game);

    const acceptedInvitations = [];
    const rejectedInvitations = [];

    for (const invitedPlayer of invitedPlayers) {
      const player = availablePlayers.find(player => player.name === invitedPlayer);

      if (player) {
        // Emit a Socket.IO event to notify the invited player
        io.to(player.socketId).emit('invitation', {
          gameId,
          inviter: playerName,
        });

        acceptedInvitations.push(invitedPlayer);
      } else {
        rejectedInvitations.push(invitedPlayer);
      }
    }

    res.status(200).json({
      message: 'Invitations sent successfully',
      acceptedInvitations,
      rejectedInvitations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' }); 
  }
};


//Function to accept an invitation
exports.acceptInvitation = async (req, res) => {
  try {
    const gameId = req.body.gameId;
    const playerName = req.body.playerName;

    const invitationIndex = pendingInvitations.findIndex(
      invitation => invitation.gameId === gameId && invitation.invitee === playerName
    );

    if (invitationIndex === -1) {
      return res.status(400).json({ message: 'No pending invitation found' });
    }

    const [invitation] = pendingInvitations.splice(invitationIndex, 1);

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    game.players.push(playerName);

    // Emit a Socket.IO event to notify the inviter that the invitation was accepted
    io.to(invitation.inviterSocketId).emit('invitationAccepted', {
      gameId,
      invitee: playerName,
    });

    res.status(200).json({ message: 'Invitation accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


function sendInvitationNotification(playerName, gameId, io) {
  // Find the socket associated with the invited player, assuming you have a way to map players to sockets
  const invitedPlayerSocket = io.sockets.connected[playerName];

  if (invitedPlayerSocket) {
    // Emit a custom event to send the invitation
    invitedPlayerSocket.emit('invitation', { gameId, inviter: playerName });
  } else {
    console.log(`Player ${playerName} not found or not connected.`);
  }
}

// Function to send an invitation accepted notification to the inviter via Socket.IO
function sendInvitationAcceptedNotification(inviterName, playerName, gameId, io) {
  // Find the socket associated with the inviter, assuming you have a way to map players to sockets
  const inviterSocket = io.sockets.connected[inviterName];

  if (inviterSocket) {
    // Emit a custom event to send the accepted invitation notification to the inviter
    inviterSocket.emit('invitationAccepted', { gameId, invitee: playerName });
  } else {
    console.log(`Inviter ${inviterName} not found or not connected.`);
  }
}
//module.exports = { displayHand };