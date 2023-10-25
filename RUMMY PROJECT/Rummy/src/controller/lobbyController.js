const Lobby = require('../model/lobbyModel');

// Function to handle errors
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
};

// Create a new lobby
exports.createLobby = async (req, res) => {
  try {
    const { gameType, gameVariant, maxPlayers } = req.body;

    const lobby = new Lobby({
      gameType,
      gameVariant,
      maxPlayers,
      players: [],
    });

    await lobby.save();
    res.status(201).json(lobby);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all lobbies
exports.listLobbies = async (req, res) => {
  try {
    const lobbies = await Lobby.find();
    res.status(200).json(lobbies);
  } catch (error) {
    handleError(res, error);
  }
};

// utils/cardUtils.js

// Define a standard deck of cards
// const standardDeck = [
//   '2 of Hearts', '3 of Hearts', '4 of Hearts', '5 of Hearts', '6 of Hearts',
//   '7 of Hearts', '8 of Hearts', '9 of Hearts', '10 of Hearts', 'Jack of Hearts',
//   'Queen of Hearts', 'King of Hearts', 'Ace of Hearts',
//   '2 of Diamonds', '3 of Diamonds', '4 of Diamonds', '5 of Diamonds', '6 of Diamonds',
//   '7 of Diamonds', '8 of Diamonds', '9 of Diamonds', '10 of Diamonds', 'Jack of Diamonds',
//   'Queen of Diamonds', 'King of Diamonds', 'Ace of Diamonds',
//   '2 of Clubs', '3 of Clubs', '4 of Clubs', '5 of Clubs', '6 of Clubs',
//   '7 of Clubs', '8 of Clubs', '9 of Clubs', '10 of Clubs', 'Jack of Clubs',
//   'Queen of Clubs', 'King of Clubs', 'Ace of Clubs',
//   '2 of Spades', '3 of Spades', '4 of Spades', '5 of Spades', '6 of Spades',
//   '7 of Spades', '8 of Spades', '9 of Spades', '10 of Spades', 'Jack of Spades',
//   'Queen of Spades', 'King of Spades', 'Ace of Spades'
// ];

// // Function to shuffle a deck of cards
// function shuffleDeck() {
//   const deck = [...standardDeck];
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck[i], deck[j]] = [deck[j], deck[i]];
//   }
//   return deck;
// }

// // Add other card-related utility functions as needed

// module.exports = {
//   shuffleDeck,
//   // Add more utility functions here
// };

// // In another file, e.g., gameLogic.js

// const cardUtils = require('./cardUtils');

// // Define the draw pile and player hands
// const drawPile = cardUtils.shuffleDeck();
// const player1Hand = [];
// const player2Hand = [];
// const discardPile = [];

// // Function to display a player's hand
// function displayHand(playerName, hand) {
//   console.log(`${playerName}'s Hand: ${hand.join(', ')}`);
// }

// // Function to simulate drawing a card from the draw pile
// function drawCard(hand, drawPile) {
//   if (drawPile.length === 0) {
//     console.log('Draw pile is empty.');
//     return null;
//   }

//   const drawnCard = drawPile.pop();
//   hand.push(drawnCard);
//   return drawnCard;
// }

// // Function to simulate discarding a card from the player's hand
// function discardCard(playerName, hand, discardPile) {
//   if (hand.length === 0) {
//     console.log(`${playerName}'s hand is empty.`);
//     return null;
//   }

//   const discardedCardIndex = Math.floor(Math.random() * hand.length);
//   const discardedCard = hand.splice(discardedCardIndex, 1)[0];
//   discardPile.push(discardedCard);
//   return discardedCard;
// }

// // Function to simulate a player taking a card from the discard pile
// function takeFromDiscardPile(playerName, hand, discardPile) {
//   if (discardPile.length === 0) {
//     console.log('Discard pile is empty.');
//     return null;
//   }

//   const takenCard = discardPile.pop();
//   hand.push(takenCard);
//   console.log(`${playerName} takes: ${takenCard} from the discard pile.`);
//   displayHand(playerName, hand);
//   return takenCard;
// }

// // Function to check if a group of cards forms a valid meld (sequence or set)
// function isValidMeld(cards) {
//   // Sort the cards by rank for easier comparison
//   cards.sort((a, b) => {
//     const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
//     return rankOrder.indexOf(a.split(' ')[0]) - rankOrder.indexOf(b.split(' ')[0]);
//   });

//   // Check for a valid sequence
//   if (isValidSequence(cards)) {
//     return true;
//   }

//   // Check for a valid set
//   if (isValidSet(cards)) {
//     return true;
//   }

//   return false;
// }

// // Function to check if a group of cards forms a valid sequence
// function isValidSequence(cards) {
//   const suits = new Set(cards.map(card => card.split(' ')[2]));

//   if (suits.size !== 1) {
//     return false; // All cards must have the same suit for a sequence
//   }

//   const values = cards.map(card => card.split(' ')[0]);
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

// // Function to check if a group of cards forms a valid set
// function isValidSet(cards) {
//   const ranks = new Set(cards.map(card => card.split(' ')[0]));

//   if (ranks.size !== 1) {
//     return false; // All cards must have the same rank for a set
//   }

//   return true;
// }

// // -------------------------------Simulate player turns until the draw pile is empty------------------------//
// while (drawPile.length > 0) {
//   // Player 1's turn
//   console.log('Player 1\'s turn:');
//   const drawnCardPlayer1 = drawCard(player1Hand, drawPile);
//   if (drawnCardPlayer1) {
//     console.log(`Player 1 draws: ${drawnCardPlayer1}`);
//     displayHand('Player 1', player1Hand);

//     const discardedCardPlayer1 = discardCard('Player 1', player1Hand, discardPile);
//     if (discardedCardPlayer1) {
//       console.log(`Player 1 discards: ${discardedCardPlayer1}`);
//       displayHand('Player 1', player1Hand);
//     }

//     // Player 1 can also choose to take a card from the
//     // Player 1 can also choose to take a card from the discard pile
//     if (Math.random() < 0.5) {
//       const takenCardPlayer1 = takeFromDiscardPile('Player 1', player1Hand, discardPile);
//       if (takenCardPlayer1) {
//         console.log(`Player 1 takes: ${takenCardPlayer1} from the discard pile.`);
//         displayHand('Player 1', player1Hand);
//       }
//     }

//     // Check if Player 1 has a valid meld
//     const isValidMeldPlayer1 = isValidMeld(player1Hand);
//     console.log(`Player 1 has a valid meld: ${isValidMeldPlayer1 ? 'Yes' : 'No'}`);
//   }

//   // Player 2's turn
//   console.log('Player 2\'s turn:');
//   const drawnCardPlayer2 = drawCard(player2Hand, drawPile);
//   if (drawnCardPlayer2) {
//     console.log(`Player 2 draws: ${drawnCardPlayer2}`);
//     displayHand('Player 2', player2Hand);

//     const discardedCardPlayer2 = discardCard('Player 2', player2Hand, discardPile);
//     if (discardedCardPlayer2) {
//       console.log(`Player 2 discards: ${discardedCardPlayer2}`);
//       displayHand('Player 2', player2Hand);
//     }

//     // Player 2 can also choose to take a card from the discard pile
//     if (Math.random() < 0.5) {
//       const takenCardPlayer2 = takeFromDiscardPile('Player 2', player2Hand, discardPile);
//       if (takenCardPlayer2) {
//         console.log(`Player 2 takes: ${takenCardPlayer2} from the discard pile.`);
//         displayHand('Player 2', player2Hand);
//       }
//     }

//     // Check if Player 2 has a valid meld
//     const isValidMeldPlayer2 = isValidMeld(player2Hand);
//     console.log(`Player 2 has a valid meld: ${isValidMeldPlayer2 ? 'Yes' : 'No'}`);
//   }
// }

// console.log('Game Over!');
// console.log('Final Hands:');
// displayHand('Player 1', player1Hand);
// displayHand('Player 2', player2Hand);
// console.log('Discard Pile:', discardPile);

//------------------------------------------ Util.js -----------------------------------------------

// // Define card suits and values
// const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
// const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// // Function to initialize a deck of cards
// function initializeDeck() {
//   const deck = [];
//   for (const suit of suits) {
//     for (const value of values) {
//       deck.push({ suit, value });
//     }
//   }
//   return deck;
// }

// // Function to shuffle a deck of cards
// function shuffleDeck(deck) {
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck[i], deck[j]] = [deck[j], deck[i]];
//   }
// }

