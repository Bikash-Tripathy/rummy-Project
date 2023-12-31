// controllers/handController.js
// const Hand = require('../model/Hand');

// // Create a new hand
// exports.createHand = async (req, res) => {
//   try {
//     const { gameId, cards, winningPlayer } = req.body;

//     const hand = new Hand({
//       gameId,
//       cards,
//       winningPlayer,
//     });

//     await hand.save();
//     res.status(201).json(hand);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get all hands
// exports.listHands = async (req, res) => {
//   try {
//     const hands = await Hand.find();
//     res.status(200).json(hands);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// Other controller functions (update, delete) can be added here.



//Define card values and suits
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

// Function to create and shuffle a standard 52-card deck
function createShuffledDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }

  //Shuffle the deck using the Fisher-Yates shuffle algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
 

  return deck;
}
// const deck = createShuffledDeck();
// console.log(deck);

//Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Shuffle the array
shuffleArray(myArray);

// Display the shuffled array
console.log(myArray);

// // Function to deal cards to players
function dealCards(players, deck) {
  const numberOfCardsPerPlayer = 10; // Adjust as needed

  for (const player of players) {
    player.hand = player.hand || []; // Initialize the player's hand as an empty array if not already initialized

    for (let i = 0; i < numberOfCardsPerPlayer; i++) {
      if (deck.length > 0) {
        const card = deck.pop(); // Remove and get the last card from the deck
        player.hand.push(card); // Add the card to the player's hand
      } else {
        break; // If the deck is empty, stop dealing cards
      }
    }
  }
}

// Function to check if an array of cards forms a sequence
function isSequence(cards) {
  // Sort the cards by value
  cards.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

  // Check if the cards form a consecutive sequence
  for (let i = 1; i < cards.length; i++) {
    const prevValue = values.indexOf(cards[i - 1].value);
    const currValue = values.indexOf(cards[i].value);
    if (currValue !== prevValue + 1) {
      return false;
    }
  }

  return true;
}

// // Function to check if an array of cards forms a set
 function isSet(cards) {
  // Check if all the cards have the same rank (value)
  const firstValue = cards[0].value;
  return cards.every((card) => card.value === firstValue);
}

// // Function to check if an array of cards forms a valid sequence
function isValidSequence(cards) {
  const suitsSet = new Set(cards.map((card) => card.suit));

  if (suitsSet.size !== 1) {
    return false; // All cards must have the same suit for a sequence
  }

  cards.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

  for (let i = 0; i < cards.length - 1; i++) {
    const currentRankIndex = values.indexOf(cards[i].value);
    const nextRankIndex = values.indexOf(cards[i + 1].value);

    if (nextRankIndex !== currentRankIndex + 1) {
      return false; // Cards are not in consecutive order
    }
  }

  return true;
}

// // Function to check if an array of cards forms a valid set
function isValidSet(cards) {
  const ranksSet = new Set(cards.map((card) => card.value));

  if (ranksSet.size !== 1) {
    return false; // All cards must have the same rank for a set
  }

  return true;
}

// // Function to draw a card for a player
// function drawCard(player, deck) {
//   if (deck.length > 0) {
//     const card = deck.pop(); // Remove and get the last card from the deck
//     if (!player.hand) {
//       player.hand = []; // Initialize the player's hand as an empty array if it's undefined
//     }
//     player.hand.push(card); // Add the card to the player's hand
//   }
// }

function drawCard(player, deck) {
  if (deck.length > 0) {
    const card = deck.pop(); // Remove and get the last card from the deck
    if (!player.hand) {
      player.hand = []; // Initialize the player's hand as an empty array if it's undefined
    }
    player.hand.push(card); // Add the card to the player's hand
    return card; // Return the drawn card
  }
  return null; // Return null if the deck is empty
}

// Define a player object and a deck array
const player = { name: 'Alice' }; // Example player object
const deck = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Diamonds', value: '7' },
  { suit: 'Clubs', value: 'King' },
  // Add more cards to the deck as needed
];

// Call the drawCard function with the player and deck
const drawnCard = drawCard(player, deck);

if (drawnCard) {
  // Card was drawn successfully
  console.log('Drawn card:', drawnCard);
  console.log('Player\'s hand:', player.hand);
} else {
  // Deck is empty
  console.log('No cards left in the deck.');
}



