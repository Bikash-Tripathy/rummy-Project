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

// function dealCards(players, deck) {
//   shuffleDeck(deck);

//   const numPlayers = players.length;
//   const numCardsPerPlayer = numPlayers === 2 ? 10 : 7;

//   const drawPile = deck.slice(numCardsPerPlayer * numPlayers);
//   const faceDownPile = deck.slice(0, numCardsPerPlayer * numPlayers);

//   for (let i = 0; i < numCardsPerPlayer; i++) {
//     for (let j = 0; j < numPlayers; j++) {
//       players[j].hand.push(deck[i + numCardsPerPlayer * j]);
//     }
//   }

//   return { drawPile, faceDownPile };
// }

// // Sample testing code
// const players = [
//   { name: "Rakesh", hand: [] },
//   { name: "Rajesh", hand: [] }
// ];

// const deck1 = [
//   // Add your deck of cards here
//   // For example: 'Card1', 'Card2', 'Card3', ...
//   'Card1', 'Card2', 'Card3', 'Card4', 'Card5', 'Card6', 'Card7',
//   'Card8', 'Card9', 'Card10', 'Card11', 'Card12', 'Card13', 'Card14',
//   'Card15', 'Card16', 'Card17', 'Card18', 'Card19', 'Card20'
// ];

// const result = dealCards(players, deck1);

// console.log("Draw Pile:", result.drawPile);
// console.log("Face Down Pile:", result.faceDownPile);

// players.forEach((player, index) => {
//   console.log(`${player.name}'s hand:`, player.hand);
// });

// //------------------------------------------ drawCard ------------------------------------------

// function drawCard(playerHand, drawPile) {
//   if (drawPile.length === 0) {
//     console.log('Draw pile is empty.');
//     return null;
//   }
//   const card = drawPile.pop();
//   playerHand.push(card);
//   return card;
// }

// // Sample testing code
// const drawPile = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'];
// const playerHand = [];

// console.log('Before drawing a card:');
// console.log('Draw Pile:', drawPile);
// console.log('Player Hand:', playerHand);

// const drawnCard = drawCard(playerHand, drawPile);

// if (drawnCard !== null) {
//   console.log('Card drawn:', drawnCard);
// }

// console.log('After drawing a card:');
// console.log('Draw Pile:', drawPile);
// console.log('Player Hand:', playerHand);

// //-------------------------------------------- drawFromFaceDownPile --------------------------------

// function drawFromFaceDownPile(playerHand, faceDownPile) {
//   if (faceDownPile.length === 0) {
//     console.log('Face-down pile is empty.');
//     return null;
//   }
//   const card = faceDownPile.pop();
//   playerHand.push(card);
//   return card;
// }

// // Sample testing code
// const faceDownPile = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'];
// const playerHand1 = [];

// console.log('Before drawing from face-down pile:');
// console.log('Face-down Pile:', faceDownPile);
// console.log('Player Hand:', playerHand1);

// const drawnCard1 = drawFromFaceDownPile(playerHand, faceDownPile);

// if (drawnCard !== null) {
//   console.log('Card drawn from face-down pile:', drawnCard1);
// }

// console.log('After drawing from face-down pile:');
// console.log('Face-down Pile:', faceDownPile);
// console.log('Player Hand:', playerHand1);

// //------------------------------------------- discardCard --------------------------------------------

// function discardCard(playerHand, cardToDiscard, discardPile) {
//   const index = playerHand.findIndex(
//     card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//   );
//   if (index !== -1) {
//     playerHand.splice(index, 1);
//     discardPile.push(cardToDiscard);
//   }
// }

// const samplePlayerHand = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: 'Ace' },
//   { suit: 'Clubs', value: '5' },
//   { suit: 'Spades', value: 'King' },
//   // Add more cards here
// ];

// const sampleDiscardPile = [];

// const cardToDiscard = { suit: 'Hearts', value: '2' }; // Change this to the card you want to discard

// discardCard(samplePlayerHand, cardToDiscard, sampleDiscardPile);

// console.log("hiiii")
// console.log('Updated Player Hand:', samplePlayerHand);
// console.log('Updated Discard Pile:', sampleDiscardPile);

// //--------------------------------------- discardToFaceDownPile ----------------------------------------

