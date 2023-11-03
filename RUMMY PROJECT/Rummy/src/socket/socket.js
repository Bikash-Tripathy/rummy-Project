
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
//   continuePreviousGame,
//   startNewGame,
// } = require('../utils/util'); // Include your utility functions

// const GameStates = {
//   NOT_STARTED: 'NOT_NOT_STARTED',
//   STARTED: 'STARTED',
//   ENDED: 'ENDED',
// };

// const gameId = "game1"
// function initializeSocket(server) {
//   const io = socketIo(server);
//   // io.use(verifySocketAuth)
//   io.on('connection', (socket) => {
//     console.log('A user connected.');
//     const personalRroom = socket.handshake.query.id
//     socket.join(personalRroom)
//     // Create a room for each socket connection
//     socket.on('join game',(gameId)=>{
//       socket.join(gameId)
//     })
//     socket.on('createRoom', () => {
//       const room = Math.random().toString(36).substring(7);
//       socket.join(room);

//       //========================================= Initialize a game =====================================

//       socket.on('initializeGame', (gameId) => {
//         /// db call for game details
//         //const game = await rummyGameModel.findById(gameId);

//         socket.join(gameId)
//         const numPlayers = 2
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

//       //=================================== Advance to the next player ==================================

//       socket.on('nextPlayer', () => {
//         if (socket.game) {
//           socket.game.currentPlayerIndex = nextPlayer(socket.game.currentPlayerIndex, socket.game.players);
//           socket.to(socket.room).emit('nextPlayerIndex', socket.game.currentPlayerIndex);
//         }
//       });

//       //=================================== Display a player's hand =====================================

//       socket.on('displayPlayerHand', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           displayHand(player.hand);
//           socket.to(socket.room).emit('displayedPlayerHand', 'Player hand displayed.');
//         }
//       });

//       //========================================= Shuffle the deck =======================================

//       socket.on('shuffleDeck', () => {
//         if (socket.game) {
//           shuffleDeck(socket.game.drawPile);
//           socket.to(socket.room).emit('shuffledDeck', socket.game.drawPile);
//         }
//       });

//       //======================================= Deal cards to players ====================================

//       socket.on('dealCards', () => {
//         if (socket.game) {
//           dealCards(socket.game.players, socket.game.drawPile);
//           socket.to(socket.room).emit('dealtCards', socket.game.players);
//         }
//       });

//       //------------------------------------- Initialize the deck ---------------------------------------

//       // socket.on('initializeDeck', () => {
//       //   const deck = initializeDeck();
//       //   socket.emit('initializedDeck', deck);
//       // });

//      socket.emit('message', 'Welcome to the server!');
//       socket.on('message',(data)=>{
//         console.log(data)
//         socket.to()
//       })
//      socket.on('test',()=>{
//         const deck = initializeDeck();
//          console.log(deck)
//         socket.emit('shuffleDeck',{deck});
//       })

//       //------------------------------- Draw a card from the draw pile --------------------------------------
//       socket.on('drawCard', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const drawnCard = drawCard(player.hand, socket.game.drawPile);
//           socket.to(socket.room).emit('drawnCard', { playerHand: player.hand, drawnCard });
//         }
//       });

//       //------------------------------ Discard a card to the discard pile --------------------------------

//       socket.on('discardCard', (playerIndex, cardToDiscard) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           discardCard(player.hand, cardToDiscard, socket.game.discardPile);
//           socket.to(socket.room).emit('discardedCard', { playerHand: player.hand, discardPile: socket.game.discardPile });
//         }
//       });

//       //--------------------------- Draw a card from the face-down pile ---------------------------------

//       socket.on('drawFromFaceDownPile', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const drawnCard = drawFromFaceDownPile(player.hand, socket.game.faceDownPile);
//           socket.to(socket.room).emit('drawnFaceDownCard', { playerHand: player.hand, drawnCard });
//         }
//       });

//       //-------------------------------- Check if a sequence is valid ------------------------------------

//       socket.on('isValidSequence', (cards) => {
//         const isValid = isValidSequence(cards);
//         socket.to(socket.room).emit('validSequence', isValid);
//       });

//       //===================================== Check if a set is valid ===================================
//       socket.on('isValidSet', (cards) => {
//         const isValid = isValidSet(cards);
//         socket.to(socket.room).emit('validSet', isValid);
//       });

