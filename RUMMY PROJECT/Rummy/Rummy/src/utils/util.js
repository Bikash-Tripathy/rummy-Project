




//------------------------------------ Main Game Logic -----------------------------------------------

// const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
// const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// const GameStates = {
//   NOT_STARTED: 'NOT_NOT_STARTED',
//   STARTED: 'STARTED',
//   ENDED: 'ENDED',
// };

// function initializeDeck() {
//   const deck = [];
//   for (const suit of suits) {
//     for (const value of values) {
//       deck.push({ suit, value });
//     }
//   }
//   return deck;
// }
// // Testing code to display the output of initializeDeck
// const deck = initializeDeck();
// console.log(deck);

// //--------------------------------------------- shuffleDeck -------------------------------------

// function shuffleDeck(deck) {
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck[i], deck[j]] = [deck[j], deck[i]];
//   }
// }

// // Testing code to display the output of shuffleDeck
// const sampleDeck = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '3' },
//   { suit: 'Clubs', value: '4' },
//   { suit: 'Spades', value: '5' },
//   // Add more cards here
// ];

// shuffleDeck(sampleDeck);
// console.log(sampleDeck);

// //--------------------------------------------- dealCards ----------------------------------------------

// // function dealCards(players, deck) {
// //   shuffleDeck(deck);
// //   console.log()

// //   const flattened = Object.entries(players).flatMap(([key, value]) => {
// //     players[key].hand = []
// //     return [{ id: key, ...value }]
// //     });
// //   const numPlayers = flattened.length;
// //   const numCardsPerPlayer = (numPlayers === 2) ? 10 : 7;

// //   let faceDownPile = [];
// //   let tempDeck = [...deck]; // Original deck ko modify na karne ke liye ek temporary deck banaya gaya hai.

// //   // Khiladiyon ko cards baantne ka kaam
// //   for (let i = 0; i < numCardsPerPlayer * numPlayers; i++) {
// //     let selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];

// //     let playerIndex = flattened[i % numPlayers].id // Determine the current player
// //     let validCard = false;
// //     console.log(players);
// //     while (!validCard) {
// //       if (
// //         !players[playerIndex].hand.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value) &&
// //         !faceDownPile.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value)
// //       ) {
// //         validCard = true;
// //       } else {
// //         selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];
// //       }
// //     }

// //     players[playerIndex].hand.push(selectedCard);
// //     tempDeck = tempDeck.filter(
// //       (card) => card.suit !== selectedCard.suit || card.value !== selectedCard.value
// //     );
// //   }

// //   faceDownPile = tempDeck; // Bachi hui cards ko faceDownPile mein daala gaya hai.

// //    //faceUpPile = [];
// //    console.log("deal cards",players)

// //   return { faceDownPile };
// // }

// // const players = {
// //   '1':{
// //     name:'',
// //     hand:[]
// //   },
// //   '2':{
// //     name:'',
// //     hand:[]
// //   },

// // }

// // const deck1 = initializeDeck();

// // const result = dealCards(players, deck1);

// // // Display the output
// // console.log("Face Down Pile:");
// // console.log(result.faceDownPile);

// // console.log("Face Up Pile (Initially Empty):");
// // console.log(result.faceUpPile);

// // players.forEach((player) => {
// //   console.log(`${player.name}'s hand:`);
// //   console.log(player.hand);
// // });


// function dealCards(players, deck) {
//   shuffleDeck(deck);

//   const numPlayers = players.length;
//   const numCardsPerPlayer = (numPlayers === 2) ? 10 : 7;

//   let faceDownPile = [];
//   let tempDeck = [...deck]; // Original deck ko modify na karne ke liye ek temporary deck banaya gaya hai.

//   // Khiladiyon ko cards baantne ka kaam
//   for (let i = 0; i < numCardsPerPlayer * numPlayers; i++) {
//     let selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];

//     let playerIndex = i % numPlayers; // Determine the current player
//     let validCard = false;

//     while (!validCard) {
//       if (
//         !players[playerIndex].hand.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value) &&
//         !faceDownPile.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value)
//       ) {
//         validCard = true;
//       } else {
//         selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];
//       }
//     }

//     players[playerIndex].hand.push(selectedCard);
//     tempDeck = tempDeck.filter(
//       (card) => card.suit !== selectedCard.suit || card.value !== selectedCard.value
//     );
//   }

//   faceDownPile = tempDeck; // Bachi hui cards ko faceDownPile mein daala gaya hai.

//    //faceUpPile = [];

//   return { faceDownPile };
// }

// const players = [
//   { name: "Rakesh", hand: [] },
//   { name: "Rajesh", hand: [] }
// ];

// const deck1 = initializeDeck();

// const result = dealCards(players, deck1);

// // Display the output
// console.log("Face Down Pile:");
// console.log(result.faceDownPile);

// console.log("Face Up Pile (Initially Empty):");
// console.log(result.faceUpPile);

// players.forEach((player) => {
//   console.log(`${player.name}'s hand:`);
//   console.log(player.hand);
// });

