const express = require('express');
const router = express.Router();
const playerController = require('../controller/playerController');


// Register a new player
router.post('/register', playerController.registerPlayer);

// Log in a player
router.post('/login', playerController.loginPlayer);

// Get player details by ID
router.get('/player/:id', playerController.getPlayerDetails);

module.exports = router;