// function discardToFaceDownPile(playerHand, cardToDiscard, faceDownPile) {
//   const index = playerHand.findIndex(
//     card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//   );
//   if (index !== -1) {
//     playerHand.splice(index, 1);
//     faceDownPile.push(cardToDiscard);
//   }
// }

// const playerHand2 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: 'Ace' },
//   { suit: 'Clubs', value: '5' },
//   { suit: 'Spades', value: 'King' },
//   // Add more cards here
// ];

// const faceDownPile2 = [];

// const cardToDiscard2 = { suit: 'Hearts', value: '2' }; // Change this to the card you want to discard to face-down pile

// discardToFaceDownPile(playerHand2, cardToDiscard2, faceDownPile2);

// console.log('Updated Player Hand:', playerHand2);
// console.log('Updated Face-Down Pile:', faceDownPile2);


// //-------------------------------------------- initializeGame -------------------------------------------

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
//   const { drawPile, faceDownPile } = dealCards(players, deck);

//   let currentPlayerIndex = 0;
//   let currentPlayer = players[currentPlayerIndex];

//   return { players, drawPile, faceDownPile, currentPlayerIndex, currentPlayer, state: GameStates.NOT_STARTED };
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


// //========================================== displayHand ================================================

// function displayHand(playerHands) {
//   console.log("Player's Hand:");
//   for (const card of playerHands) {
//     console.log(`${card.value} of ${card.suit}`);
//   }
// }

// // Example data for testing displayHand function
// const playerHands = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '7' },
//   { suit: 'Clubs', value: 'King' },
// ];

// // Call the displayHand function with the example data
// displayHand(playerHands);

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

// //--------------------------------------------- isValidMeld ---------------------------------------------

// // function isValidMeld(cards) {
// //   const isSequence = isValidSequence(cards);
// //   const isSet = isValidSet(cards);
  
// //   if (isSequence || isSet) {
// //     return true;
// //   } else {
// //     return false;
// //   }
// // }

// // function isValidMeld(cards) {
// //   return isValidSequence(cards) || isValidSet(cards);
// // }

// // const cards = [
// //   { suit: 'Hearts', value: '2' },
// //   { suit: 'Diamonds', value: '2' },
// //   { suit: 'Clubs', value: '2' },
// // ];

// // if (isValidMeld(cards)) {
// //   console.log("Valid Meld!");
// // } else {
// //   console.log("Not a valid Meld.");
// // }


// //----------------------------------------------- calculateCardScore ------------------------------------

// function calculateCardScore(card) {
//   const value = card.value;
//   const isFaceCard = ['Jack', 'Queen', 'King'].includes(value);
//   const isHighValueCard = ['10', 'Jack', 'Queen', 'King', 'Ace'].includes(value);
//   const score = isFaceCard ? 10 : isHighValueCard ? 5 : parseInt(value);
//   return score;
// }

// const card = { suit: 'Hearts', value: '3' }; // Replace with your card object

// const score = calculateCardScore(card);

// console.log(`Card Score: ${score}`);

// //------------------------------------------ calculateHandScore ------------------------------------------

// function calculateHandScore(playerHand) {
//   let totalScore = 0;

//   for (const card of playerHand) {
//     totalScore += calculateCardScore(card);
//   }

//   return totalScore;
// }

// const playerHand5 = [
//   { suit: 'Hearts', value: 'Queen' },
//   { suit: 'Diamonds', value: 'King' },
//   { suit: 'Clubs', value: '4' },
//   // Add more cards as needed
// ];

// const totalScore = calculateHandScore(playerHand5);

// console.log(`Total Score: ${totalScore}`);


// //------------------------------------------ checkWinning -----------------------------------------------

// // function checkWinning(player) {
// //   const allMelds = [];

// //   function findAllMelds(hand, currentMeld) {
// //     if (isValidMeld(currentMeld)) {
// //       allMelds.push([...currentMeld]);
// //     }
// //     for (let i = 0; i < hand.length; i++) {
// //       const card = hand[i];
// //       currentMeld.push(card);
// //       const remainingHand = [...hand.slice(0, i), ...hand.slice(i + 1)];
// //       findAllMelds(remainingHand, currentMeld);
// //       currentMeld.pop();
// //     }
// //   }

// //   findAllMelds(player.hand, []);

// //   const allPlayerCards = new Set(player.hand);
// //   for (const meld of allMelds) {
// //     const meldSet = new Set(meld);
// //     if (meldSet.size === allPlayerCards.size) {
// //       return true;
// //     }
// //   }