// // Function to deal cards to players
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

// // Function to draw a card from the draw pile
// function drawCard(playerHand, drawPile) {
//   if (drawPile.length === 0) {
//     console.log('Draw pile is empty.');
//     return null;
//   }
//   const card = drawPile.pop();
//   playerHand.push(card);
//   return card;
// }

// // Function to draw a card from the face-down pile
// function drawFromFaceDownPile(playerHand, faceDownPile) {
//   if (faceDownPile.length === 0) {
//     console.log('Face-down pile is empty.');
//     return null;
//   }
//   const card = faceDownPile.pop();
//   playerHand.push(card);
//   return card;
// }

// // Function to discard a card to the discard pile
// function discardCard(playerHand, cardToDiscard, discardPile) {
//   const index = playerHand.findIndex(
//     card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//   );
//   if (index !== -1) {
//     playerHand.splice(index, 1);
//     discardPile.push(cardToDiscard);
//   }
// }

// // Function to discard a card to the face-down pile
// function discardToFaceDownPile(playerHand, cardToDiscard, faceDownPile) {
//   const index = playerHand.findIndex(
//     card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//   );
//   if (index !== -1) {
//     playerHand.splice(index, 1);
//     faceDownPile.push(cardToDiscard);
//   }
// }

// // Function to initialize a game with the specified number of players
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

