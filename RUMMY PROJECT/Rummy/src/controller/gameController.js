const Game = require('../model/Game');
//const Player = require('../model/player'); // Assuming you have a Player model

// Create a new game
exports.createGame = async (req, res) => {
  try {
    const { name, maxPlayers } = req.body;
    const game = new Game({ name, maxPlayers });
    await game.save();
    res.status(201).json({ message: 'Game created successfully', game });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create the game' });
  }
};

// Get game details by ID
exports.getGameDetails = async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId).populate('players', 'username'); // Populate player details
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.status(200).json({ game });
  } catch (error) {
    res.status(500).json({ error: 'Unable to get game details' });
  }
};

// Add a player to the game
exports.addPlayerToGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { playerId } = req.body;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    if (game.players.includes(playerId)) {
      return res.status(400).json({ error: 'Player is already in the game' });
    }

    if (game.players.length >= game.maxPlayers) {
      return res.status(400).json({ error: 'Game is full' });
    }

    game.players.push(playerId);
    await game.save();

    res.status(200).json({ message: 'Player added to the game', game });
  } catch (error) {
    res.status(500).json({ error: 'Unable to add player to the game' });
  }
};