// //   return false;
// // }

// // const player = {
// //   hand: [
// //     { suit: 'Hearts', value: '2' },
// //     { suit: 'Hearts', value: '3' },
// //     { suit: 'Hearts', value: '4' },
// //     { suit: 'Diamonds', value: '10' },
// //     { suit: 'Diamonds', value: 'Jack' },
// //     { suit: 'Diamonds', value: 'Queen' },
// //     { suit: 'Diamonds', value: 'King' },
// //     { suit: 'Diamonds', value: 'Ace' },
// //     // Add more cards as needed
// //   ],
// // };

// // const isWinner = checkWinning(player);

// // if (isWinner) {
// //   console.log("Player has a winning hand!");
// // } else {
// //   console.log("Player does not have a winning hand.");
// // }

// // Define your isValidSequence and isValidSet functions as discussed earlier

// function checkWinning(player) {
//   const hand = [...player.hand];

//   function hasValidMeld(cards) {
//     return isValidSequence(cards) || isValidSet(cards);
//   }

//   // Sort the hand to make it easier to check for sequences
//   hand.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

//   // Try to find sequences
//   for (let i = 0; i < hand.length - 2; i++) {
//     const currentCard = hand[i];
//     const nextCard1 = hand[i + 1];
//     const nextCard2 = hand[i + 2];

//     if (hasValidMeld([currentCard, nextCard1, nextCard2])) {
//       return true;
//     }
//   }

//   // Try to find sets
//   for (let i = 0; i < hand.length - 2; i++) {
//     const currentCard = hand[i];
//     const nextCard1 = hand[i + 1];
//     const nextCard2 = hand[i + 2];

//     if (
//       currentCard.value === nextCard1.value &&
//       currentCard.value === nextCard2.value
//     ) {
//       return true;
//     }
//   }

//   return false;
// }

// // Usage
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


// //------------------------------------------ simulatePlayerTurn ----------------------------------------

// function simulatePlayerTurn(player, drawPile, faceDownPile, players1) {
//   console.log(`It's ${player.name}'s turn`);
//   displayHand(player.hand);

//   if (checkWinning(player, players1)) {
//     console.log(`${player.name} has won the game!`);
//     return true;
//   }

//   const drawnCard = drawCard(player.hand, drawPile);
//   if (drawnCard) {
//     console.log(`${player.name} draws a card from the draw pile: ${drawnCard.value} of ${drawnCard.suit}`);
//   }

//   const drawnFaceDownCard = drawFromFaceDownPile(player.hand, faceDownPile);
//   if (drawnFaceDownCard) {
//     console.log(`${player.name} draws a card from the face-down pile: ${drawnFaceDownCard.value} of ${drawnFaceDownCard.suit}`);
//   }

//   const cardToDiscard = player.hand[0];
//   discardToFaceDownPile(player.hand, cardToDiscard, faceDownPile);
//   console.log(`${player.name} discards to the face-down pile: ${cardToDiscard.value} of ${cardToDiscard.suit}`);

//   return false;
// }

// // Define your game state, including players and piles
// const player1 = { name: 'Player 1', hand: [] };
// const player2 = { name: 'Player 2', hand: [] };
// const players1 = [player1, player2];

// const drawPile1 = [
//   { suit: 'Hearts', value: '6' },
//   { suit: 'Diamonds', value: '8' },
//   { suit: 'Spades', value: '10' },
//   // Add more cards as needed
// ];

// const faceDownPile1 = [
//   { suit: 'Hearts', value: '4' },
//   { suit: 'Clubs', value: 'King' },
//   { suit: 'Spades', value: '3' },
//   // Add more cards as needed
// ];

// // Simulate the turn for Player 1
// console.log("Simulating Player 1's turn:");
// simulatePlayerTurn(player1, drawPile, faceDownPile, players1);

// // Simulate the turn for Player 2
// console.log("Simulating Player 2's turn:");
// simulatePlayerTurn(player2, drawPile1, faceDownPile1,players1 );


// //----------------------------------------- startGameWithPlayers -----------------------------------------

// function startGameWithPlayers(numPlayers) {
//   const game = initializeGame(numPlayers);
//   game.state = GameStates.STARTED;

//   if (!game) {
//     return;
//   }

//   let gameEnded = false;

//   while (!gameEnded) {
//     const currentPlayer = game.players[game.currentPlayerIndex];

