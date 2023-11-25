// Define card deck, functions, and other logic...

// const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
// const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A','Joker'];

// function createDeck() {
//     let deck = [];
//     for (let suit of suits) {
//         for (let value of values) {
//             deck.push({ suit, value });
//         }
//     }
//     return deck;
// }

// function shuffle(deck) {
//     for (let i = deck.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [deck[i], deck[j]] = [deck[j], deck[i]];
//     }
// }

// function dealCards(deck, players, numCards) {
//     for (let i = 0; i < numCards; i++) {
//         players.forEach(player => {
//             player.hand.push(deck.pop());
//         });
//     }
// }

// function resetHands(players) {
//     players.forEach(player => {
//         player.hand = [];
//     });
// }

// function evaluateHand(hand) {
//     hand.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

//     const counts = {};
//     for (let card of hand) {
//         counts[card.value] = (counts[card.value] || 0) + 1;
//     }

//     const isFlush = hand.every(card => card.suit === hand[0].suit);
//     const isStraight = values.indexOf(hand[4].value) - values.indexOf(hand[0].value) === 4 && new Set(hand.map(card => card.value)).size === 5;

//     if (isFlush && isStraight) {
//         if (hand[4].value === 'A' && hand[0].value === '10') {
//             return 'Royal Flush';
//         }
//         return 'Straight Flush';
//     }

//     const cardCounts = Object.values(counts);

//     if (cardCounts.includes(4)) {
//         return 'Four of a Kind';
//     }

//     if (cardCounts.includes(3) && cardCounts.includes(2)) {
//         return 'Full House';
//     }

//     if (isFlush) {
//         return 'Flush';
//     }

//     if (isStraight) {
//         return 'Straight';
//     }

//     if (cardCounts.includes(3)) {
//         return 'Three of a Kind';
//     }

//     if (cardCounts.filter(count => count === 2).length === 2) {
//         return 'Two Pair';
//     }

//     if (cardCounts.includes(2)) {
//         return 'One Pair';
//     }

//     return 'High Card - ' + hand[4].value + ' of ' + hand[4].suit;
// }

// function determineWinner(players) {
//     let winner = players[0];
//     players.forEach(player => {
//         if (evaluateHand(player.hand) > evaluateHand(winner.hand)) {
//             winner = player;
//         }
//     });
//     return winner;
// }

// function dealCommunityCards(deck, communityCards, numCards) {
//     for (let i = 0; i < numCards; i++) {
//         communityCards.push(deck.pop());
//     }
// }

// function dealCommunityRounds(deck, communityCards, flopCount = 1, turnCount = 1, riverCount = 1) {
//     for (let i = 0; i < flopCount; i++) {
//         dealCommunityCards(deck, communityCards, 3);
//     }
//     for (let i = 0; i < turnCount; i++) {
//         dealCommunityCards(deck, communityCards, 1);
//     }
//     for (let i = 0; i < riverCount; i++) {
//         dealCommunityCards(deck, communityCards, 1);
//     }
// }

// function initializeGame() {
//     let deck = createDeck();
//     shuffle(deck);
//     let players = [
//         { name: 'Player 1', hand: [] },
//         { name: 'Player 2', hand: [] }
//     ];
//     resetHands(players);

//     players = dealCards(deck, players, 2);

//     let communityCards = [];
//     dealCommunityRounds(deck, communityCards, 1, 0, 0); // Deal flop (1 round)

//     return {
//         players,
//         deck,
//         communityCards
//     };
// }

// export { 
//     createDeck,
//     shuffle,
//     dealCards,
//     resetHands,
//     evaluateHand,
//     determineWinner,
//     dealCommunityCards,
//     initializeGame,
//     dealCommunityRounds
// };



// Logic for creating deck
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A','Joker'];

function createDeck() {
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

// Logic for shuffling deck
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Logic for dealing cards to players
function dealCards(deck, players, numCards) {
    for (let i = 0; i < numCards; i++) {
        players.forEach(player => {
            player.hand.push(deck.pop());
        });
    }
}

// Logic for resetting players' hands
function resetHands(players) {
    players.forEach(player => {
        player.hand = [];
    });
}

// Updated hand evaluation logic
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

// Logic for determining the winner based on hand evaluation
function determineWinner(players) {
    let winner = players[0];
    players.forEach(player => {
        if (evaluateHand(player.hand) > evaluateHand(winner.hand)) {
            winner = player;
        }
    });
    return winner;
}

// Logic for dealing community cards
function dealCommunityCards(deck, communityCards, numCards) {
    for (let i = 0; i < numCards; i++) {
        communityCards.push(deck.pop());
    }
}

// Logic for dealing community rounds
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

// Logic for placing a bet by a player
function placeBet(player, amount) {
    player.bet += amount;
    player.stack -= amount;
}

// Logic for validating a bet by a player
function validateBet(player, amount) {
    return player.stack >= amount;
}

// Logic for adjusting the pot amount
function adjustPot(pot, amount) {
    pot += amount;
    return pot;
}

const fixedBettingLimit = 10;

// Logic for handling the betting round and player actions
function handleBettingRound(players, pot, currentBet) {
    players.forEach(player => {
        if (player.hand.length > 0) {
            // Placeholder logic to determine the bet amount based on player's hand strength, current bet, etc.
            const betAmount = determineBetAmount(player, currentBet);

            // Determine player's action based on the calculated bet amount
            const action = determineAction(player, betAmount, currentBet);

            switch (action) {
                case 'bet':
                    if (validateBet(player, betAmount)) {
                        placeBet(player, betAmount);
                        pot = adjustPot(pot, betAmount);
                    } else {
                        console.log(`${player.name} does not have sufficient chips to bet.`);
                        // Handle further logic if needed
                    }
                    break;
                case 'call':
                    const amountToCall = currentBet - player.bet;
                    if (validateBet(player, amountToCall)) {
                        placeBet(player, amountToCall);
                        pot = adjustPot(pot, amountToCall);
                    } else {
                        console.log(`${player.name} does not have sufficient chips to call.`);
                        // Handle further logic if needed
                    }
                    break;
                case 'raise':
                    const raiseAmount = determineRaiseAmount(player, currentBet);
                    if (validateBet(player, raiseAmount)) {
                        placeBet(player, raiseAmount);
                        pot = adjustPot(pot, raiseAmount);
                    } else {
                        console.log(`${player.name} does not have sufficient chips to raise.`);
                        // Handle further logic if needed
                    }
                    break;
                case 'fold':
                    fold(player);
                    break;
                default:
                    break;
            }
        }
    });
    return pot;
}

// Logic for initializing the game
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
    const currentBet = fixedBettingLimit; // Initial bet to start the round
    pot = handleBettingRound(players, pot, currentBet);

    return {
        players,
        deck,
        communityCards,
        pot
    };
}

export {
    createDeck,
    shuffle,
    dealCards,
    resetHands,
    evaluateHand,
    determineWinner,
    dealCommunityCards,
    dealCommunityRounds,
    placeBet,
    validateBet,
    adjustPot,
    handleBettingRound,
    initializeGame
};
