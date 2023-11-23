const { dealCards, initializeDeck } = require("../utils/util")

function drawCard(game, playerId, position = "down") {
  const { faceDownPile, faceUpPile } = game
  const playerHand = game.players[playerId].hand
  let drawnCard
  if (faceDownPile.length == 0) {
    drawnCard = faceUpPile.pop()
  } else if (faceUpPile.length == 0) {
    drawnCard = faceDownPile.pop()
  } else if (position === "up") {
    drawnCard = faceUpPile.pop()
  } else {
    drawnCard = faceDownPile.pop()
  }
  playerHand.push(drawnCard)
  return drawnCard
}

function discardCard(game, playerId, cardToDiscard) {
  const playerHand = game.players[playerId].hand
  if (!cardToDiscard) {
    game.faceUpPile.push(playerHand.pop())
    return
  }
  const index = playerHand.findIndex(
    card =>
      card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
  )
  if (index !== -1) {
    playerHand.splice(index, 1)
    game.faceUpPile.push(cardToDiscard)
  }else{
    game.faceUpPile.push(playerHand.pop())
  }
}
function initializeGame(playerIds = []) {
  const numPlayers = playerIds.length
  if (numPlayers < 2 || numPlayers > 5) {
    console.log("Invalid number of players. The game supports 2 to 5 players.")
    return null
  }

  const players = {}
  const playerRooms = []
  playerIds.map(id => {
    players[id] = { name: `Player ${id}`, hand: [] }
    playerRooms.push(`Player ${id}`)
  })
  console.log(playerIds)
  const deck = initializeDeck()
  console.log("initialize :", deck)
  const game = dealCards(players, deck)

  game.ids = playerIds
  game.playerRooms = playerRooms
  game.currentPlayer = playerIds[0]
  game.playerIndex = 0
  game.maxPlayer = numPlayers
  return game
}

// function simulatePlayerTurn(gameData) {
//   const currentPlayer = gameData.currentPlayer;
//   const currentPlayerIndex = gameData.currentPlayerIndex;

//   console.log(`Current Player: ${currentPlayer.name}`);

//   const turnTimeout = 10000;
//   let timerExpired = false;

//   const turnTimer = setTimeout(() => {
//     console.log(`Player ${currentPlayer.name} ran out of time. Moving to the next player.`);
//     timerExpired = true;

//     // Simulate discarding a card if a card is in hand
//     if (currentPlayer.hand.length > 0) {
//       const cardToDiscard = currentPlayer.hand[0];
//       discardCard(currentPlayer.hand, cardToDiscard, gameData.faceUpPile);
//       console.log(`Player discards: ${cardToDiscard.suit} ${cardToDiscard.value}`);
//     }

//     // Check for a winning condition
//     const winner = checkWinning(gameData.players[0], gameData.players[1]);
//     if (winner !== "No winner yet.") {
//       console.log(winner);

//       const player1Score = calculateScore(gameData.players[0].hand);
//       const player2Score = calculateScore(gameData.players[1].hand);

//       console.log(`Player 1 Score: ${player1Score}`);
//       console.log(`Player 2 Score: ${player2Score}`);
//       gameData.state = GameStates.ENDED;
//     } else {
//       gameData.currentPlayerIndex = nextPlayer(currentPlayerIndex, gameData.players);
//       gameData.currentPlayer = gameData.players[gameData.currentPlayerIndex];
//       simulatePlayerTurn(gameData);
//     }
//   }, turnTimeout);

//   const drawnCard = drawCard(currentPlayer.hand, gameData.drawPile, gameData.faceUpPile);
//   if (drawnCard !== null) {
//     console.log(`Player draws: ${drawnCard.suit} ${drawnCard.value}`);
//     clearTimeout(turnTimer);

//     // Call the winning condition after a card is drawn
//     const winner = checkWinning(gameData.players[0], gameData.players[1]);
//     if (winner !== "No winner yet.") {
//       console.log(winner);

//       const player1Score = calculateScore(gameData.players[0].hand);
//       const player2Score = calculateScore(gameData.players[1].hand);

//       console.log(`Player 1 Score: ${player1Score}`);
//       console.log(`Player 2 Score: ${player2Score}`);
//       gameData.state = GameStates.ENDED;
//     } else {
//       endPlayerTurn();
//     }
//   }

//   if (timerExpired) {
//     return;
//   }
// }

// const numberPlayers = 2;
// const gamesData = initializeGame(numberPlayers);

// while (gamesData.state !== GameStates.ENDED) {
//   simulatePlayerTurn(gamesData);
// }

module.exports = {
  initializeGame,
  drawCard,
  discardCard,
}