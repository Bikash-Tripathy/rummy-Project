const express = require('express');
const router = express.Router();
const pokerMasterController = require('../controller/pokerMasterController');

// Create a new PokerMaster entry
router.post('/pocker', pokerMasterController.createPokerMaster);

// Get all PokerMaster entries
router.get('/', pokerMasterController.getAllPokerMasters);

// Get a specific PokerMaster entry by ID
router.get('/getPkerMaster/:id', pokerMasterController.getPokerMasterById);

// Update a specific PokerMaster entry by ID
router.put('/UpdatePockerMaster/:id', pokerMasterController.updatePokerMaster);

// Delete a specific PokerMaster entry by ID
router.delete('/DeletePockerMaster/:id', pokerMasterController.deletePokerMaster);

module.exports = router;