//   return { players, drawPile, faceDownPile, currentPlayerIndex, currentPlayer };
// }

// // Function to advance to the next player
// function nextPlayer(currentPlayerIndex, players) {
//   return (currentPlayerIndex + 1) % players.length;
// }

// // Function to display a player's hand
// function displayHand(playerHand) {
//   console.log("Player's Hand:");
//   for (const card of playerHand) {
//     console.log(`${card.value} of ${card.suit}`);
//   }
// }

// // Function to check if a sequence of cards is valid
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

// // Function to check if a set of cards is valid
// function isValidSet(cards) {
//   const uniqueSuits = new Set();
//   for (const card of cards) {
//     uniqueSuits.add(card.suit);
//   }
//   return uniqueSuits.size === 1;
// }

// // Function to check if a meld (sequence or set) is valid
// function isValidMeld(cards) {
//   return isValidSequence(cards) || isValidSet(cards);
// }

// // Example usage within your game logic
// const numPlayers = 3;
// const game = initializeGame(numPlayers);

// if (game) {
//   const currentPlayer = game.players[game.currentPlayerIndex];

//   // Display the player's hand
//   displayHand(currentPlayer.hand);

//   // Check if a sequence is valid
//   const sequence = [currentPlayer.hand[0], currentPlayer.hand[1], currentPlayer.hand[2]];
//   if (isValidSequence(sequence)) {
//     console.log("Valid sequence!");
//   } else {
//     console.log("Invalid sequence.");
//   }

//   // Check if a set is valid
//   const cardSet = [currentPlayer.hand[0], currentPlayer.hand[3], currentPlayer.hand[6]];
//   if (isValidSet(cardSet)) {
//     console.log("Valid set!");
//   } else {
//     console.log("Invalid set.");
//   }

//   // Check if a meld is valid
//   const validMeld = [currentPlayer.hand[0], currentPlayer.hand[1], currentPlayer.hand[2]];
//   const invalidMeld = [currentPlayer.hand[0], currentPlayer.hand[3], currentPlayer.hand[6]];

//   if (isValidMeld(validMeld)) {
//     console.log("Valid meld!");
//   } else {
//     console.log("Invalid meld.");
//   }

//   // Simulate a few player turns
//   console.log("\nSimulating Player Turns:");
//   for (let i = 0; i < 3; i++) {
//     console.log(`Turn ${i + 1}: ${currentPlayer.name}`);

//     // Player draws a card from the draw pile
//     const drawnCard = drawCard(currentPlayer.hand, game.drawPile);
//     if (drawnCard) {
//       console.log(`${currentPlayer.name} draws a card from the draw pile: ${drawnCard.value} of ${drawnCard.suit}`);
//       console.log(`${currentPlayer.name}'s Hand:`, currentPlayer.hand);
//       console.log('Draw Pile:', game.drawPile);
//     }

