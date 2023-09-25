// routes/rummyRoutes.js
const express = require('express');
const router = express.Router();
const rummyController = require('../controller/rummyController');


router.post('/rumming', rummyController.createRummyGame);


router.post('/join', rummyController.joinGame);


module.exports = router;