// //------------------------------------------ drawCard -------------------------------------------------

// // function drawCard(playerHand, faceDownPile, faceUpPile) {
// //   if (!faceDownPile || (faceUpPile && faceUpPile.length > 0)) {
// //     let drawnCard;

// //     if (faceUpPile.length == 0) {
// //       // If the face up pile has cards, draw from there first
// //       drawnCard = faceDownPile.pop();
// //     } else if (faceDownPile.length == 0) {
// //       // If the face up pile is empty, draw from the face down pile
// //       drawnCard = faceUpPile.pop();
// //     }

// //     if (drawnCard) {
// //       playerHand.push(drawnCard);
// //       return drawnCard;
// //     }
// //   }

// //   console.log('Both face down pile and face up pile are empty. Cannot draw a card.');
// //   return null;
// // }

// // function drawCard(playerHand, faceDownPile, faceUpPile) {
// //   if (faceDownPile.length > 0) {
// //     const drawnCard = faceDownPile.pop();
// //     playerHand.push(drawnCard);

// //     if (faceUpPile.length === 0) {
// //       // If the face-up pile is empty, draw from the face-down pile and update the count
// //       const drawnCardFromFaceDown = faceDownPile.pop();
// //       playerHand.push(drawnCardFromFaceDown);
// //     }

// //     return drawnCard;
// //   } else {
// //     console.log('Face down pile is empty. Cannot draw a card.');
// //     return null;
// //   }
// // }

// // function drawCard(playerHand, faceDownPile, faceUpPile) {
// //   if (faceDownPile.length > 0) {
// //     const drawnCard = faceDownPile.pop();
// //     playerHand.push(drawnCard);

// //     if (faceDownPile.length > 0) {
// //       // If there are more cards in the face-down pile, draw one card from the face-down pile
// //       const drawnCardFromFaceDown = faceDownPile.pop();
// //       playerHand.push(drawnCardFromFaceDown);
// //     }

// //     return drawnCard;
// //   } else {
// //     console.log('Face down pile is empty. Cannot draw a card.');
// //     return null;
// //   }
// // }


// function drawCard(playerHand, faceDownPile, faceUpPile) {
//   if (faceDownPile.length > 0) {
//     // Draw one card from the face-down pile
//     const drawnCard = faceDownPile.pop();
//     playerHand.push(drawnCard);

//     if (faceUpPile.length === 0 && faceDownPile.length > 0) {
//       // If the face-up pile is empty and there are more cards in the face-down pile, draw one more card
//       const drawnCardFromFaceDown = faceDownPile[faceDownPile.length - 1];
//       playerHand.push(drawnCardFromFaceDown);
//       faceDownPile.pop(); // Remove the same card from the face-down pile
//     }

//     return drawnCard;
//   } else {
//     console.log('Face down pile is empty. Cannot draw a card.');
//     return null;
//   }
// }




// const playerHand = [ 
// { suit: 'Clubs', value: 'King' },
// { suit: 'Spades', value: '2' },
// { suit: 'Spades', value: 'King' },
// { suit: 'Spades', value: '8' },
// ]; // Initialize the player's hand
// const faceDownPiles = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: 'Ace' },
//   { suit: 'Clubs', value: '5' },
//   { suit: 'Hearts', value: '6' }
// ];

// const faceUpPile = []; // Initialize the face up pile as an empty array

// console.log('Before drawing a card:');
// console.log('Player Hand:', playerHand);
// console.log('Face Down Pile:', faceDownPiles);
// console.log('Face Up Pile:', faceUpPile);

// const drawnCard = drawCard(playerHand, faceDownPiles, faceUpPile);

// if (drawnCard !== null) {
//   console.log('Card drawn:', drawnCard);
// }

// console.log('After drawing a card:');
// console.log('Player Hand:', playerHand);
// console.log('Face Down Pile:', faceDownPiles);
// console.log('Face Up Pile:', faceUpPile);


// //------------------------------------------- discardCard --------------------------------------------

// function discardCard(playerHand, cardToDiscard, faceUpPile) {
//   const index = playerHand.findIndex(
//     (card) => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//   );
//   if (index !== -1) {
//     playerHand.splice(index, 1);
//     faceUpPile.push(cardToDiscard);
//   }
// }   

// // Initialize player's hand, face up pile, and a card to discard
// const playerHand6 = [{ suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: 'Ace' },
//   { suit: 'Clubs', value: '5' },
//    { suit: 'Spades', value: 'King' },]; // Assume player has these cards
// const faceUpPile1 = [6, 7, 8]; // Assume face up pile has these cards
// const cardToDiscard = { suit: 'Clubs', value: '5' }; // Change this to the card you want to discard

// // Call the `discardCard` function
// discardCard(playerHand6, cardToDiscard, faceUpPile1);

// // Display the output
// console.log("Player's Hand After Discarding:");
// console.log(playerHand6);

// console.log("Face Up Pile After Discarding:");
// console.log(faceUpPile1);

// //-------------------------------------------- initializeGame -------------------------------------------

