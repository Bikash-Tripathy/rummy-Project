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





const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function createDeck() {
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCards(deck, players, numCards) {
    for (let i = 0; i < numCards; i++) {
        players.forEach(player => {
            player.hand.push(deck.pop());
        });
    }
}

function resetHands(players) {
    players.forEach(player => {
        player.hand = [];
    });
}

function evaluateHand(hand) {
  hand.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

  const counts = {};
  for (let card of hand) {
      counts[card.value] = (counts[card.value] || 0) + 1;
  }

  const isFlush = hand.every(card => card.suit === hand[0].suit);
  const isStraight = values.indexOf(hand[4].value) - values.indexOf(hand[0].value) === 4 && new Set(hand.map(card => card.value)).size === 5;

  if (isFlush && isStraight) {
      if (hand[4].value === 'A' && hand[0].value === '10') {
          return 'Royal Flush';
      }
      return 'Straight Flush';
  }

  const cardCounts = Object.values(counts);

  if (cardCounts.includes(4)) {
      return 'Four of a Kind';
  }

  if (cardCounts.includes(3) && cardCounts.includes(2)) {
      return 'Full House';
  }

  if (isFlush) {
      return 'Flush';
  }

  if (isStraight) {
      return 'Straight';
  }

  if (cardCounts.includes(3)) {
      return 'Three of a Kind';
  }

  if (cardCounts.filter(count => count === 2).length === 2) {
      return 'Two Pair';
  }

  if (cardCounts.includes(2)) {
      return 'One Pair';
  }

  return 'High Card - ' + hand[4].value + ' of ' + hand[4].suit;
}


function determineWinner(players) {
    let winner = players[0];
    players.forEach(player => {
        if (evaluateHand(player.hand) > evaluateHand(winner.hand)) {
            winner = player;
        }
    });
    return winner;
}

function dealCommunityCards(deck, communityCards, numCards) {
    for (let i = 0; i < numCards; i++) {
        communityCards.push(deck.pop());
    }
}

function dealCommunityRounds(deck, communityCards, flopCount = 1, turnCount = 1, riverCount = 1) {
    for (let i = 0; i < flopCount; i++) {
        dealCommunityCards(deck, communityCards, 3);
    }
    for (let i = 0; i < turnCount; i++) {
        dealCommunityCards(deck, communityCards, 1);
    }
    for (let i = 0; i < riverCount; i++) {
        dealCommunityCards(deck, communityCards, 1);
    }
}

function placeBet(player, amount) {
    player.bet += amount;
    player.stack -= amount;
}

function validateBet(player, amount) {
    return player.stack >= amount;
}

function adjustPot(pot, amount) {
    pot += amount;
    return pot;
}

const fixedBettingLimit = 10;

function handleBettingRound(players, pot) {
  players.forEach(player => {
      if (player.hand.length > 0) {
          const betAmount = Math.min(fixedBettingLimit, player.stack); // Placeholder logic for determining the bet amount
          
          if (validateBet(player, betAmount)) {
              placeBet(player, betAmount);
              pot = adjustPot(pot, betAmount);
          } else {
              // Handle insufficient funds scenario
              console.log(`${player.name} does not have sufficient chips to bet.`);
              // Optionally, you can implement a logic here to skip this player's turn or take other actions
              // For example, skip the player's turn or force a minimum bet they can afford
          }
      }
  });
  return pot;
}


function initializeGame() {
    let deck = createDeck();
    shuffle(deck);
    let players = [
        { name: 'Player 1', hand: [], bet: 0, stack: 1000 },
        { name: 'Player 2', hand: [], bet: 0, stack: 1000 }
    ];
    resetHands(players);

    players = dealCards(deck, players, 2); // Dealing 2 hole cards to each player

    let communityCards = [];
    dealCommunityRounds(deck, communityCards, 1, 0, 0); // Deal flop (1 round)

    let pot = 0;
    pot = handleBettingRound(players, pot);

    return {
        players,
        deck,
        communityCards,
        pot
    };
}

// export { 
//     createDeck,
//     shuffle,
//     dealCards,
//     resetHands,
//     evaluateHand,
//     determineWinner,
//     dealCommunityCards,
//     dealCommunityRounds,
//     placeBet,
//     validateBet,
//     adjustPot,
//     handleBettingRound,
//     initializeGame
// };
