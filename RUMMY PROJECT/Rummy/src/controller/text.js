//------------------------------------------- Game Functions -------------------------------------------

// Define card suits and values
// const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
// const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// // Define game states
// const GameStates = {
//   NOT_STARTED: 'NOT_NOT_STARTED',
//   STARTED: 'STARTED',
//   ENDED: 'ENDED',
// };

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

// // Function to start a game with a specified number of players
// function startGameWithPlayers(numPlayers) {
//   const game = initializeGame(numPlayers);
//   game.state = GameStates.STARTED;

//   if (!game) {
//     return; // Invalid number of players
//   }

//   let gameEnded = false;

//   while (!gameEnded) {
//     const currentPlayer = game.players[game.currentPlayerIndex];

//     // Display the player's hand
//     displayHand(currentPlayer.hand);

//     // Check if the current player has won
//     if (checkWinning(currentPlayer)) {
//       console.log(`${currentPlayer.name} has won the game!`);
//       gameEnded = true; // End the game
//     }

//     // Simulate a player's turn
//     gameEnded = simulatePlayerTurn(currentPlayer, game.drawPile, game.faceDownPile) || gameEnded;

//     // Move to the next player
//     game.currentPlayerIndex = nextPlayer(game.currentPlayerIndex, game.players);
//   }

//   // Calculate scores at the end of the game
//   calculateAndDisplayScores(game.players);
//   game.state = GameStates.ENDED;
// }

// // Function to join a game
// function joinGame(game, playerName) {
//   if (game.state === GameStates.NOT_STARTED) {
//     game.players.push({ name: playerName, hand: [] });
//     console.log(`${playerName} has joined the game.`);
//   } else {
//     console.log('Cannot join the game. It has already started.');
//   }
// }

// // Function to rejoin a game
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

// // Function to end the game
// function endGame(game) {
//   if (game.state === GameStates.STARTED) {
//     console.log('The game has been ended.');
//     game.state = GameStates.ENDED;
//   } else {
//     console.log('The game is not currently in progress.');
//   }
// }

// // Function to leave the game
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

// // Example usage to start a game with 3 players
// const game = { players: [], state: GameStates.NOT_STARTED };
// joinGame(game, 'Player 1');
// joinGame(game, 'Player 2');
// startGameWithPlayers(2);  

// // Exported functions
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
//   isValidMeld,
//   calculateCardScore,
//   calculateHandScore,
//   checkWinning,
//   simulatePlayerTurn,
//   startGameWithPlayers,
//   joinGame,
//   rejoinGame,
//   endGame,
//   leaveGame,
// };






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

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

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

function drawCard(playerHand, drawPile) {
  if (drawPile.length === 0) {
    console.log('Draw pile is empty.');
    return null;
  }
  const card = drawPile.pop();
  playerHand.push(card);
  return card;
}

function drawFromFaceDownPile(playerHand, faceDownPile) {
  if (faceDownPile.length === 0) {
    console.log('Face-down pile is empty.');
    return null;
  }
  const card = faceDownPile.pop();
  playerHand.push(card);
  return card;
}

function discardCard(playerHand, cardToDiscard, discardPile) {
  const index = playerHand.findIndex(
    card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
  );
  if (index !== -1) {
    playerHand.splice(index, 1);
    discardPile.push(cardToDiscard);
  }
}

function discardToFaceDownPile(playerHand, cardToDiscard, faceDownPile) {
  const index = playerHand.findIndex(
    card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
  );
  if (index !== -1) {
    playerHand.splice(index, 1);
    faceDownPile.push(cardToDiscard);
  }
}

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

function nextPlayer(currentPlayerIndex, players) {
  return (currentPlayerIndex + 1) % players.length;
}

function displayHand(playerHand) {
  console.log("Player's Hand:");
  for (const card of playerHand) {
    console.log(`${card.value} of ${card.suit}`);
  }
}

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

