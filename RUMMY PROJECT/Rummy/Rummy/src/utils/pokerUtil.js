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
// Call createDeck() and store the result
const deck = createDeck();
console.log(deck);

//======================================= Logic for shuffling deck====================================

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Create a sample deck of cards
const sampleDeck = [
    { suit: 'Hearts', value: '2' },
    { suit: 'Hearts', value: '3' },
    { suit: 'Hearts', value: '4' },
    // ... Add more cards as needed
    { suit: 'Spades', value: 'K' },
    { suit: 'Spades', value: 'A' }
];

// Display the original deck in the console
console.log('Original Deck:');
console.log(sampleDeck);

// Shuffle the deck using the shuffle function
shuffle(sampleDeck);

// Display the shuffled deck in the console
console.log('Shuffled Deck:');
console.log(sampleDeck);

// ================================Logic for dealing cards to players ===============================

function dealCards(deck, players, numCards) {
    for (let i = 0; i < numCards; i++) {
        players.forEach(player => {
            player.hand.push(deck.pop());
        });
    }
}

// Create a sample deck of cards
const sampleDeck1 = [
    { suit: 'Hearts', value: '2' },
    { suit: 'Hearts', value: '3' },
    // ... Add more cards as needed
    { suit: 'Spades', value: 'K' },
    { suit: 'Spades', value: 'A' }
];

// Create sample players
const Bikash = { name: 'Bikash', hand: [] };
const Rakesh = { name: 'Rakesh', hand: [] };
const players1 = [Bikash, Rakesh];

// Display the original deck before dealing
console.log('Original Deck:');
console.log(sampleDeck1);

// Deal cards to players from the sample deck
dealCards(sampleDeck1, players1, 2); // Dealing 2 cards to each player

// Display players' hands after dealing
console.log('Players after dealing cards:');
console.log(Bikash);
console.log(Rakesh);

// ===============================Logic for resetting players' hands ==================================

function resetHands(players) {
    players.forEach(player => {
        player.hand = [];
    });
}

// Create sample players with hands
const player1 = { name: 'Player 1', hand: [{ suit: 'Hearts', value: '2' }, { suit: 'Diamonds', value: 'K' }] };
const player2 = { name: 'Player 2', hand: [{ suit: 'Clubs', value: '5' }, { suit: 'Spades', value: 'Q' }] };
const players2 = [player1, player2];

// Display players' hands before resetting
console.log('Players before resetting hands:');
console.log(player1);
console.log(player2);

// Reset hands of players
resetHands(players2);

// Display players' hands after resetting
console.log('Players after resetting hands:');
console.log(player1);
console.log(player2);

//============================== Updated hand evaluation logic =======================================

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

// Sample hand for testing
const sampleHand = [
    { suit: 'Hearts', value: '2' },
    { suit: 'Hearts', value: '3' },
    { suit: 'Hearts', value: '4' },
    { suit: 'Hearts', value: '5' },
    { suit: 'Hearts', value: '6' }
];

// Display the evaluated hand in the console
console.log('Sample Hand:', sampleHand);
console.log('Evaluated Hand:', evaluateHand(sampleHand));

//=============================== Logic for determining the winner ==================================

function determineWinner(players) {
    let winner = players[0];
    players.forEach(player => {
        if (evaluateHand(player.hand) > evaluateHand(winner.hand)) {
            winner = player;
        }
    });
    return winner;
}

// Sample players with hands for testing
// const player3 = { name: 'Alice', hand: [{ suit: 'Hearts', value: '2' }, { suit: 'Diamonds', value: 'K' }] };
// const player4 = { name: 'Bob', hand: [{ suit: 'Clubs', value: '5' }, { suit: 'Spades', value: 'Q' }] };
// const players3 = [player3, player4];

// // Display players' hands before determining the winner
// console.log('Players before determining winner:');
// console.log(player3);
// console.log(player4);

// // Determine the winner among the players
// const winner = determineWinner(players3);

