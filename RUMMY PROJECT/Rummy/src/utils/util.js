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

// // Function to deal Rummy cards
// function dealCards(players, deck) {
//   // Shuffle the deck before dealing
//   shuffleDeck(deck);

//   const numPlayers = players.length;
//   const numCardsPerPlayer = numPlayers === 2 ? 10 : 7;

//   // Initialize draw pile with the remaining cards  in face-down the cards
//   const drawPile = deck.slice(numCardsPerPlayer * numPlayers);
//   console.log("drawPile");

//   // Deal cards to each player
//   for (let i = 0; i < numCardsPerPlayer; i++) {
//     for (let j = 0; j < numPlayers; j++) {
//       players[j].hand.push(deck[i + numCardsPerPlayer * j]);
//     }
//   }

//   return drawPile;
// }

// const players = [
//   { name: 'Rakesh', hand: [] },
//   { name: 'Rajesh', hand: [] },
// ];

// const deck3 = [
//   'Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5',
//   'Card 6', 'Card 7', 'Card 8', 'Card 9', 'Card 10',
//   'Card 11', 'Card 12', 'Card 13', 'Card 14', 'Card 15',
//   'Card 16', 'Card 17', 'Card 18', 'Card 19', 'Card 20',
// ];

// const drawPile = dealCards(players, deck3);

// console.log('Players:', players);
// console.log('Draw Pile:', drawPile);

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
// const playerNames = "Bikash";
// const playerHands = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '5' },
//   { suit: 'Clubs', value: '8' },
// ];

// // Display the player's hand in the console
// displayHand(playerNames, playerHands);



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
//         if (isValidSequence(currentMeld)) {
//           sequences.push(currentMeld);
//         } else if (isValidSet(currentMeld)) {
//           sets.push(currentMeld);
//         }
//       }
//       currentMeld = [playerHand[i]];
//     }
//   }

//   if (currentMeld.length >= 3) {
//     if (isValidSequence(currentMeld)) {
//       sequences.push(currentMeld);
//     } else if (isValidSet(currentMeld)) {
//       sets.push(currentMeld);
//     }
//   }

//   // Check if the player's hand is valid
//   return sequences.length > 0 || sets.length > 0;
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

// // // Function for a player's turn
// // function playerTurn(playerName, playerHand, drawPile, discardPile) {
// //   console.log(`${playerName}'s turn:`);
// //   displayHand(playerName, playerHand);

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

// //     // Check if the player has won (empty hand)
// //     if (playerHand.length === 0) {
// //       console.log(`${playerName} has won the game!`);
// //       process.exit(); // Exit the game
// //     }
// //   }
// // }

// // // Main game loop
// // let currentPlayerIndex = 0;
// // let drawPile = deck;
// // const discardPile = [];

// // while (drawPile.length > 0) {
// //   const currentPlayer = players[currentPlayerIndex];
// //   playerTurn(currentPlayer.name, currentPlayer.hand, drawPile, discardPile);
// //   currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
// // }

// // console.log('It\'s a draw!');

// module.exports = {
//   initializeDeck,
//   shuffleDeck,
//   dealCards,
//   drawCard,
//   discardCard,
//   takeFromDiscardPile,
//   displayHand,
//   isValidSequence,
//   isValidSet,
//   isValidMeld,
// };




//------------------------------------ Main Game Logic -----------------------------------------------

const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

const GameStates = {
  NOT_STARTED: 'NOT_NOT_STARTED',
  STARTED: 'STARTED',
  ENDED: 'ENDED',
};

function initializeDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}
// Testing code to display the output of initializeDeck
const deck = initializeDeck();
console.log(deck);

//--------------------------------------------- shuffleDeck -------------------------------------

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Testing code to display the output of shuffleDeck
const sampleDeck = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Diamonds', value: '3' },
  { suit: 'Clubs', value: '4' },
  { suit: 'Spades', value: '5' },
  // Add more cards here
];

shuffleDeck(sampleDeck);
console.log(sampleDeck);