//     displayHand(currentPlayer.hand);

//     if (checkWinning(currentPlayer)) {
//       console.log(`${currentPlayer.name} has won the game!`);
//       gameEnded = true;
//     }

//     gameEnded = simulatePlayerTurn(currentPlayer, game.drawPile, game.faceDownPile) || gameEnded;

//     game.currentPlayerIndex = nextPlayer(game.currentPlayerIndex, game.players);
//   }

//   calculateAndDisplayScores(game.players);
//   game.state = GameStates.ENDED;
// }

// //----------------------------------------------- joinGame ----------------------------------------------

// function joinGame(game, playerName) {
//   if (game.state === GameStates.NOT_STARTED) {
//     game.players.push({ name: playerName, hand: [] });
//     console.log(`${playerName} has joined the game.`);
//   } else {
//     console.log('Cannot join the game. It has already started.');
//   }
// }

// //--------------------------------------------- rejoinGame -----------------------------------------------

// function rejoinGame(game, playerName) {
//   if (game.state === GameStates.NOT_STARTED) {
//     const existingPlayer = game.players.find(player => player.name === playerName);
//     if (existingPlayer) {
//       console.log(`${playerName} has rejoined the game.`);
//     } else {
//       console.log('Cannot rejoin the game. Player not found.');
//     }
//   } else {
//     console.log('Cannot rejoin the game. It has already started.');
//   }
// }

// //-------------------------------------------- rejoinGame -----------------------------------------------

// function endGame(game) {
//   if (game.state === GameStates.STARTED) {
//     console.log('The game has been ended.');
//     game.state = GameStates.ENDED;
//   } else {
//     console.log('The game is not currently in progress.');
//   }
// }

// //--------------------------------------------- leaveGame -----------------------------------------------

// function leaveGame(game, playerName) {
//   if (game.state === GameStates.NOT_STARTED) {
//     const playerIndex = game.players.findIndex(player => player.name === playerName);
//     if (playerIndex !== -1) {
//       game.players.splice(playerIndex, 1);
//       console.log(`${playerName} has left the game.`);
//     } else {
//       console.log('Player not found in the game.');
//     }
//   } else {
//     console.log('Cannot leave the game. It has already started.');
//   }
// }

// const game1 = {
//   players: [{ name: 'Player 1' }, { name: 'Player 2' }],
//   state: GameStates.NOT_STARTED,
// };

// leaveGame(game1, 'Player 2');

// //----------------------------------------- continuePreviousGame -----------------------------------------

// function continuePreviousGame(game, playerName) {
//   if (game.state === GameStates.ENDED) {
//     const player = game.players.find(player => player.name === playerName);
//     if (player) {
//       game.state = GameStates.STARTED;
//       console.log(`${playerName} has chosen to continue the previous game.`);
//     } else {
//       console.log('Cannot continue the previous game. Player not found.');
//     }
//   } else {
//     console.log('Cannot continue the previous game. The game is not ended.');
//   }
// }


// const games = {
//   players: [{ name: 'Player 1' }, { name: 'Player 2' }],
//   state: GameStates.ENDED,
// };

// continuePreviousGame(games, 'Player 2');


// //------------------------------------------- startNewGame ----------------------------------------------

// function startNewGame(game) {
//   if (game.state === GameStates.ENDED) {
//     game.players = [];
//     game.state = GameStates.NOT_STARTED;
//     console.log('A new game has started.');
//   } else {
//     console.log('Cannot start a new game. The previous game is not ended.');
//   }
// }

// //Testing
// const game = {
//   players: ['Player 1', 'Player 2'],
//   state: GameStates.ENDED,
// };

// startNewGame(game);

// //---------------------------------------- calculateAndDisplayScores ------------------------------------

// function calculateAndDisplayScores(players3) {
//   for (const player of players3) {
//     const score = calculateHandScore(player.hand);
//     console.log(`${player.name}'s score: ${score}`);
//   }
// }

// const players3 = [
//   {
//     name: 'Player 1',
//     hand: [
//       { suit: 'Hearts', value: '2' },
//       { suit: 'Hearts', value: '3' },
//       { suit: 'Hearts', value: '4' },
//       { suit: 'Diamonds', value: '10' },
//       // Add more cards as needed
//     ],
//   },
//   {
//     name: 'Player 2',
//     hand: [
//       { suit: 'Clubs', value: '5' },
//       { suit: 'Diamonds', value: 'Jack' },
//       { suit: 'Hearts', value: 'Queen' },
//       { suit: 'Spades', value: 'Ace' },
//       // Add more cards as needed
//     ],
//   },
//   // Add more players as needed
// ];