//     // Player draws a card from the face-down pile
//     const drawnFaceDownCard = drawFromFaceDownPile(currentPlayer.hand, game.faceDownPile);
//     if (drawnFaceDownCard) {
//       console.log(`${currentPlayer.name} draws a card from the face-down pile: ${drawnFaceDownCard.value} of ${drawnFaceDownCard.suit}`);
//       console.log(`${currentPlayer.name}'s Hand:`, currentPlayer.hand);
//       console.log('Face-Down Pile:', game.faceDownPile);
//     }

//     // Player discards a card to the face-down pile
//     const cardToDiscard = currentPlayer.hand[0]; // Discard the first card for demonstration
//     discardToFaceDownPile(currentPlayer.hand, cardToDiscard, game.faceDownPile);
//     console.log(`${currentPlayer.name} discards to the face-down pile: ${cardToDiscard.value} of ${cardToDiscard.suit}`);
//     console.log(`${currentPlayer.name}'s Hand:`, currentPlayer.hand);
//     console.log('Face-Down Pile:', game.faceDownPile);

//     // Move to the next player
//     game.currentPlayerIndex = nextPlayer(game.currentPlayerIndex, game.players);
//     game.currentPlayer = game.players[game.currentPlayerIndex];
//   }
// }



// Define card suits and values
// const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
// const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// // Function to initialize a deck of cards
// function initializeDeck() {
//   const deck = [];
//   for (const suit of suits) {
//     for (const value of values) {
//       deck.push({ suit, value });
//     }
//   }
//   return deck;
// }

// // Function to shuffle a deck of cards
// function shuffleDeck(deck) {
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck[i], deck[j]] = [deck[j], deck[i]];
//   }
// }

// // Function to deal cards to players
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

// // Function to draw a card from the draw pile
// function drawCard(playerHand, drawPile) {
//   if (drawPile.length === 0) {
//     console.log('Draw pile is empty.');
//     return null;
//   }
//   const card = drawPile.pop();
//   playerHand.push(card);
//   return card;
// }

// // Function to draw a card from the face-down pile
// function drawFromFaceDownPile(playerHand, faceDownPile) {
//   if (faceDownPile.length === 0) {
//     console.log('Face-down pile is empty.');
//     return null;
//   }
//   const card = faceDownPile.pop();
//   playerHand.push(card);
//   return card;
// }

// // Function to discard a card to the discard pile
// function discardCard(playerHand, cardToDiscard, discardPile) {
//   const index = playerHand.findIndex(
//     card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//   );
//   if (index !== -1) {
//     playerHand.splice(index, 1);
//     discardPile.push(cardToDiscard);
//   }
// }

// // Function to discard a card to the face-down pile
// function discardToFaceDownPile(playerHand, cardToDiscard, faceDownPile) {
//   const index = playerHand.findIndex(
//     card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//   );
//   if (index !== -1) {
//     playerHand.splice(index, 1);
//     faceDownPile.push(cardToDiscard);
//   }
// }

// // Function to initialize a game with the specified number of players
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

//   return { players, drawPile, faceDownPile, currentPlayerIndex, currentPlayer };
// }

// // Function to advance to the next player
// function nextPlayer(currentPlayerIndex, players) {
//   return (currentPlayerIndex + 1) % players.length;
// }

// // Function to display a player's hand
// function displayHand(playerHand) {
//   console.log("Player's Hand:");
//   for (const card of playerHand) {
//     console.log(`${card.value} of ${card.suit}`);
//   }
// }

// // Function to check if a sequence of cards is valid
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

// // Function to check if a set of cards is valid
// function isValidSet(cards) {
//   const uniqueSuits = new Set();
//   for (const card of cards) {
//     uniqueSuits.add(card.suit);
//   }
//   return uniqueSuits.size === 1;
// }

// // Function to check if a meld (sequence or set) is valid
// function isValidMeld(cards) {
//   return isValidSequence(cards) || isValidSet(cards);
// }

// // Function to calculate the score for a card
// function calculateCardScore(card) {
//   const value = card.value;
//   const isFaceCard = ['Jack', 'Queen', 'King'].includes(value);
//   const isHighValueCard = ['10', 'Jack', 'Queen', 'King', 'Ace'].includes(value);
//   const score = isFaceCard ? 10 : isHighValueCard ? 5 : parseInt(value);
//   return score;
// }

// // Function to calculate the score for a player's hand
// function calculateHandScore(playerHand) {
//   let totalScore = 0;

//   for (const card of playerHand) {
//     totalScore += calculateCardScore(card);
//   }

