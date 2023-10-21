// socket.js
const socketIo = require('socket.io');
const { initializeDeck, shuffleDeck, dealCards, drawCard, discardCard, takeFromDiscardPile, displayHand, isValidSequence, isValidSet, isValidMeld } = require('../utils/util');

function initializeSocket(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected.');
    // console.log(socket);

    // socket.emit('message', 'Welcome to the server!');
    socket.on('message',(data)=>{
        console.log(data)
        socket.to()
    })
    socket.on('test',()=>{
        const deck = initializeDeck();
        // console.log(deck)
        socket.emit('shuffleDeck',{deck});
    })
   
    socket.on('getDeck', () => {
      socket.emit('deckData', deck);
    });

    socket.on('shuffleDeck', (deck) => {
        console.log("data ====   "+deck)
      shuffleDeck(deck);
      socket.emit('shuffledDeck', deck);
    });

    socket.on('dealCards', (players, deck) => {
      dealCards(players, deck);
      socket.emit('dealtCards', players);
    });

    socket.on('drawCard', (playerHand, drawPile) => {
      const drawnCard = drawCard(playerHand, drawPile);
      socket.emit('drawnCard', { playerHand, drawnCard });
    });

    socket.on('discardCard', (playerHand, cardToDiscard, discardPile) => {
      discardCard(playerHand, cardToDiscard, discardPile);
      socket.emit('discardedCard', { playerHand, discardPile });
    });

    socket.on('takeFromDiscardPile', (playerName, playerHand, discardPile) => {
      const takenCard = takeFromDiscardPile(playerName, playerHand, discardPile);
      if (takenCard) {
        socket.emit('takenCard', { playerHand, takenCard });
      } else {
        socket.emit('discardEmpty', 'The discard pile is empty. Cannot take a card.');
      }
    });

    socket.on('displayHand', (playerName, playerHand) => {
      displayHand(playerName, playerHand);
      socket.emit('displayedHand', `Displayed ${playerName}'s hand.`);
    });

    socket.on('isValidSequence', (cards) => {
      const isValid = isValidSequence(cards);
      socket.emit('validSequence', isValid);
    });

    socket.on('isValidSet', (cards) => {
      const isValid = isValidSet(cards);
      socket.emit('validSet', isValid);
    });

    socket.on('isValidMeld', (playerHand) => {
      const isMeldValid = isValidMeld(playerHand);
      socket.emit('validMeld', isMeldValid);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected.');
    });
  });
}

module.exports = initializeSocket;
