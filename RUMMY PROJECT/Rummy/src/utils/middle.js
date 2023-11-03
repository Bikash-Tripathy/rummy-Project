const jwt = require('jsonwebtoken')
function verifySocketUser(socket, next) {
    let token = socket.handshake.headers?.authorization
    if (!token) return next(new Error("Authentication failed"))
    token = token.split(" ")
    if (token[0] !== "Bearer") return next(new Error("Authentication failed"))
    if (!token[1]) return next(new Error("Authentication failed"))
    try {

        jwt.verify(token,'')
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  module.exports = verifySocketUser





  
// function checkWinning(player) {
//   const allMelds = [];

//   function findAllMelds(hand, currentMeld) {
//     if (isValidMeld(currentMeld)) {
//       allMelds.push([...currentMeld]);
//     }
//     for (let i = 0; i < hand.length; i++) {
//       const card = hand[i];
//       currentMeld.push(card);
//       const remainingHand = [...hand.slice(0, i), ...hand.slice(i + 1)];
//       findAllMelds(remainingHand, currentMeld);
//       currentMeld.pop();
//     }
//   }

//   findAllMelds(player.hand, []);

//   const allPlayerCards = new Set(player.hand);
//   for (const meld of allMelds) {
//     const meldSet = new Set(meld);
//     if (meldSet.size === allPlayerCards.size) {
//       return true;
//     }
//   }

//   return false;
// }

// const player = {
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Hearts', value: '3' },
//     { suit: 'Hearts', value: '4' },
//     { suit: 'Diamonds', value: '10' },
//     { suit: 'Diamonds', value: 'Jack' },
//     { suit: 'Diamonds', value: 'Queen' },
//     { suit: 'Diamonds', value: 'King' },
//     { suit: 'Diamonds', value: 'Ace' },
//     // Add more cards as needed
//   ],
// };

// const isWinner = checkWinning(player);

// if (isWinner) {
//   console.log("Player has a winning hand!");
// } else {
//   console.log("Player does not have a winning hand.");
// }

// function checkWinning(player) {
//   const allMelds = [];

//   function findValidMelds(hand, currentMeld) {
//     if (isValidMeld(currentMeld)) {
//       allMelds.push([...currentMeld]);
//     }

//     if (hand.length === 0) {
//       return;
//     }

//     for (let i = 0; i < hand.length; i++) {
//       const card = hand[i];
//       // Try adding the card to the current meld
//       currentMeld.push(card);
//       const remainingHand = [...hand.slice(0, i), ...hand.slice(i + 1)];

//       // Recursively find valid melds with the remaining cards
//       findValidMelds(remainingHand, currentMeld);

//       // Remove the last added card to explore other combinations
//       currentMeld.pop();
//     }
//   }

//   findValidMelds(player.hand, []);

//   // Check if all player cards are part of a valid meld
//   const allPlayerCards = new Set(player.hand);
//   for (const meld of allMelds) {
//     const meldSet = new Set(meld);
//     if (meldSet.size === allPlayerCards.size) {
//       return true;
//     }
//   }

//   return false;
// }

// const player = {
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Hearts', value: '3' },
//     { suit: 'Hearts', value: '4' },
//     { suit: 'Diamonds', value: '10' },
//     { suit: 'Diamonds', value: 'Jack' },
//     { suit: 'Diamonds', value: 'Queen' },
//     { suit: 'Diamonds', value: 'King' },
//     { suit: 'Diamonds', value: 'Ace' },
//     // Add more cards as needed
//   ],
// };

// const isWinner = checkWinning(player);

// if (isWinner) {
//   console.log("Player has a winning hand!");
// } else {
//   console.log("Player does not have a winning hand.");
// }