//--------------------------------------------- dealCards ----------------------------------------------

function dealCards(players, deck) {
  shuffleDeck(deck);

  const numPlayers = players.length;
  const numCardsPerPlayer = numPlayers === 2 ? 10 : 7;

  const drawPile = deck.slice(numCardsPerPlayer * numPlayers);
  const faceDownPile = deck.slice(0, numCardsPerPlayer * numPlayers);

  for (let i = 0; i < numCardsPerPlayer; i++) {
    for (let j = 0; j < numPlayers; j++) {
      players[j].hand.push(deck[i + numCardsPerPlayer * j]);
    }
  }

  return { drawPile, faceDownPile };
}

// Sample testing code
const players = [
  { name: "Rakesh", hand: [] },
  { name: "Rajesh", hand: [] }
];

const deck1 = [
  // Add your deck of cards here
  // For example: 'Card1', 'Card2', 'Card3', ...
  'Card1', 'Card2', 'Card3', 'Card4', 'Card5', 'Card6', 'Card7',
  'Card8', 'Card9', 'Card10', 'Card11', 'Card12', 'Card13', 'Card14',
  'Card15', 'Card16', 'Card17', 'Card18', 'Card19', 'Card20'
];

const result = dealCards(players, deck1);

console.log("Draw Pile:", result.drawPile);
console.log("Face Down Pile:", result.faceDownPile);

players.forEach((player, index) => {
  console.log(`${player.name}'s hand:`, player.hand);
});

//------------------------------------------ drawCard ------------------------------------------

function drawCard(playerHand, drawPile) {
  if (drawPile.length === 0) {
    console.log('Draw pile is empty.');
    return null;
  }
  const card = drawPile.pop();
  playerHand.push(card);
  return card;
}

// Sample testing code
const drawPile = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'];
const playerHand = [];

console.log('Before drawing a card:');
console.log('Draw Pile:', drawPile);
console.log('Player Hand:', playerHand);

const drawnCard = drawCard(playerHand, drawPile);

if (drawnCard !== null) {
  console.log('Card drawn:', drawnCard);
}

console.log('After drawing a card:');
console.log('Draw Pile:', drawPile);
console.log('Player Hand:', playerHand);

//-------------------------------------------- drawFromFaceDownPile --------------------------------

function drawFromFaceDownPile(playerHand, faceDownPile) {
  if (faceDownPile.length === 0) {
    console.log('Face-down pile is empty.');
    return null;
  }
  const card = faceDownPile.pop();
  playerHand.push(card);
  return card;
}

// Sample testing code
const faceDownPile = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'];
const playerHand1 = [];

console.log('Before drawing from face-down pile:');
console.log('Face-down Pile:', faceDownPile);
console.log('Player Hand:', playerHand1);

const drawnCard1 = drawFromFaceDownPile(playerHand, faceDownPile);

if (drawnCard !== null) {
  console.log('Card drawn from face-down pile:', drawnCard1);
}

console.log('After drawing from face-down pile:');
console.log('Face-down Pile:', faceDownPile);
console.log('Player Hand:', playerHand1);

//------------------------------------------- discardCard --------------------------------------------

function discardCard(playerHand, cardToDiscard, discardPile) {
  const index = playerHand.findIndex(
    card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
  );
  if (index !== -1) {
    playerHand.splice(index, 1);
    discardPile.push(cardToDiscard);
  }
}

const samplePlayerHand = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Diamonds', value: 'Ace' },
  { suit: 'Clubs', value: '5' },
  { suit: 'Spades', value: 'King' },
  // Add more cards here
];

const sampleDiscardPile = [];

const cardToDiscard = { suit: 'Hearts', value: '2' }; // Change this to the card you want to discard

discardCard(samplePlayerHand, cardToDiscard, sampleDiscardPile);

console.log("hiiii")
console.log('Updated Player Hand:', samplePlayerHand);
console.log('Updated Discard Pile:', sampleDiscardPile);