// // function initializeGame(playerIds) {
// //   const numPlayers = playerIds.length
// //   if (numPlayers < 2 || numPlayers > 5) {
// //     console.log('Invalid number of players. The game supports 2 to 5 players.');
// //     return null;
// //   }
// //   const players = {};
// //   playerIds.forEach(id=>{
// //     players[id]={name:`player ${id}`, hand:[]}
// //   })


// //   const deck = initializeDeck();
// //   console.log('initialize :',deck);
// //   const { drawPile, faceDownPile } = dealCards(players, deck);

// //   let currentPlayerIndex = 0;
// //   let currentPlayer = players[currentPlayerIndex];
// //   const faceUpPile = []

// //   return { players, drawPile, faceDownPile,faceUpPile, currentPlayerIndex, currentPlayer, state: GameStates.NOT_STARTED };
// // }

// // // Sample testing code
// // const numPlayers = 4; // Change the number of players as needed
// // const gameData = initializeGame(['1','2']);

// // if (gameData !== null) {
// //   console.log('Game Initialized:');
// //   console.log('Number of Players:', numPlayers);
// //   console.log('Current Player:', gameData.currentPlayer);
// //   console.log('Draw Pile:', gameData.drawPile);
// //   console.log('Face Down Pile:', gameData.faceDownPile);
// //   console.log('Players:');
// //  console.log( gameData.players);
// //   console.log('Game State:', gameData.state);
// // }


// function initializeGame(numPlayers) {
//   if (numPlayers < 2 || numPlayers > 5) {
//     console.log('Invalid number of players. The game supports 2 to 5 players.');
//     return null;
//   }

//   const players = [];
//   for (let i = 1; i <= numPlayers; i++) {
//     players.push({ name: `Player ${i}`, hand: [] });
//   }

//   const deck = initializeDeck();
//   console.log('initialize :',deck);
//   const { drawPile, faceDownPile } = dealCards(players, deck);

//   let currentPlayerIndex = 0;
//   let currentPlayer = players[currentPlayerIndex];
//   const faceUpPile = []

//   return { players, drawPile, faceDownPile,faceUpPile, currentPlayerIndex, currentPlayer, state: GameStates.NOT_STARTED };
// }

// // Sample testing code
// const numPlayers = 4; // Change the number of players as needed
// const gameData = initializeGame(numPlayers);

// if (gameData !== null) {
//   console.log('Game Initialized:');
//   console.log('Number of Players:', numPlayers);
//   console.log('Current Player:', gameData.currentPlayer.name);
//   console.log('Draw Pile:', gameData.drawPile);
//   console.log('Face Down Pile:', gameData.faceDownPile);
//   console.log('Players:');
//   gameData.players.forEach((player, index) => {
//     console.log(`  ${player.name}'s hand:`, player.hand);
//   });
//   console.log('Game State:', gameData.state);
// }
// //------------------------------------------ nextPlayer ------------------------------------------------

// function nextPlayer(currentPlayerIndex, playerNames) {
//   return (currentPlayerIndex + 1) % playerNames.length;
// }

// const playerNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4']; // Replace with your player names
// let currentPlayerIndex = 0; // You can change this index to test different scenarios

// const nextPlayerIndex = nextPlayer(currentPlayerIndex, playerNames);
// const nextPlayerName = playerNames[nextPlayerIndex];

// console.log(`Current Player: ${playerNames[currentPlayerIndex]}`);
// console.log(`Next Player: ${nextPlayerName}`);


// //------------------------------------------ isValidSequence -------------------------------------------

// function isValidSequence(cards) {
//   const sortedCards = [...cards].sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
//   let prevValue = -1;
//   for (const card of sortedCards) {
//     const valueIndex = values.indexOf(card.value);
//     if (prevValue === -1) {
//       prevValue = valueIndex;
//     } else if (valueIndex !== prevValue + 1) {
//       return false;
//     }
//     prevValue = valueIndex;
//   }
//   return true;
// }

// // Example usage of isValidSequence function within your game logic
// const playerHand3 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Hearts', value: '3' },
//   { suit: 'Hearts', value: '4' },
// ];

// if (isValidSequence(playerHand3)) {
//   console.log("Valid Sequence!");
// } else {
//   console.log("Not a valid Sequence.");
// }


// //-------------------------------------------- isValidSet ---------------------------------------------

// function isValidSet(cards) {
//   const uniqueValues = new Set();
//   for (const card of cards) {
//     uniqueValues.add(card.value);
//   }
//   return uniqueValues.size === 1;
// }

// // Example usage of isValidSet function within your game logic
// const playerHand4 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '2' },
//   { suit: 'Clubs', value: '2' },
// ];

// if (isValidSet(playerHand4)) {
//   console.log("Valid Set!");
// } else {
//   console.log("Not a valid Set.");
// }

// // 
// //------------------------------------------ checkWinning -----------------------------------------------

// function checkWinning(player1, player2) {
//   const hand1 = [...player1.hand];
//   const hand2 = [...player2.hand];

//   // Sort the hands to make it easier to check for sets and sequences
//   hand1.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
//   hand2.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

