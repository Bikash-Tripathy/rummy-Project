const mongoose = require('mongoose');

const pokerMasterSchema = new mongoose.Schema({
  bootValue: {
    type: Number,
    required: true,
  },
  addedDateTime: {
    type: Date,
    default: Date.now,
  },
  action: {
    type: String,
    required: true,
    //enum: ['create', 'update', 'delete'],
  },
});

const PokerMaster = mongoose.model('PokerMaster', pokerMasterSchema);

module.exports = PokerMaster;
