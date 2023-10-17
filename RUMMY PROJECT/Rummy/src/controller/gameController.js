const Game = require('../model/Game');
//const Player = require('../model/player'); // Assuming you have a Player model

// Create a new game
exports.createGame = async (req, res) => {
  try {
    const { name, maxPlayers } = req.body;
    const game = new Game({ name, maxPlayers });
    await game.save();
    res.status(201).json({ message: 'Game created successfully', game });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create the game' });
  }
};

// Get game details by ID
exports.getGameDetails = async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId).populate('players', 'username'); // Populate player details
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.status(200).json({ game });
  } catch (error) {
    res.status(500).json({ error: 'Unable to get game details' });
  }
};

// Add a player to the game
exports.addPlayerToGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { playerId } = req.body;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    if (game.players.includes(playerId)) {
      return res.status(400).json({ error: 'Player is already in the game' });
    }

    if (game.players.length >= game.maxPlayers) {
      return res.status(400).json({ error: 'Game is full' });
    }

    game.players.push(playerId);
    await game.save();

    res.status(200).json({ message: 'Player added to the game', game });
  } catch (error) {
    res.status(500).json({ error: 'Unable to add player to the game' });
  }
};


// utils.js

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
//   const sequences = [];
//   const sets = [];

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

// while (drawPile.length > 0) {
//   // Player 1's turn
//   playerTurn('Player 1', player1Hand, drawPile, discardPile);
//   announceMeld('Player 1');

//   // Player 2's turn
//   playerTurn('Player 2', player2Hand, drawPile, discardPile);
//   announceMeld('Player 2');
// }

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
// };