//   // Variables to track the number of sets and sequences for each player
//   let setCount1 = 0;
//   let setCount2 = 0;
//   let sequenceCount1 = 0;
//   let sequenceCount2 = 0;

//   // Check for sets and sequences in each player's hand
//   for (let i = 0; i <= hand1.length - 3; i++) {
//     const currentSet = [hand1[i], hand1[i + 1], hand1[i + 2]];
//     if (isValidSet(currentSet)) {
//       setCount1++;
//       console.log(`Player 1 formed Set #${setCount1}:`, currentSet);
//     } else if (isValidSequence(currentSet)) {
//       sequenceCount1++;
//       console.log(`Player 1 formed Sequence #${sequenceCount1}:`, currentSet);
//     }
//   }

//   for (let i = 0; i <= hand2.length - 3; i++) {
//     const currentSet = [hand2[i], hand2[i + 1], hand2[i + 2]];
//     if (isValidSet(currentSet)) {
//       setCount2++;
//       console.log(`Player 2 formed Set #${setCount2}:`, currentSet);
//     } else if (isValidSequence(currentSet)) {
//       sequenceCount2++;
//       console.log(`Player 2 formed Sequence #${sequenceCount2}:`, currentSet);
//     }
//   }

//   // Calculate the scores for each player
//   const player1Score = calculateScore(hand1);
//   const player2Score = calculateScore(hand2);

//   // Determine the winner based on sets, sequences, and scores
//   if (setCount1 > setCount2) {
//     console.log("Player 1 wins with more sets!");
//     return `Player 1 wins with ${setCount1} sets, ${sequenceCount1} sequences, and a score of ${player1Score}!`;
//   } else if (setCount2 > setCount1) {
//     console.log("Player 2 wins with more sets!");
//     return `Player 2 wins with ${setCount2} sets, ${sequenceCount2} sequences, and a score of ${player2Score}!`;
//   } else {
//     console.log("No winner based on sets. Checking sequences and scores.");
//     if (sequenceCount1 > sequenceCount2) {
//       console.log("Player 1 wins with more sequences!");
//       return `Player 1 wins with ${sequenceCount1} sequences and a score of ${player1Score}!`;
//     } else if (sequenceCount2 > sequenceCount1) {
//       console.log("Player 2 wins with more sequences!");
//       return `Player 2 wins with ${sequenceCount2} sequences and a score of ${player2Score}!`;
//     } else {
//       console.log("No winner based on sets and sequences. Checking scores.");
//       if (player1Score > player2Score) {
//         return `Player 1 wins with a score of ${player1Score}!`;
//       } else if (player2Score > player1Score) {
//         return `Player 2 wins with a score of ${player2Score}!`;
//       } else {
//         return "It's a draw.";  
//       }
//     }
//   }
// }


// const player1 = {
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '2' },
//     { suit: 'Diamonds', value: '2' },
//   ],
// };

// const player2 = {
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '3' },
//     { suit: 'Diamonds', value: '4' },
    
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '2' },
//     { suit: 'Diamonds', value: '2' },
//   ]
// };
// const results = checkWinning(player1, player2);
// console.log(results);

// //====================================== simulatePlayerTurn =========================================

// // function simulatePlayerTurn(gameData) {
// //   const currentPlayer = gameData.currentPlayer;
// //   const currentPlayerIndex = gameData.currentPlayerIndex;

// //   console.log(`Current Player: ${currentPlayer.name}`);

// //   const turnTimeout = 10000;
// //   let timerExpired = false;

// //   const turnTimer = setTimeout(() => {
// //     console.log(`Player ${currentPlayer.name} ran out of time. Moving to the next player.`);
// //     timerExpired = true;

// //     // Simulate discarding a card if a card is in hand
// //     if (currentPlayer.hand.length > 0) {
// //       const cardToDiscard = currentPlayer.hand[0];
// //       discardCard(currentPlayer.hand, cardToDiscard, gameData.faceUpPile);
// //       console.log(`Player discards: ${cardToDiscard.suit} ${cardToDiscard.value}`);
// //     }

// //     // Check for a winning condition
// //     const winner = checkWinning(gameData.players[0], gameData.players[1]);
// //     if (winner !== "No winner yet.") {
// //       console.log(winner);

// //       const player1Score = calculateScore(gameData.players[0].hand);
// //       const player2Score = calculateScore(gameData.players[1].hand);

// //       console.log(`Player 1 Score: ${player1Score}`);
// //       console.log(`Player 2 Score: ${player2Score}`);
// //       gameData.state = GameStates.ENDED;
// //     } else {
// //       gameData.currentPlayerIndex = nextPlayer(currentPlayerIndex, gameData.players);
// //       gameData.currentPlayer = gameData.players[gameData.currentPlayerIndex];
// //       simulatePlayerTurn(gameData);
// //     }
// //   }, turnTimeout);

// //   const drawnCard = drawCard(currentPlayer.hand, gameData.drawPile, gameData.faceUpPile);
// //   if (drawnCard !== null) {
// //     console.log(`Player draws: ${drawnCard.suit} ${drawnCard.value}`);
// //     clearTimeout(turnTimer);
    
