// controllers/rummyController.js
const rummyGameModel = require('../model/rummyGame');

exports.createRummyGame = async (req, res) => {
    try {
      const createdGame = await rummyGameModel.create(req.body);
      console.log(createdGame)
      res.status(201).json({
        message: 'Game created successfully',
        game: createdGame, 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


exports.joinGame = async (req, res) => {
  try {
    const { gameId, playerName } = req.body;

    const game = await rummyGameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.players.length >= game.selectedPlayersRange.max) {
      return res.status(400).json({ message: 'Game is full' });
    }

    game.players.push(playerName);

    await game.save();
    res.status(200).json({ message: 'Player joined the game' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
