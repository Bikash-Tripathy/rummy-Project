const RummyDealHistory = require('../model/rummyDealHistory');

// Create a new deal
exports.createDeal = async (req, res) => {
  try {
    const { gameId, winner, winningAmount, userAmount, adminCommission } = req.body;
    const newDeal = new RummyDealHistory({
      gameId,
      winner,
      winningAmount,
      userAmount,
      adminCommission,
    });
    const savedDeal = await newDeal.save();
    res.json(savedDeal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new deal' });
  }
};

// Get a deal by ID
exports.getDealById = async (req, res) => {
  try {
    const deal = await RummyDealHistory.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deal' });
  }
};

// Get all deals
exports.getAllDeals = async (req, res) => {
  try {
    const deals = await RummyDealHistory.find();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
};

// Update a deal by ID
exports.updateDealById = async (req, res) => {
  try {
    const updatedDeal = await RummyDealHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDeal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(updatedDeal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update deal' });
  }
};

// Delete a deal by ID
exports.deleteDealById = async (req, res) => {
  try {
    const deletedDeal = await RummyDealHistory.findByIdAndRemove(req.params.id);
    if (!deletedDeal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(deletedDeal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete deal' });
  }
};