// // Function to discard a card from a player's hand
function discardCard(player, card, discardPile) {
  const index = player.hand.findIndex((c) => c === card);
  if (index !== -1) {
    player.hand.splice(index, 1); // Remove the card from the player's hand
    discardPile.push(card); // Add the discarded card to the discard pile
    return true; // Return true to indicate a successful discard
  }
  return false; // Return false to indicate that the card was not found in the player's hand
}

// // Function to take a card from the discard pile
function takeFromDiscardPile(playerName, playerHand, discardPile) {
  if (discardPile.length > 0) {
    const takenCard = discardPile.pop();
    playerHand.push(takenCard);
    return takenCard;
  }
  return null;
}

// // Function to display a player's hand
function displayHand(playerName, playerHand) {
  console.log(`${playerName}'s hand:`);
  for (const card of playerHand) {
    console.log(`${card.suit} ${card.value}`);
  }
}

 // Function to check if an array of cards forms a valid meld
 //const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
function isValidMeld(playerHand) {
  if (!playerHand || playerHand.length === 0) {
    return false; // Return false if the player's hand is undefined or empty
  }

   // Helper function to sort cards by value
  function sortByValue(cards) {
    return cards.slice().sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
  }
   // Helper function to check if cards form a valid sequence
  function checkForSequence(cards) {
    if (cards.length < 3) return false;
    cards = sortByValue(cards);
    for (let i = 0; i < cards.length - 1; i++) {
      if (values.indexOf(cards[i + 1].value) - values.indexOf(cards[i].value) !== 1) {
        return false;
      }
    }
    return true;
  }

   // Helper function to check if cards form a valid set
  function checkForSet(cards) {
    if (cards.length < 3) return false;
    const firstValue = cards[0].value;
    return cards.every((card) => card.value === firstValue);
  }
  const sequences = [];
  const sets = [];

  // Find and group sequences and sets in the player's hand
  const sortedHand = sortByValue(playerHand);

  let currentGroup = [sortedHand[0]];

  for (let i = 1; i < sortedHand.length; i++) {
    if (values.indexOf(sortedHand[i].value) === values.indexOf(sortedHand[i - 1].value)) {
      currentGroup.push(sortedHand[i]);
    } else {
      if (currentGroup.length >= 3) {
        if (checkForSequence(currentGroup)) {
          sequences.push(...currentGroup);
        } else if (checkForSet(currentGroup)) {
          sets.push(...currentGroup);
        }
      }
      currentGroup = [sortedHand[i]];
    }
  }

  if (currentGroup.length >= 3) {
    if (checkForSequence(currentGroup)) {
      sequences.push(...currentGroup);
    } else if (checkForSet(currentGroup)) {
      sets.push(...currentGroup);
    }
  }

  // If there are valid sequences and sets that cover the entire hand, it's a valid meld
  if (sequences.length + sets.length === sortedHand.length) {
    return true;
  }

  return false;
}
// Example usage
const playerHand = [
  { suit: 'Hearts', value: '3' },
  { suit: 'Diamonds', value: '4' },
  { suit: 'Clubs', value: '5' },
  { suit: 'Spades', value: '5' },
  { suit: 'Hearts', value: '5' },
  { suit: 'Diamonds', value: '10' },
];

console.log(isValidMeld(playerHand)); // Should return true

 // Function to announce a meld
function announceMeld(playerName) {
  const isValidMeldPlayer = isValidMeld(playerName.hand);
  if (isValidMeldPlayer) {
    console.log(`${playerName}'s meld is valid!`);
  } else {
    console.log(`${playerName}'s meld is not valid.`);
  }
}

// // Function to check if a player has won the game
function hasPlayerWon(playerName, playerHand) {
  return isValidMeld(playerHand) && playerHand.length === 0;
}

// // Function to calculate the score of a player's hand
 function calculateScore(playerHand) {
  let score = 0;

  // Define scoring rules based on common Rummy rules
  const scoringRules = {
    'Ace': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'Jack': 10,
    'Queen': 10,
    'King': 10,
  };

  for (const card of playerHand) {
    score += scoringRules[card.value];
  }

  return score;
}

// // Player's Turn Logic
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
//   }
// }

