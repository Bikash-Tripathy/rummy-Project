// models/rummyGame.js
const mongoose = require('mongoose');

const rummyGameSchema = new mongoose.Schema({
  pointValue: {
    type: Number,
    required: true,
  },
  minEntry: {
    type: Number,
    required: true,
  },
  maxPlayer: {
    type: Number,
    required: true,
  },
  totalPlayers: {
    type: Number,
    required: true,
  },
  // selectedPlayersRange: {
  //   type: Number,
  //   enum: [2, 5], // Only allow 2 and 6 as valid values
  //   required: true,
  // },

  selectedPlayersRange: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value >= 2; // Allow selectedPlayersRange to be 2 or more
      },
      message: 'Selected players range must be 2 or more.',
    },
  },
});

module.exports = mongoose.model('RummyGame', rummyGameSchema);
