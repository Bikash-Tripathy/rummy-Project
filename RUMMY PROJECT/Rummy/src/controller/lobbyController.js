const Lobby = require('../model/lobbyModel');

// Function to handle errors
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
};

// Create a new lobby
exports.createLobby = async (req, res) => {
  try {
    const { gameType, gameVariant, maxPlayers } = req.body;

    const lobby = new Lobby({
      gameType,
      gameVariant,
      maxPlayers,
      players: [],
    });

    await lobby.save();
    res.status(201).json(lobby);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all lobbies
exports.listLobbies = async (req, res) => {
  try {
    const lobbies = await Lobby.find();
    res.status(200).json(lobbies);
  } catch (error) {
    handleError(res, error);
  }
};
