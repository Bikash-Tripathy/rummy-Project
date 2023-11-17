const arr1 = undefined
if(arr1){
    console.log("exist");
}



//-------------------------------------------- drawFromFaceDownPile --------------------------------

// function drawFromFaceDownPile(playerHand, faceDownPile) {
//     if (faceDownPile.length === 0) {
//       console.log('Face-down pile is empty.');
//       return null;
//     }
//     const card = faceDownPile.pop();
//     playerHand.push(card);
//     return card;
//   }
  
//   // Sample testing code
//   const faceDownPile = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'];
//   const playerHand1 = [];
  
//   console.log('Before drawing from face-down pile:');
//   console.log('Face-down Pile:', faceDownPile);
//   console.log('Player Hand:', playerHand1);
  
//   const drawnCard1 = drawFromFaceDownPile(playerHand1, faceDownPile);
  
//   if (drawnCard1 !== null) {
//     console.log('Card drawn from face-down pile:', drawnCard1);
//   }
  
//   console.log('After drawing from face-down pile:');
//   console.log('Face-down Pile:', faceDownPile);
//   console.log('Player Hand:', playerHand1);
  
//   //--------------------------------------- discardToFaceDownPile ----------------------------------------
  
//   function discardToFaceDownPile(playerHand, cardToDiscard, faceDownPile) {
//     const index = playerHand.findIndex(
//       card => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//     );
//     if (index !== -1) {
//       playerHand.splice(index, 1);
//       faceDownPile.push(cardToDiscard);
//     }
//   }
  
//   const playerHand2 = [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Diamonds', value: 'Ace' },
//     { suit: 'Clubs', value: '5' },
//     { suit: 'Spades', value: 'King' },
//     // Add more cards here
//   ];
  
//   const faceDownPile2 = [];
  
//   const cardToDiscard2 = { suit: 'Hearts', value: '2' }; // Change this to the card you want to discard to face-down pile
  
//   discardToFaceDownPile(playerHand2, cardToDiscard2, faceDownPile2);
  
//   console.log('Updated Player Hand:', playerHand2);
//   console.log('Updated Face-Down Pile:', faceDownPile2);
  
// Define a function to check if a sequence is valid, including jokers
function isValidSequence(cards) {
    const sortedCards = [...cards].sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
    let prevValue = -1;
    let jokerCount = 0;
  
    for (const card of sortedCards) {
      const valueIndex = values.indexOf(card.value);
  
      if (card.value === 'Joker') {
        jokerCount++;
        continue;
      }
  
      if (prevValue === -1) {
        prevValue = valueIndex;
      } else if (valueIndex !== prevValue + 1) {
        if (jokerCount > 0) {
          jokerCount--;
        } else {
          return false;
        }
      }
      prevValue = valueIndex;
    }
    return true;
  }
  
  // Define a function to check if a set is valid, including jokers
  function isValidSet(cards) {
    let jokerCount = 0;
    const uniqueValues = new Set();
  
    for (const card of cards) {
      if (card.value === 'Joker') {
        jokerCount++;
        continue;
      }
      uniqueValues.add(card.value);
    }
  
    return uniqueValues.size === 1 || (jokerCount > 0 && uniqueValues.size === 2);
  }
  
  // Updated checkWinning function to consider jokers
  function checkWinning(player1, player2) {
    const hand1 = [...player1.hand];
    const hand2 = [...player2.hand];
  
    // Sort the hands to make it easier to check for sequences and sets
    hand1.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
    hand2.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
  
    // Count the number of sequences and sets in each player's hand
    let sequenceCount1 = 0;
    let setCount1 = 0;
    let sequenceCount2 = 0;
    let setCount2 = 0;
  
    for (let i = 0; i <= hand1.length - 3; i++) {
      const currentSet = [hand1[i], hand1[i + 1], hand1[i + 2]];
  
      if (isValidSequence(currentSet)) {
        sequenceCount1++;
      } else if (isValidSet(currentSet)) {
        setCount1++;
      }
    }
  
    for (let i = 0; i <= hand2.length - 3; i++) {
      const currentSet = [hand2[i], hand2[i + 1], hand2[i + 2]];
  
      if (isValidSequence(currentSet)) {
        sequenceCount2++;
      } else if (isValidSet(currentSet)) {
        setCount2++;
      }
    }
  
    // Calculate the number of remaining deadwood cards for each player
    const deadwoodCount1 = hand1.length - (sequenceCount1 * 3) - (setCount1 * 3);
    const deadwoodCount2 = hand2.length - (sequenceCount2 * 3) - (setCount2 * 3);
  
    // Compare winning conditions between players
    if (
      ((sequenceCount1 >= 1 && setCount1 >= 1) && deadwoodCount1 <= 1) &&
      ((sequenceCount2 >= 1 && setCount2 >= 1) && deadwoodCount2 <= 1)
    ) {
      // If both players have at least 1 sequence, 1 set, and valid deadwood count, compare scores
      const score1 = calculateScore(hand1);
      const score2 = calculateScore(hand2);
  
      if (score1 > score2) {
        return "Player 1 wins!";
      } else if (score2 > score1) {
        return "Player 2 wins!";
      } else {
        return "It's a draw.";
      }
    } else if (
      (sequenceCount1 >= 1 && setCount1 >= 1) && deadwoodCount1 <= 1
    ) {
      // Player 1 wins as they have at least 1 sequence, 1 set, and valid deadwood count
      return "Player 1 wins!";
    } else if (
      (sequenceCount2 >= 1 && setCount2 >= 1) && deadwoodCount2 <= 1
    ) {
      // Player 2 wins as they have at least 1 sequence, 1 set, and valid deadwood count
      return "Player 2 wins!";
    } else {
      // No player meets the winning conditions
      return "No winner yet.";
    }
  }
  


  // function checkWinning(player1, player2) {
//   const hand1 = [...player1.hand];
//   const hand2 = [...player2.hand];

//   // Sort the hands to make it easier to check for sequences and sets
//   hand1.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
//   hand2.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

//   // Count the number of sequences and sets in each player's hand
//   let sequenceCount1 = 0;
//   let setCount1 = 0;
//   let sequenceCount2 = 0;
//   let setCount2 = 0;

//   for (let i = 0; i <= hand1.length - 3; i++) {
//     const currentSet = [hand1[i], hand1[i + 1], hand1[i + 2]];

//     if (isValidSequence(currentSet)) {
//       sequenceCount1++;
//     } else if (isValidSet(currentSet)) {
//       setCount1++;
//     }
//   }

//   for (let i = 0; i <= hand2.length - 3; i++) {
//     const currentSet = [hand2[i], hand2[i + 1], hand2[i + 2]];

//     if (isValidSequence(currentSet)) {
//       sequenceCount2++;
//     } else if (isValidSet(currentSet)) {
//       setCount2++;
//     }
//   }

//   // Calculate the number of remaining deadwood cards for each player
//   const deadwoodCount1 = hand1.length - (sequenceCount1 * 3) - (setCount1 * 3);
//   const deadwoodCount2 = hand2.length - (sequenceCount2 * 3) - (setCount2 * 3);

//   console.log("Player 1 - Sequences:", sequenceCount1, "Sets:", setCount1, "Deadwood:", deadwoodCount1);
//   console.log("Player 2 - Sequences:", sequenceCount2, "Sets:", setCount2, "Deadwood:", deadwoodCount2);


//   // Calculate the scores for each player after sorting and counting sequences and sets
//   const player1Score = calculateScore(hand1);
//   const player2Score = calculateScore(hand2);

//   // Compare winning conditions between players
//   if (
//     ((sequenceCount1 >= 1 || setCount1 >= 1) && deadwoodCount1 <= 1) &&
//     ((sequenceCount2 >= 1 || setCount2 >= 1) && deadwoodCount2 <= 1)
//   ) {
//     if (player1Score > player2Score) {
//       return `Player 1 wins with a score of ${player1Score}!`;
//     } else if (player2Score > player1Score) {
//       return `Player 2 wins with a score of ${player2Score}!`;
//     } else {
//       return "It's a draw.";
//     }
//   } else if (
//     (sequenceCount1 >= 1 || setCount1 >= 1) && deadwoodCount1 <= 1
//   ) {
//     return `Player 1 wins with a score of ${player1Score}!`;
//   } else if (
//     (sequenceCount2 >= 1 || setCount2 >= 1) && deadwoodCount2 <= 1
//   ) {
//     return `Player 2 wins with a score of ${player2Score}!`;
//   } else {
//     return "No winner yet.";
//   }
// }




//------------------------------------ Main Game Logic -----------------------------------------------

// const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
// const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// const GameStates = {
//   NOT_STARTED: 'NOT_NOT_STARTED',
//   STARTED: 'STARTED',
//   ENDED: 'ENDED',
// };

// function initializeDeck() {
//   const deck = [];
//   for (const suit of suits) {
//     for (const value of values) {
//       deck.push({ suit, value });
//     }
//   }
//   return deck;
// }
// // Testing code to display the output of initializeDeck
// const deck = initializeDeck();
// console.log(deck);

// //--------------------------------------------- shuffleDeck -------------------------------------

// function shuffleDeck(deck) {
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck[i], deck[j]] = [deck[j], deck[i]];
//   }
// }

// // Testing code to display the output of shuffleDeck
// const sampleDeck = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '3' },
//   { suit: 'Clubs', value: '4' },
//   { suit: 'Spades', value: '5' },
//   // Add more cards here
// ];

// shuffleDeck(sampleDeck);
// console.log(sampleDeck);

// //--------------------------------------------- dealCards ----------------------------------------------

// // function dealCards(players, deck) {
// //   shuffleDeck(deck);

// //   const numPlayers = players.length;
// //   const numCardsPerPlayer = numPlayers === 2 ? 10 : 7;

// //   const drawPile = deck.slice(numCardsPerPlayer * numPlayers);
// //   const faceDownPile = deck.slice(0, numCardsPerPlayer * numPlayers);

