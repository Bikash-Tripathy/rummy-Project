// controllers/rummyController.js
const rummyGameModel = require('../model/rummyGame');
const io = require('socket.io');

// exports.createGames = async (req, res) => {
//   try {
//     const { selectedPlayerCount } = req.body;

//     // Define game parameters based on selectedPlayerCount
//     let gameData = [];

//     if (selectedPlayerCount === "2") {
//       gameData = [
//         {
//           pointValue: 10,
//           minEntry: 2,
//           maxPlayer: 5,
//           totalPlayers: 2,
//           selectedPlayersRange: 5,
//           players: [],
//         },
//         {
//           pointValue: 20,
//           minEntry: 5,
//           maxPlayer: 2,
//           totalPlayers: 6,
//           selectedPlayersRange: 2,
//           players: [],
//         },
//       ];
//     } else if (selectedPlayerCount === "5") {
//       gameData = [
//         {
//           pointValue: 30,
//           minEntry: 4,
//           maxPlayer: 3,
//           totalPlayers: 5,
//           selectedPlayersRange: 5,
//           players: [],
//         },
//         {
//           pointValue: 40,
//           minEntry: 5,
//           maxPlayer: 5,
//           totalPlayers: 5,
//           selectedPlayersRange: 5,
//           players: [],
//         },
//       ];
//     } else {
//       // Handle invalid selectedPlayerCount here, if needed
//       res.status(400).json({ message: 'Invalid selectedPlayerCount' });
//       return;
//     }

//     // Create new game records with calculated parameters
//     const newGames = await rummyGameModel.insertMany(gameData);

