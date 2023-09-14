const express = require('express');
const router = express.Router();
const rummyDealController = require('../controller/rummyDealController');

// Create a new deal
router.post('/createRummyDeal', rummyDealController.createDeal);

// Get a deal by ID
router.get('/getRummyDeal/:id', rummyDealController.getDealById);

// Get all deals
router.get('/', rummyDealController.getAllDeals);

// Update a deal by ID
router.put('/updateRummyDeal/:id', rummyDealController.updateDealById);

// Delete a deal by ID
router.delete('/deleteRummyDeal/:id', rummyDealController.deleteDealById);

module.exports = router;