// //   for (let i = 0; i < numCardsPerPlayer; i++) {
// //     for (let j = 0; j < numPlayers; j++) {
// //       players[j].hand.push(deck[i + numCardsPerPlayer * j]);
// //     }
// //   }

// //   return { drawPile, faceDownPile };
// // }

// // // Sample testing code
// // const players = [
// //   { name: "Rakesh", hand: [] },
// //   { name: "Rajesh", hand: [] }
// // ];

// // const deck1 = [
// //   // Add your deck of cards here
// //   // For example: 'Card1', 'Card2', 'Card3', ...
// //   'Card1', 'Card2', 'Card3', 'Card4', 'Card5', 'Card6', 'Card7',
// //   'Card8', 'Card9', 'Card10', 'Card11', 'Card12', 'Card13', 'Card14',
// //   'Card15', 'Card16', 'Card17', 'Card18', 'Card19', 'Card20',
// // ];

// // const result = dealCards(players, deck1);

// // console.log("Draw Pile:", result.drawPile);
// // console.log("Face Down Pile:", result.faceDownPile);

// // players.forEach((player, index) => {
// //   console.log(`${player.name}'s hand:`, player.hand);
// // });


// // function dealCards(players, deck) {
// //   shuffleDeck(deck);

// //   const numPlayers = players.length;
// //   const numCardsPerPlayer = (numPlayers === 2) ? 10 : 7;

// //   let faceDownPile = [];
// //   let tempDeck = [...deck]; // Create a copy of the deck to avoid modifying the original deck

// //   // Distribute cards to players
// //   for (let i = 0; i < numCardsPerPlayer; i++) {
// //     for (let j = 0; j < numPlayers; j++) {
// //       // Ensure that the card drawn for the player is not in their hand or faceDownPile
// //       let validCard = false;
// //       let selectedCard;

// //       while (!validCard) {
// //         selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];

// //         if (
// //           !players[j].hand.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value) &&
// //           !faceDownPile.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value)
// //         ) {
// //           validCard = true;
// //         }
// //       }

// //       players[j].hand.push(selectedCard);
// //       tempDeck = tempDeck.filter(
// //         (card) => card.suit !== selectedCard.suit || card.value !== selectedCard.value
// //       );
// //     }
// //   }

// //   faceDownPile = tempDeck;

// //   return { faceDownPile };
// // }

// // const players = [
// //   { name: "Rakesh", hand: [] },
// //   { name: "Rajesh", hand: [] }
// // ];

// // const deck1 = initializeDeck();

// // const result = dealCards(players, deck1);

// // console.log("Face Down Pile:");
// // console.log(result.faceDownPile);

// // players.forEach((player) => {
// //   console.log(`${player.name}'s hand:`);
// //   console.log(player.hand);
// // })



// function dealCards(players, deck) {
//   shuffleDeck(deck);

//   const numPlayers = players.length;
//   const numCardsPerPlayer = (numPlayers === 2) ? 10 : 7;

//   let faceDownPile = [];
//   let tempDeck = [...deck]; // Original deck ko modify na karne ke liye ek temporary deck banaya gaya hai.

//   // Khiladiyon ko cards baantne ka kaam
//   for (let i = 0; i < numCardsPerPlayer * numPlayers; i++) {
//     let selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];

//     let playerIndex = i % numPlayers; // Determine the current player
//     let validCard = false;

//     while (!validCard) {
//       if (
//         !players[playerIndex].hand.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value) &&
//         !faceDownPile.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value)
//       ) {
//         validCard = true;
//       } else {
//         selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];
//       }
//     }

//     players[playerIndex].hand.push(selectedCard);
//     tempDeck = tempDeck.filter(
//       (card) => card.suit !== selectedCard.suit || card.value !== selectedCard.value
//     );
//   }

//   faceDownPile = tempDeck; // Bachi hui cards ko faceDownPile mein daala gaya hai.

//    //faceUpPile = [];

//   return { faceDownPile };
// }

// const players = [
//   { name: "Rakesh", hand: [] },
//   { name: "Rajesh", hand: [] }
// ];

// const deck1 = initializeDeck();

// const result = dealCards(players, deck1);

// // Display the output
// console.log("Face Down Pile:");
// console.log(result.faceDownPile);

// console.log("Face Up Pile (Initially Empty):");
// console.log(result.faceUpPile);

// players.forEach((player) => {
//   console.log(`${player.name}'s hand:`);
//   console.log(player.hand);
// });


// //------------------------------------------ drawCard ------------------------------------------

// // function drawCard(playerHand, drawPile) {
// //   if (drawPile.length === 0) {
// //     console.log('Draw pile is empty.');
// //     return null;
// //   }
// //   const card = drawPile.pop();
// //   playerHand.push(card);
// //   return card;
// // }

// // // Sample testing code
// // const drawPile = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'];
// // const playerHand = [];

// // console.log('Before drawing a card:');
// // console.log('Draw Pile:', drawPile);
// // console.log('Player Hand:', playerHand);

// // const drawnCard = drawCard(playerHand, drawPile);

// // if (drawnCard !== null) {
// //   console.log('Card drawn:', drawnCard);
// // }

// // console.log('After drawing a card:');
// // console.log('Draw Pile:', drawPile);
// // console.log('Player Hand:', playerHand);


// function drawCard(playerHand, faceDownPile, faceUpPile) {
//   if (!faceDownPile || (faceUpPile && faceUpPile.length > 0)) {
//     let drawnCard;

//     if (faceUpPile.length == 0) {
//       // If the face up pile has cards, draw from there first
//       drawnCard = faceDownPile.pop();
//     } else if (faceDownPile.length == 0) {
//       // If the face up pile is empty, draw from the face down pile
//       drawnCard = faceUpPile.pop();
//     }

//     if (drawnCard) {
//       playerHand.push(drawnCard);
//       return drawnCard;
//     }
//   }

//   console.log('Both face down pile and face up pile are empty. Cannot draw a card.');
//   return null;
// }


// const playerHand = [6,7,8,9,10]; // Initialize the player's hand
// const faceDownPiles = [1,2,3,4,5
//   // { suit: 'Hearts', value: '2' },
//   // { suit: 'Diamonds', value: 'Ace' },
//   // { suit: 'Clubs', value: '5' },
//   // { suit: 'Spades', value: 'King' }
//   // Add more cards to the face down pile
// ];

// const faceUpPile = [11,35,46]; // Initialize the face up pile as an empty array

// console.log('Before drawing a card:');
// console.log('Player Hand:', playerHand);
// console.log('Face Down Pile:', faceDownPiles);
// console.log('Face Up Pile:', faceUpPile);

// const drawnCard = drawCard(playerHand, faceDownPiles, faceUpPile);

// if (drawnCard !== null) {
//   console.log('Card drawn:', drawnCard);
// }

// console.log('After drawing a card:');
// console.log('Player Hand:', playerHand);
// console.log('Face Down Pile:', faceDownPiles);
// console.log('Face Up Pile:', faceUpPile);


// //------------------------------------------- discardCard --------------------------------------------

// function discardCard(playerHand, cardToDiscard, faceUpPile) {
//   const index = playerHand.findIndex(
//     (card) => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//   );
//   if (index !== -1) {
//     playerHand.splice(index, 1);
//     faceUpPile.push(cardToDiscard);
//   }
// }   

// // Initialize player's hand, face up pile, and a card to discard
// const playerHand6 = [{ suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: 'Ace' },
//   { suit: 'Clubs', value: '5' },
//    { suit: 'Spades', value: 'King' },]; // Assume player has these cards
// const faceUpPile1 = [6, 7, 8]; // Assume face up pile has these cards
// const cardToDiscard = { suit: 'Clubs', value: '5' }; // Change this to the card you want to discard

// // Call the `discardCard` function
// discardCard(playerHand6, cardToDiscard, faceUpPile1);

// // Display the output
// console.log("Player's Hand After Discarding:");
// console.log(playerHand6);

// console.log("Face Up Pile After Discarding:");
// console.log(faceUpPile1);

// //-------------------------------------------- initializeGame -------------------------------------------

// function initializeGame(numPlayers) {
//   if (numPlayers < 2 || numPlayers > 5) {
//     console.log('Invalid number of players. The game supports 2 to 5 players.');
//     return null;
//   }

//   const players = [];
//   for (let i = 1; i <= numPlayers; i++) {
//     players.push({ name: `Player ${i}`, hand: [] });
//   }

//   const deck = initializeDeck();
//   console.log('initialize :',deck);
//   const { drawPile, faceDownPile } = dealCards(players, deck);

//   let currentPlayerIndex = 0;
//   let currentPlayer = players[currentPlayerIndex];
//   const faceUpPile = []

//   return { players, drawPile, faceDownPile,faceUpPile, currentPlayerIndex, currentPlayer, state: GameStates.NOT_STARTED };
// }

// // Sample testing code
// const numPlayers = 4; // Change the number of players as needed
// const gameData = initializeGame(numPlayers);

// if (gameData !== null) {
//   console.log('Game Initialized:');
//   console.log('Number of Players:', numPlayers);
//   console.log('Current Player:', gameData.currentPlayer.name);
//   console.log('Draw Pile:', gameData.drawPile);
//   console.log('Face Down Pile:', gameData.faceDownPile);
//   console.log('Players:');
//   gameData.players.forEach((player, index) => {
//     console.log(`  ${player.name}'s hand:`, player.hand);
//   });
//   console.log('Game State:', gameData.state);
// }
// //------------------------------------------ nextPlayer ------------------------------------------------

// function nextPlayer(currentPlayerIndex, playerNames) {
//   return (currentPlayerIndex + 1) % playerNames.length;
// }

// const playerNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4']; // Replace with your player names
// let currentPlayerIndex = 0; // You can change this index to test different scenarios

// const nextPlayerIndex = nextPlayer(currentPlayerIndex, playerNames);
// const nextPlayerName = playerNames[nextPlayerIndex];

