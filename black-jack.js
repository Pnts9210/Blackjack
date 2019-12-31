
let cards = [
    //SPADES
    {
        card: "🂡",
        value: 1
    },
    {
        card: "🂢",
        value: 2
    },
    {
        card: "🂣",
        value: 3
    },
    {
        card: "🂤",
        value: 4
    },
    {
        card: "🂥",
        value: 5
    },
    {
        card: "🂦",
        value: 6
    },
    {
        card: "🂧",
        value: 7
    },
    {
        card: "🂨",
        value: 8
    },
    {
        card: "🂩",
        value: 9
    },
    {
        card: "🂪",
        value: 10
    },
    {
        card: "🂫",
        value: 10
    },
    {
        card: "🂭",
        value: 10
    },
    {
        card: "🂮",
        value: 10
    },
    //HEARTS
    {
        card: "🂱",
        value: 1
    },
    {
        card: "🂲",
        value: 2
    },
    {
        card: "🂳",
        value: 3
    },
    {
        card: "🂴",
        value: 4
    },
    {
        card: "🂵",
        value: 5
    },
    {
        card: "🂶",
        value: 6
    },
    {
        card: "🂷",
        value: 7
    },
    {
        card: "🂸",
        value: 8
    },
    {
        card: "🂹",
        value: 9
    },
    {
        card: "🂺",
        value: 10
    },
    {
        card: "🂻",
        value: 10
    },
    {
        card: "🂽",
        value: 10
    },
    {
        card: "🂾",
        value: 10
    },
    //DIAMONDS    
    {
        card: "🃁",
        value: 1
    },
    {
        card: "🃂",
        value: 2
    },
    {
        card: "🃃",
        value: 3
    },
    {
        card: "🃄",
        value: 4
    },
    {
        card: "🃅",
        value: 5
    },
    {
        card: "🃆",
        value: 6
    },
    {
        card: "🃇",
        value: 7
    },
    {
        card: "🃈",
        value: 8
    },
    {
        card: "🃉",
        value: 9
    },
    {
        card: "🃊",
        value: 10
    },
    {
        card: "🃋",
        value: 10
    },
    {
        card: "🃍",
        value: 10
    },
    {
        card: "🃎",
        value: 10
    },
    //CLUBS
    {
        card: "🃑",
        value: 1
    },
    {
        card: "🃒",
        value: 2
    },
    {
        card: "🃓",
        value: 3
    },
    {
        card: "🃔",
        value: 4
    },
    {
        card: "🃕",
        value: 5
    },
    {
        card: "🃖",
        value: 6
    },
    {
        card: "🃗",
        value: 7
    },
    {
        card: "🃘",
        value: 8
    },
    {
        card: "🃙",
        value: 9
    },
    {
        card: "🃚",
        value: 10
    },
    {
        card: "🃛",
        value: 10
    },
    {
        card: "🃝",
        value: 10
    },
    {
        card: "🃞",
        value: 10
    }
];
let deck = [];
let dealer = [];
let player = [];
let outputArea = document.getElementById("output-area");
let winnerArea = document.getElementById("winner-area");
let startBtn = document.getElementById("new-game-button");
let hitBtn = document.getElementById("hit-button");
let stayBtn = document.getElementById("stay-button");
let playerScore = "";
let dealerScore = "";
hideGameButtons();


function shuffleDeck() {
    let tmpDeck = cards.slice(0);
    while (tmpDeck.length > 0) {
        let result = Math.random() * tmpDeck.length;;
        let pos = Math.trunc(result);
        let card = tmpDeck.splice(pos, 1);
        deck.push(...card);
    }
};
function drawCard() {
    return deck.shift();
};
function clearTable() {
    outputArea.innerText = "";
};
function showHand(hand, score) {
    let cards = "";
    for (let i = 0; i < hand.length; i++) {
        cards += hand[i].card;
    }
    cards += + " " + score + "\n"
    return cards;
};
function showHands(stayed = false) {
    let winner = "";
    playerScore = calculateHand(player);
    dealerScore = calculateHand(dealer);
    clearTable();
    outputArea.innerText = showHand(dealer, dealerScore) + showHand(player, playerScore);
    winner = determineWinner(stayed);
    winnerArea.innerHTML = winner;    
    
    if (winner != "")
    hideGameButtons();
    
};
function dealInitialCards() {
    player.push(drawCard());
    player.push(drawCard());
    dealer.push(drawCard());
    dealer.push(drawCard());
    showHands();
    
};
function hasAce(cards) {
    return cards.value === 1;
};
function calculateHand(cards) {
    let score = 0;
    cards.forEach(x => {
        score += x.value;
    });
    
    if (cards.find(hasAce)) {
        if (score + 10 < 22)
        score += 10;
    }
    return score;
};
function startNewGame() {
    showGameButtons()
    clearTable();
    deck.splice(0, deck.length);
    dealer.splice(0, dealer.length);
    player.splice(0, player.length);
    shuffleDeck();
    dealInitialCards();
};
function dealAnotherCard(hand) {
    hand = drawCard();
    return hand;
};
function hasBlackJack(hand, score) {
    if (hand.length == 2 && score == 21)
    return true;
};
function isBust(score) {
    if (score < 21)
    return true;
};
function determineWinner(stayed) {   
    const dealerWins = "Dealer Wins!";
    const playerWins = "You win!";
    const draw = "Draw";
    if (playerScore > 21)
    return dealerWins;
    else if (dealerScore > 21)
    return playerWins;
    else if (dealer.length === 5 && dealerScore <= 21)
    return dealerWins;
    else if (playerScore === dealerScore && stayed)
    return draw;
    else if (playerScore > dealerScore && stayed)
    return playerWins;
    else if (playerScore < dealerScore && stayed)
    return dealerWins;
    else {
        let dealerBj = hasBlackJack(dealer, dealerScore);
        let playerBj = hasBlackJack(player, playerScore);
        if (dealerBj == true && playerBj == true)
        return draw;
        if (playerBj == true)
        return playerWins;
        if (dealerBj == true)
        return dealerWins;
    }
    return "";      
    
};
function showGameButtons() {
    startBtn.style.display = "none";
    hitBtn.style.display = "inline";
    stayBtn.style.display = "inline";
};
function hideGameButtons() {
    startBtn.style.display = "inline";
    hitBtn.style.display = "none";
    stayBtn.style.display = "none";
};



startBtn.addEventListener('click', function () {
    startNewGame();
});

hitBtn.addEventListener('click', function () {
    player.push(dealAnotherCard(player));
    showHands();
});


stayBtn.addEventListener('click', function(){
    hideGameButtons();
    while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21){
        dealer.push(dealAnotherCard(dealer));
        showHands(true);
    }
    
});


