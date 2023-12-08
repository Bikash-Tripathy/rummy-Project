const express = require('express');
const router = express.Router();
const GameController = require('../controller/pokerGameController');

// Get the list of games
router.get('/games', GameController.getGames);

// Create a new game
router.post('/games', GameController.createGame);

// Get the details of a specific game by ID
router.get('/games/:gameId', GameController.getGameById);

// Join a game in a specific country
router.post('/joins', GameController.joinGame);

router.post('/exitPlayer',GameController.exitGame );

module.exports = router;