// console.log(`Current Player: ${playerNames[currentPlayerIndex]}`);
// console.log(`Next Player: ${nextPlayerName}`);


// //========================================== displayHand ================================================

// function displayHand(playerHands) {
//   console.log("Player's Hand:");
//   for (const card of playerHands) {
//     console.log(`${card.value} of ${card.suit}`);
//   }
// }

// // Example data for testing displayHand function
// const playerHands = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '7' },
//   { suit: 'Clubs', value: 'King' },
// ];

// // Call the displayHand function with the example data
// displayHand(playerHands);

// //------------------------------------------ isValidSequence -------------------------------------------

// function isValidSequence(cards) {
//   const sortedCards = [...cards].sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
//   let prevValue = -1;
//   for (const card of sortedCards) {
//     const valueIndex = values.indexOf(card.value);
//     if (prevValue === -1) {
//       prevValue = valueIndex;
//     } else if (valueIndex !== prevValue + 1) {
//       return false;
//     }
//     prevValue = valueIndex;
//   }
//   return true;
// }

// // Example usage of isValidSequence function within your game logic
// const playerHand3 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Hearts', value: '3' },
//   { suit: 'Hearts', value: '4' },
// ];

// if (isValidSequence(playerHand3)) {
//   console.log("Valid Sequence!");
// } else {
//   console.log("Not a valid Sequence.");
// }


// //-------------------------------------------- isValidSet ---------------------------------------------

// function isValidSet(cards) {
//   const uniqueValues = new Set();
//   for (const card of cards) {
//     uniqueValues.add(card.value);
//   }
//   return uniqueValues.size === 1;
// }

// // Example usage of isValidSet function within your game logic
// const playerHand4 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '2' },
//   { suit: 'Clubs', value: '2' },
// ];

// if (isValidSet(playerHand4)) {
//   console.log("Valid Set!");
// } else {
//   console.log("Not a valid Set.");
// }

// //--------------------------------------------- isValidMeld ---------------------------------------------

// // function isValidMeld(cards) {
// //   return isValidSequence(cards) || isValidSet(cards);
// // }

// function isValidMeld(cards) {
//   const isSequence = isValidSequence(cards);
//   const isSet = isValidSet(cards);
  
//   if (isSequence || isSet) {
//     return true;
//   } else {
//     return false;
//   }
// }

// const cards = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '2' },
//   { suit: 'Clubs', value: '2' },
// ];

// if (isValidMeld(cards)) {
//   console.log("Valid Meld!");
// } else {
//   console.log("Not a valid Meld.");
// }


// //----------------------------------------------- calculateCardScore ------------------------------------

// function calculateCardScore(card) {
//   const value = card.value;
//   const isFaceCard = ['Jack', 'Queen', 'King'].includes(value);
//   const isHighValueCard = ['10', 'Jack', 'Queen', 'King', 'Ace'].includes(value);
//   const score = isFaceCard ? 10 : isHighValueCard ? 5 : parseInt(value);
//   return score;
// }

// const card = { suit: 'Hearts', value: '3' }; // Replace with your card object

// const score = calculateCardScore(card);

// console.log(`Card Score: ${score}`);

// //------------------------------------------ calculateHandScore ------------------------------------------

// function calculateHandScore(playerHand) {
//   let totalScore = 0;

//   for (const card of playerHand) {
//     totalScore += calculateCardScore(card);
//   }

//   return totalScore;
// }

// const playerHand5 = [
//   { suit: 'Hearts', value: 'Queen' },
//   { suit: 'Diamonds', value: 'King' },
//   { suit: 'Clubs', value: '4' },
//   // Add more cards as needed
// ];

// const totalScore = calculateHandScore(playerHand5);

// console.log(`Total Score: ${totalScore}`);


// //------------------------------------------ checkWinning -----------------------------------------------

// function checkWinning(player1, player2) {
//   const hand1 = [...player1.hand];
//   const hand2 = [...player2.hand];

//   // Sort the hands to make it easier to check for sets and sequences
//   hand1.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
//   hand2.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

//   // Variables to track the number of sets and sequences for each player
//   let setCount1 = 0;
//   let setCount2 = 0;
//   let sequenceCount1 = 0;
//   let sequenceCount2 = 0;

//   // Check for sets and sequences in each player's hand
//   for (let i = 0; i <= hand1.length - 3; i++) {
//     const currentSet = [hand1[i], hand1[i + 1], hand1[i + 2]];
//     if (isValidSet(currentSet)) {
//       setCount1++;
//       console.log(`Player 1 formed Set #${setCount1}:`, currentSet);
//     } else if (isValidSequence(currentSet)) {
//       sequenceCount1++;
//       console.log(`Player 1 formed Sequence #${sequenceCount1}:`, currentSet);
//     }
//   }

//   for (let i = 0; i <= hand2.length - 3; i++) {
//     const currentSet = [hand2[i], hand2[i + 1], hand2[i + 2]];
//     if (isValidSet(currentSet)) {
//       setCount2++;
//       console.log(`Player 2 formed Set #${setCount2}:`, currentSet);
//     } else if (isValidSequence(currentSet)) {
//       sequenceCount2++;
//       console.log(`Player 2 formed Sequence #${sequenceCount2}:`, currentSet);
//     }
//   }

//   // Calculate the scores for each player
//   const player1Score = calculateScore(hand1);
//   const player2Score = calculateScore(hand2);

//   // Determine the winner based on sets, sequences, and scores
//   if (setCount1 > setCount2) {
//     console.log("Player 1 wins with more sets!");
//     return `Player 1 wins with ${setCount1} sets, ${sequenceCount1} sequences, and a score of ${player1Score}!`;
//   } else if (setCount2 > setCount1) {
//     console.log("Player 2 wins with more sets!");
//     return `Player 2 wins with ${setCount2} sets, ${sequenceCount2} sequences, and a score of ${player2Score}!`;
//   } else {
//     console.log("No winner based on sets. Checking sequences and scores.");
//     if (sequenceCount1 > sequenceCount2) {
//       console.log("Player 1 wins with more sequences!");
//       return `Player 1 wins with ${sequenceCount1} sequences and a score of ${player1Score}!`;
//     } else if (sequenceCount2 > sequenceCount1) {
//       console.log("Player 2 wins with more sequences!");
//       return `Player 2 wins with ${sequenceCount2} sequences and a score of ${player2Score}!`;
//     } else {
//       console.log("No winner based on sets and sequences. Checking scores.");
//       if (player1Score > player2Score) {
//         return `Player 1 wins with a score of ${player1Score}!`;
//       } else if (player2Score > player1Score) {
//         return `Player 2 wins with a score of ${player2Score}!`;
//       } else {
//         return "It's a draw.";
//       }
//     }
//   }
// }


// const player1 = {
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '2' },
//     { suit: 'Diamonds', value: '2' },
//   ],
// };

// const player2 = {
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '3' },
//     { suit: 'Diamonds', value: '4' },

//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '2' },
//     { suit: 'Diamonds', value: '2' },
//   ]
// };
// const results = checkWinning(player1, player2);
// console.log(results);



// //------------------------------------------ simulatePlayerTurn ----------------------------------------

// // function simulatePlayerTurn(totalPlayers, drawPile4, faceDownPile4) {
// //   console.log(`It's ${totalPlayers.name}'s turn`);
// //   displayHand(totalPlayers.hand);

// //   if (checkWinning(totalPlayers)) {
// //     console.log(`${totalPlayers.name} has won the game!`);
// //     return true;
// //   }

// //   let turnEnded = false;
// //   let timeoutTriggered = false;

// //   // Set a 5-second timeout for the player's turn
// //   const turnTimeout = 5000; // 5 seconds in milliseconds
// //   const timer = setTimeout(() => {
// //     timeoutTriggered = true;
// //     console.log(`${totalPlayers.name} took too long! Turn ended.`);
// //     // Handle the case when the player's turn times out, e.g., deduct points or skip the turn
// //     turnEnded = true;
// //   }, turnTimeout);

// //   const drawnCard = drawCard(totalPlayers.hand, drawPile4);
// //   if (drawnCard) {
// //     console.log(`${totalPlayers.name} draws a card from the draw pile: ${drawnCard.value} of ${drawnCard.suit}`);
// //   }

// //   const drawnFaceDownCard = drawFromFaceDownPile(totalPlayers.hand, faceDownPile4);
// //   if (drawnFaceDownCard) {
// //     console.log(`${totalPlayers.name} draws a card from the face-down pile: ${drawnFaceDownCard.value} of ${drawnFaceDownCard.suit}`);
// //   }

// //   // Example: Simulate discarding the first card in the player's hand (you can implement card selection logic here)
// //   if (totalPlayers.hand.length > 0) {
// //     const cardToDiscard = totalPlayers.hand[0];
// //     discardToFaceDownPile(totalPlayers.hand, cardToDiscard, faceDownPile4);
// //     console.log(`${totalPlayers.name} discards to the face-down pile: ${cardToDiscard.value} of ${cardToDiscard.suit}`);
// //     turnEnded = true; // The player's turn ends after discarding.
// //   }

// //   // If the player completes their turn actions before the timeout, you can clear the timeout.
// //   if (turnEnded) {
// //     clearTimeout(timer);
// //   }

// //   // If the timeout has already been triggered, but the function completes later, display the message.
// //   if (timeoutTriggered && !turnEnded) {
// //     console.log(`${totalPlayers.name}'s turn has ended.`);
// //   }

// //   return turnEnded;
// // }


// // // Define your player, draw pile, and face-down pile
// // const totalPlayers = {
// //   name: 'Player 1',
// //   hand: [
// //     { suit: 'Hearts', value: '2' },
// //     { suit: 'Diamonds', value: 'Ace' },
// //     // Add more cards as needed
// //   ],
// // };

// // const drawPile4 = [
// //   { suit: 'Hearts', value: '5' },
// //   { suit: 'Spades', value: '7' },
// //   // Add more cards as needed
// // ];