//       //==================================== Check if a meld is valid ===================================

//       socket.on('isValidMeld', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const isMeldValid = isValidMeld(player.hand);
//           socket.to(socket.room).emit('validMeld', isMeldValid);
//         }
//       });

//       //====================================== Check if a player has won ================================

//       socket.on('checkWinning', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const hasWon = checkWinning(player);
//           socket.to(socket.room).emit('playerWinStatus', hasWon);
//         }
//       });

//       //---------------------------------- Calculate the score for a card ===============================

//       socket.on('calculateCardScore', (card) => {
//         const score = calculateCardScore(card);
//         socket.emit('calculatedCardScore', score);
//       });

//       //--------------------------- Calculate the score for a player's hand -----------------------------

//       socket.on('calculateHandScore', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const handScore = calculateHandScore(player.hand);
//           socket.to(socket.room).emit('calculatedHandScore', handScore);
//         }
//       });

//       //---------------------------------- Simulate a player's turn -------------------------------------

//       socket.on('simulatePlayerTurn', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const gameEnded = simulatePlayerTurn(player, socket.game.drawPile, socket.game.faceDownPile);
//           if (gameEnded) {
//             socket.to(socket.room).emit('gameEnded', 'Game has ended.');
//           }
//         }
//       });

//       //--------------- Function to start a game with a specified number of players ---------------------

//       socket.on('startGameWithPlayers', (numPlayers) => {
//         const game = startGameWithPlayers(numPlayers);
//         if (game) {
//           socket.to(socket.room).emit('gameStarted', game);
//           socket.game = game;
//         }
//       });

//       //----------------------------------- Function to join a game -------------------------------------

//       socket.on('joinGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           joinGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerJoined', `${playerName} has joined the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotJoin', 'Cannot join the game. It has already started.');
//         }
//       });

//       //--------------------------------- Function to rejoin a game --------------------------------------

//       socket.on('rejoinGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           rejoinGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerRejoined', `${playerName} has rejoined the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotRejoin', 'Cannot rejoin the game. It has already started.');
//         }
//       });

//       //--------------------------------- Function to end the game --------------------------------------

//       socket.on('endGame', () => {
//         if (socket.game.state === GameStates.STARTED) {
//           endGame(socket.game);
//           socket.to(socket.room).emit('gameEnded', 'The game has ended.');
//         }
//       });

//       //------------------------------- Function to leave the game --------------------------------------

//       socket.on('leaveGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           leaveGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerLeft', `${playerName} has left the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotLeave', 'Cannot leave the game. It has already started.');
//         }
//       });

//       //-------------------------- Function to continue the previous game -------------------------------

//       socket.on('continuePreviousGame', (playerName) => {
//         if (socket.game.state === GameStates.ENDED) {
//           const player = socket.game.players.find(player => player.name === playerName);
//           if (player) {
//             socket.game.state = GameStates.STARTED;
//             socket.to(socket.room).emit('gameContinued', `${playerName} has chosen to continue the previous game.`);
//           } else {
//             socket.to(socket.room).emit('cannotContinue', 'Cannot continue the previous game. Player not found.');
//           }
//         } else {
//           socket.to(socket.room).emit('cannotContinue', 'Cannot continue the previous game. The game is not ended.');
//         }
//       });

//       //------------------------------- Function to start a new game -----------------------------------

//       socket.on('startNewGame', () => {
//         if (socket.game.state === GameStates.ENDED) {
//           socket.game.players = [];
//           socket.game.state = GameStates.NOT_STARTED;
//           socket.to(socket.room).emit('newGameStarted', 'A new game has started.');
//         } else {
//           socket.to(socket.room).emit('cannotStartNew', 'Cannot start a new game. The previous game is not ended.');
//         }
//       });
//     });
//   });
// }

// module.exports = initializeSocket;

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
//   continuePreviousGame,
//   startNewGame,
// } = require('../utils/util'); // Include your utility functions

// const GameStates = {
//   NOT_STARTED: 'NOT_NOT_STARTED',
//   STARTED: 'STARTED',
//   ENDED: 'ENDED',
// };
// const rooms = ['1','2']
// const gameId = "game1"
// function initializeSocket(server) {
//   const io = socketIo(server)
//   // io.use(verifySocketAuth)

