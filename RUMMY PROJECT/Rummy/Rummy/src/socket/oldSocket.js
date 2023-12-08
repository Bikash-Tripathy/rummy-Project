


//======================================== New Game Logic =============================================

// const { Server } = require("socket.io")
// const { initializeGame, drawCard, discardCard } = require("./helpers")
// const db = { game1: [] }
// function initializeSocket(server) {
//   const io = new Server(server)
//   io.on("connection", socket => {
//     const id = socket.handshake.query.id
//     socket.join(["room1", `Player ${id}`])
//     socket.playerId = id
//     console.log("player joined", id)
//     socket.player = `Player ${id}`
//     socket.use(([event, ...args], next) => {
//       const gameId = socket.gameId
//       const game = db[gameId]
//       console.log("on", event, "start :")
//       printGameState(game)
//       const id = socket.playerId
//       if (event === "draw" || event === "drop") {
//         if (!gameId) return
//         if (game.currentPlayer !== id) {
//           socket.emit("message", "Wait for your turn")
//           return next(new Error("Wait for your turn"))
//         }
//         if (
//           event === "drop" &&
//           game.players[game.currentPlayer].hand.length !== 11
//         ) {
//           socket.emit("message", "Can't drop")
//           return next(new Error("Draw first"))
//         }
//         if (
//           event === "draw" &&
//           game.players[game.currentPlayer].hand.length !== 10
//         ) {
//           socket.emit("message", "Can't draw")
//           return next(new Error("Drop first"))
//         }
//       }
//       next()
//     })

//     socket.on("game", async gameId => {
//       socket.to(gameId).emit("message", "a new player joined the game")
//       await socket.join(gameId)
//       socket.gameId = gameId
//       if (!(db[gameId] instanceof Array)) return
//       db[gameId].push(socket.handshake.query.id)
//       if (db[gameId].length < 2) {
//         io.to(gameId).emit("quantity", db[gameId].length)
//         io.to(gameId).emit("message", "Waiting for players to join")
//         return
//       }
//       const game = initializeGame(db[gameId])
//       console.log(game)
//       io.to("room1").emit("message", "game started")
//       game.ids.forEach((id, i) => {
//         io.to(game.playerRooms[i]).emit("hand", game.players[id].hand)
//       })
//       db.game1 = game
//       io.to(gameId).emit("down", game.faceDownPile.length)
//       io.to(gameId).emit("up", game.faceUpPile[game.faceUpPile.length - 1])
//       game.intervalTimer = setInterval(() => {
//         if (game.players[game.currentPlayer].hand.length === 11) {
//           return dropCard(io, socket)()
//         } else {
//           game.playerIndex = (game.playerIndex + 1) % 2
//           game.currentPlayer = game.ids[game.playerIndex]
//         }
//         console.log("player turn", game.currentPlayer)
//         io.to(game.playerRooms[game.playerIndex]).emit(
//           "turn",
//           "Your turn will be over within 30 seconds"
//         )
//       }, 30000)
//     })

//     socket.on("draw", position => {
//       const gameId = socket.gameId
//       const game = db[gameId]
//       const id = socket.playerId
//       const drawnCard = drawCard(game, id, position)
//       socket.emit("hand", game.players[id].hand)
//       console.log("on draw event end: ")
//       printGameState(game)
//     })
//     socket.on("drop", dropCard(io, socket))
//   })
// }

// function dropCard(io, socket) {
//   return function (card) {
//     const id = socket.playerId
//     const gameId = socket.gameId
//     const game = db[gameId]
//     console.log("dropping card")
//     game.intervalTimer.refresh()
//     discardCard(game, game.currentPlayer, card)
//     socket.emit("hand", game.players[id].hand)
//     io.to(gameId).emit("down", game.faceDownPile.length)
//     io.to(gameId).emit("up", game.faceUpPile[game.faceUpPile.length - 1])
//     game.playerIndex = (game.playerIndex + 1) % 2
//     game.currentPlayer = game.ids[game.playerIndex]
//     io.to(game.playerRooms[game.playerIndex]).emit(
//       "turn",
//       "Your turn will be over within 30 seconds"
//     )
//     console.log("on drop event end: ")
//     printGameState(game)
//   }
// }

// function printGameState(game) {
//   console.log("current player", game?.currentPlayer)
//   console.log("Player 1 hand card size: ", game?.players["1"]?.hand.length)
//   console.log("Player 2 hand card size: ", game?.players["2"]?.hand.length)
// }
// module.exports = initializeSocket