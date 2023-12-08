const mongoose = require('mongoose');

const pokerGameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['NLH', 'PLO'], required: true },
  countries: [String],
  bootAmount: { type: Number, required: true },
  minEntry: { type: Number, required: true },
  maxPlayer: { type: Number, required: true },
  totalPlayers: { type: Number, required: true },
  selectedPlayersRange: {
    type: Number,
    enum: [2, 6], // Only allow 2 and 6 as valid values
    required: true,
  },
});

const PokerGame = mongoose.model('PokerGame', pokerGameSchema);

module.exports = PokerGame;
