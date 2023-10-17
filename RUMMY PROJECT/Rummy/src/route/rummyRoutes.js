// routes/rummyRoutes.js
const express = require('express');
const router = express.Router();
const rummyController = require('../controller/rummyController');

router.post('/create-game', rummyController.createGames);

router.post('/rumming', rummyController.createRummyGame);

router.get('/games/:id', rummyController.getRummyGameById);

router.post('/join', rummyController.joinGame);

router.post('/leave-game', rummyController.leaveGame);

router.post('/start-game', rummyController.startGame);

// router.post('/play-card', rummyController.playCard);

// router.post('/invite-players', rummyController.invitePlayers);

// router.post('/accept-invitation', rummyController.acceptInvitation);




module.exports = router;
