const PokerGame = require('../model/PokerGame');

// Get the list of games
exports.getGames = async (req, res) => {
  try {
    const games = await PokerGame.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new game
exports.createGame = async (req, res) => {
  try {
    const { name, type, countries, bootAmount, minEntry, maxPlayer, totalPlayers, selectedPlayersRange } = req.body;
    const newGame = new PokerGame({ name, type, countries, bootAmount, minEntry, maxPlayer, totalPlayers, selectedPlayersRange });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data for creating a game' });
  }
};

// Get the details of a specific game by ID
exports.getGameById = async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await PokerGame.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.joinGame = async (req, res) => {
  try {
    const { gameId, country, playerId } = req.body;

    // Check if gameId, country, and playerId are provided
    if (!gameId || !country || !playerId) {
      return res.status(400).json({ error: 'Please provide a valid gameId, country, and playerId.' });
    }

    // Find the game by gameId
    const game = await PokerGame.findById(gameId);

    // Check if the game exists
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Initialize the players array if it doesn't exist
    if (!game.players) {
      game.players = [];
    }

    // Check if the provided country is available for this game
    if (!game.countries || !game.countries.includes(country)) {
      return res.status(400).json({ error: 'Country not available for this game' });
    }

    // Validation based on the game type
    const validCountriesNLH = ['MANILA', 'BUENOS AIRES', 'RIO', 'NEW DELHI', 'SOCHI', 'LONDON'];
    const validCountriesPLO = ['MANILA', 'BUENOS AIRES', 'SYDNEY', 'NEW YORK'];

    if (game.type === 'NLH' && !validCountriesNLH.includes(country)) {
      return res.status(400).json({ error: 'Invalid country for NLH' });
    } else if (game.type === 'PLO' && !validCountriesPLO.includes(country)) {
      return res.status(400).json({ error: 'Invalid country for PLO' });
    }

    // Check if the game is already full
    if (game.players.length >= game.totalPlayers) {
      return res.status(400).json({ error: 'Game is full, cannot join' });
    }

    // Check if the player with the same playerId has already joined the game
    const isPlayerInGame = game.players.some((player) => player.playerId === playerId);
    if (isPlayerInGame) {
      return res.status(400).json({ error: 'Player with the same ID has already joined the game' });
    }

    // Additional validation and logic can be added here

    // Add the player to the game with the specified country and playerId
    game.players.push({ playerId, country });

    // Save the updated game
    await game.save();

    // Respond with a success message
    res.json({ message: `Joined a game in ${country} for game ${game.name}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.exitGame = async (req, res) => {
  try {
    const { gameId, playerId } = req.body; // Assuming both game ID and user ID are passed in the request body

    // Find the game by its ID
    const game = await PokerGame.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Initialize game.players as an array if it's not already
    if (!Array.isArray(game.players)) {
      game.players = [];
    }

    // Check if the player is in the game
    if (!game.players.includes(playerId)) {
      return res.status(404).json({ message: 'Player not found in the game' });
    }

    // Remove the player from the game
    game.players = game.players.filter(id => id !== playerId);

    // Update the game in the database
    await game.save();

    res.status(200).json({ message: 'Player left the game' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};