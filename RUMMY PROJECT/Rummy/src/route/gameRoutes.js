const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController');

// Create a new game
router.post('/', gameController.createGame);

// Get game details by ID
router.get('/:id', gameController.getGameDetails);

// Add a player to the game
router.post('/:id/add-player', gameController.addPlayerToGame);

module.exports = router;