// calculateAndDisplayScores(players3);


// //--------------------------------------------- Functions Exportation ------------------------------------

// module.exports = {
//   initializeDeck,
//   shuffleDeck,
//   dealCards,
//   drawCard,
//   drawFromFaceDownPile,
//   discardCard,
//   discardToFaceDownPile,
//   initializeGame,
//   nextPlayer,
//   displayHand,
//   isValidSequence,
//   isValidSet,
//   //isValidMeld,
//   calculateCardScore,
//   calculateHandScore,
//   checkWinning,
//   simulatePlayerTurn,
//   startGameWithPlayers,
//   joinGame,
//   rejoinGame,
//   endGame,
//   leaveGame,
//   continuePreviousGame,
//   startNewGame,
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

// function dealCards(players, deck) {
//   shuffleDeck(deck);

//   const numPlayers = players.length;
//   const numCardsPerPlayer = numPlayers === 2 ? 10 : 7;

//   const drawPile = deck.slice(numCardsPerPlayer * numPlayers);
//   const faceDownPile = deck.slice(0, numCardsPerPlayer * numPlayers);

//   for (let i = 0; i < numCardsPerPlayer; i++) {
//     for (let j = 0; j < numPlayers; j++) {
//       players[j].hand.push(deck[i + numCardsPerPlayer * j]);
//     }
//   }

//   return { drawPile, faceDownPile };
// }

// // Sample testing code
// const players = [
//   { name: "Rakesh", hand: [] },
//   { name: "Rajesh", hand: [] }
// ];

// const deck1 = [
//   // Add your deck of cards here
//   // For example: 'Card1', 'Card2', 'Card3', ...
//   'Card1', 'Card2', 'Card3', 'Card4', 'Card5', 'Card6', 'Card7',
//   'Card8', 'Card9', 'Card10', 'Card11', 'Card12', 'Card13', 'Card14',
//   'Card15', 'Card16', 'Card17', 'Card18', 'Card19', 'Card20',
// ];

// const result = dealCards(players, deck1);

// console.log("Draw Pile:", result.drawPile);
// console.log("Face Down Pile:", result.faceDownPile);

// players.forEach((player, index) => {
//   console.log(`${player.name}'s hand:`, player.hand);
// });


// function dealCards(players, deck) {
//   shuffleDeck(deck);

//   const numPlayers = players.length;
//   const numCardsPerPlayer = (numPlayers === 2) ? 10 : 7;

//   let faceDownPile = [];
//   let tempDeck = [...deck]; // Create a copy of the deck to avoid modifying the original deck

//   // Distribute cards to players
//   for (let i = 0; i < numCardsPerPlayer; i++) {
//     for (let j = 0; j < numPlayers; j++) {
//       // Ensure that the card drawn for the player is not in their hand or faceDownPile
//       let validCard = false;
//       let selectedCard;

//       while (!validCard) {
//         selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];

//         if (
//           !players[j].hand.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value) &&
//           !faceDownPile.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value)
//         ) {
//           validCard = true;
//         }
//       }

//       players[j].hand.push(selectedCard);
//       tempDeck = tempDeck.filter(
//         (card) => card.suit !== selectedCard.suit || card.value !== selectedCard.value
//       );
//     }
//   }

//   faceDownPile = tempDeck;

//   return { faceDownPile };
// }

// const players = [
//   { name: "Rakesh", hand: [] },
//   { name: "Rajesh", hand: [] }
// ];

// const deck1 = initializeDeck();

// const result = dealCards(players, deck1);

// console.log("Face Down Pile:");
// console.log(result.faceDownPile);

// players.forEach((player) => {
//   console.log(`${player.name}'s hand:`);
//   console.log(player.hand);
// })



function dealCards(players, deck) {
  shuffleDeck(deck);

  const numPlayers = players.length;
  const numCardsPerPlayer = (numPlayers === 2) ? 10 : 7;

  let faceDownPile = [];
  let tempDeck = [...deck]; // Original deck ko modify na karne ke liye ek temporary deck banaya gaya hai.

  // Khiladiyon ko cards baantne ka kaam
  for (let i = 0; i < numCardsPerPlayer * numPlayers; i++) {
    let selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];

    let playerIndex = i % numPlayers; // Determine the current player
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

   //faceUpPile = [];

  return { faceDownPile };
}

