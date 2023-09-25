// controllers/handController.js
const Hand = require('../model/Hand');

// Create a new hand
exports.createHand = async (req, res) => {
  try {
    const { gameId, cards, winningPlayer } = req.body;

    const hand = new Hand({
      gameId,
      cards,
      winningPlayer,
    });

    await hand.save();
    res.status(201).json(hand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all hands
exports.listHands = async (req, res) => {
  try {
    const hands = await Hand.find();
    res.status(200).json(hands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Other controller functions (update, delete) can be added here.
