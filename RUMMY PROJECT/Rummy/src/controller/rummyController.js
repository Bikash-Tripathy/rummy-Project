// controllers/rummyController.js
const rummyGameModel = require('../model/rummyGame');
//const io = require('socket.io');

exports.createGames = async (req, res) => {
  try {
    const requestData = req.body;

    const newGames = await rummyGameModel.insertMany(requestData);
    //const numberOfGames = newGames.length;

    res.json({ games: newGames });
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


exports.joinGame = async (req, res) => {
  try {
    const { gameId, playerName } = req.body;

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.players.length >= game.selectedPlayersRange.max) {
      return res.status(400).json({ message: 'Game is full' });
    }

    game.players.push(playerName);

    await game.save();
    res.status(200).json({ message: 'Player joined the game' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// const pendingInvitations = [];
// // Start a Rummy game with selected players
// exports.startGame = async (req, res) => {
//   try {
//     const gameId = req.body.gameId; // Assuming the game ID is passed in the request body
//     const playerName = req.body.playerName; // Assuming the player's name is passed in the request body

//     const game = await rummyGameModel.findById(gameId);

//     if (!game) {
//       return res.status(404).json({ message: 'Game not found' });
//     }

//     // Check if the game is full and all players have joined
//     if (game.players.length < game.selectedPlayersRange.max) {
//       return res.status(400).json({ message: 'Not all players have joined the game' });
//     }

//     // Check if the player initiating the game is part of the joined players
//     if (!game.players.includes(playerName)) {
//       return res.status(400).json({ message: 'You are not part of this game' });
//     }

//     // Initialize the game state, including deck creation, shuffling, and dealing cards
//     initializeGame(game);

//     // Emit a Socket.IO event to notify all players that the game has started
//     io.to(gameId).emit('gameStarted', { gameId: game._id });

//     res.status(200).json({ message: 'The game has started' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Function to initialize the game state, deal cards, etc.
// function initializeGame(game) {
//   // Initialize game state, create a shuffled deck, and deal cards to players
//   const deck = initializeDeck();
//   shuffleDeck(deck);
//   dealCards(game.players, deck);

//   // Set initial game state variables, such as the current player, discard pile, etc.
//   game.currentPlayerIndex = 0;
//   game.discardPile = [];
//   game.drawPile = deck;
//   game.gameEnded = false;
// }

// // Function to create and return a standard deck of cards
// function initializeDeck() {
//   const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
//   const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

//   const deck = [];

//   for (const suit of suits) {
//     for (const value of values) {
//       deck.push(`${value} of ${suit}`);
//     }
//   }

//   return deck;
// }

// // Function to shuffle the deck using the Fisher-Yates shuffle algorithm
// function shuffleDeck(deck) {
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
//   }
// }

// // Function to deal cards to players from the shuffled deck
// function dealCards(players, deck) {
//   const numberOfCardsPerPlayer = 10; // Adjust as needed

//   for (const player of players) {
//     player.hand = [];

//     for (let i = 0; i < numberOfCardsPerPlayer; i++) {
//       const card = deck.pop(); // Remove and get the last card from the deck
//       if (card) {
//         player.hand.push(card); // Add the card to the player's hand
//       }
//     }
//   }
// }

// // Handle player's turn to play a card
// exports.playCard = async (req, res) => {
//   try {
//     const gameId = req.body.gameId; // Assuming the game ID is passed in the request body
//     const playerName = req.body.playerName; // Assuming the player's name is passed in the request body
//     const card = req.body.card; // Assuming the card to be played is passed in the request body

//     const game = await rummyGameModel.findById(gameId);

//     if (!game) {
//       return res.status(404).json({ message: 'Game not found' });
//     }

//     // Check if it's the player's turn to play
//     if (game.players[game.currentPlayerIndex] !== playerName) {
//       return res.status(400).json({ message: "It's not your turn to play" });
//     }

//     // Implement card validation and game-specific logic here
//     if (!isValidCard(game, card)) {
//       return res.status(400).json({ message: 'Invalid card' });
//     }

//     // Update the game state as needed
//     game.discardPile.push(card);

//     // Move to the next player's turn
//     game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;

//     // Emit a Socket.IO event to notify all players of the updated game state
//     io.to(gameId).emit('gameStateUpdated', { gameId: game._id, gameState: game });

//     res.status(200).json({ message: 'Card played successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }

// // Function to validate if a card can be played
// //function isValidCard(game, card) {
//   // Implement card validation logic here based on the game rules
//   // For example, check if the card matches the rules for the current game state

//   //return true; // Return true if the card is valid, false otherwise
// //}

// // Route to invite players to the game
// exports.invitePlayers = async (req, res) => {
//   try {
//     const gameId = req.body.gameId; // Assuming the game ID is passed in the request body
//     const playerName = req.body.playerName; // Assuming the player's name is passed in the request body
//     const invitedPlayers = req.body.invitedPlayers; // An array of player names to be invited

//     const game = await rummyGameModel.findById(gameId);

//     if (!game) {
//       return res.status(404).json({ message: 'Game not found' });
//     }

//     // Check if the player initiating the invitation is part of the game
//     if (!game.players.includes(playerName)) {
//       return res.status(400).json({ message: 'You are not part of this game' });
//     }

//     // Check if the invited players are available and not already invited
//     const availablePlayers = game.players.filter(player => !player.game); // Assuming 'game' is a property indicating if a player is in a game

//     const acceptedInvitations = [];
//     const rejectedInvitations = [];

//     for (const invitedPlayer of invitedPlayers) {
//       const player = availablePlayers.find(player => player.name === invitedPlayer);

//       if (player) {
//         // Send an invitation to the player
//         pendingInvitations.push({ gameId, inviter: playerName, invitee: invitedPlayer });
//         acceptedInvitations.push(invitedPlayer);
//       } else {
//         rejectedInvitations.push(invitedPlayer);
//       }
//     }

//     // Send responses to the inviter
//     res.status(200).json({
//       message: 'Invitations sent successfully',
//       acceptedInvitations,
//       rejectedInvitations,
//     });

//     // Emit a Socket.IO event to notify invited players
//     const io = require('socket.io'); // Replace with your Socket.IO import

//     for (const invitedPlayer of acceptedInvitations) {
//       // Assuming you have a function to send notifications to players via Socket.IO
//       sendInvitationNotification(invitedPlayer, gameId, io);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Function to accept an invitation
// exports.acceptInvitation = async (req, res) => {
//   try {
//     const gameId = req.body.gameId; // Assuming the game ID is passed in the request body
//     const playerName = req.body.playerName; // Assuming the player's name is passed in the request body

//     // Check if there's a pending invitation for this player and game
//     const invitationIndex = pendingInvitations.findIndex(
//       invitation => invitation.gameId === gameId && invitation.invitee === playerName
//     );

//     if (invitationIndex === -1) {
//       return res.status(400).json({ message: 'No pending invitation found' });
//     }

//     // Remove the invitation from the pending list
//     const [invitation] = pendingInvitations.splice(invitationIndex, 1);

//     // Add the player to the game
//     const game = await rummyGameModel.findById(gameId);

//     if (!game) {
//       return res.status(404).json({ message: 'Game not found' });
//     }

//     game.players.push(playerName);

//     // Notify the inviter that the invitation was accepted
//     //const io = require('socket.io'); // Replace with your Socket.IO import

//     // Assuming you have a function to send notifications to players via Socket.IO
//     sendInvitationAcceptedNotification(invitation.inviter, playerName, gameId, io);

//     res.status(200).json({ message: 'Invitation accepted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // function sendInvitationNotification(playerName, gameId, io) {
// //   // Find the socket associated with the invited player, assuming you have a way to map players to sockets
// //   const invitedPlayerSocket = io.sockets.connected[playerName];

// //   if (invitedPlayerSocket) {
// //     // Emit a custom event to send the invitation
// //     invitedPlayerSocket.emit('invitation', { gameId, inviter: playerName });
// //   } else {
// //     console.log(`Player ${playerName} not found or not connected.`);
// //   }
// // }

// // // Function to send an invitation accepted notification to the inviter via Socket.IO
// // function sendInvitationAcceptedNotification(inviterName, playerName, gameId, io) {
// //   // Find the socket associated with the inviter, assuming you have a way to map players to sockets
// //   const inviterSocket = io.sockets.connected[inviterName];

// //   if (inviterSocket) {
// //     // Emit a custom event to send the accepted invitation notification to the inviter
// //     inviterSocket.emit('invitationAccepted', { gameId, invitee: playerName });
// //   } else {
// //     console.log(`Inviter ${inviterName} not found or not connected.`);
// //   }
// // }