const players = [
  { name: "Rakesh", hand: [] },
  { name: "Rajesh", hand: [] }
];

const deck1 = initializeDeck();

const result = dealCards(players, deck1);

// Display the output
console.log("Face Down Pile:");
console.log(result.faceDownPile);

console.log("Face Up Pile (Initially Empty):");
console.log(result.faceUpPile);

players.forEach((player) => {
  console.log(`${player.name}'s hand:`);
  console.log(player.hand);
});


//------------------------------------------ drawCard ------------------------------------------

// function drawCard(playerHand, drawPile) {
//   if (drawPile.length === 0) {
//     console.log('Draw pile is empty.');
//     return null;
//   }
//   const card = drawPile.pop();
//   playerHand.push(card);
//   return card;
// }

// // Sample testing code
// const drawPile = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'];
// const playerHand = [];

// console.log('Before drawing a card:');
// console.log('Draw Pile:', drawPile);
// console.log('Player Hand:', playerHand);

// const drawnCard = drawCard(playerHand, drawPile);

// if (drawnCard !== null) {
//   console.log('Card drawn:', drawnCard);
// }

// console.log('After drawing a card:');
// console.log('Draw Pile:', drawPile);
// console.log('Player Hand:', playerHand);


function drawCard(playerHand, faceDownPile, faceUpPile) {
  if (!faceDownPile || (faceUpPile && faceUpPile.length > 0)) {
    let drawnCard;

    if (faceUpPile && faceUpPile.length > 0) {
      // If the face up pile has cards, draw from there first
      drawnCard = faceUpPile.pop();
    } else if (faceDownPile.length > 0) {
      // If the face up pile is empty, draw from the face down pile
      drawnCard = faceDownPile.pop();
    }

    if (drawnCard) {
      playerHand.push(drawnCard);
      return drawnCard;
    }
  }

  console.log('Both face down pile and face up pile are empty. Cannot draw a card.');
  return null;
}


const playerHand = [6,7,8,9,10]; // Initialize the player's hand
const faceDownPiles = [1,2,3,4,5
  // { suit: 'Hearts', value: '2' },
  // { suit: 'Diamonds', value: 'Ace' },
  // { suit: 'Clubs', value: '5' },
  // { suit: 'Spades', value: 'King' }
  // Add more cards to the face down pile
];

const faceUpPile = [11,35,46]; // Initialize the face up pile as an empty array

console.log('Before drawing a card:');
console.log('Player Hand:', playerHand);
console.log('Face Down Pile:', faceDownPiles);
console.log('Face Up Pile:', faceUpPile);

const drawnCard = drawCard(playerHand, faceDownPiles, faceUpPile);

if (drawnCard !== null) {
  console.log('Card drawn:', drawnCard);
}

console.log('After drawing a card:');
console.log('Player Hand:', playerHand);
console.log('Face Down Pile:', faceDownPiles);
console.log('Face Up Pile:', faceUpPile);


//------------------------------------------- discardCard --------------------------------------------

// function discardCard(playerHand, cardToDiscard, discardPile) {
//   const index = playerHand.findIndex(
//     card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//   );
//   if (index !== -1) {
//     playerHand.splice(index, 1);
//     discardPile.push(cardToDiscard);
//   }
// }

// const samplePlayerHand = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: 'Ace' },
//   { suit: 'Clubs', value: '5' },
//   { suit: 'Spades', value: 'King' },
//   // Add more cards here
// ];

// const sampleDiscardPile = [];

// const cardToDiscard = { suit: 'Hearts', value: '2' }; // Change this to the card you want to discard

// discardCard(samplePlayerHand, cardToDiscard, sampleDiscardPile);

// console.log("hiiii")
// console.log('Updated Player Hand:', samplePlayerHand);
// console.log('Updated Discard Pile:', sampleDiscardPile);

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
const playerHand6 = [1, 2, 3, 4, 5]; // Assume player has these cards
const faceUpPile1 = [6, 7, 8]; // Assume face up pile has these cards
const cardToDiscard = 3; // Change this to the card you want to discard