//Display the winner in the console
//console.log('Winner:', winner.name);


//==================================== Logic for dealing community cards===============================

function dealCommunityCards(deck, communityCards, numCards) {
    for (let i = 0; i < numCards; i++) {
        communityCards.push(deck.pop());
    }
}

// Sample deck of cards (assuming it's already populated)
const sampleDeck4 = [
    { suit: 'Hearts', value: '2' },
    { suit: 'Diamonds', value: 'K' },
    // ... other cards
    { suit: 'Clubs', value: '5' },
    { suit: 'Spades', value: 'Q' }
];

// Initial community cards array
const communityCards = [];

// Display initial community cards
console.log('Community Cards before dealing:', communityCards);

// Deal a certain number of cards to the community
dealCommunityCards(sampleDeck4, communityCards, 3); // Deal 3 cards

// Display community cards after dealing
console.log('Community Cards after dealing:', communityCards);

//================================ Logic for dealing community rounds==================================

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

// Sample deck of cards (assuming it's already populated)
const sampleDeck5 = [
    { suit: 'Hearts', value: '2' },
    { suit: 'Diamonds', value: 'K' },
    // ... other cards
    { suit: 'Clubs', value: '5' },
    { suit: 'Spades', value: 'Q' }
];

// Initial community cards array
const communityCards1 = [];

// Display initial community cards
console.log('Community Cards before dealing rounds:', communityCards1);

// Deal community rounds (1 flop, 1 turn, 1 river)
dealCommunityRounds(sampleDeck5, communityCards1, 1, 1, 1);

// Display community cards after dealing rounds
console.log('Community Cards after dealing rounds:', communityCards1);

//================================ Logic for placing a bet by a player=================================

function placeBet(player, amount) {
    player.bet += amount;
    player.stack -= amount;
}

// Sample player object
let player = { name: 'Rahul', bet: 0, stack: 100 };

// Display player's information before placing the bet
console.log('Player before bet:', player);

// Place a bet of 30
const betAmount = 30;
placeBet(player, betAmount);

// Display player's information after placing the bet
console.log('Player after bet:', player);

//============================== Logic for validating a bet by a player ==================================

function validateBet(player, amount) {
    return player.stack >= amount;
}

// Sample player object
const player4 = { name: 'Player 1', stack: 100 };

// Test bet amounts
const betAmount1 = 50; 
const betAmount2 = 150; 

// Validate bet amounts against the player's stack
console.log(`Bet amount ${betAmount1} is valid:`, validateBet(player4, betAmount1)); 
console.log(`Bet amount ${betAmount2} is valid:`, validateBet(player4, betAmount2)); 

//================================= Logic for adjusting the pot amount===================================

function adjustPot(pot, amount) {
    pot += amount;
    return pot;
}

// Initial pot amount
let initialPot = 100;

// Display initial pot value
console.log('Initial Pot:', initialPot);

// Adjust the pot by adding 50
const adjustedPot = adjustPot(initialPot, 50);

// Display adjusted pot value
console.log('Adjusted Pot:', adjustedPot);

//========================================== handleBettingRound =======================================

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

// Sample players with their properties (hand, bet, stack)
const player5 = { name: 'Romesh', hand: [], bet: 0, stack: 100 };
const player6 = { name: 'Sahil', hand: [], bet: 0, stack: 150 };
const player7 = { name: 'Karn', hand: [], bet: 0, stack: 80 };
const players = [player5, player6, player7];

// Sample pot and current bet amounts
let pot = 0;
const currentBet = 20; // Set a different current bet amount

// Simulate player actions in the betting round
pot = handleBettingRound(players, pot, currentBet);

// Display the updated pot and players' status after the betting round
console.log('Pot after betting round:', pot);
console.log('Player 1:', player5);
console.log('Player 2:', player6);
console.log('Player 3:', player7);

//===================================== Logic for initializing the game =================================

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

// Simulate initializing the game
// const gameData = initializeGame();
// console.log('Game Data:', gameData);


module.export= {
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