// // const faceDownPile4 = [
// //   { suit: 'Clubs', value: '9' },
// //   { suit: 'Diamonds', value: 'King' },
// //   // Add more cards as needed
// // ];

// // console.log("Simulating Player 1's turn:");
// // const turnEnded = simulatePlayerTurn(totalPlayers, drawPile4, faceDownPile4);

// // if (turnEnded) {
// //   console.log("Player 1's turn has ended.");
// // } else {
// //   console.log("Player 1's turn is still ongoing.");
// // }


// // function simulatePlayerTurn(totalPlayers, drawPile4, faceDownPile4) {
// //   console.log(`It's ${totalPlayers.name}'s turn`);
// //   displayHand(totalPlayers.hand);

// //   if (checkWinning(totalPlayers)) {
// //     console.log(`${totalPlayers.name} has won the game!`);
// //     return Promise.resolve(true);
// //   }

// //   return new Promise((resolve, reject) => {
// //     const turnTimeout = 5000; // 5 seconds in milliseconds

// //     const timer = setTimeout(() => {
// //       console.log(`${totalPlayers.name} took too long! Turn ended.`);
// //       // Handle the case when the player's turn times out, e.g., deduct points or skip the turn
// //       resolve(true); // Resolving the promise indicates the turn has ended
// //     }, turnTimeout);

// //     // Simulate drawing a card from the draw pile
// //     const drawnCard = drawCard(totalPlayers.hand, drawPile4);
// //     if (drawnCard) {
// //       console.log(`${totalPlayers.name} draws a card from the draw pile: ${drawnCard.value} of ${drawnCard.suit}`);
// //     }

// //     // Simulate drawing a card from the face-down pile
// //     const drawnFaceDownCard = drawFromFaceDownPile(totalPlayers.hand, faceDownPile4);
// //     if (drawnFaceDownCard) {
// //       console.log(`${totalPlayers.name} draws a card from the face-down pile: ${drawnFaceDownCard.value} of ${drawnFaceDownCard.suit}`);
// //     }

// //     // Example: Simulate discarding the first card in the player's hand (you can implement card selection logic here)
// //     if (totalPlayers.hand.length > 0) {
// //       const cardToDiscard = totalPlayers.hand[0];
// //       discardToFaceDownPile(totalPlayers.hand, cardToDiscard, faceDownPile4);
// //       console.log(`${totalPlayers.name} discards to the face-down pile: ${cardToDiscard.value} of ${cardToDiscard.suit}`);
// //     }

// //     // Clear the timeout since the player's turn ended
// //     clearTimeout(timer);
// //     resolve(true);
// //   });
// // }

// // // Define your player, draw pile, and face-down pile
// // const totalPlayers = {
// //   name: 'Player 1',
// //   hand: [
// //     { suit: 'Hearts', value: '2' },
// //     { suit: 'Diamonds', value: 'Ace' },
// //     // Add more cards as needed
// //   ],
// // };

// // const drawPile4 = [
// //   { suit: 'Hearts', value: '5' },
// //   { suit: 'Spades', value: '7' },
// //   // Add more cards as needed
// // ];

// // const faceDownPile4 = [
// //   { suit: 'Clubs', value: '9' },
// //   { suit: 'Diamonds', value: 'King' },
// //   // Add more cards as needed
// // ];

// // console.log("Simulating Player 1's turn:");
// // simulatePlayerTurn(totalPlayers, drawPile4, faceDownPile4)
// //   .then((turnEnded) => {
// //     if (turnEnded) {
// //       console.log("Player 1's turn has ended.");
// //     } else {
// //       console.log("Player 1's turn is still ongoing.");
// //     }
// //   });




// //----------------------------------------- startGameWithPlayers -----------------------------------------

// function startGameWithPlayers(numPlayers) {
//   const game = initializeGame(numPlayers);
//   game.state = GameStates.STARTED;

//   if (!game) {
//     return;
//   }

//   let gameEnded = false;

//   while (!gameEnded) {
//     const currentPlayer = game.players[game.currentPlayerIndex];

//     displayHand(currentPlayer.hand);

//     if (checkWinning(currentPlayer)) {
//       console.log(`${currentPlayer.name} has won the game!`);
//       gameEnded = true;
//     }

//     gameEnded = simulatePlayerTurn(currentPlayer, game.drawPile, game.faceDownPile) || gameEnded;

//     game.currentPlayerIndex = nextPlayer(game.currentPlayerIndex, game.players);
//   }

//   calculateAndDisplayScores(game.players);
//   game.state = GameStates.ENDED;
// }

// //----------------------------------------------- joinGame ----------------------------------------------

// function joinGame(game, playerName) {
//   if (game.state === GameStates.NOT_STARTED) {
//     game.players.push({ name: playerName, hand: [] });
//     console.log(`${playerName} has joined the game.`);
//   } else {
//     console.log('Cannot join the game. It has already started.');
//   }
// }

// //--------------------------------------------- rejoinGame -----------------------------------------------

// function rejoinGame(game, playerName) {
//   if (game.state === GameStates.NOT_STARTED) {
//     const existingPlayer = game.players.find(player => player.name === playerName);
//     if (existingPlayer) {
//       console.log(`${playerName} has rejoined the game.`);
//     } else {
//       console.log('Cannot rejoin the game. Player not found.');
//     }
//   } else {
//     console.log('Cannot rejoin the game. It has already started.');
//   }
// }

// //-------------------------------------------- rejoinGame -----------------------------------------------

// function endGame(game) {
//   if (game.state === GameStates.STARTED) {
//     console.log('The game has been ended.');
//     game.state = GameStates.ENDED;
//   } else {
//     console.log('The game is not currently in progress.');
//   }
// }

// //--------------------------------------------- leaveGame -----------------------------------------------

// function leaveGame(game, playerName) {
//   if (game.state === GameStates.NOT_STARTED) {
//     const playerIndex = game.players.findIndex(player => player.name === playerName);
//     if (playerIndex !== -1) {
//       game.players.splice(playerIndex, 1);
//       console.log(`${playerName} has left the game.`);
//     } else {
//       console.log('Player not found in the game.');
//     }
//   } else {
//     console.log('Cannot leave the game. It has already started.');
//   }
// }

// const game1 = {
//   players: [{ name: 'Player 1' }, { name: 'Player 2' }],
//   state: GameStates.NOT_STARTED,
// };

// leaveGame(game1, 'Player 2');

// //----------------------------------------- continuePreviousGame -----------------------------------------

// function continuePreviousGame(game, playerName) {
//   if (game.state === GameStates.ENDED) {
//     const player = game.players.find(player => player.name === playerName);
//     if (player) {
//       game.state = GameStates.STARTED;
//       console.log(`${playerName} has chosen to continue the previous game.`);
//     } else {
//       console.log('Cannot continue the previous game. Player not found.');
//     }
//   } else {
//     console.log('Cannot continue the previous game. The game is not ended.');
//   }
// }


// const games = {
//   players: [{ name: 'Player 1' }, { name: 'Player 2' }],
//   state: GameStates.ENDED,
// };

// continuePreviousGame(games, 'Player 2');


// //------------------------------------------- startNewGame ----------------------------------------------

// function startNewGame(game) {
//   if (game.state === GameStates.ENDED) {
//     game.players = [];
//     game.state = GameStates.NOT_STARTED;
//     console.log('A new game has started.');
//   } else {
//     console.log('Cannot start a new game. The previous game is not ended.');
//   }
// }

// //Testing
// const game = {
//   players: ['Player 1', 'Player 2'],
//   state: GameStates.ENDED,
// };

// startNewGame(game);

// //---------------------------------------- calculateAndDisplayScores ------------------------------------

// function calculateAndDisplayScores(players3) {
//   for (const player of players3) {
//     const score = calculateHandScore(player.hand);
//     console.log(`${player.name}'s score: ${score}`);
//   }
// }

// const players3 = [
//   {
//     name: 'Player 1',
//     hand: [
//       { suit: 'Hearts', value: '2' },
//       { suit: 'Hearts', value: '3' },
//       { suit: 'Hearts', value: '4' },
//       { suit: 'Diamonds', value: '10' }, 
//       // Add more cards as needed
//     ],
//   },
//   {
//     name: 'Player 2',
//     hand: [
//       { suit: 'Clubs', value: '5' },
//       { suit: 'Diamonds', value: 'Jack' },
//       { suit: 'Hearts', value: 'Queen' },
//       { suit: 'Spades', value: 'Ace' },
//       // Add more cards as needed
//     ],
//   },
//   // Add more players as needed
// ];

// calculateAndDisplayScores(players3);


// //================================= calculate score in a function =====================================

// // function calculatesAndDisplayScores(players) {
// //   for (const player of players) {
// //     let totalScore = 0;
// //     for (const card of player.hand) {
// //       const value = card.value;
// //       const isFaceCard = ['Jack', 'Queen', 'King'].includes(value);
// //       const isHighValueCard = ['10', 'Jack', 'Queen', 'King', 'Ace'].includes(value);
// //       const score = isFaceCard ? 10 : isHighValueCard ? 5 : parseInt(value);
// //       totalScore += score;
// //     }
// //     console.log(`${player.name}'s score: ${totalScore}`);
// //   }
// // }

// // const playersAll= [
// //   {
// //     name: 'Player5',
// //     hand: [
// //       { suit: 'Hearts', value: '2' },
// //       { suit: 'Hearts', value: '3' },
// //       { suit: 'Hearts', value: '4' },
// //       { suit: 'Diamonds', value: '10' },
// //       // Add more cards as needed
// //     ],
// //   },
// //   {
// //     name: 'Player6',
// //     hand: [
// //       { suit: 'Clubs', value: '5' },
// //       { suit: 'Diamonds', value: 'Jack' },
// //       { suit: 'Hearts', value: 'Queen' },
// //       { suit: 'Spades', value: 'Ace' },
// //       // Add more cards as needed
// //     ],
// //   },
// //   // Add more players as needed
// // ];

