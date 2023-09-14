const express = require('express');
const router = express.Router();
const pokerHistoryController = require('../controller/pokerHistoryController');

// Create a new poker history record
router.post('/createPoker', pokerHistoryController.createPokerHistory);

// Get a single poker history record by gameId
router.get('/getPokerHistory/:id', pokerHistoryController.getPokerHistoryById);

// Get all poker history records
router.get('/', pokerHistoryController.getAllPokerHistory);

// Update a poker history record by gameId
router.put('/updatePokerHis/:id', pokerHistoryController.updatePokerHistory);

// Delete a poker history record by gameId
router.delete('/deleteHistory/:id', pokerHistoryController.deletePokerHistory);

module.exports = router;
