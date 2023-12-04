// const { Server } = require('socket.io')
// const { Player, RummyGame } = require('./game')
// const players = {}
// const db = {}

// function initializeSocket(server) {
//   const io = new Server(server, { cors: true })
//   io.on('connection', socket => {
//     const id = socket.id
//     const userId = socket.handshake.query.id
//     socket.player = new Player(`Player-Name ${id}`, id, userId)
//     socket.join(socket.player.room)
//     console.log(`Player-Name ${id}`, `player-id-${id}`, ' Joined')
//     socket.use(([event, ...args], next) => {
//       const gameId = socket.gameId
//       const game = db[gameId]
//       console.log('on', event, 'start :')
//       const id = socket.player.room
//       console.log(id, game?.getCurrentPlayer().room)
//       if (event === 'draw' || event === 'drop') {
//         if (!gameId || !game) return
//         if (game.getCurrentPlayer().room !== id) {
//           socket.emit('message', 'Wait for your turn')
//           return next(new Error('Wait for your turn'))
//         }
//         if (event === 'drop' && game.getCurrentPlayer().hand.length !== 11) {
//           socket.emit('message', "Can't drop")
//           return next(new Error('Draw first'))
//         }
//         if (event === 'draw' && game.getCurrentPlayer().hand.length !== 10) {
//           socket.emit('message', "Can't draw")
//           return next(new Error('Drop first'))
//         }
//       }
//       next()
//     })
//     socket.on('game', gameId => {
//       socket.gameId = gameId
//       players[gameId] = [...(players[gameId] || []), socket.player]
//       socket.to(gameId).emit('message', `${socket.player.name} Joined the game`)
//       socket.join(gameId)
//       console.log('players', players[gameId])
//       if (players[gameId].length < 2) {
//         io.to(gameId).emit('message', 'Waiting for players to join')
//         return
//       }

//       if (db[gameId]) {
//         // players[gameId].find(e=>e.userId ===socket.player.userId)
//         return io.to(socket.id).emit('message', 'Room is full')
//       }
//       const game = new RummyGame(players[gameId], gameId)
//       db[gameId] = game
//       console.log(game)
//       io.to(socket.gameId).emit('message', 'game started')
//       game.players.map(player => {
//         console.log(player.name)
//         io.to(player.room).emit('hand', player.hand)
//       })
//       io.to(gameId).emit('down', game.deck.length)
//       io.to(gameId).emit('up', game.droppedDeck[game.droppedDeck.length - 1])
//       const currentPlayer = game.getCurrentPlayer()
//       game.intervalTimer = setInterval(() => {
//         console.log(
//           game.getCurrentPlayer().name,
//           game.getCurrentPlayer().hand.length
//         )
//         if (game.getCurrentPlayer().hand.length === 11) {
//           console.log('Auto dropping card log:')
//           return dropCard(io, socket)()
//         } else {
//           game.switchTurn()
//         }
//         console.log('player turn', game.getCurrentPlayer().name)
//         io.to(game.getCurrentPlayer().room).emit('turn', {
//           timeOut: 15,
//           canDraw: true,
//           canDrop: false,
//         })
//       }, 15000)
//     })

//     socket.on('draw', position => {
//       const gameId = socket.gameId
//       const game = db[gameId]
//       game.drawCard(position)
//       socket.emit('hand', game.getCurrentPlayer().hand)
//       io.to(gameId).emit('down', game.deck.length)
//       io.to(gameId).emit('up', game.droppedDeck[game.droppedDeck.length - 1])
//     })
//     socket.on('drop', card => {
//       dropCard(io, socket)(card)
//     })
//     socket.on('disconnect', () => {
//       console.log(socket.player.id, 'disconnected!')
//       const game = db[socket.gameId]
//       if (!game) return
//       clearInterval(game.intervalTimer)
//       io.to(game.gameId).emit('message', 'Game cancelled')
//       delete db[socket.gameId]
//       delete players[socket.gameId]
//       io.sockets.in(socket.gameId).disconnectSockets()
//       console.log(db)
//       console.log(players)
//     })
//   })
// }

// function dropCard(io, socket) {
//   return function (card) {
//     console.log('dropping card...')
//     const game = db[socket.gameId]
//     const gameId = game.gameId
//     const currentPlayer = game.getCurrentPlayer()
//     if (!card) {
//       console.log('auto dropping last card ')
//     }
//     game.intervalTimer.refresh()
//     game.dropCard(card)
//     io.to(currentPlayer.room).emit('hand', currentPlayer.hand)
//     io.to(gameId).emit('down', game.deck.length)
//     io.to(gameId).emit('up', game.droppedDeck[game.droppedDeck.length - 1])
//     game.switchTurn()
//     io.to(game.getCurrentPlayer().room).emit('turn', {
//       timeOut: 15,
//       canDraw: true,
//       canDrop: false,
//     })
//     console.log('on drop event end: ')
//   }
// }

// module.exports = initializeSocket