//   return totalScore;
// }

// // Function to check if a player has won
// function checkWinning(player) {
//   // Check if all cards in the player's hand form valid melds (sets or sequences)
//   const allMelds = [];

//   // Helper function to find all possible melds in a player's hand
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

//   // Check if any of the found melds contain all of the player's cards
//   const allPlayerCards = new Set(player.hand);
//   for (const meld of allMelds) {
//     const meldSet = new Set(meld);
//     if (meldSet.size === allPlayerCards.size) {
//       return true; // Player has won
//     }
//   }

//   return false; // Player has not won
// }

// // Function to simulate a player's turn
// function simulatePlayerTurn(player, drawPile, faceDownPile) {
//   console.log(`It's ${player.name}'s turn`);

//   // Display the player's hand
//   displayHand(player.hand);

//   // Check if the current player has won
//   if (checkWinning(player)) {
//     console.log(`${player.name} has won the game!`);
//     return true; // End the game
//   }

//   // Simulate drawing a card from the draw pile
//   const drawnCard = drawCard(player.hand, drawPile);
//   if (drawnCard) {
//     console.log(`${player.name} draws a card from the draw pile: ${drawnCard.value} of ${drawnCard.suit}`);
//   }

//   // Simulate drawing a card from the face-down pile
//   const drawnFaceDownCard = drawFromFaceDownPile(player.hand, faceDownPile);
//   if (drawnFaceDownCard) {
//     console.log(`${player.name} draws a card from the face-down pile: ${drawnFaceDownCard.value} of ${drawnFaceDownCard.suit}`);
//   }

//   // Simulate discarding a card to the face-down pile
//   const cardToDiscard = player.hand[0]; // Discard the first card for demonstration
//   discardToFaceDownPile(player.hand, cardToDiscard, faceDownPile);
//   console.log(`${player.name} discards to the face-down pile: ${cardToDiscard.value} of ${cardToDiscard.suit}`);

//   return false;
// }

// // Function to play a full game
// function playGame(numPlayers) {
//   const game = initializeGame(numPlayers);

//   if (!game) {
//     return; // Invalid number of players
//   }

//   let gameEnded = false;

//   while (!gameEnded) {
//     const currentPlayer = game.players[game.currentPlayerIndex];
//     gameEnded = simulatePlayerTurn(currentPlayer, game.drawPile, game.faceDownPile);
//     game.currentPlayerIndex = nextPlayer(game.currentPlayerIndex, game.players);
//   }

//   // Calculate scores at the end of the game
//   calculateAndDisplayScores(game.players);
// }

// // Example usage to play a game with 3 players
// playGame(3);



// //---------------------------------------- socket.js-------------------------------------------------

// // socket.js
// const socketIo = require('socket.io');
// const {
//   initializeDeck,
//   shuffleDeck,
//   dealCards,
//   drawCard,
//   discardCard,
//   drawFromFaceDownPile,
//   isValidSequence,
//   isValidSet,
//   isValidMeld,
//   initializeGame,
//   nextPlayer,
//   displayHand,
//   calculateCardScore,
//   calculateHandScore,
//   checkWinning,
//   simulatePlayerTurn,
// } = require('./utils/util'); // Include your utility functions

// function initializeSocket(server) {
//   const io = socketIo(server);

//   io.on('connection', (socket) => {
//     console.log('A user connected.');

//     let game; // Stores the current game state

//     // Initialize a game
//     socket.on('initializeGame', (numPlayers) => {
//       game = initializeGame(numPlayers);
//       if (game) {
//         socket.emit('gameInitialized', game);
//       } else {
//         socket.emit('invalidPlayerCount', 'Invalid number of players. The game supports 2 to 5 players.');
//       }
//     });

//     // Advance to the next player
//     socket.on('nextPlayer', () => {
//       if (game) {
//         game.currentPlayerIndex = nextPlayer(game.currentPlayerIndex, game.players);
//         socket.emit('nextPlayerIndex', game.currentPlayerIndex);
//       }
//     });

//     // Display a player's hand
//     socket.on('displayPlayerHand', (playerIndex) => {
//       if (game) {
//         const player = game.players[playerIndex];
//         displayHand(player.hand);
//         socket.emit('displayedPlayerHand', 'Player hand displayed.');
//       }
//     });