function isValidSet(cards) {
  const uniqueSuits = new Set();
  for (const card of cards) {
    uniqueSuits.add(card.suit);
  }
  return uniqueSuits.size === 1;
}

function isValidMeld(cards) {
  return isValidSequence(cards) || isValidSet(cards);
}

function calculateCardScore(card) {
  const value = card.value;
  const isFaceCard = ['Jack', 'Queen', 'King'].includes(value);
  const isHighValueCard = ['10', 'Jack', 'Queen', 'King', 'Ace'].includes(value);
  const score = isFaceCard ? 10 : isHighValueCard ? 5 : parseInt(value);
  return score;
}

function calculateHandScore(playerHand) {
  let totalScore = 0;

  for (const card of playerHand) {
    totalScore += calculateCardScore(card);
  }

  return totalScore;
}

function checkWinning(player) {
  const allMelds = [];

  function findAllMelds(hand, currentMeld) {
    if (isValidMeld(currentMeld)) {
      allMelds.push([...currentMeld]);
    }
    for (let i = 0; i < hand.length; i++) {
      const card = hand[i];
      currentMeld.push(card);
      const remainingHand = [...hand.slice(0, i), ...hand.slice(i + 1)];
      findAllMelds(remainingHand, currentMeld);
      currentMeld.pop();
    }
  }

  findAllMelds(player.hand, []);

  const allPlayerCards = new Set(player.hand);
  for (const meld of allMelds) {
    const meldSet = new Set(meld);
    if (meldSet.size === allPlayerCards.size) {
      return true;
    }
  }

  return false;
}

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

function joinGame(game, playerName) {
  if (game.state === GameStates.NOT_STARTED) {
    game.players.push({ name: playerName, hand: [] });
    console.log(`${playerName} has joined the game.`);
  } else {
    console.log('Cannot join the game. It has already started.');
  }
}

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

function endGame(game) {
  if (game.state === GameStates.STARTED) {
    console.log('The game has been ended.');
    game.state = GameStates.ENDED;
  } else {
    console.log('The game is not currently in progress.');
  }
}

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

function startNewGame(game) {
  if (game.state === GameStates.ENDED) {
    game.players = [];
    game.state = GameStates.NOT_STARTED;
    console.log('A new game has started.');
  } else {
    console.log('Cannot start a new game. The previous game is not ended.');
  }
}

function calculateAndDisplayScores(players) {
  for (const player of players) {
    const score = calculateHandScore(player.hand);
    console.log(`${player.name}'s score: ${score}`);
  }
}

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






//---------------------------------------------- socket.js ------------------------------------------

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
//   joinGame,
//   rejoinGame,
//   startGameWithPlayers,
//   endGame,
//   leaveGame,
// } = require('../utils/util'); // Include your utility functions

// const GameStates = {
//   NOT_STARTED: 'NOT_NOT_STARTED',
//   STARTED: 'STARTED',
//   ENDED: 'ENDED',
// };

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

//       // Function to start a game with a specified number of players
//       socket.on('startGameWithPlayers', (numPlayers) => {
//         const game = startGameWithPlayers(numPlayers);
//         if (game) {
//           socket.to(socket.room).emit('gameStarted', game);
//           socket.game = game;
//         }
//       });

//       // Function to join a game
//       socket.on('joinGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           joinGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerJoined', `${playerName} has joined the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotJoin', 'Cannot join the game. It has already started.');
//         }
//       });

//       // Function to rejoin a game
//       socket.on('rejoinGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           rejoinGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerRejoined', `${playerName} has rejoined the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotRejoin', 'Cannot rejoin the game. It has already started.');
//         }
//       });

//       // Function to end the game
//       socket.on('endGame', () => {
//         if (socket.game.state === GameStates.STARTED) {
//           endGame(socket.game);
//           socket.to(socket.room).emit('gameEnded', 'The game has ended.');
//         }
//       });

