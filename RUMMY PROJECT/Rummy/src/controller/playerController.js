const Player = require('../model/player');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new player
exports.registerPlayer = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingPlayer = await Player.findOne({ email });
    if (existingPlayer) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const player = new Player({
      username,
      email,
      password: hashedPassword,
    });

    await player.save();
    res.status(201).json({ message: 'Player registered successfully', player });
  } catch (error) {
    res.status(500).json({ error: 'Unable to register the player' });
  }
};

// Log in a player
exports.loginPlayer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const player = await Player.findOne({ email });

    if (!player) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, player.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If the email and password are valid, you can generate a JWT token for authentication here
    const token = jwt.sign(
      { playerId: player._id, email: player.email }, // Payload
      'your-secret-key', // Replace with your own secret key
      { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
    );

    // Send the token in the response
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Unable to log in' });
  }
};

// Get player details by ID
exports.getPlayerDetails = async (req, res) => {
  try {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json(player);
  } catch (error) {
    console.error('Error in getPlayerDetails:', error);
    res.status(500).json({ error: 'Unable to get player details' });
  }
};