// // Example of a game with two players taking turns
// const player1Hand = [];
// const player2Hand = [];
// const drawPile = createShuffledDeck();
// const discardPile = [];

// dealCards([{ name: 'Player 1', hand: player1Hand }, { name: 'Player 2', hand: player2Hand }], drawPile);

// let winner = null;

// while (drawPile.length > 0) {
//   // Player 1's turn
//   playerTurn('Player 1', player1Hand, drawPile, discardPile);
//   announceMeld('Player 1');

//   if (hasPlayerWon('Player 1', player1Hand)) {
//     winner = 'Player 1';
//     break; // Player 1 has won, so exit the loop
//   }

//   // Player 2's turn
//   playerTurn('Player 2', player2Hand, drawPile, discardPile);
//   announceMeld('Player 2');

//   if (hasPlayerWon('Player 2', player2Hand)) {
//     winner = 'Player 2';
//     break; // Player 2 has won, so exit the loop
//   }
// }

// if (winner) {
//   console.log(`${winner} has won the game!`);
//   console.log(`Final Score - Player 1: ${calculateScore(player1Hand)}, Player 2: ${calculateScore(player2Hand)}`);
// } else {
//   console.log('It\'s a draw!');
// }

// Export the necessary functions
module.exports = {
  createShuffledDeck,
  shuffleArray,
  // dealCards,
  // isSequence,
  // isSet,
  // isValidSequence,
  // isValidSet,
  // playerTurn,
  // drawCard,
  // discardCard,
  // takeFromDiscardPile,
  // displayHand,
  // isValidMeld,
  // announceMeld,
  // hasPlayerWon,
  // calculateScore,
};







// Define card values and suits
// const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
// const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

// // Function to create and shuffle a standard 52-card deck
// function createShuffledDeck() {
//   const deck = [];
//   for (const suit of suits) {
//     for (const value of values) {
//       deck.push({ suit, value });
//     }
//   }

//   // Shuffle the deck using the Fisher-Yates shuffle algorithm
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck[i], deck[j]] = [deck[j], deck[i]];
//   }

//   return deck;
// }

// // Function to shuffle an array (Fisher-Yates shuffle)
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// // Function to deal cards to players
// // function dealCards(players, deck) {
// //   const numberOfCardsPerPlayer = 10; // Adjust as needed

// //   for (const player of players) {
// //     player.hand = player.hand || []; // Initialize the player's hand as an empty array if not already initialized

// //     for (let i = 0; i < numberOfCardsPerPlayer; i++) {
// //       if (deck.length > 0) {
// //         const card = deck.pop(); // Remove and get the last card from the deck
// //         player.hand.push(card); // Add the card to the player's hand
// //       } else {
// //         break; // If the deck is empty, stop dealing cards
// //       }
// //     }
// //   }
// // }
// // Function to deal cards to players
// function dealCards(players, deck) {
//   const numberOfCardsPerPlayer = 10; // Adjust as needed

//   for (const player of players) {
//     player.hand = []; // Initialize the player's hand as an empty array

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


// // Function to check if an array of cards forms a sequence
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

// // Function to check if an array of cards forms a set
// function isSet(cards) {
//   // Check if all the cards have the same rank (value)
//   const firstValue = cards[0].value;
//   return cards.every((card) => card.value === firstValue);
// }

// // Function to check if an array of cards forms a valid sequence
// function isValidSequence(cards) {
//   const suitsSet = new Set(cards.map((card) => card.suit));

//   if (suitsSet.size !== 1) {
//     return false; // All cards must have the same suit for a sequence
//   }

//   cards.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

//   for (let i = 0; i < cards.length - 1; i++) {
//     const currentRankIndex = values.indexOf(cards[i].value);
//     const nextRankIndex = values.indexOf(cards[i + 1].value);

//     if (nextRankIndex !== currentRankIndex + 1) {
//       return false; // Cards are not in consecutive order
//     }
//   }

//   return true;
// }

// // Function to check if an array of cards forms a valid set
// function isValidSet(cards) {
//   const ranksSet = new Set(cards.map((card) => card.value));

//   if (ranksSet.size !== 1) {
//     return false; // All cards must have the same rank for a set
//   }

//   return true;
// }

