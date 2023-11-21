class RummyGame {
    constructor(players = [Player], gameId, cardPerPlayer = 10) {
      if (players.length !== 2) {
        throw new Error('Rummy game requires exactly 2 players')
      }
      this.gameId = gameId
      this.cardPerPlayer = cardPerPlayer
      this.players = players
      this.deck = []
      this.droppedDeck = []
      this._currentPlayerIndex = 0
      this.currentPlayer = players[this._currentPlayerIndex]
      this.intervalTimer = null
      this.status = 'started'
      this.initializeDeck()
      this.shuffleDeck()
      this.dealInitialCards()
    }
  
    initializeDeck() {
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
      const ranks = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'J',
        'Q',
        'K',
        'A',
      ]
  
      for (let suit of suits) {
        for (let rank of ranks) {
          this.deck.push({ value: rank, suit })
        }
      }
    }
  
    shuffleDeck() {
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]
      }
    }
  
    dealInitialCards() {
      for (let i = 0; i < this.cardPerPlayer; i++) {
        this.players[0].receiveCard(this.deck.pop())
        this.players[1].receiveCard(this.deck.pop())
      }
    }
  
    getCurrentPlayer() {
      return this.players[this._currentPlayerIndex]
    }
  
    set currentPlayerIndex(index) {
      if (index >= 0 && index < this.players.length) {
        this._currentPlayerIndex = index
      } else {
        throw new Error('Invalid player index')
      }
    }
  
    switchTurn() {
      this.currentPlayerIndex =
        (this._currentPlayerIndex + 1) % this.players.length
    }
  
    drawCard(position) {
      if (this.getCurrentPlayer().hand.length > this.cardPerPlayer) {
        throw new Error(
          'Player should have exactly least',
          this.cardPerPlayer,
          ' cards to draw'
        )
      }
      let drawnCard
      if (this.deck.length == 0) {
        drawnCard = this.droppedDeck.pop()
      } else if (this.droppedDeck.length == 0) {
        drawnCard = this.deck.pop()
      } else if (position === 'up') {
        drawnCard = this.droppedDeck.pop()
      } else {
        drawnCard = this.deck.pop()
      }
      this.getCurrentPlayer().hand.push(drawnCard)
      return drawnCard
    }
  
    dropCard(cardToDiscard) {
      const hand = this.getCurrentPlayer().hand
      if (hand.length <= this.cardPerPlayer) {
        const message = `Player should have exactly ${
          this.cardPerPlayer + 1
        } cards to drop`
        throw new Error(message)
      }
  
      if (!cardToDiscard) {
        this.droppedDeck.push(hand.pop())
        return
      }
      const index = hand.findIndex(
        card =>
          card.suit === cardToDiscard.suit && card.rank === cardToDiscard.rank
      )
      if (index !== -1) {
        hand.splice(index, 1)
        this.droppedDeck.push(cardToDiscard)
      } else {
        this.droppedDeck.push(playerHand.pop())
      }
    }
  }
  
  class Player {
    constructor(name, id, userId=null) {
      this.name = name
      this.hand = []
      this.id = id
      this.room = id
      this.userId = userId
    }
  
    receiveCard(card) {
      this.hand.push(card)
    }
  }
  
  module.exports = { Player, RummyGame }