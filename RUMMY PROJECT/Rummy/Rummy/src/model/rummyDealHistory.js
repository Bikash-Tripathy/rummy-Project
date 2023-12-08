const mongoose = require('mongoose');

const rummyDealHistorySchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  gameDateTime: { type: Date, default: Date.now },
  winner: { type: String, required: true },
  winningAmount: { type: Number, required: true },
  userAmount: { type: Number, required: true },
  adminCommission: { type: Number },
});

const RummyDealHistory = mongoose.model('RummyDealHistory', rummyDealHistorySchema);

module.exports = RummyDealHistory;
