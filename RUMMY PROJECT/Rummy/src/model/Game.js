const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  maxPlayers: {
    type: Number,
    required: true,
    min: 2, // Adjust the minimum number of players as needed
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
  ],
  
});

module.exports = mongoose.model('Game', gameSchema);
