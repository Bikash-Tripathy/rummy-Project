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
  selectedPlayersRange: {
    type: Number,
    enum: [2, 5], // Only allow 2 and 6 as valid values
    required: true,
  },
  players: [ {
  type:String,
  //required:true
}],
});

module.exports = mongoose.model('RummyGame', rummyGameSchema);
