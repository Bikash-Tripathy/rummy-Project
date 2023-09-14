const PokerHistory = require('../model/pockerHistory');

// Create a new poker history record
exports.createPokerHistory = async (req, res) => {
  try {
    const pokerHistory = new PokerHistory(req.body);
    await pokerHistory.save();
    res.status(201).json(pokerHistory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single poker history record by _id
exports.getPokerHistoryById = async (req, res) => {
    try {
      const pokerHistory = await PokerHistory.findById(req.params.id);
      if (!pokerHistory) {
        return res.status(404).json({ error: 'Poker history not found' });
      }
      res.json(pokerHistory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Get all poker history records
exports.getAllPokerHistory = async (req, res) => {
  try {
    const pokerHistories = await PokerHistory.find();
    res.json(pokerHistories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a poker history record by gameId
exports.updatePokerHistory = async (req, res) => {
  try {
    const pokerHistory = await PokerHistory.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!pokerHistory) {
      return res.status(404).json({ error: 'Poker history not found' });
    }
    res.json(pokerHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a poker history record by gameId
exports.deletePokerHistory = async (req, res) => {
  try {
    const pokerHistory = await PokerHistory.findByIdAndRemove( req.params.id );
    if (!pokerHistory) {
      return res.status(404).json({ error: 'Poker history not found' });
    }
    res.json({ message: 'Poker history deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