// // calculatesAndDisplayScores(playersAll);

// function calculateScore(hand) {
//   // Define a mapping of card values to their corresponding numerical values.
//   const valueMap = {
//     '2': 2,
//     '3': 3,
//     '4': 4,
//     '5': 5,
//     '6': 6,
//     '7': 7,
//     '8': 8,
//     '9': 9,
//     '10': 10,
//     'Jack': 10,
//     'Queen': 10,
//     'King': 10,
//     'Ace': 11, // You might need to handle Ace differently based on your game's rules
//   };

//   let score = 0;

//   for (const card of hand) {
//     const cardValue = card.value;
//     if (valueMap[cardValue]) {
//       score += valueMap[cardValue];
//     }
//   }

//   return score;
// }

// // Define hands of cards for two players
// const player1Hand = [
//   { value: '2' },
//   { value: 'King' },
//   { value: '7' },
//   { value: 'Ace' },
//   // Add more cards for Player 1 as needed
// ];

// const player2Hand = [
//   { value: '3' },
//   { value: 'Queen' },
//   { value: '5' },
//   { value: '10' },
//   // Add more cards for Player 2 as needed
// ];

// // Calculate the scores for both players
// const player1Score = calculateScore(player1Hand);
// const player2Score = calculateScore(player2Hand);

// // Log the results
// console.log('Player 1 Score:', player1Score);
// console.log('Player 2 Score:', player2Score);



// //--------------------------------------------- Functions Exportation ------------------------------------

// module.exports = {
//   initializeDeck,
//   shuffleDeck,
//   dealCards,
//   drawCard,
//  // drawFromFaceDownPile,
//   discardCard,
//   //discardToFaceDownPile,
//   initializeGame,
//   nextPlayer,
//   displayHand,
//   isValidSequence,
//   isValidSet,
//   isValidMeld,
//   calculateCardScore,
//   calculateHandScore,
//   calculateScore,
//   checkWinning,
//   //simulatePlayerTurn,
//   startGameWithPlayers,
//   joinGame,
//   rejoinGame,
//   endGame,
//   leaveGame,
//   continuePreviousGame,
//   startNewGame,
// };



//------------------------------------------ simulatePlayerTurn ----------------------------------------

// function simulatePlayerTurn(totalPlayers, drawPile4, faceDownPile4) {
//   console.log(`It's ${totalPlayers.name}'s turn`);
//   displayHand(totalPlayers.hand);

//   if (checkWinning(totalPlayers)) {
//     console.log(`${totalPlayers.name} has won the game!`);
//     return Promise.resolve(true);
//   }

//   return new Promise((resolve, reject) => {
//     const turnTimeout = 5000; // 5 seconds in milliseconds

//     const timer = setTimeout(() => {
//       console.log(`${totalPlayers.name} took too long! Turn ended.`);
//       // Handle the case when the player's turn times out, e.g., deduct points or skip the turn
//       resolve(true); // Resolving the promise indicates the turn has ended
//     }, turnTimeout);

//     // Simulate drawing a card from the draw pile
//     const drawnCard = drawCard(totalPlayers.hand, drawPile4);
//     if (drawnCard) {
//       console.log(`${totalPlayers.name} draws a card from the draw pile: ${drawnCard.value} of ${drawnCard.suit}`);
//     }

//     // Simulate drawing a card from the face-down pile
//     const drawnFaceDownCard = drawFromFaceDownPile(totalPlayers.hand, faceDownPile4);
//     if (drawnFaceDownCard) {
//       console.log(`${totalPlayers.name} draws a card from the face-down pile: ${drawnFaceDownCard.value} of ${drawnFaceDownCard.suit}`);
//     }

//     // Example: Simulate discarding the first card in the player's hand (you can implement card selection logic here)
//     if (totalPlayers.hand.length > 0) {
//       const cardToDiscard = totalPlayers.hand[0];
//       discardToFaceDownPile(totalPlayers.hand, cardToDiscard, faceDownPile4);
//       console.log(`${totalPlayers.name} discards to the face-down pile: ${cardToDiscard.value} of ${cardToDiscard.suit}`);
//     }

//     // Clear the timeout since the player's turn ended
//     clearTimeout(timer);
//     resolve(true);
//   });
// }

// // Define your player, draw pile, and face-down pile
// const totalPlayers = {
//   name: 'Player 1',
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Diamonds', value: 'Ace' },
//     // Add more cards as needed
//   ],
// };

// const drawPile4 = [
//   { suit: 'Hearts', value: '5' },
//   { suit: 'Spades', value: '7' },
//   // Add more cards as needed
// ];

// const faceDownPile4 = [
//   { suit: 'Clubs', value: '9' },
//   { suit: 'Diamonds', value: 'King' },
//   // Add more cards as needed
// ];

// console.log("Simulating Player 1's turn:");
// simulatePlayerTurn(totalPlayers, drawPile4, faceDownPile4)
//   .then((turnEnded) => {
//     if (turnEnded) {
//       console.log("Player 1's turn has ended.");
//     } else {
//       console.log("Player 1's turn is still ongoing.");
//     }
//   });





[{"suit":"Hearts","value":"3"},{"suit":"Spades","value":"9"},{"suit":"Clubs","value":"Ace"},{"suit":"Spades","value":"7"},{"suit":"Diamonds","value":"Ace"},{"suit":"Diamonds","value":"3"},{"suit":"Diamonds","value":"4"},{"suit":"Clubs","value":"5"},{"suit":"Diamonds","value":"7"},{"suit":"Hearts","value":"Queen"}]
[{"suit":"Hearts","value":"3"},{"suit":"Spades","value":"9"},{"suit":"Clubs","value":"Ace"},{"suit":"Spades","value":"7"},{"suit":"Diamonds","value":"Ace"},{"suit":"Diamonds","value":"3"},{"suit":"Diamonds","value":"4"},{"suit":"Clubs","value":"5"},{"suit":"Diamonds","value":"7"},{"suit":"Hearts","value":"Queen"}]



// const game = {
//   players:[
//     {},{}
//   ]
// }

const game = {
  players:{
    '1':{
      name:'',
      hand:""
    },
    '2':{
      name:'',
      hand:""
    },

  },
  currentPlayerId:'1'
}



//------------------------------------ Main Game Logic -----------------------------------------------

// const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
// const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// const GameStates = {
//   NOT_STARTED: 'NOT_NOT_STARTED',
//   STARTED: 'STARTED',
//   ENDED: 'ENDED',
// };

// function initializeDeck() {
//   const deck = [];
//   for (const suit of suits) {
//     for (const value of values) {
//       deck.push({ suit, value });
//     }
//   }
//   return deck;
// }
// // Testing code to display the output of initializeDeck
// const deck = initializeDeck();
// console.log(deck);

// //--------------------------------------------- shuffleDeck -------------------------------------

// function shuffleDeck(deck) {
//   for (let i = deck.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [deck[i], deck[j]] = [deck[j], deck[i]];
//   }
// }

// // Testing code to display the output of shuffleDeck
// const sampleDeck = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '3' },
//   { suit: 'Clubs', value: '4' },
//   { suit: 'Spades', value: '5' },
//   // Add more cards here
// ];

// shuffleDeck(sampleDeck);
// console.log(sampleDeck);

// //--------------------------------------------- dealCards ----------------------------------------------

// // function dealCards(players, deck) {
// //   shuffleDeck(deck);
// //   console.log()

// //   const flattened = Object.entries(players).flatMap(([key, value]) => {
// //     players[key].hand = []
// //     return [{ id: key, ...value }]
// //     });
// //   const numPlayers = flattened.length;
// //   const numCardsPerPlayer = (numPlayers === 2) ? 10 : 7;

// //   let faceDownPile = [];
// //   let tempDeck = [...deck]; // Original deck ko modify na karne ke liye ek temporary deck banaya gaya hai.

// //   // Khiladiyon ko cards baantne ka kaam
// //   for (let i = 0; i < numCardsPerPlayer * numPlayers; i++) {
// //     let selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];

// //     let playerIndex = flattened[i % numPlayers].id // Determine the current player
// //     let validCard = false;
// //     console.log(players);
// //     while (!validCard) {
// //       if (
// //         !players[playerIndex].hand.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value) &&
// //         !faceDownPile.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value)
// //       ) {
// //         validCard = true;
// //       } else {
// //         selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];
// //       }
// //     }

// //     players[playerIndex].hand.push(selectedCard);
// //     tempDeck = tempDeck.filter(
// //       (card) => card.suit !== selectedCard.suit || card.value !== selectedCard.value
// //     );
// //   }

// //   faceDownPile = tempDeck; // Bachi hui cards ko faceDownPile mein daala gaya hai.

// //    //faceUpPile = [];
// //    console.log("deal cards",players)

// //   return { faceDownPile };
// // }

// // const players = {
// //   '1':{
// //     name:'',
// //     hand:[]
// //   },
// //   '2':{
// //     name:'',
// //     hand:[]
// //   },

// // }

// // const deck1 = initializeDeck();

// // const result = dealCards(players, deck1);

// // // Display the output
// // console.log("Face Down Pile:");
// // console.log(result.faceDownPile);

// // console.log("Face Up Pile (Initially Empty):");
// // console.log(result.faceUpPile);

// // players.forEach((player) => {
// //   console.log(`${player.name}'s hand:`);
// //   console.log(player.hand);
// // });


// function dealCards(players, deck) {
//   shuffleDeck(deck);

//   const numPlayers = players.length;
//   const numCardsPerPlayer = (numPlayers === 2) ? 10 : 7;

//   let faceDownPile = [];
//   let tempDeck = [...deck]; // Original deck ko modify na karne ke liye ek temporary deck banaya gaya hai.

//   // Khiladiyon ko cards baantne ka kaam
//   for (let i = 0; i < numCardsPerPlayer * numPlayers; i++) {
//     let selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];

