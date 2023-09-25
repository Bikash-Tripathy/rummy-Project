const express = require('express');
const router = express.Router();
const lobbyController = require('../controller/lobbyController');

// Create a new lobby
router.post('/create-lobby', lobbyController.createLobby);

// Get all lobbies
router.get('/list-lobbies', lobbyController.listLobbies);

module.exports = router;