//   io.on('connection', (socket) => {
//     console.log('A user connected.');
//     const personalRoom = socket.handshake.query.id
//     console.log('Player',personalRoom);
//     socket.join(`Player ${personalRoom}`)
//     socket.join(gameId)
//     // Create a room for each socket connection
//     socket.on('join game',(gameId='game1')=>{
//       socket.to('Player 1').emit('message','user joined')
//       socket.to('Player 2').emit('message','user joined')
//     })

//     socket.on('initializeGame', (gameId='game1') => {
//       //db call for game details
//       //const game = await rummyGameModel.findById(gameId);
//       // socket.join(gameId)
//       const numPlayers = 2
//       const game = initializeGame(numPlayers);
//       console.log(game);
//       const players = game.players
//       if (game) {
//         // Store the game state in the room object
//         io.to(players[0].name).emit('handCard', game.players[0].hand);
//         io.to(players[1].name).emit('handCard', game.players[1].hand);
//         io.to(gameId).emit('faceDownPiles', game.faceDownPile)
//       } else {
//         socket.to(gameId).emit('invalidPlayerCount', 'Invalid number of players. The game supports 2 to 5 players.');
//       }
//     });

//     socket.on('createRoom', () => {
//       const room = Math.random().toString(36).substring(7);
//       socket.join(room);

//       //========================================= Initialize a game =====================================

//       // Add other functions inside this room

//       //=================================== Advance to the next player ==================================

//       socket.on('nextPlayer', () => {
//         if (socket.game) {
//           socket.game.currentPlayerIndex = nextPlayer(socket.game.currentPlayerIndex, socket.game.players);
//           socket.to(socket.room).emit('nextPlayerIndex', socket.game.currentPlayerIndex);
//         }
//       });

//       //=================================== Display a player's hand =====================================

//       socket.on('displayPlayerHand', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           displayHand(player.hand);
//           socket.to(socket.room).emit('displayedPlayerHand', 'Player hand displayed.');
//         }
//       });

//       //========================================= Shuffle the deck =======================================

//       socket.on('shuffleDeck', () => {
//         if (socket.game) {
//           shuffleDeck(socket.game.drawPile);
//           socket.to(socket.room).emit('shuffledDeck', socket.game.drawPile);
//         }
//       });

//       //======================================= Deal cards to players ====================================

//       socket.on('dealCards', () => {
//         if (socket.game) {
//           dealCards(socket.game.players, socket.game.drawPile);
//           socket.to(socket.room).emit('dealtCards', socket.game.players);
//         }
//       });

//       //------------------------------------- Initialize the deck ---------------------------------------

//       // socket.on('initializeDeck', () => {
//       //   const deck = initializeDeck();
//       //   socket.emit('initializedDeck', deck);
//       // });

//      socket.emit('message', 'Welcome to the server!');
//       socket.on('message',(data)=>{
//         console.log(data)
//         socket.to()
//       })
//      socket.on('test',()=>{
//         const deck = initializeDeck();
//          console.log(deck)
//         socket.emit('shuffleDeck',{deck});
//       })

//       //------------------------------- Draw a card from the draw pile --------------------------------------
//       socket.on('drawCard', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const drawnCard = drawCard(player.hand, socket.game.drawPile);
//           socket.to(socket.room).emit('drawnCard', { playerHand: player.hand, drawnCard });
//         }
//       });

//       //------------------------------ Discard a card to the discard pile --------------------------------

//       socket.on('discardCard', (playerIndex, cardToDiscard) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           discardCard(player.hand, cardToDiscard, socket.game.discardPile);
//           socket.to(socket.room).emit('discardedCard', { playerHand: player.hand, discardPile: socket.game.discardPile });
//         }
//       });

//       //--------------------------- Draw a card from the face-down pile ---------------------------------

//       socket.on('drawFromFaceDownPile', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const drawnCard = drawFromFaceDownPile(player.hand, socket.game.faceDownPile);
//           socket.to(socket.room).emit('drawnFaceDownCard', { playerHand: player.hand, drawnCard });
//         }
//       });

//       //-------------------------------- Check if a sequence is valid ------------------------------------