//     let playerIndex = i % numPlayers; // Determine the current player
//     let validCard = false;

//     while (!validCard) {
//       if (
//         !players[playerIndex].hand.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value) &&
//         !faceDownPile.some((card) => card.suit === selectedCard.suit && card.value === selectedCard.value)
//       ) {
//         validCard = true;
//       } else {
//         selectedCard = tempDeck[Math.floor(Math.random() * tempDeck.length)];
//       }
//     }

//     players[playerIndex].hand.push(selectedCard);
//     tempDeck = tempDeck.filter(
//       (card) => card.suit !== selectedCard.suit || card.value !== selectedCard.value
//     );
//   }

//   faceDownPile = tempDeck; // Bachi hui cards ko faceDownPile mein daala gaya hai.

//    //faceUpPile = [];

//   return { faceDownPile };
// }

// const players = [
//   { name: "Rakesh", hand: [] },
//   { name: "Rajesh", hand: [] }
// ];

// const deck1 = initializeDeck();

// const result = dealCards(players, deck1);

// // Display the output
// console.log("Face Down Pile:");
// console.log(result.faceDownPile);

// console.log("Face Up Pile (Initially Empty):");
// console.log(result.faceUpPile);

// players.forEach((player) => {
//   console.log(`${player.name}'s hand:`);
//   console.log(player.hand);
// });

// //------------------------------------------ drawCard -------------------------------------------------

// // function drawCard(playerHand, faceDownPile, faceUpPile) {
// //   if (!faceDownPile || (faceUpPile && faceUpPile.length > 0)) {
// //     let drawnCard;

// //     if (faceUpPile.length == 0) {
// //       // If the face up pile has cards, draw from there first
// //       drawnCard = faceDownPile.pop();
// //     } else if (faceDownPile.length == 0) {
// //       // If the face up pile is empty, draw from the face down pile
// //       drawnCard = faceUpPile.pop();
// //     }

// //     if (drawnCard) {
// //       playerHand.push(drawnCard);
// //       return drawnCard;
// //     }
// //   }

// //   console.log('Both face down pile and face up pile are empty. Cannot draw a card.');
// //   return null;
// // }

// // function drawCard(playerHand, faceDownPile, faceUpPile) {
// //   if (faceDownPile.length > 0) {
// //     const drawnCard = faceDownPile.pop();
// //     playerHand.push(drawnCard);

// //     if (faceUpPile.length === 0) {
// //       // If the face-up pile is empty, draw from the face-down pile and update the count
// //       const drawnCardFromFaceDown = faceDownPile.pop();
// //       playerHand.push(drawnCardFromFaceDown);
// //     }

// //     return drawnCard;
// //   } else {
// //     console.log('Face down pile is empty. Cannot draw a card.');
// //     return null;
// //   }
// // }

// // function drawCard(playerHand, faceDownPile, faceUpPile) {
// //   if (faceDownPile.length > 0) {
// //     const drawnCard = faceDownPile.pop();
// //     playerHand.push(drawnCard);

// //     if (faceDownPile.length > 0) {
// //       // If there are more cards in the face-down pile, draw one card from the face-down pile
// //       const drawnCardFromFaceDown = faceDownPile.pop();
// //       playerHand.push(drawnCardFromFaceDown);
// //     }

// //     return drawnCard;
// //   } else {
// //     console.log('Face down pile is empty. Cannot draw a card.');
// //     return null;
// //   }
// // }


// function drawCard(playerHand, faceDownPile, faceUpPile) {
//   if (faceDownPile.length > 0) {
//     // Draw one card from the face-down pile
//     const drawnCard = faceDownPile.pop();
//     playerHand.push(drawnCard);

//     if (faceUpPile.length === 0 && faceDownPile.length > 0) {
//       // If the face-up pile is empty and there are more cards in the face-down pile, draw one more card
//       const drawnCardFromFaceDown = faceDownPile[faceDownPile.length - 1];
//       playerHand.push(drawnCardFromFaceDown);
//       faceDownPile.pop(); // Remove the same card from the face-down pile
//     }

//     return drawnCard;
//   } else {
//     console.log('Face down pile is empty. Cannot draw a card.');
//     return null;
//   }
// }




// const playerHand = [ 
// { suit: 'Clubs', value: 'King' },
// { suit: 'Spades', value: '2' },
// { suit: 'Spades', value: 'King' },
// { suit: 'Spades', value: '8' },
// ]; // Initialize the player's hand
// const faceDownPiles = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: 'Ace' },
//   { suit: 'Clubs', value: '5' },
//   { suit: 'Hearts', value: '6' }
// ];

// const faceUpPile = []; // Initialize the face up pile as an empty array

// console.log('Before drawing a card:');
// console.log('Player Hand:', playerHand);
// console.log('Face Down Pile:', faceDownPiles);
// console.log('Face Up Pile:', faceUpPile);

// const drawnCard = drawCard(playerHand, faceDownPiles, faceUpPile);

// if (drawnCard !== null) {
//   console.log('Card drawn:', drawnCard);
// }

// console.log('After drawing a card:');
// console.log('Player Hand:', playerHand);
// console.log('Face Down Pile:', faceDownPiles);
// console.log('Face Up Pile:', faceUpPile);


// //------------------------------------------- discardCard --------------------------------------------

// function discardCard(playerHand, cardToDiscard, faceUpPile) {
//   const index = playerHand.findIndex(
//     (card) => card.suit === cardToDiscard.suit && card.value === cardToDiscard.value
//   );
//   if (index !== -1) {
//     playerHand.splice(index, 1);
//     faceUpPile.push(cardToDiscard);
//   }
// }   

// // Initialize player's hand, face up pile, and a card to discard
// const playerHand6 = [{ suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: 'Ace' },
//   { suit: 'Clubs', value: '5' },
//    { suit: 'Spades', value: 'King' },]; // Assume player has these cards
// const faceUpPile1 = [6, 7, 8]; // Assume face up pile has these cards
// const cardToDiscard = { suit: 'Clubs', value: '5' }; // Change this to the card you want to discard

// // Call the `discardCard` function
// discardCard(playerHand6, cardToDiscard, faceUpPile1);

// // Display the output
// console.log("Player's Hand After Discarding:");
// console.log(playerHand6);

// console.log("Face Up Pile After Discarding:");
// console.log(faceUpPile1);

// //-------------------------------------------- initializeGame -------------------------------------------

// // function initializeGame(playerIds) {
// //   const numPlayers = playerIds.length
// //   if (numPlayers < 2 || numPlayers > 5) {
// //     console.log('Invalid number of players. The game supports 2 to 5 players.');
// //     return null;
// //   }
// //   const players = {};
// //   playerIds.forEach(id=>{
// //     players[id]={name:`player ${id}`, hand:[]}
// //   })


// //   const deck = initializeDeck();
// //   console.log('initialize :',deck);
// //   const { drawPile, faceDownPile } = dealCards(players, deck);

// //   let currentPlayerIndex = 0;
// //   let currentPlayer = players[currentPlayerIndex];
// //   const faceUpPile = []

// //   return { players, drawPile, faceDownPile,faceUpPile, currentPlayerIndex, currentPlayer, state: GameStates.NOT_STARTED };
// // }

// // // Sample testing code
// // const numPlayers = 4; // Change the number of players as needed
// // const gameData = initializeGame(['1','2']);

// // if (gameData !== null) {
// //   console.log('Game Initialized:');
// //   console.log('Number of Players:', numPlayers);
// //   console.log('Current Player:', gameData.currentPlayer);
// //   console.log('Draw Pile:', gameData.drawPile);
// //   console.log('Face Down Pile:', gameData.faceDownPile);
// //   console.log('Players:');
// //  console.log( gameData.players);
// //   console.log('Game State:', gameData.state);
// // }


// function initializeGame(numPlayers) {
//   if (numPlayers < 2 || numPlayers > 5) {
//     console.log('Invalid number of players. The game supports 2 to 5 players.');
//     return null;
//   }

//   const players = [];
//   for (let i = 1; i <= numPlayers; i++) {
//     players.push({ name: `Player ${i}`, hand: [] });
//   }

//   const deck = initializeDeck();
//   console.log('initialize :',deck);
//   const { drawPile, faceDownPile } = dealCards(players, deck);

//   let currentPlayerIndex = 0;
//   let currentPlayer = players[currentPlayerIndex];
//   const faceUpPile = []

//   return { players, drawPile, faceDownPile,faceUpPile, currentPlayerIndex, currentPlayer, state: GameStates.NOT_STARTED };
// }

// // Sample testing code
// const numPlayers = 4; // Change the number of players as needed
// const gameData = initializeGame(numPlayers);

// if (gameData !== null) {
//   console.log('Game Initialized:');
//   console.log('Number of Players:', numPlayers);
//   console.log('Current Player:', gameData.currentPlayer.name);
//   console.log('Draw Pile:', gameData.drawPile);
//   console.log('Face Down Pile:', gameData.faceDownPile);
//   console.log('Players:');
//   gameData.players.forEach((player, index) => {
//     console.log(`  ${player.name}'s hand:`, player.hand);
//   });
//   console.log('Game State:', gameData.state);
// }
// //------------------------------------------ nextPlayer ------------------------------------------------

// function nextPlayer(currentPlayerIndex, playerNames) {
//   return (currentPlayerIndex + 1) % playerNames.length;
// }

// const playerNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4']; // Replace with your player names
// let currentPlayerIndex = 0; // You can change this index to test different scenarios

// const nextPlayerIndex = nextPlayer(currentPlayerIndex, playerNames);
// const nextPlayerName = playerNames[nextPlayerIndex];

// console.log(`Current Player: ${playerNames[currentPlayerIndex]}`);
// console.log(`Next Player: ${nextPlayerName}`);


// //------------------------------------------ isValidSequence -------------------------------------------