//--------------------------------------- discardToFaceDownPile ----------------------------------------

function discardToFaceDownPile(playerHand, cardToDiscard, faceDownPile) {
  const index = playerHand.findIndex(
    card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
  );
  if (index !== -1) {
    playerHand.splice(index, 1);
    faceDownPile.push(cardToDiscard);
  }
}

const playerHand2 = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Diamonds', value: 'Ace' },
  { suit: 'Clubs', value: '5' },
  { suit: 'Spades', value: 'King' },
  // Add more cards here
];

const faceDownPile2 = [];

const cardToDiscard2 = { suit: 'Hearts', value: '2' }; // Change this to the card you want to discard to face-down pile

discardToFaceDownPile(playerHand2, cardToDiscard2, faceDownPile2);

console.log('Updated Player Hand:', playerHand2);
console.log('Updated Face-Down Pile:', faceDownPile2);


//-------------------------------------------- initializeGame -------------------------------------------

function initializeGame(numPlayers) {
  if (numPlayers < 2 || numPlayers > 5) {
    console.log('Invalid number of players. The game supports 2 to 5 players.');
    return null;
  }

  const players = [];
  for (let i = 1; i <= numPlayers; i++) {
    players.push({ name: `Player ${i}`, hand: [] });
  }

  const deck = initializeDeck();
  const { drawPile, faceDownPile } = dealCards(players, deck);

  let currentPlayerIndex = 0;
  let currentPlayer = players[currentPlayerIndex];

  return { players, drawPile, faceDownPile, currentPlayerIndex, currentPlayer, state: GameStates.NOT_STARTED };
}

// Sample testing code
const numPlayers = 4; // Change the number of players as needed
const gameData = initializeGame(numPlayers);

if (gameData !== null) {
  console.log('Game Initialized:');
  console.log('Number of Players:', numPlayers);
  console.log('Current Player:', gameData.currentPlayer.name);
  console.log('Draw Pile:', gameData.drawPile);
  console.log('Face Down Pile:', gameData.faceDownPile);
  console.log('Players:');
  gameData.players.forEach((player, index) => {
    console.log(`  ${player.name}'s hand:`, player.hand);
  });
  console.log('Game State:', gameData.state);
}
//------------------------------------------ nextPlayer ------------------------------------------------

function nextPlayer(currentPlayerIndex, playerNames) {
  return (currentPlayerIndex + 1) % playerNames.length;
}

const playerNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4']; // Replace with your player names
let currentPlayerIndex = 0; // You can change this index to test different scenarios

const nextPlayerIndex = nextPlayer(currentPlayerIndex, playerNames);
const nextPlayerName = playerNames[nextPlayerIndex];

console.log(`Current Player: ${playerNames[currentPlayerIndex]}`);
console.log(`Next Player: ${nextPlayerName}`);


//========================================== displayHand ================================================

function displayHand(playerHands) {
  console.log("Player's Hand:");
  for (const card of playerHands) {
    console.log(`${card.value} of ${card.suit}`);
  }
}

// Example data for testing displayHand function
const playerHands = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Diamonds', value: '7' },
  { suit: 'Clubs', value: 'King' },
];

// Call the displayHand function with the example data
displayHand(playerHands);

//------------------------------------------ isValidSequence -------------------------------------------

function isValidSequence(cards) {
  const sortedCards = [...cards].sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
  let prevValue = -1;
  for (const card of sortedCards) {
    const valueIndex = values.indexOf(card.value);
    if (prevValue === -1) {
      prevValue = valueIndex;
    } else if (valueIndex !== prevValue + 1) {
      return false;
    }
    prevValue = valueIndex;
  }
  return true;
}

// Example usage of isValidSequence function within your game logic
const playerHand3 = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Hearts', value: '3' },
  { suit: 'Hearts', value: '4' },
];

if (isValidSequence(playerHand3)) {
  console.log("Valid Sequence!");
} else {
  console.log("Not a valid Sequence.");
}