//     // Shuffle the deck
//     socket.on('shuffleDeck', () => {
//       if (game) {
//         shuffleDeck(game.drawPile);
//         socket.emit('shuffledDeck', game.drawPile);
//       }
//     });

//     // Deal cards to players
//     socket.on('dealCards', () => {
//       if (game) {
//         dealCards(game.players, game.drawPile);
//         socket.emit('dealtCards', game.players);
//       }
//     });

//     // Initialize the deck
//     socket.on('initializeDeck', () => {
//       const deck = initializeDeck();
//       socket.emit('initializedDeck', deck);
//     });

//     // Draw a card from the draw pile
//     socket.on('drawCard', (playerIndex) => {
//       if (game) {
//         const player = game.players[playerIndex];
//         const drawnCard = drawCard(player.hand, game.drawPile);
//         socket.emit('drawnCard', { playerHand: player.hand, drawnCard });
//       }
//     });

//     // Discard a card to the discard pile
//     socket.on('discardCard', (playerIndex, cardToDiscard) => {
//       if (game) {
//         const player = game.players[playerIndex];
//         discardCard(player.hand, cardToDiscard, game.discardPile);
//         socket.emit('discardedCard', { playerHand: player.hand, discardPile: game.discardPile });
//       }
//     });

//     // Draw a card from the face-down pile
//     socket.on('drawFromFaceDownPile', (playerIndex) => {
//       if (game) {
//         const player = game.players[playerIndex];
//         const drawnCard = drawFromFaceDownPile(player.hand, game.faceDownPile);
//         socket.emit('drawnFaceDownCard', { playerHand: player.hand, drawnCard });
//       }
//     });

//     // Check if a sequence is valid
//     socket.on('isValidSequence', (cards) => {
//       const isValid = isValidSequence(cards);
//       socket.emit('validSequence', isValid);
//     });

//     // Check if a set is valid
//     socket.on('isValidSet', (cards) => {
//       const isValid = isValidSet(cards);
//       socket.emit('validSet', isValid);
//     });

//     // Check if a meld is valid
//     socket.on('isValidMeld', (playerIndex) => {
//       if (game) {
//         const player = game.players[playerIndex];
//         const isMeldValid = isValidMeld(player.hand);
//         socket.emit('validMeld', isMeldValid);
//       }
//     });

//     // Check if a player has won
//     socket.on('checkWinning', (playerIndex) => {
//       if (game) {
//         const player = game.players[playerIndex];
//         const hasWon = checkWinning(player);
//         socket.emit('playerWinStatus', hasWon);
//       }
//     });

//     // Calculate the score for a card
//     socket.on('calculateCardScore', (card) => {
//       const score = calculateCardScore(card);
//       socket.emit('calculatedCardScore', score);
//     });

//     // Calculate the score for a player's hand
//     socket.on('calculateHandScore', (playerIndex) => {
//       if (game) {
//         const player = game.players[playerIndex];
//         const handScore = calculateHandScore(player.hand);
//         socket.emit('calculatedHandScore', handScore);
//       }
//     });

//     // Simulate a player's turn
//     socket.on('simulatePlayerTurn', (playerIndex) => {
//       if (game) {
//         const player = game.players[playerIndex];
//         const gameEnded = simulatePlayerTurn(player, game.drawPile, game.faceDownPile);
//         if (gameEnded) {
//           socket.emit('gameEnded', 'Game has ended.');
//         }
//       }
//     });

//     socket.on('disconnect', () => {
//       console.log('A user disconnected.');
//     });
//   });
// }

// module.exports = initializeSocket;







// socket.js
// const socketIo = require('socket.io');
// const {
//   initializeDeck,
//   shuffleDeck,
//   dealCards,
//   drawCard,
//   discardCard,
//   drawFromFaceDownPile,
//   isValidSequence,
//   isValidSet,
//   isValidMeld,
//   initializeGame,
//   nextPlayer,
//   displayHand,
//   calculateCardScore,
//   calculateHandScore,
//   checkWinning,
//   simulatePlayerTurn,
// } = require('./utils/util'); // Include your utility functions

// function initializeSocket(server) {
//   const io = socketIo(server);

//   io.on('connection', (socket) => {
//     console.log('A user connected.');

//     // Create a room for each socket connection
//     socket.on('createRoom', () => {
//       const room = Math.random().toString(36).substring(7);
//       socket.join(room);