// //     // Call the winning condition after a card is drawn
// //     const winner = checkWinning(gameData.players[0], gameData.players[1]);
// //     if (winner !== "No winner yet.") {
// //       console.log(winner);

// //       const player1Score = calculateScore(gameData.players[0].hand);
// //       const player2Score = calculateScore(gameData.players[1].hand);

// //       console.log(`Player 1 Score: ${player1Score}`);
// //       console.log(`Player 2 Score: ${player2Score}`);
// //       gameData.state = GameStates.ENDED;
// //     } else {
// //       endPlayerTurn();
// //     }
// //   }

// //   if (timerExpired) {
// //     return;
// //   }
// // }

// // const numberPlayers = 2;
// // const gamesData = initializeGame(numberPlayers);

// // while (gamesData.state !== GameStates.ENDED) {
// //   simulatePlayerTurn(gamesData);
// // }

// // console.log("Game Ended!");



// //================================= calculate score in a function =====================================

// function calculateScore(hand) {
//   // Define a mapping of card values to their corresponding numerical values.
//   const valueMap = {
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
//     'Ace': 11, // You might need to handle Ace differently based on your game's rules
//   };

//   let score = 0;

//   for (const card of hand) {
//     const cardValue = card.value;
//     if (valueMap[cardValue]) {
//       score += valueMap[cardValue];
//     }
//   }

//   return score;
// }

// // Define hands of cards for two players
// const player1Hand = [
//   { value: '2' },
//   { value: 'King' },
//   { value: '7' },
//   { value: 'Ace' },
//   // Add more cards for Player 1 as needed
// ];

// const player2Hand = [
//   { value: '3' },
//   { value: 'Queen' },
//   { value: '5' },
//   { value: '10' },
//   // Add more cards for Player 2 as needed
// ];

// // Calculate the scores for both players
// const player1Score = calculateScore(player1Hand);
// const player2Score = calculateScore(player2Hand);

// // Log the results
// console.log('Player 1 Score:', player1Score);
// console.log('Player 2 Score:', player2Score);



// //--------------------------------------------- Functions Exportation ------------------------------------

// module.exports = {
//   initializeDeck,
//   shuffleDeck,
//   dealCards,
//   drawCard,
//   discardCard,
//   initializeGame,
//   nextPlayer,
//   isValidSequence,
//   isValidSet,
//   calculateScore,
//   checkWinning,
//   //simulatePlayerTurn,
  
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
// const deck = initializeDeck();
// console.log(deck);

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

// shuffleDeck(sampleDeck);
// console.log(sampleDeck);

//--------------------------------------------- dealCards ----------------------------------------------

function dealCards(players, deck) {
  shuffleDeck(deck);
  const flattened = Object.entries(players).flatMap(([key, value]) => {
    players[key].hand = []
    return [{ id: key, ...value }]
    });
  const numPlayers = flattened.length;
  const numCardsPerPlayer = (numPlayers === 2) ? 10 : 7;

  let faceDownPile = [];
  let tempDeck = [...deck]; // Original deck ko modify na karne ke liye ek temporary deck banaya gaya hai.

  // Khiladiyon ko cards baantne ka kaam
  for (let i = 0; i < numCardsPerPlayer * numPlayers; i++) {
    let selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];

    let playerIndex = flattened[i % numPlayers].id // Determine the current player
    let validCard = false;
    while (!validCard) {
      if (
        !players[playerIndex].hand.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value) &&
        !faceDownPile.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value)
      ) {
        validCard = true;
      } else {
        selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];
      }
    }

    players[playerIndex].hand.push(selectedCard);
    tempDeck = tempDeck.filter(
      (card) => card.suit !== selectedCard.suit || card.value !== selectedCard.value
    );
  }

  faceDownPile = tempDeck; // Bachi hui cards ko faceDownPile mein daala gaya hai.

  return { players,faceDownPile,faceUpPile:[],ids:[],playerRooms:[] };
}



// const deck1 = initializeDeck();

// const result = dealCards(players, deck1);

// // Display the output
// console.log("Face Down Pile:");
// console.log(result.faceDownPile);

// console.log("Face Up Pile (Initially Empty):");
// console.log(result.faceUpPile);

// players.forEach((player) => {
//   console.log(`${player.name}'s hand:`);
//   console.log(player.hand);
// });


// function dealCards(players, deck) {
//   shuffleDeck(deck);

//   const numPlayers = players.length;
//   const numCardsPerPlayer = (numPlayers === 2) ? 10 : 7;

//   let faceDownPile = [];
//   let tempDeck = [...deck]; // Original deck ko modify na karne ke liye ek temporary deck banaya gaya hai.

//   // Khiladiyon ko cards baantne ka kaam
//   for (let i = 0; i < numCardsPerPlayer * numPlayers; i++) {
//     let selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];

//     let playerIndex = i % numPlayers; // Determine the current player
//     let validCard = false;

