const express = require('express');
const router = express.Router();
const pointTableMasterController = require('../controller/pointTableMasterController');

// Create a new pointTableMaster entry
router.post('/pointTableMaster', pointTableMasterController.createPointTableMaster);

// Get a list of all pointTableMaster entries
router.get('/PointTable', pointTableMasterController.getAllPointTableMasters);

// Get a single pointTableMaster entry by ID
router.get('/:id', pointTableMasterController.getPointTableMasterById);

// Update a pointTableMaster entry by ID
router.put('/:id', pointTableMasterController.updatePointTableMasterById);

// Delete a pointTableMaster entry by ID
router.delete('/:id', pointTableMasterController.deletePointTableMasterById);

module.exports = router;