//-------------------------------------------- isValidSet ---------------------------------------------

function isValidSet(cards) {
  const uniqueValues = new Set();
  for (const card of cards) {
    uniqueValues.add(card.value);
  }
  return uniqueValues.size === 1;
}

// Example usage of isValidSet function within your game logic
const playerHand4 = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Diamonds', value: '2' },
  { suit: 'Clubs', value: '2' },
];

if (isValidSet(playerHand4)) {
  console.log("Valid Set!");
} else {
  console.log("Not a valid Set.");
}

//--------------------------------------------- isValidMeld ---------------------------------------------

// function isValidMeld(cards) {
//   return isValidSequence(cards) || isValidSet(cards);
// }

function isValidMeld(cards) {
  const isSequence = isValidSequence(cards);
  const isSet = isValidSet(cards);
  
  if (isSequence || isSet) {
    return true;
  } else {
    return false;
  }
}

const cards = [
  { suit: 'Hearts', value: '2' },
  { suit: 'Diamonds', value: '2' },
  { suit: 'Clubs', value: '2' },
];

if (isValidMeld(cards)) {
  console.log("Valid Meld!");
} else {
  console.log("Not a valid Meld.");
}


//----------------------------------------------- calculateCardScore ------------------------------------

function calculateCardScore(card) {
  const value = card.value;
  const isFaceCard = ['Jack', 'Queen', 'King'].includes(value);
  const isHighValueCard = ['10', 'Jack', 'Queen', 'King', 'Ace'].includes(value);
  const score = isFaceCard ? 10 : isHighValueCard ? 5 : parseInt(value);
  return score;
}

const card = { suit: 'Hearts', value: '3' }; // Replace with your card object

const score = calculateCardScore(card);

console.log(`Card Score: ${score}`);

//------------------------------------------ calculateHandScore ------------------------------------------

function calculateHandScore(playerHand) {
  let totalScore = 0;

  for (const card of playerHand) {
    totalScore += calculateCardScore(card);
  }

  return totalScore;
}

const playerHand5 = [
  { suit: 'Hearts', value: 'Queen' },
  { suit: 'Diamonds', value: 'King' },
  { suit: 'Clubs', value: '4' },
  // Add more cards as needed
];

const totalScore = calculateHandScore(playerHand5);

console.log(`Total Score: ${totalScore}`);


//------------------------------------------ checkWinning -----------------------------------------------

// function checkWinning(player) {
//   const allMelds = [];

//   function findAllMelds(hand, currentMeld) {
//     if (isValidMeld(currentMeld)) {
//       allMelds.push([...currentMeld]);
//     }
//     for (let i = 0; i < hand.length; i++) {
//       const card = hand[i];
//       currentMeld.push(card);
//       const remainingHand = [...hand.slice(0, i), ...hand.slice(i + 1)];
//       findAllMelds(remainingHand, currentMeld);
//       currentMeld.pop();
//     }
//   }

//   findAllMelds(player.hand, []);

//   const allPlayerCards = new Set(player.hand);
//   for (const meld of allMelds) {
//     const meldSet = new Set(meld);
//     if (meldSet.size === allPlayerCards.size) {
//       return true;
//     }
//   }

//   return false;
// }

// const player = {
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Hearts', value: '3' },
//     { suit: 'Hearts', value: '4' },
//     { suit: 'Diamonds', value: '10' },
//     { suit: 'Diamonds', value: 'Jack' },
//     { suit: 'Diamonds', value: 'Queen' },
//     { suit: 'Diamonds', value: 'King' },
//     { suit: 'Diamonds', value: 'Ace' },
//     // Add more cards as needed
//   ],
// };

// const isWinner = checkWinning(player);

// if (isWinner) {
//   console.log("Player has a winning hand!");
// } else {
//   console.log("Player does not have a winning hand.");
// }