//       socket.on('isValidSequence', (cards) => {
//         const isValid = isValidSequence(cards);
//         socket.to(socket.room).emit('validSequence', isValid);
//       });

//       //===================================== Check if a set is valid ===================================
//       socket.on('isValidSet', (cards) => {
//         const isValid = isValidSet(cards);
//         socket.to(socket.room).emit('validSet', isValid);
//       });

//       //==================================== Check if a meld is valid ===================================

//       socket.on('isValidMeld', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const isMeldValid = isValidMeld(player.hand);
//           socket.to(socket.room).emit('validMeld', isMeldValid);
//         }
//       });

//       //====================================== Check if a player has won ================================

//       socket.on('checkWinning', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const hasWon = checkWinning(player);
//           socket.to(socket.room).emit('playerWinStatus', hasWon);
//         }
//       });

//       //---------------------------------- Calculate the score for a card ===============================

//       socket.on('calculateCardScore', (card) => {
//         const score = calculateCardScore(card);
//         socket.emit('calculatedCardScore', score);
//       });

//       //--------------------------- Calculate the score for a player's hand -----------------------------

//       socket.on('calculateHandScore', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const handScore = calculateHandScore(player.hand);
//           socket.to(socket.room).emit('calculatedHandScore', handScore);
//         }
//       });

//       //---------------------------------- Simulate a player's turn -------------------------------------

//       socket.on('simulatePlayerTurn', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const gameEnded = simulatePlayerTurn(player, socket.game.drawPile, socket.game.faceDownPile);
//           if (gameEnded) {
//             socket.to(socket.room).emit('gameEnded', 'Game has ended.');
//           }
//         }
//       });

//       //--------------- Function to start a game with a specified number of players ---------------------

//       socket.on('startGameWithPlayers', (numPlayers) => {
//         const game = startGameWithPlayers(numPlayers);
//         if (game) {
//           socket.to(socket.room).emit('gameStarted', game);
//           socket.game = game;
//         }
//       });

//       //----------------------------------- Function to join a game -------------------------------------

//       socket.on('joinGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           joinGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerJoined', `${playerName} has joined the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotJoin', 'Cannot join the game. It has already started.');
//         }
//       });

//       //--------------------------------- Function to rejoin a game --------------------------------------

//       socket.on('rejoinGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           rejoinGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerRejoined', `${playerName} has rejoined the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotRejoin', 'Cannot rejoin the game. It has already started.');
//         }
//       });

//       //--------------------------------- Function to end the game --------------------------------------

//       socket.on('endGame', () => {
//         if (socket.game.state === GameStates.STARTED) {
//           endGame(socket.game);
//           socket.to(socket.room).emit('gameEnded', 'The game has ended.');
//         }
//       });

//       //------------------------------- Function to leave the game --------------------------------------

//       socket.on('leaveGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           leaveGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerLeft', `${playerName} has left the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotLeave', 'Cannot leave the game. It has already started.');
//         }
//       });

//       //-------------------------- Function to continue the previous game -------------------------------

//       socket.on('continuePreviousGame', (playerName) => {
//         if (socket.game.state === GameStates.ENDED) {
//           const player = socket.game.players.find(player => player.name === playerName);
//           if (player) {
//             socket.game.state = GameStates.STARTED;
//             socket.to(socket.room).emit('gameContinued', `${playerName} has chosen to continue the previous game.`);
//           } else {
//             socket.to(socket.room).emit('cannotContinue', 'Cannot continue the previous game. Player not found.');
//           }
//         } else {
//           socket.to(socket.room).emit('cannotContinue', 'Cannot continue the previous game. The game is not ended.');
//         }
//       });

//       //------------------------------- Function to start a new game -----------------------------------

//       socket.on('startNewGame', () => {
//         if (socket.game.state === GameStates.ENDED) {
//           socket.game.players = [];
//           socket.game.state = GameStates.NOT_STARTED;
//           socket.to(socket.room).emit('newGameStarted', 'A new game has started.');
//         } else {
//           socket.to(socket.room).emit('cannotStartNew', 'Cannot start a new game. The previous game is not ended.');
//         }
//       });
//     });
//   });
// }

// module.exports = initializeSocket;


