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

//--------------------------------------- Gamme Logic -----------------------------------------------

//--------------------- Define a function to initialize a deck of cards-----------------------------
function initializeDeck() {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  const deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }

  return deck;
}
const deck = initializeDeck();
console.log(deck);

//----------- Function to shuffle the deck using the Fisher-Yates shuffle algorithm------------------
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}
const decks = [
  'Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5',
  'Card 6', 'Card 7', 'Card 8', 'Card 9', 'Card 10',
];

shuffleDeck(decks);
console.log('Shuffled deck:', decks);


//---------------- Function to deal cards to players from the shuffled deck-----------------------
function dealCards(players, deck) {
  shuffleDeck(deck);
  let currentPlayerIndex = 0;

  for (const card of deck) {
    const currentPlayer = players[currentPlayerIndex];
    currentPlayer.hand.push(card);
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  }
}
const players = [
  { name: "Rakesh", hand: [] },
  { name: "Rajesh", hand: [] },
];

const deck2 = [
  'Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5',
  'Card 6', 'Card 7', 'Card 8', 'Card 9', 'Card 10',
];

dealCards(players, deck2);
console.log(players);

//----------------------- Function to draw a card from the draw pile--------------------------------
function drawCard(playerHand, drawPile) {
  if (drawPile.length === 0) {
    console.log('Draw pile is empty.');
    return null;
  }
  const card = drawPile.pop();
  playerHand.push(card);
  return card;
}
const playerHand2 = [];
const drawPile1 = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Diamonds', value: '5' },
  { suit: 'Clubs', value: '10' }
];

const drawnCard = drawCard(playerHand2, drawPile1);
console.log('Drawn Card:', drawnCard);
console.log('Player Hand:', playerHand2);
console.log("ghoos");
console.log('Draw Pile:', drawPile1);

//---------------------------------- Function to discard a card-------------------------------------

function discardCard(playerHand, cardToDiscard, discardPile) {
  const index = playerHand.indexOf(cardToDiscard);
  if (index !== -1) {
    playerHand.splice(index, 1); // Remove the card from the player's hand
    discardPile.push(cardToDiscard); // Add the card to the discard pile
  }
}
const playerHand1 = [{ suit: 'Hearts', value: '2' }, { suit: 'Diamonds', value: '5' }, { suit: 'Clubs', value: '10' }];
const discardPile2 = [];

discardCard(playerHand1, { suit: 'Diamonds', value: '5' }, discardPile2);
console.log('Player Hand:', playerHand1);
console.log('Discard Pile:', discardPile2);


//------------------------ Function to take a card from the discard pile------------------------------

function takeFromDiscardPile(playerName, playerHand, discardPile) {
  if (discardPile.length > 0) {
    const takenCard = discardPile.pop();
    playerHand.push(takenCard);
    return takenCard;
  }
  return null;
}
const playerName = "santanu";
const playerHand = [];
const discardPile1 = [
  { value: '2', suit: 'Hearts' },
  { value: '5', suit: 'Diamonds' },
  { value: '8', suit: 'Clubs' },
];
// // Run the takeFromDiscardPile function
const takenCard = takeFromDiscardPile(playerName, playerHand, discardPile1);

if (takenCard) {
  console.log(playerName + ' took a card from the discard pile.');
  console.log(playerName + '\'s hand:', playerHand);
  console.log('Updated discard pile:', discardPile1);
} else {
  console.log('The discard pile is empty. Cannot take a card.');
}

//--------------------------------- Function to display a player's hand--------------------------------

function displayHand(playerName, playerHand) {
  console.log(`${playerName}'s hand:`);
  for (const card of playerHand) {
    console.log(`${card.suit} ${card.value}`);
  }
}
// Sample player name and hand
const playerNames = "Bikash";
const playerHands = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Diamonds', value: '5' },
  { suit: 'Clubs', value: '8' },
];

// Display the player's hand in the console
displayHand(playerNames, playerHands);



//-------------------------- Function to check if a sequence of cards is valid--------------------------

function isValidSequence(cards) {
  const suits = new Set(cards.map(card => card.suit));

  if (suits.size !== 1) {
    return false; // All cards must have the same suit for a sequence
  }

  const values = cards.map(card => card.value);
  const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

  for (let i = 0; i < values.length - 1; i++) {
    const currentRankIndex = rankOrder.indexOf(values[i]);
    const nextRankIndex = rankOrder.indexOf(values[i + 1]);

    if (nextRankIndex !== currentRankIndex + 1) {
      return false; // Cards are not in consecutive order
    }
  }

  return true;
}
const cards = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Hearts', value: '3' },
  { suit: 'Hearts', value: '4' },
];

const isValid = isValidSequence(cards);
console.log('Is the sequence valid?', isValid);



//------------------------ Function to check if a set of cards is valid------------------------------

function isValidSet(cards) {
  const ranks = new Set(cards.map(card => card.value));

  if (ranks.size !== 1) {
    return false; // All cards must have the same rank for a set
  }

  return true;
}
const cards4 = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Diamonds', value: '2' },
  { suit: 'Clubs', value: '2' },
];

const isValid1 = isValidSet(cards4);
console.log('Is the set valid?', isValid1);



//----------------------Function to check if a meld (sequence or set) is valid-------------------------


function isValidMeld(playerHand) {
  // Separate cards into sequences and sets
  const sequences = [];
  const sets = [];

  playerHand.sort((a, b) => {
    if (a.suit !== b.suit) {
      return a.suit.localeCompare(b.suit);
    } else {
      return a.value.localeCompare(b.value);
    }
  });

  let currentMeld = [playerHand[0]];

  for (let i = 1; i < playerHand.length; i++) {
    if (playerHand[i].value === playerHand[i - 1].value) {
      currentMeld.push(playerHand[i]);
    } else {
      if (currentMeld.length >= 3) {
        if (isValidSequence(currentMeld)) {
          sequences.push(currentMeld);
        } else if (isValidSet(currentMeld)) {
          sets.push(currentMeld);
        }
      }
      currentMeld = [playerHand[i]];
    }
  }

  if (currentMeld.length >= 3) {
    if (isValidSequence(currentMeld)) {
      sequences.push(currentMeld);
    } else if (isValidSet(currentMeld)) {
      sets.push(currentMeld);
    }
  }

  // Check if the player's hand is valid
  return sequences.length > 0 || sets.length > 0;
}

// Example player hand with cards
const playerHand3 = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Hearts', value: '3' },
  { suit: 'Hearts', value: '4' },
  { suit: 'Spades', value: '4' },
  { suit: 'Spades', value: '5' },
  { suit: 'Spades', value: '6' },
  { suit: 'Diamonds', value: '10' },
  { suit: 'Diamonds', value: 'Jack' },
  { suit: 'Diamonds', value: 'Queen' },
  { suit: 'Clubs', value: '8' },
];

// Call the isValidMeld function with the player's hand
const isMeldValid = isValidMeld(playerHand3);

console.log(`Is the meld valid? ${isMeldValid ? 'Yes' : 'No'}`);

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

module.exports = {
  initializeDeck,
  shuffleDeck,
  dealCards,
  drawCard,
  discardCard,
  takeFromDiscardPile,
  displayHand,
  isValidSequence,
  isValidSet,
  isValidMeld,
};
