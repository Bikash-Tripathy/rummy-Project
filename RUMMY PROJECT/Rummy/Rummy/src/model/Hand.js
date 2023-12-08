const mongoose = require('mongoose');

const handSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  cards: [
    {
      rank: {
        type: String,
        required: true,
        enum: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
      },
      suit: {
        type: String,
        required: true,
        enum: ['Hearts', 'Diamonds', 'Clubs', 'Spades'],
      },
    },
  ],
  winningPlayer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player', // Assuming you have a 'Player' model
    default: null, // Set to null initially, and update when a winner is determined
  },
});

module.exports = mongoose.model('Hand', handSchema);