//       // Initialize a game
//       socket.on('initializeGame', (numPlayers) => {
//         const game = initializeGame(numPlayers);
//         if (game) {
//           // Store the game state in the room object
//           socket.to(room).emit('gameInitialized', game);
//           socket.room = room;
//           socket.game = game;
//         } else {
//           socket.to(room).emit('invalidPlayerCount', 'Invalid number of players. The game supports 2 to 5 players.');
//         }
//       });

//       // Add other functions inside this room

//       // Advance to the next player
//       socket.on('nextPlayer', () => {
//         if (socket.game) {
//           socket.game.currentPlayerIndex = nextPlayer(socket.game.currentPlayerIndex, socket.game.players);
//           socket.to(socket.room).emit('nextPlayerIndex', socket.game.currentPlayerIndex);
//         }
//       });

//       // Display a player's hand
//       socket.on('displayPlayerHand', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           displayHand(player.hand);
//           socket.to(socket.room).emit('displayedPlayerHand', 'Player hand displayed.');
//         }
//       });

//       // Shuffle the deck
//       socket.on('shuffleDeck', () => {
//         if (socket.game) {
//           shuffleDeck(socket.game.drawPile);
//           socket.to(socket.room).emit('shuffledDeck', socket.game.drawPile);
//         }
//       });

//       // Deal cards to players
//       socket.on('dealCards', () => {
//         if (socket.game) {
//           dealCards(socket.game.players, socket.game.drawPile);
//           socket.to(socket.room).emit('dealtCards', socket.game.players);
//         }
//       });

//       // Initialize the deck
//       socket.on('initializeDeck', () => {
//         const deck = initializeDeck();
//         socket.emit('initializedDeck', deck);
//       });

//       // Draw a card from the draw pile
//       socket.on('drawCard', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const drawnCard = drawCard(player.hand, socket.game.drawPile);
//           socket.to(socket.room).emit('drawnCard', { playerHand: player.hand, drawnCard });
//         }
//       });

//       // Discard a card to the discard pile
//       socket.on('discardCard', (playerIndex, cardToDiscard) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           discardCard(player.hand, cardToDiscard, socket.game.discardPile);
//           socket.to(socket.room).emit('discardedCard', { playerHand: player.hand, discardPile: socket.game.discardPile });
//         }
//       });

//       // Draw a card from the face-down pile
//       socket.on('drawFromFaceDownPile', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const drawnCard = drawFromFaceDownPile(player.hand, socket.game.faceDownPile);
//           socket.to(socket.room).emit('drawnFaceDownCard', { playerHand: player.hand, drawnCard });
//         }
//       });

//       // Check if a sequence is valid
//       socket.on('isValidSequence', (cards) => {
//         const isValid = isValidSequence(cards);
//         socket.to(socket.room).emit('validSequence', isValid);
//       });

//       // Check if a set is valid
//       socket.on('isValidSet', (cards) => {
//         const isValid = isValidSet(cards);
//         socket.to(socket.room).emit('validSet', isValid);
//       });

//       // Check if a meld is valid
//       socket.on('isValidMeld', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const isMeldValid = isValidMeld(player.hand);
//           socket.to(socket.room).emit('validMeld', isMeldValid);
//         }
//       });

//       // Check if a player has won
//       socket.on('checkWinning', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const hasWon = checkWinning(player);
//           socket.to(socket.room).emit('playerWinStatus', hasWon);
//         }
//       });

//       // Calculate the score for a card
//       socket.on('calculateCardScore', (card) => {
//         const score = calculateCardScore(card);
//         socket.emit('calculatedCardScore', score);
//       });

//       // Calculate the score for a player's hand
//       socket.on('calculateHandScore', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const handScore = calculateHandScore(player.hand);
//           socket.to(socket.room).emit('calculatedHandScore', handScore);
//         }
//       });

//       // Simulate a player's turn
//       socket.on('simulatePlayerTurn', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const gameEnded = simulatePlayerTurn(player, socket.game.drawPile, socket.game.faceDownPile);
//           if (gameEnded) {
//             socket.to(socket.room).emit('gameEnded', 'Game has ended.');
//           }
//         }
//       });

//       socket.on('disconnect', () => {
//         console.log('A user disconnected.');
//       });
//     });
//   });
// }

// module.exports = initializeSocket;