function checkWinning(player) {
  const allMelds = [];

  function findValidMelds(hand, currentMeld) {
    if (isValidMeld(currentMeld)) {
      allMelds.push([...currentMeld]);
    }

    if (hand.length === 0) {
      return;
    }

    for (let i = 0; i < hand.length; i++) {
      const card = hand[i];
      // Try adding the card to the current meld
      currentMeld.push(card);
      const remainingHand = [...hand.slice(0, i), ...hand.slice(i + 1)];

      // Recursively find valid melds with the remaining cards
      findValidMelds(remainingHand, currentMeld);

      // Remove the last added card to explore other combinations
      currentMeld.pop();
    }
  }

  findValidMelds(player.hand, []);

  // Check if all player cards are part of a valid meld
  const allPlayerCards = new Set(player.hand);
  for (const meld of allMelds) {
    const meldSet = new Set(meld);
    if (meldSet.size === allPlayerCards.size) {
      return true;
    }
  }

  return false;
}

const player = {
  hand: [
    { suit: 'Hearts', value: '2' },
    { suit: 'Hearts', value: '3' },
    { suit: 'Hearts', value: '4' },
    { suit: 'Diamonds', value: '10' },
    { suit: 'Diamonds', value: 'Jack' },
    { suit: 'Diamonds', value: 'Queen' },
    { suit: 'Diamonds', value: 'King' },
    { suit: 'Diamonds', value: 'Ace' },
    // Add more cards as needed
  ],
};

const isWinner = checkWinning(player);

if (isWinner) {
  console.log("Player has a winning hand!");
} else {
  console.log("Player does not have a winning hand.");
}


//------------------------------------------ simulatePlayerTurn ----------------------------------------

function simulatePlayerTurn(player, drawPile, faceDownPile) {
  console.log(`It's ${player.name}'s turn`);
  displayHand(player.hand);

  if (checkWinning(player)) {
    console.log(`${player.name} has won the game!`);
    return true;
  }

  const drawnCard = drawCard(player.hand, drawPile);
  if (drawnCard) {
    console.log(`${player.name} draws a card from the draw pile: ${drawnCard.value} of ${drawnCard.suit}`);
  }

  const drawnFaceDownCard = drawFromFaceDownPile(player.hand, faceDownPile);
  if (drawnFaceDownCard) {
    console.log(`${player.name} draws a card from the face-down pile: ${drawnFaceDownCard.value} of ${drawnFaceDownCard.suit}`);
  }

  const cardToDiscard = player.hand[0];
  discardToFaceDownPile(player.hand, cardToDiscard, faceDownPile);
  console.log(`${player.name} discards to the face-down pile: ${cardToDiscard.value} of ${cardToDiscard.suit}`);

  return false;
}

//----------------------------------------- startGameWithPlayers -----------------------------------------

function startGameWithPlayers(numPlayers) {
  const game = initializeGame(numPlayers);
  game.state = GameStates.STARTED;

  if (!game) {
    return;
  }

  let gameEnded = false;

  while (!gameEnded) {
    const currentPlayer = game.players[game.currentPlayerIndex];

    displayHand(currentPlayer.hand);

    if (checkWinning(currentPlayer)) {
      console.log(`${currentPlayer.name} has won the game!`);
      gameEnded = true;
    }

    gameEnded = simulatePlayerTurn(currentPlayer, game.drawPile, game.faceDownPile) || gameEnded;

    game.currentPlayerIndex = nextPlayer(game.currentPlayerIndex, game.players);
  }

  calculateAndDisplayScores(game.players);
  game.state = GameStates.ENDED;
}

//----------------------------------------------- joinGame ----------------------------------------------

function joinGame(game, playerName) {
  if (game.state === GameStates.NOT_STARTED) {
    game.players.push({ name: playerName, hand: [] });
    console.log(`${playerName} has joined the game.`);
  } else {
    console.log('Cannot join the game. It has already started.');
  }
}

//--------------------------------------------- rejoinGame -----------------------------------------------

