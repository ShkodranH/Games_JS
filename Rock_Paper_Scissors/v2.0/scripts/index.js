const playBtn = document.querySelector('.start-btn');
const finishBtn = document.querySelector('.finish-btn');
const submitBtn = document.querySelector('.submit');
const inputElem = document.querySelector('input');
const displayNameElem = document.querySelector('.display-name');
const playerNameElem = document.querySelector('.player-name');
const playerPointsElem = document.querySelector('.player-points');
const computerPointsElem = document.querySelector('.computer-points');
const playerHandImg = document.querySelector('.player img');
const computerHandImg = document.querySelector('.computer img');
const inputChoiceElems = document.querySelectorAll('.inp-button');
const roundNumberElem = document.querySelector('.round');
const messageElem = document.querySelector('.message');

let listOfChoices = ['rock', 'paper', 'scissors'];
let playerPoints = 0;
let computerPoints = 0;
let playerChoice;
let computerChoice;
let playerName = "Player";
let roundNumber = 0;
let totalPoints = 5;

for(let i = 0; i < totalPoints; i++) {
    playerPointsElem.innerHTML += '<i class="far fa-star"></i>';
    computerPointsElem.innerHTML += '<i class="far fa-star"></i>';
}
// const correctAudio = new Audio("./sound-effects/correct.mp3");
// const wrongAudio = new Audio("./sound-effects/wrong.mp3");
// const winAudio = new Audio("./sound-effects/win.mp3");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}
function popUpScene(name, action) {
    document.querySelector(name).style.display = action;
    document.querySelector('.bg').style.display = action;
}
function generateChoices(elem) {
    playerChoice = elem.currentTarget.getAttribute('data-choice');
    computerChoice = listOfChoices[Math.floor(Math.random() * listOfChoices.length)];
    playerHandImg.setAttribute('src', `images/${playerChoice}.png`);
    computerHandImg.setAttribute('src', `images/${computerChoice}2.png`);
}
function drawPoints(winner, winnerElem) {
    for(let i = 0; i < winner; i++)
        winnerElem.querySelectorAll('i')[i].classList.replace('far', 'fas');
}

function nextRound() {
    roundNumber++;
    roundNumberElem.innerHTML = `Round ${roundNumber}`;
}
function checkResult() {
    let playerIndex = listOfChoices.indexOf(playerChoice);
    let computerIndex = listOfChoices.indexOf(computerChoice);
    let result = (playerIndex - computerIndex + 3) % 3;

    if(result === 1) {
        playerPoints++;
        messageElem.innerHTML = `${playerName} wins!`;
        drawPoints(playerPoints, playerPointsElem);
    }
    else if(result === 2) {
        computerPoints++;
        messageElem.innerHTML = `Computer wins!`;
        drawPoints(computerPoints, computerPointsElem);
    }
    else {
        messageElem.innerHTML = `It's a draw!`;
    }
}
function checkWinner() {
    if(playerPoints === totalPoints) {
        popUpScene('.finish', 'flex');
        displayNameElem.innerHTML = playerName;
    }
    else if(computerPoints === totalPoints) {
        popUpScene('.finish', 'flex');
        displayNameElem.innerText = "Computer";
    }
}

// function resetGame() {
//     playerPoints = computerPoints = 0;
//     playerName = "Player";
//     roundNumber = 0;

//     playerPointsElem.innerHTML = computerPointsElem.innerHTML = '';
//     for(let i = 0; i < totalPoints; i++) {
//         playerPointsElem.innerHTML += '<i class="far fa-star"></i>';
//         computerPointsElem.innerHTML += '<i class="far fa-star"></i>';
//     }
// }


playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
    popUpScene('.input-name', 'flex');
    inputElem.focus();
});
submitBtn.addEventListener('click', () => {
    popUpScene('.input-name', 'none');
    playerName = inputElem.value.trim() || "Player";
    playerNameElem.innerHTML = playerName;
});
finishBtn.addEventListener('click', () => {
    popUpScene('.finish', 'none');
    changeScene('.stage', '.intro');
    // resetGame();
});
inputChoiceElems.forEach(elem => elem.addEventListener('click', (e) => {
    generateChoices(e);
    checkResult();
    checkWinner();
    nextRound();
}));