// function isValidSequence(cards) {
//   const sortedCards = [...cards].sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
//   let prevValue = -1;
//   for (const card of sortedCards) {
//     const valueIndex = values.indexOf(card.value);
//     if (prevValue === -1) {
//       prevValue = valueIndex;
//     } else if (valueIndex !== prevValue + 1) {
//       return false;
//     }
//     prevValue = valueIndex;
//   }
//   return true;
// }

// // Example usage of isValidSequence function within your game logic
// const playerHand3 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Hearts', value: '3' },
//   { suit: 'Hearts', value: '4' },
// ];

// if (isValidSequence(playerHand3)) {
//   console.log("Valid Sequence!");
// } else {
//   console.log("Not a valid Sequence.");
// }


// //-------------------------------------------- isValidSet ---------------------------------------------

// function isValidSet(cards) {
//   const uniqueValues = new Set();
//   for (const card of cards) {
//     uniqueValues.add(card.value);
//   }
//   return uniqueValues.size === 1;
// }

// // Example usage of isValidSet function within your game logic
// const playerHand4 = [
//   { suit: 'Hearts', value: '2' },
//   { suit: 'Diamonds', value: '2' },
//   { suit: 'Clubs', value: '2' },
// ];

// if (isValidSet(playerHand4)) {
//   console.log("Valid Set!");
// } else {
//   console.log("Not a valid Set.");
// }

// // 
// //------------------------------------------ checkWinning -----------------------------------------------

// function checkWinning(player1, player2) {
//   const hand1 = [...player1.hand];
//   const hand2 = [...player2.hand];

//   // Sort the hands to make it easier to check for sets and sequences
//   hand1.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
//   hand2.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));

//   // Variables to track the number of sets and sequences for each player
//   let setCount1 = 0;
//   let setCount2 = 0;
//   let sequenceCount1 = 0;
//   let sequenceCount2 = 0;

//   // Check for sets and sequences in each player's hand
//   for (let i = 0; i <= hand1.length - 3; i++) {
//     const currentSet = [hand1[i], hand1[i + 1], hand1[i + 2]];
//     if (isValidSet(currentSet)) {
//       setCount1++;
//       console.log(`Player 1 formed Set #${setCount1}:`, currentSet);
//     } else if (isValidSequence(currentSet)) {
//       sequenceCount1++;
//       console.log(`Player 1 formed Sequence #${sequenceCount1}:`, currentSet);
//     }
//   }

//   for (let i = 0; i <= hand2.length - 3; i++) {
//     const currentSet = [hand2[i], hand2[i + 1], hand2[i + 2]];
//     if (isValidSet(currentSet)) {
//       setCount2++;
//       console.log(`Player 2 formed Set #${setCount2}:`, currentSet);
//     } else if (isValidSequence(currentSet)) {
//       sequenceCount2++;
//       console.log(`Player 2 formed Sequence #${sequenceCount2}:`, currentSet);
//     }
//   }

//   // Calculate the scores for each player
//   const player1Score = calculateScore(hand1);
//   const player2Score = calculateScore(hand2);

//   // Determine the winner based on sets, sequences, and scores
//   if (setCount1 > setCount2) {
//     console.log("Player 1 wins with more sets!");
//     return `Player 1 wins with ${setCount1} sets, ${sequenceCount1} sequences, and a score of ${player1Score}!`;
//   } else if (setCount2 > setCount1) {
//     console.log("Player 2 wins with more sets!");
//     return `Player 2 wins with ${setCount2} sets, ${sequenceCount2} sequences, and a score of ${player2Score}!`;
//   } else {
//     console.log("No winner based on sets. Checking sequences and scores.");
//     if (sequenceCount1 > sequenceCount2) {
//       console.log("Player 1 wins with more sequences!");
//       return `Player 1 wins with ${sequenceCount1} sequences and a score of ${player1Score}!`;
//     } else if (sequenceCount2 > sequenceCount1) {
//       console.log("Player 2 wins with more sequences!");
//       return `Player 2 wins with ${sequenceCount2} sequences and a score of ${player2Score}!`;
//     } else {
//       console.log("No winner based on sets and sequences. Checking scores.");
//       if (player1Score > player2Score) {
//         return `Player 1 wins with a score of ${player1Score}!`;
//       } else if (player2Score > player1Score) {
//         return `Player 2 wins with a score of ${player2Score}!`;
//       } else {
//         return "It's a draw.";  
//       }
//     }
//   }
// }


// const player1 = {
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '2' },
//     { suit: 'Diamonds', value: '2' },
//   ],
// };

// const player2 = {
//   hand: [
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '3' },
//     { suit: 'Diamonds', value: '4' },
    
//     { suit: 'Hearts', value: '2' },
//     { suit: 'Spades', value: '2' },
//     { suit: 'Diamonds', value: '2' },
//   ]
// };
// const results = checkWinning(player1, player2);
// console.log(results);

// //====================================== simulatePlayerTurn =========================================

// // function simulatePlayerTurn(gameData) {
// //   const currentPlayer = gameData.currentPlayer;
// //   const currentPlayerIndex = gameData.currentPlayerIndex;

// //   console.log(`Current Player: ${currentPlayer.name}`);

// //   const turnTimeout = 10000;
// //   let timerExpired = false;

// //   const turnTimer = setTimeout(() => {
// //     console.log(`Player ${currentPlayer.name} ran out of time. Moving to the next player.`);
// //     timerExpired = true;

// //     // Simulate discarding a card if a card is in hand
// //     if (currentPlayer.hand.length > 0) {
// //       const cardToDiscard = currentPlayer.hand[0];
// //       discardCard(currentPlayer.hand, cardToDiscard, gameData.faceUpPile);
// //       console.log(`Player discards: ${cardToDiscard.suit} ${cardToDiscard.value}`);
// //     }

// //     // Check for a winning condition
// //     const winner = checkWinning(gameData.players[0], gameData.players[1]);
// //     if (winner !== "No winner yet.") {
// //       console.log(winner);

// //       const player1Score = calculateScore(gameData.players[0].hand);
// //       const player2Score = calculateScore(gameData.players[1].hand);

// //       console.log(`Player 1 Score: ${player1Score}`);
// //       console.log(`Player 2 Score: ${player2Score}`);
// //       gameData.state = GameStates.ENDED;
// //     } else {
// //       gameData.currentPlayerIndex = nextPlayer(currentPlayerIndex, gameData.players);
// //       gameData.currentPlayer = gameData.players[gameData.currentPlayerIndex];
// //       simulatePlayerTurn(gameData);
// //     }
// //   }, turnTimeout);

// //   const drawnCard = drawCard(currentPlayer.hand, gameData.drawPile, gameData.faceUpPile);
// //   if (drawnCard !== null) {
// //     console.log(`Player draws: ${drawnCard.suit} ${drawnCard.value}`);
// //     clearTimeout(turnTimer);
    
// //     // Call the winning condition after a card is drawn
// //     const winner = checkWinning(gameData.players[0], gameData.players[1]);
// //     if (winner !== "No winner yet.") {
// //       console.log(winner);

// //       const player1Score = calculateScore(gameData.players[0].hand);
// //       const player2Score = calculateScore(gameData.players[1].hand);

// //       console.log(`Player 1 Score: ${player1Score}`);
// //       console.log(`Player 2 Score: ${player2Score}`);
// //       gameData.state = GameStates.ENDED;
// //     } else {
// //       endPlayerTurn();
// //     }
// //   }

// //   if (timerExpired) {
// //     return;
// //   }
// // }

// // const numberPlayers = 2;
// // const gamesData = initializeGame(numberPlayers);

// // while (gamesData.state !== GameStates.ENDED) {
// //   simulatePlayerTurn(gamesData);
// // }

// // console.log("Game Ended!");



// //================================= calculate score in a function =====================================

// function calculateScore(hand) {
//   // Define a mapping of card values to their corresponding numerical values.
//   const valueMap = {
//     '2': 2,
//     '3': 3,
//     '4': 4,
//     '5': 5,
//     '6': 6,
//     '7': 7,
//     '8': 8,
//     '9': 9,
//     '10': 10,
//     'Jack': 10,
//     'Queen': 10,
//     'King': 10,
//     'Ace': 11, // You might need to handle Ace differently based on your game's rules
//   };

//   let score = 0;

//   for (const card of hand) {
//     const cardValue = card.value;
//     if (valueMap[cardValue]) {
//       score += valueMap[cardValue];
//     }
//   }

//   return score;
// }

// // Define hands of cards for two players
// const player1Hand = [
//   { value: '2' },
//   { value: 'King' },
//   { value: '7' },
//   { value: 'Ace' },
//   // Add more cards for Player 1 as needed
// ];

// const player2Hand = [
//   { value: '3' },
//   { value: 'Queen' },
//   { value: '5' },
//   { value: '10' },
//   // Add more cards for Player 2 as needed
// ];

// // Calculate the scores for both players
// const player1Score = calculateScore(player1Hand);
// const player2Score = calculateScore(player2Hand);

// // Log the results
// console.log('Player 1 Score:', player1Score);
// console.log('Player 2 Score:', player2Score);



// //--------------------------------------------- Functions Exportation ------------------------------------

// module.exports = {
//   initializeDeck,
//   shuffleDeck,
//   dealCards,
//   drawCard,
//   discardCard,
//   initializeGame,
//   nextPlayer,
//   isValidSequence,
//   isValidSet,
//   calculateScore,
//   checkWinning,
//   //simulatePlayerTurn,
  
// };




//======================================== New Game Logic =============================================

// const socketIo = require('socket.io');
// const {
//   initializeDeck,
//   shuffleDeck,
//   dealCards,
//   drawCard,
//   discardCard,
//   drawFromFaceDownPile,
//   isValidSequence,
//   isValidSet,
//   isValidMeld,
//   initializeGame,
//   nextPlayer,
//   displayHand,
//   calculateCardScore,
//   calculateHandScore,
//   checkWinning,
//   simulatePlayerTurn,
//   joinGame,
//   rejoinGame,
//   startGameWithPlayers,
//   endGame,
//   leaveGame,
//   continuePreviousGame,
//   startNewGame,
// } = require('../utils/util'); // Include your utility functions

