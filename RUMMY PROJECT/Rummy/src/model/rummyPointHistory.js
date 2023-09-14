const mongoose = require('mongoose');

const rummyPointHistorySchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  gameDateTime: { type: Date, default: Date.now },
  winner: { type: String, required: true },
  winnerId: { type: String, required: true },
  winningAmount: { type: Number, required: true },
  userAmount: { type: Number, required: true },
  adminCommission: { type: Number },
});

const RummyPointHistory = mongoose.model('RummyPointHistory', rummyPointHistorySchema);

module.exports = RummyPointHistory;
