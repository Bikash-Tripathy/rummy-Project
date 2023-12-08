const PointTableMaster = require('../model/pointTableMaster');

// Create a new pointTableMaster entry
exports.createPointTableMaster = async (req, res) => {
    try {
      const { pointValue, bootValue, action, addedDateTime } = req.body;
      //const addedDateTime = new Date(); // Get the current date and time
      const pointTableMaster = new PointTableMaster({ pointValue, bootValue, action, addedDateTime });
      const savedPointTableMaster = await pointTableMaster.save();
      res.status(201).json(savedPointTableMaster);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Get a list of all pointTableMaster entries
exports.getAllPointTableMasters = async (req, res) => {
    try {
      const pointTableMasters = await PointTableMaster.find();
      res.json(pointTableMasters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Get a single pointTableMaster entry by ID
exports.getPointTableMasterById = async (req, res) => {
    try {
      const pointTableMasterId = req.params.id;
      const pointTableMaster = await PointTableMaster.findById(pointTableMasterId);
      if (!pointTableMaster) {
        return res.status(404).json({ message: 'PointTableMaster1 not found' });
      }
      res.json(pointTableMaster);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

 // Update a pointTableMaster entry by ID
exports.updatePointTableMasterById = async (req, res) => {
    try {
      const pointTableMasterId = req.params.id;
      const { pointValue, bootValue, action } = req.body;
      const addedDateTime = new Date(); // Get the current date and time
      const updatedPointTableMaster = await PointTableMaster.findByIdAndUpdate(
        pointTableMasterId,
        { pointValue, bootValue, action, addedDateTime },
        { new: true }
      );
      if (!updatedPointTableMaster) {
        return res.status(404).json({ message: 'PointTableMaster2 not found' });
      }
      res.json(updatedPointTableMaster);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Delete a pointTableMaster entry by ID
exports.deletePointTableMasterById = async (req, res) => {
    try {
      const pointTableMasterId = req.params.id;
      const deletedPointTableMaster = await PointTableMaster.findByIdAndRemove(pointTableMasterId);
      if (!deletedPointTableMaster) {
        return res.status(404).json({ message: 'PointTableMaster3 not found' });
      }
      res.json({ message: 'PointTableMaster deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  
  
// // Function to create and return a standard deck of cards
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







// // function isValidSequence(cards) {
// //   const suits = new Set(cards.map(card => card.split(' ')[2]));

// //   if (suits.size !== 1) {
// //     return false; // All cards must have the same suit for a sequence
// //   }

// //   const values = cards.map(card => card.split(' ')[0]);
// //   const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// //   for (let i = 0; i < values.length - 1; i++) {
// //     const currentRankIndex = rankOrder.indexOf(values[i]);
// //     const nextRankIndex = rankOrder.indexOf(values[i + 1]);

// //     if (nextRankIndex !== currentRankIndex + 1) {
// //       return false; // Cards are not in consecutive order
// //     }
// //   }

// //   return true;
// // }
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
// // const cards = [
// //   { suit: 'Hearts', value: '2' },
// //   { suit: 'Hearts', value: '3' },
// //   { suit: 'Hearts', value: '4' },
// // ];

// // const isValid = isValidSequence(cards);
// // console.log('Is the sequence valid?', isValid);

// // Test the function with an example sequence
// // const cards = ['10 of Hearts', 'Jack of Hearts', 'Queen of Hearts', 'King of Hearts', 'Ace of Hearts'];
// // const result = isValidSequence(cards);
// // console.log('Is the sequence valid?', result);


// // function isValidSet(cards) {
// //   const ranks = new Set(cards.map(card => card.split(' ')[0]));

// //   if (ranks.size !== 1) {
// //     return false; // All cards must have the same rank for a set
// //   }

// //   return true;
// // }
// function isValidSet(cards) {
//   const ranks = new Set(cards.map(card => card.value));

//   if (ranks.size !== 1) {
//     return false; // All cards must have the same rank for a set
//   }

//   return true;
// }
// // const cards = [
// //   { suit: 'Hearts', value: '2' },
// //   { suit: 'Diamonds', value: '2' },
// //   { suit: 'Clubs', value: '2' },
// // ];

// // const isValid = isValidSet(cards);
// // console.log('Is the set valid?', isValid);
// // const cards = ['Ace of Hearts', 'Ace of Diamonds', 'Ace of Clubs'];
// // const result = isValidSet(cards);
// // console.log('Is the set valid?', result);

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

// // function drawCard(player, deck) {
// //   if (deck.length > 0) {
// //     const card = deck.pop(); // Remove and get the last card from the deck
// //     if (!player.hand) {
// //       player.hand = []; // Initialize the player's hand as an empty array if it's undefined
// //     }
// //     player.hand.push(card); // Add the card to the player's hand
// //     return card; // Return the drawn card
// //   }
// //   return null; // Return null if the deck is empty
// // }
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


// //Define a player object and a deck array
// // const playern = { name: 'Alice' }; // Example player object
// // const decki = [
// //   { suit: 'Hearts', value: '2' },
// //   { suit: 'Diamonds', value: '7' },
// //   { suit: 'Clubs', value: 'King' },
// //   // Add more cards to the deck as needed
// // ];

// // // Call the drawCard function with the player and deck
// // const drawnCard = drawCard(playern, decki);

// // if (drawnCard) {
// //   // Card was drawn successfully
// //   console.log('Drawn card:', drawnCard);
// //   console.log('Player\'s hand:', playern.hand);
// // } else {
// //   // Deck is empty
// //   console.log('No cards left in the deck.');
// // }

// // function discardCard(player, card, discardPile) {
// //   const index = player.hand.findIndex((c) => c.value === card.value && c.suit === card.suit);
// //   if (index !== -1) {
// //     player.hand.splice(index, 1); // Remove the card from the player's hand
// //     discardPile.push(card); // Add the discarded card to the discard pile
// //     return true; // Return true to indicate a successful discard
// //   }
// //   return false; // Return false to indicate that the card was not found in the player's hand
// // }
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







// // function isValidMeld(cards) {
// //   // Sort the cards by rank for easier comparison
// //   cards.sort((a, b) => {
// //     const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
// //     return rankOrder.indexOf(a.split(' ')[0]) - rankOrder.indexOf(b.split(' ')[0]);
// //   });

// //   // Check for a valid sequence
// //   if (isValidSequence(cards)) {
// //     return true;
// //   }

// //   // Check for a valid set
// //   if (isValidSet(cards)) {
// //     return true;
// //   }

// //   return false;
// // }

// // //Define isValidSequence and isValidSet functions here if not already defined

// // const cards = [
// //   '2 of Hearts', '3 of Hearts', '4 of Hearts', '5 of Hearts', '6 of Hearts',
// // ];

// // const result = isValidMeld(cards);
// // console.log('Is the meld valid?', result);

// // function isValidMeld(cards) {
// //   // Sort the cards by rank using the custom rank order
// //   const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
// //   cards.sort((a, b) => rankOrder.indexOf(a.value) - rankOrder.indexOf(b.value));

// //   // Helper function to check if an array of cards is a valid sequence
// //   function isSequence(cards) {
// //     for (let i = 1; i < cards.length; i++) {
// //       if (rankOrder.indexOf(cards[i].value) !== rankOrder.indexOf(cards[i - 1].value) + 1) {
// //         return false;
// //       }
// //     }
// //     return true;
// //   }

// //   // Helper function to check if an array of cards is a valid set
// //   function isSet(cards) {
// //     for (let i = 1; i < cards.length; i++) {
// //       if (rankOrder.indexOf(cards[i].value) !== rankOrder.indexOf(cards[0].value)) {
// //         return false;
// //       }
// //     }
// //     return true;
// //   }

// //   // Check for valid sequences and sets
// //   if (isSequence(cards) || isSet(cards)) {
// //     return true;
// //   }

// //   return false;
// // }

// // const sampleCards = [
// //   { suit: 'Hearts', value: '3' },
// //   { suit: 'Diamonds', value: '4' },
// //   { suit: 'Clubs', value: '5' }
// //   // Add more cards to the array as needed
// // ];

// // console.log(isValidMeld(sampleCards));
//  // Should return true if it's a valid meld
//  function isValidMeld(cards) {
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


// //  function announceMeld(player) {
// //   const isValidMeldPlayer = isValidMeld(player.hand);
// //   if (isValidMeldPlayer) {
// //     console.log(`${player.name}'s meld is valid!`);
// //   } else {
// //     console.log(`${player.name}'s meld is not valid.`);
// //   }
// // }

// // // Example usage
// // const player = {
// //   name: 'Alice',
// //   hand: [
// //     { suit: 'Hearts', value: '3' },
// //     { suit: 'Diamonds', value: '4' },
// //     { suit: 'Clubs', value: '5' },
// //     { suit: 'Spades', value: '5' },
// //     { suit: 'Hearts', value: '5' },
// //     { suit: 'Diamonds', value: '5' }
// //   ]
// // };

// // announceMeld(player);
// // function announceMeld(cards, playerName) {
// //   const isValidMeldPlayer = isValidMeld(cards);
// //   if (isValidMeldPlayer) {
// //     console.log(`${playerName}'s meld is valid!`);
// //   } else {
// //     console.log(`${playerName}'s meld is not valid.`);
// //   }
// // }

// // // Example usage
// // const player = {
// //   name: 'Alice',
// //   cards: [
// //     { suit: 'Hearts', value: '3' },
// //     { suit: 'Diamonds', value: '4' },
// //     { suit: 'Clubs', value: '5' },
// //     { suit: 'Spades', value: '5' },
// //     { suit: 'Hearts', value: '5' },
// //     { suit: 'Diamonds', value: '5' }
// //   ]
// // };

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


// // Player's Turn Logic
// // function playerTurn(playerName, playerHand, drawPile, discardPile) {
// //   console.log(`${playerName}'s turn:`);

// //   // Draw a card
// //   const drawnCard = drawCard(playerHand, drawPile);
// //   if (drawnCard) {
// //     console.log(`${playerName} draws: ${drawnCard.suit} ${drawnCard.value}`);
// //     displayHand(playerName, playerHand);

// //     // Discard a card
// //     const cardToDiscard = playerHand[Math.floor(Math.random() * playerHand.length)];
// //     discardCard(playerHand, cardToDiscard, discardPile);
// //     console.log(`${playerName} discards: ${cardToDiscard.suit} ${cardToDiscard.value}`);
// //     displayHand(playerName, playerHand);

// //     // Player can also choose to take a card from the discard pile
// //     if (Math.random() < 0.5) {
// //       const takenCard = takeFromDiscardPile(playerName, playerHand, discardPile);
// //       if (takenCard) {
// //         console.log(`${playerName} takes: ${takenCard.suit} ${takenCard.value} from the discard pile.`);
// //         displayHand(playerName, playerHand);
// //       }
// //     }

// //     // Check if the player has a valid meld
// //     const isValidMeldPlayer = isValidMeld(playerHand);
// //     console.log(`${playerName} has a valid meld: ${isValidMeldPlayer ? 'Yes' : 'No'}`);
// //   }
// // }

// // // Example of a game with two players taking turns
// // const player1Hand = [];
// // const player2Hand = [];
// // const drawPile = initializeDeck( ;
// // const discardPile = [];

// // dealCards([{ name: 'Player 1', hand: player1Hand }, { name: 'Player 2', hand: player2Hand }], drawPile);

// // let winner = null;

// // while (drawPile.length > 0) {
// //   // Player 1's turn
// //   playerTurn('Player 1', player1Hand, drawPile, discardPile);
// //   announceMeld('Player 1');

// //   if (hasPlayerWon('Player 1', player1Hand)) {
// //     winner = 'Player 1';
// //     break; // Player 1 has won, so exit the loop
// //   }

// //   // Player 2's turn
// //   playerTurn('Player 2', player2Hand, drawPile, discardPile);
// //   announceMeld('Player 2');

// //   if (hasPlayerWon('Player 2', player2Hand)) {
// //     winner = 'Player 2';
// //     break; // Player 2 has won, so exit the loop
// //   }
// // }

// // if (winner) {
// //   console.log(`${winner} has won the game!`);
// //   console.log(`Final Score - Player 1: ${calculateScore(player1Hand)}, Player 2: ${calculateScore(player2Hand)}`);
// // } else {
// //   console.log('It\'s a draw!');
// // }

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
  