// // Function to draw a card for a player
// function drawCard(player, deck) {
//   if (!player.hand) {
//     player.hand = []; // Initialize the player's hand as an empty array if not already initialized
//   }

//   if (deck.length > 0) {
//     const card = deck.pop(); // Remove and get the last card from the deck
//     player.hand.push(card); // Add the card to the player's hand
//   }
// }


// // Function to discard a card from a player's hand
// function discardCard(player, card, discardPile) {
//   const index = player.hand.findIndex((c) => c === card);
//   if (index !== -1) {
//     player.hand.splice(index, 1); // Remove the card from the player's hand
//     discardPile.push(card); // Add the discarded card to the discard pile
//   }
// }

// // Function to take a card from the discard pile
// function takeFromDiscardPile(playerName, playerHand, discardPile) {
//   if (discardPile.length > 0) {
//     const takenCard = discardPile.pop();
//     playerHand.push(takenCard);
//     return takenCard;
//   }
//   return null;
// }

// // Function to display a player's hand
// function displayHand(playerName, playerHand) {
//   console.log(`${playerName}'s hand:`);
//   for (const card of playerHand) {
//     console.log(`${card.suit} ${card.value}`);
//   }
// }

// // Function to check if an array of cards forms a valid meld
// function isValidMeld(playerHand) {
//   // Helper function to sort cards by value
//   function sortByValue(cards) {
//     return cards.slice().sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
//   }

//   // Helper function to check if cards form a valid sequence
//   function checkForSequence(cards) {
//     if (cards.length < 3) return false;
//     cards = sortByValue(cards);
//     for (let i = 0; i < cards.length - 1; i++) {
//       if (values.indexOf(cards[i + 1].value) - values.indexOf(cards[i].value) !== 1) {
//         return false;
//       }
//     }
//     return true;
//   }

//   // Helper function to check if cards form a valid set
//   function checkForSet(cards) {
//     if (cards.length < 3) return false;
//     const firstValue = cards[0].value;
//     return cards.every((card) => card.value === firstValue);
//   }

//   const sequences = [];
//   const sets = [];

//   // Find and group sequences and sets in the player's hand
//   const sortedHand = sortByValue(playerHand);

//   let currentGroup = [sortedHand[0]];

//   for (let i = 1; i < sortedHand.length; i++) {
//     if (values.indexOf(sortedHand[i].value) === values.indexOf(sortedHand[i - 1].value)) {
//       currentGroup.push(sortedHand[i]);
//     } else {
//       if (currentGroup.length >= 3) {
//         if (checkForSequence(currentGroup)) {
//           sequences.push(...currentGroup);
//         } else if (checkForSet(currentGroup)) {
//           sets.push(...currentGroup);
//         }
//       }
//       currentGroup = [sortedHand[i]];
//     }
//   }

//   if (currentGroup.length >= 3) {
//     if (checkForSequence(currentGroup)) {
//       sequences.push(...currentGroup);
//     } else if (checkForSet(currentGroup)) {
//       sets.push(...currentGroup);
//     }
//   }

//   // If there are valid sequences and sets that cover the entire hand, it's a valid meld
//   if (sequences.length + sets.length === sortedHand.length) {
//     return true;
//   }

//   return false;
// }

// // Function to announce a meld
// function announceMeld(playerName) {
//   const isValidMeldPlayer = isValidMeld(playerName.hand);
//   if (isValidMeldPlayer) {
//     console.log(`${playerName}'s meld is valid!`);
//   } else {
//     console.log(`${playerName}'s meld is not valid.`);
//   }
// }

// // Function to check if a player has won the game
// function hasPlayerWon(playerName, playerHand) {
//   return isValidMeld(playerHand) && playerHand.length === 0;
// }

// // Function to calculate the score of a player's hand
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

// // Player's Turn Logic
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
//   }
// }

// // Example of a game with two players taking turns
// const player1Hand = [];
// const player2Hand = [];
// const drawPile = createShuffledDeck();
// const discardPile = [];

// dealCards([{ name: 'Player 1', hand: player1Hand }, { name: 'Player 2', hand: player2Hand }], drawPile);

// let winner = null;

// while (drawPile.length > 0) {
//   // Player 1's turn
//   playerTurn('Player 1', player1Hand, drawPile, discardPile);
//   announceMeld('Player 1');