// const GameStates = {
//   NOT_STARTED: 'NOT_NOT_STARTED',
//   STARTED: 'STARTED',
//   ENDED: 'ENDED',
// };
// const rooms = ['1','2']
// const gameId = "game1"
// function initializeSocket(server) {
//   const io = socketIo(server)
//   // io.use(verifySocketAuth)

//   io.on('connection', (socket) => {
//     console.log('A user connected.');
//     const personalRoom = socket.handshake.query.id
//     console.log('Player',personalRoom);
//     socket.join(`Player ${personalRoom}`)
//     socket.join(gameId)
//     // Create a room for each socket connection
//     socket.on('join game',(gameId='game1')=>{
//       socket.to('Player 1').emit('message','user joined')
//       socket.to('Player 2').emit('message','user joined')
//     })

//     socket.on('initializeGame', (gameId='game1') => {
//       //db call for game details
//       //const game = await rummyGameModel.findById(gameId);
//       // socket.join(gameId)
//       const numPlayers = 2
//       const game = initializeGame(numPlayers);
//       socket.game = game
//       console.log(game);
//       const players = game.players
//       if (game) {
//         // Store the game state in the room object
//         io.to(gameId).emit('cards', initializeDeck())
//         io.to(players[0].name).emit('handCard', game.players[0].hand);
//         io.to(players[1].name).emit('handCard', game.players[1].hand);
//         //io.to(gameId).emit('faceDownPiles', game.faceDownPile)
//       } else {
//         socket.to(gameId).emit('invalidPlayerCount', 'Invalid number of players. The game supports 2 to 5 players.');
//       }
//     });
    
//     //draw card
//     socket.on('drawCard', (playerIndex) => {
//       if (socket.game) {
//         const player = socket.game.players[playerIndex];
//         const drawnCard = drawCard(player.hand, socket.game.faceDownPile,socket.game.faceUpPile);
//         // socket.emit('')
//         socket.emit('handCard', player.hand);
//         socket.emit('drawnCard', drawnCard);
//         io.to('game1').emit('faceDownPiles', socket.game.drawPile);
//       }
//     });

//     // discard card
//     socket.on('discardCard', (playerIndex, cardToDiscard) => {
//       if (socket.game) {
//         const player = socket.game.players[playerIndex];
//         discardCard(player.hand, cardToDiscard, socket.game.faceUpPile);
//         socket.emit('handCard', player.hand);
//         io.to('game1').emit('faceUpPile', socket.game.faceUpPile);
//         socket.emit('discardedCard', socket.game.faceUpPile);
//       }
//     });

//     socket.on('createRoom', () => {
//       const room = Math.random().toString(36).substring(7);
//       socket.join(room);

//       //========================================= Initialize a game =====================================

//       // Add other functions inside this room

//       //=================================== Advance to the next player ==================================

//       socket.on('nextPlayer', () => {
//         if (socket.game) {
//           socket.game.currentPlayerIndex = nextPlayer(socket.game.currentPlayerIndex, socket.game.players);
//           socket.to(socket.room).emit('nextPlayerIndex', socket.game.currentPlayerIndex);
//         }
//       });

//       //=================================== Display a player's hand =====================================

//       socket.on('displayPlayerHand', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           displayHand(player.hand);
//           socket.to(socket.room).emit('displayedPlayerHand', 'Player hand displayed.');
//         }
//       });

//       //========================================= Shuffle the deck =======================================

//       socket.on('shuffleDeck', () => {
//         if (socket.game) {
//           shuffleDeck(socket.game.drawPile);
//           socket.to(socket.room).emit('shuffledDeck', socket.game.drawPile);
//         }
//       });

//       //======================================= Deal cards to players ====================================

//       socket.on('dealCards', () => {
//         if (socket.game) {
//           dealCards(socket.game.players, socket.game.drawPile);
//           socket.to(socket.room).emit('dealtCards', socket.game.players);
//         }
//       });

//       //------------------------------------- Initialize the deck ---------------------------------------

//       // socket.on('initializeDeck', () => {
//       //   const deck = initializeDeck();
//       //   socket.emit('initializedDeck', deck);
//       // });

//      socket.emit('message', 'Welcome to the server!');
//       socket.on('message',(data)=>{
//         console.log(data)
//         socket.to()
//       })
//      socket.on('test',()=>{
//         const deck = initializeDeck();
//          console.log(deck)
//         socket.emit('shuffleDeck',{deck});
//       })

//       //------------------------------- Draw a card from the draw pile --------------------------------------
//       socket.on('drawCard', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const drawnCard = drawCard(player.hand, socket.game.drawPile);
//           socket.to(socket.room).emit('drawnCard', { playerHand: player.hand, drawnCard });
//         }
//       });

//       //------------------------------ Discard a card to the discard pile --------------------------------

//       socket.on('discardCard', (playerIndex, cardToDiscard) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           discardCard(player.hand, cardToDiscard, socket.game.discardPile);
//           socket.to(socket.room).emit('discardedCard', { playerHand: player.hand, discardPile: socket.game.discardPile });
//         }
//       });

//       //--------------------------- Draw a card from the face-down pile ---------------------------------

//       socket.on('drawFromFaceDownPile', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const drawnCard = drawFromFaceDownPile(player.hand, socket.game.faceDownPile);
//           socket.to(socket.room).emit('drawnFaceDownCard', { playerHand: player.hand, drawnCard });
//         }
//       });

//       //-------------------------------- Check if a sequence is valid ------------------------------------

//       socket.on('isValidSequence', (cards) => {
//         const isValid = isValidSequence(cards);
//         socket.to(socket.room).emit('validSequence', isValid);
//       });

//       //===================================== Check if a set is valid ===================================
//       socket.on('isValidSet', (cards) => {
//         const isValid = isValidSet(cards);
//         socket.to(socket.room).emit('validSet', isValid);
//       });

//       //==================================== Check if a meld is valid ===================================

//       socket.on('isValidMeld', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const isMeldValid = isValidMeld(player.hand);
//           socket.to(socket.room).emit('validMeld', isMeldValid);
//         }
//       });

//       //====================================== Check if a player has won ================================

//       socket.on('checkWinning', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const hasWon = checkWinning(player);
//           socket.to(socket.room).emit('playerWinStatus', hasWon);
//         }
//       });

//       //---------------------------------- Calculate the score for a card ===============================

//       socket.on('calculateCardScore', (card) => {
//         const score = calculateCardScore(card);
//         socket.emit('calculatedCardScore', score);
//       });

//       //--------------------------- Calculate the score for a player's hand -----------------------------

//       socket.on('calculateHandScore', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const handScore = calculateHandScore(player.hand);
//           socket.to(socket.room).emit('calculatedHandScore', handScore);
//         }
//       });

//       //---------------------------------- Simulate a player's turn -------------------------------------

//       socket.on('simulatePlayerTurn', (playerIndex) => {
//         if (socket.game) {
//           const player = socket.game.players[playerIndex];
//           const gameEnded = simulatePlayerTurn(player, socket.game.drawPile, socket.game.faceDownPile);
//           if (gameEnded) {
//             socket.to(socket.room).emit('gameEnded', 'Game has ended.');
//           }
//         }
//       });

//       //--------------- Function to start a game with a specified number of players ---------------------

//       socket.on('startGameWithPlayers', (numPlayers) => {
//         const game = startGameWithPlayers(numPlayers);
//         if (game) {
//           socket.to(socket.room).emit('gameStarted', game);
//           socket.game = game;
//         }
//       });

//       //----------------------------------- Function to join a game -------------------------------------

//       socket.on('joinGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           joinGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerJoined', `${playerName} has joined the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotJoin', 'Cannot join the game. It has already started.');
//         }
//       });

//       //--------------------------------- Function to rejoin a game --------------------------------------

//       socket.on('rejoinGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           rejoinGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerRejoined', `${playerName} has rejoined the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotRejoin', 'Cannot rejoin the game. It has already started.');
//         }
//       });

//       //--------------------------------- Function to end the game --------------------------------------

//       socket.on('endGame', () => {
//         if (socket.game.state === GameStates.STARTED) {
//           endGame(socket.game);
//           socket.to(socket.room).emit('gameEnded', 'The game has ended.');
//         }
//       });

//       //------------------------------- Function to leave the game --------------------------------------

//       socket.on('leaveGame', (playerName) => {
//         if (socket.game.state === GameStates.NOT_STARTED) {
//           leaveGame(socket.game, playerName);
//           socket.to(socket.room).emit('playerLeft', `${playerName} has left the game.`);
//         } else {
//           socket.to(socket.room).emit('cannotLeave', 'Cannot leave the game. It has already started.');
//         }
//       });

//       //-------------------------- Function to continue the previous game -------------------------------

//       socket.on('continuePreviousGame', (playerName) => {
//         if (socket.game.state === GameStates.ENDED) {
//           const player = socket.game.players.find(player => player.name === playerName);
//           if (player) {
//             socket.game.state = GameStates.STARTED;
//             socket.to(socket.room).emit('gameContinued', `${playerName} has chosen to continue the previous game.`);
//           } else {
//             socket.to(socket.room).emit('cannotContinue', 'Cannot continue the previous game. Player not found.');
//           }
//         } else {
//           socket.to(socket.room).emit('cannotContinue', 'Cannot continue the previous game. The game is not ended.');
//         }
//       });

//       //------------------------------- Function to start a new game -----------------------------------

//       socket.on('startNewGame', () => {
//         if (socket.game.state === GameStates.ENDED) {
//           socket.game.players = [];
//           socket.game.state = GameStates.NOT_STARTED;
//           socket.to(socket.room).emit('newGameStarted', 'A new game has started.');
//         } else {
//           socket.to(socket.room).emit('cannotStartNew', 'Cannot start a new game. The previous game is not ended.');
//         }
//       });
//     });
//   });
// }

// module.exports = initializeSocket;