//     while (!validCard) {
//       if (
//         !players[playerIndex].hand.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value) &&
//         !faceDownPile.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value)
//       ) {
//         validCard = true;
//       } else {
//         selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];
//       }
//     }

//     players[playerIndex].hand.push(selectedCard);
//     tempDeck = tempDeck.filter(
//       (card) => card.suit !== selectedCard.suit || card.value !== selectedCard.value
//     );
//   }

//   faceDownPile = tempDeck; // Bachi hui cards ko faceDownPile mein daala gaya hai.

//    //faceUpPile = [];

//   return { faceDownPile };
// }

// const players = [
//   { name: "Rakesh", hand: [] },
//   { name: "Rajesh", hand: [] }
// ];

// const deck1 = initializeDeck();

// const result = dealCards(players, deck1);

// // Display the output
// console.log("Face Down Pile:");
// console.log(result.faceDownPile);

// console.log("Face Up Pile (Initially Empty):");
// console.log(result.faceUpPile);

// players.forEach((player) => {
//   console.log(`${player.name}'s hand:`);
//   console.log(player.hand);
// });

//------------------------------------------ drawCard -------------------------------------------------

// function drawCard(playerHand, faceDownPile, faceUpPile) {
//   if (!faceDownPile || (faceUpPile && faceUpPile.length > 0)) {
//     let drawnCard;

//     if (faceUpPile.length == 0) {
//       // If the face up pile has cards, draw from there first
//       drawnCard = faceDownPile.pop();
//     } else if (faceDownPile.length == 0) {
//       // If the face up pile is empty, draw from the face down pile
//       drawnCard = faceUpPile.pop();
//     }

//     if (drawnCard) {
//       playerHand.push(drawnCard);
//       return drawnCard;
//     }
//   }

//   console.log('Both face down pile and face up pile are empty. Cannot draw a card.');
//   return null;
// }

// function drawCard(playerHand, faceDownPile, faceUpPile) {
//   if (faceDownPile.length > 0) {
//     const drawnCard = faceDownPile.pop();
//     playerHand.push(drawnCard);

//     if (faceUpPile.length === 0) {
//       // If the face-up pile is empty, draw from the face-down pile and update the count
//       const drawnCardFromFaceDown = faceDownPile.pop();
//       playerHand.push(drawnCardFromFaceDown);
//     }

//     return drawnCard;
//   } else {
//     console.log('Face down pile is empty. Cannot draw a card.');
//     return null;
//   }
// }

// function drawCard(playerHand, faceDownPile, faceUpPile) {
//   if (faceDownPile.length > 0) {
//     const drawnCard = faceDownPile.pop();
//     playerHand.push(drawnCard);

//     if (faceDownPile.length > 0) {
//       // If there are more cards in the face-down pile, draw one card from the face-down pile
//       const drawnCardFromFaceDown = faceDownPile.pop();
//       playerHand.push(drawnCardFromFaceDown);
//     }

//     return drawnCard;
//   } else {
//     console.log('Face down pile is empty. Cannot draw a card.');
//     return null;
//   }
// }


function drawCard(playerHand, faceDownPile, faceUpPile) {
  if (faceDownPile.length > 0) {
    // Draw one card from the face-down pile
    const drawnCard = faceDownPile.pop();
    playerHand.push(drawnCard);

    if (faceUpPile.length === 0 && faceDownPile.length > 0) {
      // If the face-up pile is empty and there are more cards in the face-down pile, draw one more card
      const drawnCardFromFaceDown = faceDownPile[faceDownPile.length - 1];
      playerHand.push(drawnCardFromFaceDown);
      faceDownPile.pop(); // Remove the same card from the face-down pile
    }

    return drawnCard;
  } else {
    console.log('Face down pile is empty. Cannot draw a card.');
    return null;
  }
}




// const playerHand = [ 
// { suit: 'Clubs', value: 'King' },
// { suit: 'Spades', value: '2' },
// { suit: 'Spades', value: 'King' },
// { suit: 'Spades', value: '8' },
// ]; // Initialize the player's hand
// const faceDownPiles = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: 'Ace' },
//   { suit: 'Clubs', value: '5' },
//   { suit: 'Hearts', value: '6' }
// ];

// const faceUpPile = []; // Initialize the face up pile as an empty array

// console.log('Before drawing a card:');
// console.log('Player Hand:', playerHand);
// console.log('Face Down Pile:', faceDownPiles);
// console.log('Face Up Pile:', faceUpPile);

// const drawnCard = drawCard(playerHand, faceDownPiles, faceUpPile);

// if (drawnCard !== null) {
//   console.log('Card drawn:', drawnCard);
// }

// console.log('After drawing a card:');
// console.log('Player Hand:', playerHand);
// console.log('Face Down Pile:', faceDownPiles);
// console.log('Face Up Pile:', faceUpPile);


//------------------------------------------- discardCard --------------------------------------------

function discardCard(playerHand, cardToDiscard, faceUpPile) {
  const index = playerHand.findIndex(
    (card) => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
  );
  if (index !== -1) {
    playerHand.splice(index, 1);
    faceUpPile.push(cardToDiscard);
  }
}   