// Call the `discardCard` function
discardCard(playerHand6, cardToDiscard, faceUpPile1);

// Display the output
console.log("Player's Hand After Discarding:");
console.log(playerHand6);

console.log("Face Up Pile After Discarding:");
console.log(faceUpPile1);


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

const drawnCard1 = drawFromFaceDownPile(playerHand1, faceDownPile);

if (drawnCard1 !== null) {
  console.log('Card drawn from face-down pile:', drawnCard1);
}

console.log('After drawing from face-down pile:');
console.log('Face-down Pile:', faceDownPile);
console.log('Player Hand:', playerHand1);

//------------------------------------------- discardCard --------------------------------------------

// function discardCard(playerHand, cardToDiscard, discardPile) {
//   const index = playerHand.findIndex(
//     card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//   );
//   if (index !== -1) {
//     playerHand.splice(index, 1);
//     discardPile.push(cardToDiscard);
//   }
// }

// const samplePlayerHand = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: 'Ace' },
//   { suit: 'Clubs', value: '5' },
//   { suit: 'Spades', value: 'King' },
//   // Add more cards here
// ];

// const sampleDiscardPile = [];

// const cardToDiscard = { suit: 'Hearts', value: '2' }; // Change this to the card you want to discard

// discardCard(samplePlayerHand, cardToDiscard, sampleDiscardPile);

// console.log("hiiii")
// console.log('Updated Player Hand:', samplePlayerHand);
// console.log('Updated Discard Pile:', sampleDiscardPile);

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
  console.log('initialize :',deck);
  const { drawPile, faceDownPile } = dealCards(players, deck);

  let currentPlayerIndex = 0;
  let currentPlayer = players[currentPlayerIndex];
  const faceUpPile = []

  return { players, drawPile, faceDownPile,faceUpPile, currentPlayerIndex, currentPlayer, state: GameStates.NOT_STARTED };
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

function checkWinning(player) {
  const hand = [...player.hand];

  function hasValidMeld(cards) {
    return isValidSequence(cards) || isValidSet(cards);
  }

  // Sort the hand to make it easier to check for sequences
  hand.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

  // Try to find sequences
  for (let i = 0; i < hand.length - 2; i++) {
    const currentCard = hand[i];
    const nextCard1 = hand[i + 1];
    const nextCard2 = hand[i + 2];

    if (hasValidMeld([currentCard, nextCard1, nextCard2])) {
      return true;
    }
  }

  // Try to find sets
  for (let i = 0; i < hand.length - 2; i++) {
    const currentCard = hand[i];
    const nextCard1 = hand[i + 1];
    const nextCard2 = hand[i + 2];

    if (
      currentCard.value === nextCard1.value &&
      currentCard.value === nextCard2.value
    ) {
      return true;
    }
  }

  return false;
}

// Usage
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

// function simulatePlayerTurn(totalPlayers, drawPile4, faceDownPile4) {
//   console.log(`It's ${totalPlayers.name}'s turn`);
//   displayHand(totalPlayers.hand);

//   if (checkWinning(totalPlayers)) {
//     console.log(`${totalPlayers.name} has won the game!`);
//     return true;
//   }

//   let turnEnded = false;
//   let timeoutTriggered = false;

//   // Set a 5-second timeout for the player's turn
//   const turnTimeout = 5000; // 5 seconds in milliseconds
//   const timer = setTimeout(() => {
//     timeoutTriggered = true;
//     console.log(`${totalPlayers.name} took too long! Turn ended.`);
//     // Handle the case when the player's turn times out, e.g., deduct points or skip the turn
//     turnEnded = true;
//   }, turnTimeout);

//   const drawnCard = drawCard(totalPlayers.hand, drawPile4);
//   if (drawnCard) {
//     console.log(`${totalPlayers.name} draws a card from the draw pile: ${drawnCard.value} of ${drawnCard.suit}`);
//   }

//   const drawnFaceDownCard = drawFromFaceDownPile(totalPlayers.hand, faceDownPile4);
//   if (drawnFaceDownCard) {
//     console.log(`${totalPlayers.name} draws a card from the face-down pile: ${drawnFaceDownCard.value} of ${drawnFaceDownCard.suit}`);
//   }