//       // Function to leave the game
//       socket.on('leaveGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           leaveGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerLeft', `${playerName} has left the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotLeave', 'Cannot leave the game. It has already started.');
//         }
//       });
//     });
//   });
// }

// module.exports = initializeSocket;





const socketIo = require('socket.io');
const {
  initializeDeck,
  shuffleDeck,
  dealCards,
  drawCard,
  discardCard,
  drawFromFaceDownPile,
  isValidSequence,
  isValidSet,
  isValidMeld,
  initializeGame,
  nextPlayer,
  displayHand,
  calculateCardScore,
  calculateHandScore,
  checkWinning,
  simulatePlayerTurn,
  joinGame,
  rejoinGame,
  startGameWithPlayers,
  endGame,
  leaveGame,
  continuePreviousGame,
  startNewGame,
} = require('../utils/util'); // Include your utility functions

const GameStates = {
  NOT_STARTED: 'NOT_NOT_STARTED',
  STARTED: 'STARTED',
  ENDED: 'ENDED',
};

function initializeSocket(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected.');

    // Create a room for each socket connection
    socket.on('createRoom', () => {
      const room = Math.random().toString(36).substring(7);
      socket.join(room);

      // Initialize a game
      socket.on('initializeGame', (numPlayers) => {
        const game = initializeGame(numPlayers);
        if (game) {
          // Store the game state in the room object
          socket.to(room).emit('gameInitialized', game);
          socket.room = room;
          socket.game = game;
        } else {
          socket.to(room).emit('invalidPlayerCount', 'Invalid number of players. The game supports 2 to 5 players.');
        }
      });

      // Add other functions inside this room

      // Advance to the next player
      socket.on('nextPlayer', () => {
        if (socket.game) {
          socket.game.currentPlayerIndex = nextPlayer(socket.game.currentPlayerIndex, socket.game.players);
          socket.to(socket.room).emit('nextPlayerIndex', socket.game.currentPlayerIndex);
        }
      });

      // Display a player's hand
      socket.on('displayPlayerHand', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          displayHand(player.hand);
          socket.to(socket.room).emit('displayedPlayerHand', 'Player hand displayed.');
        }
      });

      // Shuffle the deck
      socket.on('shuffleDeck', () => {
        if (socket.game) {
          shuffleDeck(socket.game.drawPile);
          socket.to(socket.room).emit('shuffledDeck', socket.game.drawPile);
        }
      });

      // Deal cards to players
      socket.on('dealCards', () => {
        if (socket.game) {
          dealCards(socket.game.players, socket.game.drawPile);
          socket.to(socket.room).emit('dealtCards', socket.game.players);
        }
      });

      // Initialize the deck
      socket.on('initializeDeck', () => {
        const deck = initializeDeck();
        socket.emit('initializedDeck', deck);
      });

      // Draw a card from the draw pile
      socket.on('drawCard', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const drawnCard = drawCard(player.hand, socket.game.drawPile);
          socket.to(socket.room).emit('drawnCard', { playerHand: player.hand, drawnCard });
        }
      });

      // Discard a card to the discard pile
      socket.on('discardCard', (playerIndex, cardToDiscard) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          discardCard(player.hand, cardToDiscard, socket.game.discardPile);
          socket.to(socket.room).emit('discardedCard', { playerHand: player.hand, discardPile: socket.game.discardPile });
        }
      });

      // Draw a card from the face-down pile
      socket.on('drawFromFaceDownPile', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const drawnCard = drawFromFaceDownPile(player.hand, socket.game.faceDownPile);
          socket.to(socket.room).emit('drawnFaceDownCard', { playerHand: player.hand, drawnCard });
        }
      });

      // Check if a sequence is valid
      socket.on('isValidSequence', (cards) => {
        const isValid = isValidSequence(cards);
        socket.to(socket.room).emit('validSequence', isValid);
      });

      // Check if a set is valid
      socket.on('isValidSet', (cards) => {
        const isValid = isValidSet(cards);
        socket.to(socket.room).emit('validSet', isValid);
      });

      // Check if a meld is valid
      socket.on('isValidMeld', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const isMeldValid = isValidMeld(player.hand);
          socket.to(socket.room).emit('validMeld', isMeldValid);
        }
      });

      // Check if a player has won
      socket.on('checkWinning', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const hasWon = checkWinning(player);
          socket.to(socket.room).emit('playerWinStatus', hasWon);
        }
      });

      // Calculate the score for a card
      socket.on('calculateCardScore', (card) => {
        const score = calculateCardScore(card);
        socket.emit('calculatedCardScore', score);
      });

      // Calculate the score for a player's hand
      socket.on('calculateHandScore', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const handScore = calculateHandScore(player.hand);
          socket.to(socket.room).emit('calculatedHandScore', handScore);
        }
      });

      // Simulate a player's turn
      socket.on('simulatePlayerTurn', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const gameEnded = simulatePlayerTurn(player, socket.game.drawPile, socket.game.faceDownPile);
          if (gameEnded) {
            socket.to(socket.room).emit('gameEnded', 'Game has ended.');
          }
        }
      });

      // Function to start a game with a specified number of players
      socket.on('startGameWithPlayers', (numPlayers) => {
        const game = startGameWithPlayers(numPlayers);
        if (game) {
          socket.to(socket.room).emit('gameStarted', game);
          socket.game = game;
        }
      });

      // Function to join a game
      socket.on('joinGame', (playerName) => {
        if (socket.game.state === GameStates.NOT_STARTED) {
          joinGame(socket.game, playerName);
          socket.to(socket.room).emit('playerJoined', `${playerName} has joined the game.`);
        } else {
          socket.to(socket.room).emit('cannotJoin', 'Cannot join the game. It has already started.');
        }
      });

      // Function to rejoin a game
      socket.on('rejoinGame', (playerName) => {
        if (socket.game.state === GameStates.NOT_STARTED) {
          rejoinGame(socket.game, playerName);
          socket.to(socket.room).emit('playerRejoined', `${playerName} has rejoined the game.`);
        } else {
          socket.to(socket.room).emit('cannotRejoin', 'Cannot rejoin the game. It has already started.');
        }
      });

      // Function to end the game
      socket.on('endGame', () => {
        if (socket.game.state === GameStates.STARTED) {
          endGame(socket.game);
          socket.to(socket.room).emit('gameEnded', 'The game has ended.');
        }
      });

      // Function to leave the game
      socket.on('leaveGame', (playerName) => {
        if (socket.game.state === GameStates.NOT_STARTED) {
          leaveGame(socket.game, playerName);
          socket.to(socket.room).emit('playerLeft', `${playerName} has left the game.`);
        } else {
          socket.to(socket.room).emit('cannotLeave', 'Cannot leave the game. It has already started.');
        }
      });

      // Function to continue the previous game
      socket.on('continuePreviousGame', (playerName) => {
        if (socket.game.state === GameStates.ENDED) {
          const player = socket.game.players.find(player => player.name === playerName);
          if (player) {
            socket.game.state = GameStates.STARTED;
            socket.to(socket.room).emit('gameContinued', `${playerName} has chosen to continue the previous game.`);
          } else {
            socket.to(socket.room).emit('cannotContinue', 'Cannot continue the previous game. Player not found.');
          }
        } else {
          socket.to(socket.room).emit('cannotContinue', 'Cannot continue the previous game. The game is not ended.');
        }
      });

      // Function to start a new game
      socket.on('startNewGame', () => {
        if (socket.game.state === GameStates.ENDED) {
          socket.game.players = [];
          socket.game.state = GameStates.NOT_STARTED;
          socket.to(socket.room).emit('newGameStarted', 'A new game has started.');
        } else {
          socket.to(socket.room).emit('cannotStartNew', 'Cannot start a new game. The previous game is not ended.');
        }
      });
    });
  });
}

module.exports = initializeSocket;