//     res.json({ games: newGames });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
exports.createGames = async (req, res) => {
  try {
    const { selectedPlayerCount } = req.body;

    // Validate selectedPlayerCount
    if (selectedPlayerCount !== "2" && selectedPlayerCount !== "5") {
      res.status(400).json({ message: 'Invalid selectedPlayerCount' });
      return;
    }

    // Query the database to find games with matching selectedPlayersRange
    const games = await rummyGameModel.find({ selectedPlayersRange: selectedPlayerCount });
    //console.log(games)

    // If no games match, return an empty array
    if (!games || games.length === 0) {
      res.json({ games: [] });
      return;
    }

    res.json({ games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.createRummyGame = async (req, res) => {
    try {
      const createdGame = await rummyGameModel.create(req.body);
      //console.log(createdGame)
      res.status(201).json({
        message: 'Game created successfully',
        game: createdGame, 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getRummyGameById = async (req, res) => {
    try {
      const gameId = req.params.id; // Assuming the ID is in the URL parameter
  
      // Find the game by its ID
      const game = await rummyGameModel.findById(gameId);
  
      if (!game) {
        // If the game with the given ID is not found, return a 404 response
        res.status(404).json({ message: 'Game not found' });
        return;
      }
  
      // If the game is found, return it in the response
      res.status(200).json({ game });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


exports.joinGame = async (req, res) => {
  try {
    const { gameId, playerId } = req.body;

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.players.length >= game.selectedPlayersRange.max) {
      return res.status(400).json({ message: 'Game is full' });
    }

    game.players.push(playerId);

    await game.save();
    res.status(200).json({ message: 'Player joined the game' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function for leaving the game with confirmation
exports.leaveGame = async (req, res) => {
  try {
    const { gameId, playerId } = req.body; // Assuming both game ID and user ID are passed in the request body

    // Find the game by its ID
    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if the player is in the game
    const playerIndex = game.players.indexOf(playerId);
    if (playerIndex === -1) {
      return res.status(404).json({ message: 'Player not found in the game' });
    }

    // Remove the player from the game
    game.players.splice(playerIndex, 1);

    // Update the game in the database
    await game.save();

    res.status(200).json({ message: 'Player left the game' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



//const pendingInvitations = [];

// Function to create and return a standard deck of cards
function initializeDeck() {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

  const deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push(`${value} of ${suit}`);
    }
  }

  return deck;
}
// const deck = initializeDeck();
// console.log(deck);

//Function to shuffle the deck using the Fisher-Yates shuffle algorithm
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements to shuffle
  }
  return deck;
}
// const deck = [
//   'Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5',
//   'Card 6', 'Card 7', 'Card 8', 'Card 9', 'Card 10',
// ];

// shuffleDeck(deck);
// console.log('Shuffled deck:', deck);


// Function to deal cards to players from the shuffled deck
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
// const players = [
//   { name: "Player 1", hand: [] },
//   { name: "Player 2", hand: [] },
// ];

// const deck = [
//   'Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5',
//   'Card 6', 'Card 7', 'Card 8', 'Card 9', 'Card 10',
// ];

// dealCards(players, deck);
// console.log(players);






function initializeGame(game) {
  if (!game.players) {
    game.players = []; // Initialize the players array if it's not defined
  }

  const deck = initializeDeck();
  shuffleDeck(deck);

  // Ensure that each player has a 'hand' property
  for (const player of game.players) {
    player.hand = [];
  }

  dealCards(game.players, deck);

  game.currentPlayerIndex = 0;
  game.discardPile = [];
  game.drawPile = deck;
  game.gameEnded = false;
}
function isValidSequence(cards) {
  const suits = new Set(cards.map(card => card.split(' ')[2]));

  if (suits.size !== 1) {
    return false; // All cards must have the same suit for a sequence
  }

  const values = cards.map(card => card.split(' ')[0]);
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

// Test the function with an example sequence
// const cards = ['10 of Hearts', 'Jack of Hearts', 'Queen of Hearts', 'King of Hearts', 'Ace of Hearts'];
// const result = isValidSequence(cards);
// console.log('Is the sequence valid?', result);


function isValidSet(cards) {
  const ranks = new Set(cards.map(card => card.split(' ')[0]));

  if (ranks.size !== 1) {
    return false; // All cards must have the same rank for a set
  }

  return true;
}
// const cards = ['Ace of Hearts', 'Ace of Diamonds', 'Ace of Clubs'];
// const result = isValidSet(cards);
// console.log('Is the set valid?', result);

function isValidMeld(cards) {
  // Sort the cards by rank for easier comparison
  cards.sort((a, b) => {
    const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    return rankOrder.indexOf(a.split(' ')[0]) - rankOrder.indexOf(b.split(' ')[0]);
  });

  // Check for a valid sequence
  if (isValidSequence(cards)) {
    return true;
  }

  // Check for a valid set
  if (isValidSet(cards)) {
    return true;
  }

  return false;
}

// Define isValidSequence and isValidSet functions here if not already defined

// const cards = [
//   '2 of Hearts', '3 of Hearts', '4 of Hearts', '5 of Hearts', '6 of Hearts',
// ];

// const result = isValidMeld(cards);
// console.log('Is the meld valid?', result);




// API endpoint to start the game
exports.startGame = async (req, res) => {
  try {
    const gameId = req.body.gameId; // Assuming the game ID is passed in the request body
    const playerName = req.body.playerName; // Assuming the player's name is passed in the request body

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if the game is full and all players have joined
    if (game.players.length < game.selectedPlayersRange.max) {
      return res.status(400).json({ message: 'Not all players have joined the game' });
    }

    // Check if the player initiating the game is part of the joined players
    if (!game.players.includes(playerName)) {
      return res.status(400).json({ message: 'You are not part of this game' });
    }

    // Initialize the game state
    // initializeGame(game);

    // Emit a Socket.IO event to notify all players that the game has started
    // io.to(gameId).emit('gameStarted', { gameId: game._id });

    res.status(200).json({ message: 'The game has started' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Handle player's turn to play a card
exports.playCard = async (req, res) => {
  try {
    const gameId = req.body.gameId; // Assuming the game ID is passed in the request body
    const playerName = req.body.playerName; // Assuming the player's name is passed in the request body
    const card = req.body.card; // Assuming the card to be played is passed in the request body

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if it's the player's turn to play
    if (game.players[game.currentPlayerIndex] !== playerName) {
      return res.status(400).json({ message: "It's not your turn to play" });
    }

    // Implement card validation and game-specific logic here
    if (!isValidCard(game, card)) {
      return res.status(400).json({ message: 'Invalid card' });
    }

    // Update the game state as needed
    game.discardPile.push(card);

    // Move to the next player's turn
    game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;

    // Emit a Socket.IO event to notify all players of the updated game state
    io.to(gameId).emit('gameStateUpdated', { gameId: game._id, gameState: game });

    res.status(200).json({ message: 'Card played successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


// Route to invite players to the game
exports.invitePlayers = async (req, res) => {
  try {
    const gameId = req.body.gameId;
    const playerName = req.body.playerName;
    const invitedPlayers = req.body.invitedPlayers;

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (!game.players.includes(playerName)) {
      return res.status(400).json({ message: 'You are not part of this game' });
    }

    const availablePlayers = game.players.filter(player => !player.game);

    const acceptedInvitations = [];
    const rejectedInvitations = [];

    for (const invitedPlayer of invitedPlayers) {
      const player = availablePlayers.find(player => player.name === invitedPlayer);

      if (player) {
        // Emit a Socket.IO event to notify the invited player
        io.to(player.socketId).emit('invitation', {
          gameId,
          inviter: playerName,
        });

        acceptedInvitations.push(invitedPlayer);
      } else {
        rejectedInvitations.push(invitedPlayer);
      }
    }

    res.status(200).json({
      message: 'Invitations sent successfully',
      acceptedInvitations,
      rejectedInvitations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' }); 
  }
};


//Function to accept an invitation
exports.acceptInvitation = async (req, res) => {
  try {
    const gameId = req.body.gameId;
    const playerName = req.body.playerName;

    const invitationIndex = pendingInvitations.findIndex(
      invitation => invitation.gameId === gameId && invitation.invitee === playerName
    );

    if (invitationIndex === -1) {
      return res.status(400).json({ message: 'No pending invitation found' });
    }

    const [invitation] = pendingInvitations.splice(invitationIndex, 1);

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    game.players.push(playerName);

    // Emit a Socket.IO event to notify the inviter that the invitation was accepted
    io.to(invitation.inviterSocketId).emit('invitationAccepted', {
      gameId,
      invitee: playerName,
    });

    res.status(200).json({ message: 'Invitation accepted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// function sendInvitationNotification(playerName, gameId, io) {
//   // Find the socket associated with the invited player, assuming you have a way to map players to sockets
//   const invitedPlayerSocket = io.sockets.connected[playerName];

//   if (invitedPlayerSocket) {
//     // Emit a custom event to send the invitation
//     invitedPlayerSocket.emit('invitation', { gameId, inviter: playerName });
//   } else {
//     console.log(`Player ${playerName} not found or not connected.`);
//   }
// }

// // Function to send an invitation accepted notification to the inviter via Socket.IO
// function sendInvitationAcceptedNotification(inviterName, playerName, gameId, io) {
//   // Find the socket associated with the inviter, assuming you have a way to map players to sockets
//   const inviterSocket = io.sockets.connected[inviterName];

//   if (inviterSocket) {
//     // Emit a custom event to send the accepted invitation notification to the inviter
//     inviterSocket.emit('invitationAccepted', { gameId, invitee: playerName });
//   } else {
//     console.log(`Inviter ${inviterName} not found or not connected.`);
//   }
// }
