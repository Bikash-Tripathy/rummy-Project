const RummyPointHistory = require('../model/rummyPointHistory');

// Create a new RummyPointHistory entry
exports.createRummyPointHistory = async (req, res) => {
  try {
    const {
      gameId,
      winner,
      winnerId,
      winningAmount,
      userAmount,
      adminCommission,
    } = req.body;

    const rummyPointHistory = new RummyPointHistory({
      gameId,
      winner,
      winnerId,
      winningAmount,
      userAmount,
      adminCommission,
    });

    const savedRummyPointHistory = await rummyPointHistory.save();
    res.status(201).json(savedRummyPointHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a list of all RummyPointHistory entries
exports.getAllRummyPointHistories = async (req, res) => {
  try {
    const rummyPointHistories = await RummyPointHistory.find();
    res.json(rummyPointHistories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single RummyPointHistory entry by ID
exports.getRummyPointHistoryById = async (req, res) => {
  try {
    const rummyPointHistoryId = req.params.id;
    const rummyPointHistory = await RummyPointHistory.findById(rummyPointHistoryId);
    if (!rummyPointHistory) {
      return res.status(404).json({ message: 'RummyPointHistory not found' });
    }
    res.json(rummyPointHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a RummyPointHistory entry by ID
exports.updateRummyPointHistoryById = async (req, res) => {
  try {
    const rummyPointHistoryId = req.params.id;
    const {
      gameId,
      winner,
      winnerId,
      winningAmount,
      userAmount,
      adminCommission,
    } = req.body;

    const updatedRummyPointHistory = await RummyPointHistory.findByIdAndUpdate(
      rummyPointHistoryId,
      {
        gameId,
        winner,
        winnerId,
        winningAmount,
        userAmount,
        adminCommission,
      },
      { new: true }
    );

    if (!updatedRummyPointHistory) {
      return res.status(404).json({ message: 'RummyPointHistory not found' });
    }

    res.json(updatedRummyPointHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a RummyPointHistory entry by ID
exports.deleteRummyPointHistoryById = async (req, res) => {
  try {
    const rummyPointHistoryId = req.params.id;
    const deletedRummyPointHistory = await RummyPointHistory.findByIdAndRemove(rummyPointHistoryId);
    if (!deletedRummyPointHistory) {
      return res.status(404).json({ message: 'RummyPointHistory not found' });
    }
    res.json({ message: 'RummyPointHistory deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