// Initialize player's hand, face up pile, and a card to discard

// Call the `discardCard` function
// discardCard(playerHand6, cardToDiscard, faceUpPile1);

// // Display the output
// console.log("Player's Hand After Discarding:");
// console.log(playerHand6);

// console.log("Face Up Pile After Discarding:");
// console.log(faceUpPile1);

//-------------------------------------------- initializeGame -------------------------------------------

// function initializeGame(playerIds) {
//   const numPlayers = playerIds.length
//   if (numPlayers < 2 || numPlayers > 5) {
//     console.log('Invalid number of players. The game supports 2 to 5 players.');
//     return null;
//   }
//   const players = {};
//   playerIds.forEach(id=>{
//     players[id]={name:`player ${id}`, hand:[]}
//   })


//   const deck = initializeDeck();
//   console.log('initialize :',deck);
//   const { drawPile, faceDownPile } = dealCards(players, deck);

//   let currentPlayerIndex = 0;
//   let currentPlayer = players[currentPlayerIndex];
//   const faceUpPile = []

//   return { players, drawPile, faceDownPile,faceUpPile, currentPlayerIndex, currentPlayer, state: GameStates.NOT_STARTED };
// }

// // Sample testing code
// const numPlayers = 4; // Change the number of players as needed
// const gameData = initializeGame(['1','2']);

// if (gameData !== null) {
//   console.log('Game Initialized:');
//   console.log('Number of Players:', numPlayers);
//   console.log('Current Player:', gameData.currentPlayer);
//   console.log('Draw Pile:', gameData.drawPile);
//   console.log('Face Down Pile:', gameData.faceDownPile);
//   console.log('Players:');
//  console.log( gameData.players);
//   console.log('Game State:', gameData.state);
// }


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
  console.log('initialize :',deck);
  const { drawPile, faceDownPile } = dealCards(players, deck);

  let currentPlayerIndex = 0;
  let currentPlayer = players[currentPlayerIndex];
  const faceUpPile = []

  return { players, drawPile, faceDownPile,faceUpPile, currentPlayerIndex, currentPlayer, state: GameStates.NOT_STARTED };
}


//------------------------------------------ nextPlayer ------------------------------------------------

function nextPlayer(currentPlayerIndex, playerNames) {
  return (currentPlayerIndex + 1) % playerNames.length;
}


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

//-------------------------------------------- isValidSet ---------------------------------------------

function isValidSet(cards) {
  const uniqueValues = new Set();
  for (const card of cards) {
    uniqueValues.add(card.value);
  }
  return uniqueValues.size === 1;
}

// Example usage of isValidSet function within your game logic

// 
//------------------------------------------ checkWinning -----------------------------------------------

function checkWinning(player1, player2) {
  const hand1 = [...player1.hand];
  const hand2 = [...player2.hand];

  // Sort the hands to make it easier to check for sets and sequences
  hand1.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
  hand2.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

  // Variables to track the number of sets and sequences for each player
  let setCount1 = 0;
  let setCount2 = 0;
  let sequenceCount1 = 0;
  let sequenceCount2 = 0;

  // Check for sets and sequences in each player's hand
  for (let i = 0; i <= hand1.length - 3; i++) {
    const currentSet = [hand1[i], hand1[i + 1], hand1[i + 2]];
    if (isValidSet(currentSet)) {
      setCount1++;
      console.log(`Player 1 formed Set #${setCount1}:`, currentSet);
    } else if (isValidSequence(currentSet)) {
      sequenceCount1++;
      console.log(`Player 1 formed Sequence #${sequenceCount1}:`, currentSet);
    }
  }

  for (let i = 0; i <= hand2.length - 3; i++) {
    const currentSet = [hand2[i], hand2[i + 1], hand2[i + 2]];
    if (isValidSet(currentSet)) {
      setCount2++;
      console.log(`Player 2 formed Set #${setCount2}:`, currentSet);
    } else if (isValidSequence(currentSet)) {
      sequenceCount2++;
      console.log(`Player 2 formed Sequence #${sequenceCount2}:`, currentSet);
    }
  }

  // Calculate the scores for each player
  const player1Score = calculateScore(hand1);
  const player2Score = calculateScore(hand2);

  // Determine the winner based on sets, sequences, and scores
  if (setCount1 > setCount2) {
    console.log("Player 1 wins with more sets!");
    return `Player 1 wins with ${setCount1} sets, ${sequenceCount1} sequences, and a score of ${player1Score}!`;
  } else if (setCount2 > setCount1) {
    console.log("Player 2 wins with more sets!");
    return `Player 2 wins with ${setCount2} sets, ${sequenceCount2} sequences, and a score of ${player2Score}!`;
  } else {
    console.log("No winner based on sets. Checking sequences and scores.");
    if (sequenceCount1 > sequenceCount2) {
      console.log("Player 1 wins with more sequences!");
      return `Player 1 wins with ${sequenceCount1} sequences and a score of ${player1Score}!`;
    } else if (sequenceCount2 > sequenceCount1) {
      console.log("Player 2 wins with more sequences!");
      return `Player 2 wins with ${sequenceCount2} sequences and a score of ${player2Score}!`;
    } else {
      console.log("No winner based on sets and sequences. Checking scores.");
      if (player1Score > player2Score) {
        return `Player 1 wins with a score of ${player1Score}!`;
      } else if (player2Score > player1Score) {
        return `Player 2 wins with a score of ${player2Score}!`;
      } else {
        return "It's a draw.";  
      }
    }
  }
}

