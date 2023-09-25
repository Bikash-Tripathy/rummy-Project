// models/lobbyModel.js
const mongoose = require('mongoose');


const lobbySchema = new mongoose.Schema({
    gameType: {
      type: String,
      enum: ['NLH', 'PLO', 'OFC'],
      required: true
    },
    gameVariant: {
      type: String,
      required: true,
      enum: ['MANILA', 'BUENOS AIRES', 'RIO', 'NEW DELHI', 'SOCHI', 'LONDON'],
      default: 'MANILA'
    },
    maxPlayers: {
      type: Number,
      enum: [2, 6],
      required: true
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
      }
    ]
  });
  
  module.exports = mongoose.model('Lobby', lobbySchema);
  