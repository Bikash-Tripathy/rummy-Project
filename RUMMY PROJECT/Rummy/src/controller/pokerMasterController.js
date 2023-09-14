// controllers/pokerMasterController.js
const PokerMaster = require('../model/pockerMasterTable');

// Create a new PokerMaster entry
exports.createPokerMaster = async (req, res) => {
  try {
    const pokermaster = new PokerMaster(req.body);
    const savedPokerMaster = await pokermaster.save();
    res.json(savedPokerMaster);
  } catch (error) {
    res.status(500).json({ error: 'Could not create PokerMaster entry' });
  }
};

// Get all PokerMaster entries
exports.getAllPokerMasters = async (req, res) => {
  try {
    const pokermasters = await PokerMaster.find();
    res.json(pokermasters);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve PokerMaster entries' });
  }
};

// Get a specific PokerMaster entry by ID
exports.getPokerMasterById = async (req, res) => {
    try {
      const pokerMaster = await PokerMaster.findById(req.params.id);
  
      if (!pokerMaster) {
        return res.status(404).json({ error: 'PokerMaster not found' });
      }
     // Check if the fetched PokerMaster has the same ID as the one created
      if (pokerMaster._id.toString() !== req.params.id) {
        return res.status(403).json({ error: 'Access to this resource is forbidden' });
      }
  
      res.json(pokerMaster);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve PokerMaster entry' });
    }
  };
  

//Update a specific PokerMaster entry by ID
exports.updatePokerMaster = async (req, res) => {
  try {
    const updatedPokerMaster = await PokerMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPokerMaster) {
      return res.status(404).json({ error: 'PokerMaster not found' });
    }
    res.json(updatedPokerMaster);
  } catch (error) {
    res.status(500).json({ error: 'Could not update PokerMaster entry' });
  }
};
  

// Delete a specific PokerMaster entry by ID
exports.deletePokerMaster = async (req, res) => {
  try {
    const deletedPokerMaster = await PokerMaster.findByIdAndRemove(req.params.id);
    if (!deletedPokerMaster) {
      return res.status(404).json({ error: 'PokerMaster not found' });
    }
    res.json({ message: 'PokerMaster deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete PokerMaster entry' });
  }
};