// const player1 = {
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '2' },
//     { suit: 'Diamonds', value: '2' },
//   ],
// };

// const player2 = {
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '3' },
//     { suit: 'Diamonds', value: '4' },
    
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '2' },
//     { suit: 'Diamonds', value: '2' },
//   ]
// };
// const results = checkWinning(player1, player2);
// console.log(results);


//====================================== simulatePlayerTurn =========================================

// function simulatePlayerTurn(gameData) {
//   const currentPlayer = gameData.currentPlayer;
//   const currentPlayerIndex = gameData.currentPlayerIndex;

//   console.log(`Current Player: ${currentPlayer.name}`);

//   const turnTimeout = 10000;
//   let timerExpired = false;

//   const turnTimer = setTimeout(() => {
//     console.log(`Player ${currentPlayer.name} ran out of time. Moving to the next player.`);
//     timerExpired = true;

//     // Simulate discarding a card if a card is in hand
//     if (currentPlayer.hand.length > 0) {
//       const cardToDiscard = currentPlayer.hand[0];
//       discardCard(currentPlayer.hand, cardToDiscard, gameData.faceUpPile);
//       console.log(`Player discards: ${cardToDiscard.suit} ${cardToDiscard.value}`);
//     }

//     // Check for a winning condition
//     const winner = checkWinning(gameData.players[0], gameData.players[1]);
//     if (winner !== "No winner yet.") {
//       console.log(winner);

//       const player1Score = calculateScore(gameData.players[0].hand);
//       const player2Score = calculateScore(gameData.players[1].hand);

//       console.log(`Player 1 Score: ${player1Score}`);
//       console.log(`Player 2 Score: ${player2Score}`);
//       gameData.state = GameStates.ENDED;
//     } else {
//       gameData.currentPlayerIndex = nextPlayer(currentPlayerIndex, gameData.players);
//       gameData.currentPlayer = gameData.players[gameData.currentPlayerIndex];
//       simulatePlayerTurn(gameData);
//     }
//   }, turnTimeout);

//   const drawnCard = drawCard(currentPlayer.hand, gameData.drawPile, gameData.faceUpPile);
//   if (drawnCard !== null) {
//     console.log(`Player draws: ${drawnCard.suit} ${drawnCard.value}`);
//     clearTimeout(turnTimer);
    
//     // Call the winning condition after a card is drawn
//     const winner = checkWinning(gameData.players[0], gameData.players[1]);
//     if (winner !== "No winner yet.") {
//       console.log(winner);

//       const player1Score = calculateScore(gameData.players[0].hand);
//       const player2Score = calculateScore(gameData.players[1].hand);

//       console.log(`Player 1 Score: ${player1Score}`);
//       console.log(`Player 2 Score: ${player2Score}`);
//       gameData.state = GameStates.ENDED;
//     } else {
//       endPlayerTurn();
//     }
//   }

//   if (timerExpired) {
//     return;
//   }
// }

// const numberPlayers = 2;
// const gamesData = initializeGame(numberPlayers);

// while (gamesData.state !== GameStates.ENDED) {
//   simulatePlayerTurn(gamesData);
// }

// console.log("Game Ended!");



//================================= calculate score in a function =====================================

function calculateScore(hand) {
  // Define a mapping of card values to their corresponding numerical values.
  const valueMap = {
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
    'Ace': 11, // You might need to handle Ace differently based on your game's rules
  };

  let score = 0;

  for (const card of hand) {
    const cardValue = card.value;
    if (valueMap[cardValue]) {
      score += valueMap[cardValue];
    }
  }

  return score;
}


// // Define hands of cards for two players
// const player1Hand = [
//   { value: '2' },
//   { value: 'King' },
//   { value: '7' },
//   { value: 'Ace' },
//   // Add more cards for Player 1 as needed
// ];

// const player2Hand = [
//   { value: '3' },
//   { value: 'Queen' },
//   { value: '5' },
//   { value: '10' },
//   // Add more cards for Player 2 as needed
// ];

// // Calculate the scores for both players
// const player1Score = calculateScore(player1Hand);
// const player2Score = calculateScore(player2Hand);

// // Log the results
// console.log('Player 1 Score:', player1Score);
// console.log('Player 2 Score:', player2Score);




//--------------------------------------------- Functions Exportation ------------------------------------

module.exports = {
  initializeDeck,
  shuffleDeck,
  dealCards,
  drawCard,
  discardCard,
  initializeGame,
  nextPlayer,
  isValidSequence,
  isValidSet,
  calculateScore,
  checkWinning,
  //simulatePlayerTurn,
  
};