//   // Example: Simulate discarding the first card in the player's hand (you can implement card selection logic here)
//   if (totalPlayers.hand.length > 0) {
//     const cardToDiscard = totalPlayers.hand[0];
//     discardToFaceDownPile(totalPlayers.hand, cardToDiscard, faceDownPile4);
//     console.log(`${totalPlayers.name} discards to the face-down pile: ${cardToDiscard.value} of ${cardToDiscard.suit}`);
//     turnEnded = true; // The player's turn ends after discarding.
//   }

//   // If the player completes their turn actions before the timeout, you can clear the timeout.
//   if (turnEnded) {
//     clearTimeout(timer);
//   }

//   // If the timeout has already been triggered, but the function completes later, display the message.
//   if (timeoutTriggered && !turnEnded) {
//     console.log(`${totalPlayers.name}'s turn has ended.`);
//   }

//   return turnEnded;
// }


// // Define your player, draw pile, and face-down pile
// const totalPlayers = {
//   name: 'Player 1',
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Diamonds', value: 'Ace' },
//     // Add more cards as needed
//   ],
// };

// const drawPile4 = [
//   { suit: 'Hearts', value: '5' },
//   { suit: 'Spades', value: '7' },
//   // Add more cards as needed
// ];

// const faceDownPile4 = [
//   { suit: 'Clubs', value: '9' },
//   { suit: 'Diamonds', value: 'King' },
//   // Add more cards as needed
// ];

// console.log("Simulating Player 1's turn:");
// const turnEnded = simulatePlayerTurn(totalPlayers, drawPile4, faceDownPile4);

// if (turnEnded) {
//   console.log("Player 1's turn has ended.");
// } else {
//   console.log("Player 1's turn is still ongoing.");
// }


function simulatePlayerTurn(totalPlayers, drawPile4, faceDownPile4) {
  console.log(`It's ${totalPlayers.name}'s turn`);
  displayHand(totalPlayers.hand);

  if (checkWinning(totalPlayers)) {
    console.log(`${totalPlayers.name} has won the game!`);
    return Promise.resolve(true);
  }

  return new Promise((resolve, reject) => {
    const turnTimeout = 5000; // 5 seconds in milliseconds

    const timer = setTimeout(() => {
      console.log(`${totalPlayers.name} took too long! Turn ended.`);
      // Handle the case when the player's turn times out, e.g., deduct points or skip the turn
      resolve(true); // Resolving the promise indicates the turn has ended
    }, turnTimeout);

    // Simulate drawing a card from the draw pile
    const drawnCard = drawCard(totalPlayers.hand, drawPile4);
    if (drawnCard) {
      console.log(`${totalPlayers.name} draws a card from the draw pile: ${drawnCard.value} of ${drawnCard.suit}`);
    }

    // Simulate drawing a card from the face-down pile
    const drawnFaceDownCard = drawFromFaceDownPile(totalPlayers.hand, faceDownPile4);
    if (drawnFaceDownCard) {
      console.log(`${totalPlayers.name} draws a card from the face-down pile: ${drawnFaceDownCard.value} of ${drawnFaceDownCard.suit}`);
    }

    // Example: Simulate discarding the first card in the player's hand (you can implement card selection logic here)
    if (totalPlayers.hand.length > 0) {
      const cardToDiscard = totalPlayers.hand[0];
      discardToFaceDownPile(totalPlayers.hand, cardToDiscard, faceDownPile4);
      console.log(`${totalPlayers.name} discards to the face-down pile: ${cardToDiscard.value} of ${cardToDiscard.suit}`);
    }

    // Clear the timeout since the player's turn ended
    clearTimeout(timer);
    resolve(true);
  });
}

// Define your player, draw pile, and face-down pile
const totalPlayers = {
  name: 'Player 1',
  hand: [
    { suit: 'Hearts', value: '2' },
    { suit: 'Diamonds', value: 'Ace' },
    // Add more cards as needed
  ],
};

const drawPile4 = [
  { suit: 'Hearts', value: '5' },
  { suit: 'Spades', value: '7' },
  // Add more cards as needed
];

const faceDownPile4 = [
  { suit: 'Clubs', value: '9' },
  { suit: 'Diamonds', value: 'King' },
  // Add more cards as needed
];

console.log("Simulating Player 1's turn:");
simulatePlayerTurn(totalPlayers, drawPile4, faceDownPile4)
  .then((turnEnded) => {
    if (turnEnded) {
      console.log("Player 1's turn has ended.");
    } else {
      console.log("Player 1's turn is still ongoing.");
    }
  });




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