//2nd
//const fetch = require('node-fetch');
const { Server } = require('socket.io')
const { Player, RummyGame } = require('./game')
const db = {}
const gameDb = new Map()
function initializeSocket(server) {
  const io = new Server(server, { cors: true })
  io.on('connection', socket => {
    const id = socket.id
    const userId = socket.handshake.query.id
    socket.player = new Player(`Player-Name ${id}`, id, userId)
    socket.join(socket.player.room)
    console.log(`Player-Name ${id}`, `player-id-${id}`, ' Joined')
    socket.use(([event, ...args], next) => {
      const gameId = socket.gameId
      const game = db[gameId]
      console.log('on', event, 'start :')
      const id = socket.player.room
      console.log(id, game?.getCurrentPlayer().room)
      if (event === 'draw' || event === 'drop') {
        if (!gameId || !game) return
        if (game.getCurrentPlayer().room !== id) {
          socket.emit('message', 'Wait for your turn')
          return next(new Error('Wait for your turn'))
        }
        if (event === 'drop' && game.getCurrentPlayer().hand.length !== 11) {
          socket.emit('message', "Can't drop")
          return next(new Error('Draw first'))
        }
        if (event === 'draw' && game.getCurrentPlayer().hand.length !== 10) {
          socket.emit('message', "Can't draw")
          return next(new Error('Drop first'))
        }
      }
      next()
    })
    socket.on('game', async gameId => {
      try {
        socket.gameId = gameId
        const res = await fetch(
          'http://localhost:3000/rakesh/games/655febe2eabe6df8bcc1320f'
        ) 
        let gameData = await res.json()
        gameData = gameData.game
        console.log(gameData)
        if (!gameDb.get(gameId)) {
          gameDb.set(gameId).timer = setTimeout(() => {
            setImmediate(()=>{
              gameDb.delete(gameId)
            })
            if (gameData.players.length == 1) {
              gameDb.get(gameId)?.timer.refresh()
              return
            }
            console.log('auto start the game - ID: ', gameId)
            const game = new RummyGame(players, gameId)
            db[gameId] = game
            console.log(game)
            io.to(socket.gameId).emit('message', 'game started')
            startGame(io, socket, game)
            gameDb.delete(gameId)
          }, 20000)
        }
        if (gameData.players.length >= gameData.maxPlayer) {
          socket.to(socket.id).emit('message', `Room is full`)
          return
        }

        const players = gameData.players.map(id => new Player(id, id, id))
        socket
          .to(gameId)
          .emit('message', `${socket.player.name} Joined the game`)
        socket.join(gameId)
        if (players.length === gameData.maxPlayer) {
          clearTimeout(gameDb.get(gameId).timer)
          const game = new RummyGame(players, gameId)
          db[gameId] = game
          console.log(game)
          io.to(socket.gameId).emit('message', 'game started')
          startGame(io, socket, game)
        }
      } catch (error) {
        socket.emit('message','Game id does not exist')
        console.log(error)
        console.log('Invalid game Id')
      }
    })

    socket.on('draw', position => {
      const gameId = socket.gameId
      const game = db[gameId]
      game.drawCard(position)
      socket.emit('hand', game.getCurrentPlayer().hand)
      io.to(gameId).emit('down', game.deck.length)
      io.to(gameId).emit('up', game.droppedDeck[game.droppedDeck.length - 1])
    })
    socket.on('drop', card => {
      dropCard(io, socket)(card)
    })
    socket.on('disconnect', () => {
      console.log(socket.player.id, 'disconnected!')
      const game = db[socket.gameId]
      if (!game) return
      clearInterval(game.intervalTimer)
      io.to(game.gameId).emit('message', 'Game cancelled')
      delete db[socket.gameId]
      delete players[socket.gameId]
      io.sockets.in(socket.gameId).disconnectSockets()
      console.log(db)
      console.log(players)
    })
  })
}

function dropCard(io, socket) {
  return function (card) {
    console.log('dropping card...')
    const game = db[socket.gameId]
    const gameId = game.gameId
    const currentPlayer = game.getCurrentPlayer()
    if (!card) {
      console.log('auto dropping last card ')
    }
    game.intervalTimer.refresh()
    game.dropCard(card)
    io.to(currentPlayer.room).emit('hand', currentPlayer.hand)
    io.to(gameId).emit('down', game.deck.length)
    io.to(gameId).emit('up', game.droppedDeck[game.droppedDeck.length - 1])
    game.switchTurn()
    io.to(game.getCurrentPlayer().room).emit('turn', {
      timeOut: 15,
      canDraw: true,
      canDrop: false,
    })
    console.log('on drop event end: ')
  }
}

function startGame(io, socket, game) {
  game.players.map(player => {
    console.log(player.name)
    io.to(player.room).emit('hand', player.hand)
  })

  io.to(game.gameId).emit('down', game.deck.length)
  io.to(game.gameId).emit('up', game.droppedDeck[game.droppedDeck.length - 1])
  const currentPlayer = game.getCurrentPlayer()

  game.intervalTimer = setInterval(() => {
    console.log(
      game.getCurrentPlayer().name,
      game.getCurrentPlayer().hand.length
    )
    if (game.getCurrentPlayer().hand.length === 11) {
      console.log('Auto dropping card log:')
      return dropCard(io, socket)()
    } else {
      game.switchTurn()
    }
    console.log('player turn', game.getCurrentPlayer().name)
    io.to(game.getCurrentPlayer().room).emit('turn', {
      timeOut: 15,
      canDraw: true,
      canDrop: false,
    })
  }, 15000)
}

module.exports = initializeSocket