function rejoinGame(game, playerName) {
  if (game.state === GameStates.NOT_STARTED) {
    const existingPlayer = game.players.find(player => player.name === playerName);
    if (existingPlayer) {
      console.log(`${playerName} has rejoined the game.`);
    } else {
      console.log('Cannot rejoin the game. Player not found.');
    }
  } else {
    console.log('Cannot rejoin the game. It has already started.');
  }
}

//-------------------------------------------- rejoinGame -----------------------------------------------

function endGame(game) {
  if (game.state === GameStates.STARTED) {
    console.log('The game has been ended.');
    game.state = GameStates.ENDED;
  } else {
    console.log('The game is not currently in progress.');
  }
}

//--------------------------------------------- leaveGame -----------------------------------------------

function leaveGame(game, playerName) {
  if (game.state === GameStates.NOT_STARTED) {
    const playerIndex = game.players.findIndex(player => player.name === playerName);
    if (playerIndex !== -1) {
      game.players.splice(playerIndex, 1);
      console.log(`${playerName} has left the game.`);
    } else {
      console.log('Player not found in the game.');
    }
  } else {
    console.log('Cannot leave the game. It has already started.');
  }
}

const game1 = {
  players: [{ name: 'Player 1' }, { name: 'Player 2' }],
  state: GameStates.NOT_STARTED,
};

leaveGame(game1, 'Player 2');

//----------------------------------------- continuePreviousGame -----------------------------------------

function continuePreviousGame(game, playerName) {
  if (game.state === GameStates.ENDED) {
    const player = game.players.find(player => player.name === playerName);
    if (player) {
      game.state = GameStates.STARTED;
      console.log(`${playerName} has chosen to continue the previous game.`);
    } else {
      console.log('Cannot continue the previous game. Player not found.');
    }
  } else {
    console.log('Cannot continue the previous game. The game is not ended.');
  }
}


const games = {
  players: [{ name: 'Player 1' }, { name: 'Player 2' }],
  state: GameStates.ENDED,
};

continuePreviousGame(games, 'Player 2');


//------------------------------------------- startNewGame ----------------------------------------------

function startNewGame(game) {
  if (game.state === GameStates.ENDED) {
    game.players = [];
    game.state = GameStates.NOT_STARTED;
    console.log('A new game has started.');
  } else {
    console.log('Cannot start a new game. The previous game is not ended.');
  }
}

//Testing
const game = {
  players: ['Player 1', 'Player 2'],
  state: GameStates.ENDED,
};

startNewGame(game);

//---------------------------------------- calculateAndDisplayScores ------------------------------------

function calculateAndDisplayScores(players3) {
  for (const player of players3) {
    const score = calculateHandScore(player.hand);
    console.log(`${player.name}'s score: ${score}`);
  }
}

const players3 = [
  {
    name: 'Player 1',
    hand: [
      { suit: 'Hearts', value: '2' },
      { suit: 'Hearts', value: '3' },
      { suit: 'Hearts', value: '4' },
      { suit: 'Diamonds', value: '10' },
      // Add more cards as needed
    ],
  },
  {
    name: 'Player 2',
    hand: [
      { suit: 'Clubs', value: '5' },
      { suit: 'Diamonds', value: 'Jack' },
      { suit: 'Hearts', value: 'Queen' },
      { suit: 'Spades', value: 'Ace' },
      // Add more cards as needed
    ],
  },
  // Add more players as needed
];

calculateAndDisplayScores(players3);


//--------------------------------------------- Functions Exportation ------------------------------------

module.exports = {
  initializeDeck,
  shuffleDeck,
  dealCards,
  drawCard,
  drawFromFaceDownPile,
  discardCard,
  discardToFaceDownPile,
  initializeGame,
  nextPlayer,
  displayHand,
  isValidSequence,
  isValidSet,
  isValidMeld,
  calculateCardScore,
  calculateHandScore,
  checkWinning,
  simulatePlayerTurn,
  startGameWithPlayers,
  joinGame,
  rejoinGame,
  endGame,
  leaveGame,
  continuePreviousGame,
  startNewGame,
};

