const mongoose = require('mongoose');

const pointTableMasterSchema = new mongoose.Schema({
  pointValue: { type: Number, required: true },
  bootValue: { type: Number, required: true },
  addedDateTime: { type: Date, default: Date.now },
  action: { type: String, required: true },
});

const PointTableMaster = mongoose.model('PointTableMaster', pointTableMasterSchema);

module.exports = PointTableMaster;
