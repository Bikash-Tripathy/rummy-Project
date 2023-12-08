const express = require('express');
const router = express.Router();
const rummyPointHistoryController = require('../controller/rummyPointHistoryController');

// Create a new RummyPointHistory entry
router.post('/rummyPointHistory', rummyPointHistoryController.createRummyPointHistory);

// Get a list of all RummyPointHistory entries
router.get('/', rummyPointHistoryController.getAllRummyPointHistories);

// Get a single RummyPointHistory entry by ID
router.get('/getRummyPointHistory/:id', rummyPointHistoryController.getRummyPointHistoryById);

// Update a RummyPointHistory entry by ID
router.put('/updateRummyPointHistory/:id', rummyPointHistoryController.updateRummyPointHistoryById);

// Delete a RummyPointHistory entry by ID
router.delete('/deleteRummyPointHistory/:id', rummyPointHistoryController.deleteRummyPointHistoryById);

module.exports = router;
