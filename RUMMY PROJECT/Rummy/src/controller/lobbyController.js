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