//======================================== New Game Logic =============================================

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
const rooms = ['1','2']
const gameId = "game1"
function initializeSocket(server) {
  const io = socketIo(server)
  // io.use(verifySocketAuth)

  io.on('connection', (socket) => {
    console.log('A user connected.');
    const personalRoom = socket.handshake.query.id
    console.log('Player',personalRoom);
    socket.join(`Player ${personalRoom}`)
    socket.join(gameId)
    // Create a room for each socket connection
    socket.on('join game',(gameId='game1')=>{
      socket.to('Player 1').emit('message','user joined')
      socket.to('Player 2').emit('message','user joined')
    })

    socket.on('initializeGame', (gameId='game1') => {
      //db call for game details
      //const game = await rummyGameModel.findById(gameId);
      // socket.join(gameId)
      const numPlayers = 2
      const game = initializeGame(numPlayers);
      socket.game = game
      console.log(game);
      const players = game.players
      if (game) {
        // Store the game state in the room object
        io.to(players[0].name).emit('handCard', game.players[0].hand);
        io.to(players[1].name).emit('handCard', game.players[1].hand);
        io.to(gameId).emit('faceDownPiles', game.faceDownPile)
      } else {
        socket.to(gameId).emit('invalidPlayerCount', 'Invalid number of players. The game supports 2 to 5 players.');
      }
    });
    
    //draw card
    socket.on('drawCard', (playerIndex) => {
      if (socket.game) {
        const player = socket.game.players[playerIndex];
        const drawnCard = drawCard(player.hand, socket.game.drawPile);
        // socket.emit('')
        socket.emit('handCard', player.hand);
        socket.emit('drawnCard', drawnCard);
        io.to('game1').emit('faceDownPiles', socket.game.drawPile);
      }
    });

    // discard card
    socket.on('discardCard', (playerIndex, cardToDiscard) => {
      if (socket.game) {
        const player = socket.game.players[playerIndex];
        discardCard(player.hand, cardToDiscard, socket.game.faceUpPile);
        socket.emit('handCard', player.hand);
        io.to('game1').emit('faceUpPiles', socket.game.drawPile);
        socket.emit('discardedCard', socket.game.faceUpPile);
      }
    });

    socket.on('createRoom', () => {
      const room = Math.random().toString(36).substring(7);
      socket.join(room);

      //========================================= Initialize a game =====================================

      // Add other functions inside this room

      //=================================== Advance to the next player ==================================

      socket.on('nextPlayer', () => {
        if (socket.game) {
          socket.game.currentPlayerIndex = nextPlayer(socket.game.currentPlayerIndex, socket.game.players);
          socket.to(socket.room).emit('nextPlayerIndex', socket.game.currentPlayerIndex);
        }
      });

      //=================================== Display a player's hand =====================================

      socket.on('displayPlayerHand', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          displayHand(player.hand);
          socket.to(socket.room).emit('displayedPlayerHand', 'Player hand displayed.');
        }
      });

      //========================================= Shuffle the deck =======================================

      socket.on('shuffleDeck', () => {
        if (socket.game) {
          shuffleDeck(socket.game.drawPile);
          socket.to(socket.room).emit('shuffledDeck', socket.game.drawPile);
        }
      });

      //======================================= Deal cards to players ====================================

      socket.on('dealCards', () => {
        if (socket.game) {
          dealCards(socket.game.players, socket.game.drawPile);
          socket.to(socket.room).emit('dealtCards', socket.game.players);
        }
      });

      //------------------------------------- Initialize the deck ---------------------------------------

      // socket.on('initializeDeck', () => {
      //   const deck = initializeDeck();
      //   socket.emit('initializedDeck', deck);
      // });

     socket.emit('message', 'Welcome to the server!');
      socket.on('message',(data)=>{
        console.log(data)
        socket.to()
      })
     socket.on('test',()=>{
        const deck = initializeDeck();
         console.log(deck)
        socket.emit('shuffleDeck',{deck});
      })

      //------------------------------- Draw a card from the draw pile --------------------------------------
      socket.on('drawCard', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const drawnCard = drawCard(player.hand, socket.game.drawPile);
          socket.to(socket.room).emit('drawnCard', { playerHand: player.hand, drawnCard });
        }
      });

      //------------------------------ Discard a card to the discard pile --------------------------------

      socket.on('discardCard', (playerIndex, cardToDiscard) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          discardCard(player.hand, cardToDiscard, socket.game.discardPile);
          socket.to(socket.room).emit('discardedCard', { playerHand: player.hand, discardPile: socket.game.discardPile });
        }
      });

      //--------------------------- Draw a card from the face-down pile ---------------------------------

      socket.on('drawFromFaceDownPile', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const drawnCard = drawFromFaceDownPile(player.hand, socket.game.faceDownPile);
          socket.to(socket.room).emit('drawnFaceDownCard', { playerHand: player.hand, drawnCard });
        }
      });

      //-------------------------------- Check if a sequence is valid ------------------------------------

      socket.on('isValidSequence', (cards) => {
        const isValid = isValidSequence(cards);
        socket.to(socket.room).emit('validSequence', isValid);
      });

      //===================================== Check if a set is valid ===================================
      socket.on('isValidSet', (cards) => {
        const isValid = isValidSet(cards);
        socket.to(socket.room).emit('validSet', isValid);
      });

      //==================================== Check if a meld is valid ===================================

      socket.on('isValidMeld', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const isMeldValid = isValidMeld(player.hand);
          socket.to(socket.room).emit('validMeld', isMeldValid);
        }
      });

      //====================================== Check if a player has won ================================

      socket.on('checkWinning', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const hasWon = checkWinning(player);
          socket.to(socket.room).emit('playerWinStatus', hasWon);
        }
      });

      //---------------------------------- Calculate the score for a card ===============================

      socket.on('calculateCardScore', (card) => {
        const score = calculateCardScore(card);
        socket.emit('calculatedCardScore', score);
      });

      //--------------------------- Calculate the score for a player's hand -----------------------------

      socket.on('calculateHandScore', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const handScore = calculateHandScore(player.hand);
          socket.to(socket.room).emit('calculatedHandScore', handScore);
        }
      });

      //---------------------------------- Simulate a player's turn -------------------------------------

      socket.on('simulatePlayerTurn', (playerIndex) => {
        if (socket.game) {
          const player = socket.game.players[playerIndex];
          const gameEnded = simulatePlayerTurn(player, socket.game.drawPile, socket.game.faceDownPile);
          if (gameEnded) {
            socket.to(socket.room).emit('gameEnded', 'Game has ended.');
          }
        }
      });

      //--------------- Function to start a game with a specified number of players ---------------------

      socket.on('startGameWithPlayers', (numPlayers) => {
        const game = startGameWithPlayers(numPlayers);
        if (game) {
          socket.to(socket.room).emit('gameStarted', game);
          socket.game = game;
        }
      });

      //----------------------------------- Function to join a game -------------------------------------

      socket.on('joinGame', (playerName) => {
        if (socket.game.state === GameStates.NOT_STARTED) {
          joinGame(socket.game, playerName);
          socket.to(socket.room).emit('playerJoined', `${playerName} has joined the game.`);
        } else {
          socket.to(socket.room).emit('cannotJoin', 'Cannot join the game. It has already started.');
        }
      });

      //--------------------------------- Function to rejoin a game --------------------------------------

      socket.on('rejoinGame', (playerName) => {
        if (socket.game.state === GameStates.NOT_STARTED) {
          rejoinGame(socket.game, playerName);
          socket.to(socket.room).emit('playerRejoined', `${playerName} has rejoined the game.`);
        } else {
          socket.to(socket.room).emit('cannotRejoin', 'Cannot rejoin the game. It has already started.');
        }
      });

      //--------------------------------- Function to end the game --------------------------------------

      socket.on('endGame', () => {
        if (socket.game.state === GameStates.STARTED) {
          endGame(socket.game);
          socket.to(socket.room).emit('gameEnded', 'The game has ended.');
        }
      });

      //------------------------------- Function to leave the game --------------------------------------

      socket.on('leaveGame', (playerName) => {
        if (socket.game.state === GameStates.NOT_STARTED) {
          leaveGame(socket.game, playerName);
          socket.to(socket.room).emit('playerLeft', `${playerName} has left the game.`);
        } else {
          socket.to(socket.room).emit('cannotLeave', 'Cannot leave the game. It has already started.');
        }
      });

      //-------------------------- Function to continue the previous game -------------------------------

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

      //------------------------------- Function to start a new game -----------------------------------

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