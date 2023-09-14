const mongoose = require('mongoose');

const pokerHistorySchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
  },
  gameDateTime: {
    type: Date,
    required: true,
  },
  winner: {
    type: String,
    required: true,
  },
  winningAmount: {
    type: Number,
    required: true,
  },
  userAmount: {
    type: Number,
    required: true,
  },
  adminCommission: {
    type: Number,
    required: true,
  },
});

const PokerHistory = mongoose.model('PokerHistory', pokerHistorySchema);

module.exports = PokerHistory;