//   if (hasPlayerWon('Player 1', player1Hand)) {
//     winner = 'Player 1';
//     break; // Player 1 has won, so exit the loop
//   }

//   // Player 2's turn
//   playerTurn('Player 2', player2Hand, drawPile, discardPile);
//   announceMeld('Player 2');

//   if (hasPlayerWon('Player 2', player2Hand)) {
//     winner = 'Player 2';
//     break; // Player 2 has won, so exit the loop
//   }
// }

// if (winner) {
//   console.log(`${winner} has won the game!`);
//   console.log(`Final Score - Player 1: ${calculateScore(player1Hand)}, Player 2: ${calculateScore(player2Hand)}`);
// } else {
//   console.log('It\'s a draw!');
// }

// // Export the necessary functions
// module.exports = {
//   createShuffledDeck,
//   shuffleArray,
//   dealCards,
//   isSequence,
//   isSet,
//   isValidSequence,
//   isValidSet,
//   playerTurn,
//   drawCard,
//   discardCard,
//   takeFromDiscardPile,
//   displayHand,
//   isValidMeld,
//   announceMeld,
//   hasPlayerWon,
//   calculateScore,
// };



//---------------------------------- Socket.js -------------------------------------------------

// socket.js
// const socketIo = require('socket.io');
// const { initializeDeck, shuffleDeck, dealCards, drawCard, discardCard, takeFromDiscardPile, displayHand, isValidSequence, isValidSet, isValidMeld } = require('../utils/util');

// function initializeSocket(server) {
//   const io = socketIo(server);

//   io.on('connection', (socket) => {
//     console.log('A user connected.');
//     // console.log(socket);

//     // socket.emit('message', 'Welcome to the server!');
//     socket.on('message',(data)=>{
//         console.log(data)
//         socket.to()
//     })
//     socket.on('test',()=>{
//         const deck = initializeDeck();
//         // console.log(deck)
//         socket.emit('shuffleDeck',{deck});
//     })
   
//     socket.on('getDeck', () => {
//       socket.emit('deckData', deck);
//     });

//     socket.on('shuffleDeck', (deck) => {
//         console.log("data ====   "+deck)
//       shuffleDeck(deck);
//       socket.emit('shuffledDeck', deck);
//     });

//     // socket.on('dealCards', (players, deck) => {
//     //   dealCards(players, deck);
//     //   socket.emit('dealtCards', players);
//     // });
//     socket.on('dealCards', (players, deck) => {
//         dealCards(players, deck);
//         socket.emit('dealtCards', players);
//       });

//     socket.on('drawCard', (playerHand, drawPile) => {
//       const drawnCard = drawCard(playerHand, drawPile);
//       socket.emit('drawnCard', { playerHand, drawnCard });
//     });

//     socket.on('discardCard', (playerHand, cardToDiscard, discardPile) => {
//       discardCard(playerHand, cardToDiscard, discardPile);
//       socket.emit('discardedCard', { playerHand, discardPile });
//     });

//     socket.on('takeFromDiscardPile', (playerName, playerHand, discardPile) => {
//       const takenCard = takeFromDiscardPile(playerName, playerHand, discardPile);
//       if (takenCard) {
//         socket.emit('takenCard', { playerHand, takenCard });
//       } else {
//         socket.emit('discardEmpty', 'The discard pile is empty. Cannot take a card.');
//       }
//     });

//     socket.on('displayHand', (playerName, playerHand) => {
//       displayHand(playerName, playerHand);
//       socket.emit('displayedHand', `Displayed ${playerName}'s hand.`);
//     });

//     socket.on('isValidSequence', (cards) => {
//       const isValid = isValidSequence(cards);
//       socket.emit('validSequence', isValid);
//     });

//     socket.on('isValidSet', (cards) => {
//       const isValid = isValidSet(cards);
//       socket.emit('validSet', isValid);
//     });

//     socket.on('isValidMeld', (playerHand) => {
//       const isMeldValid = isValidMeld(playerHand);
//       socket.emit('validMeld', isMeldValid);
//     });

//     socket.on('disconnect', () => {
//       console.log('A user disconnected.');
//     });
//   });
// }

// module.exports = initializeSocket;

