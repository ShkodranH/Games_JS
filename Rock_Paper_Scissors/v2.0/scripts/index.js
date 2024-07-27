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
let roundNumber = 1;
let totalPoints = 5;

// Drawing star icons for each player points
for(let i = 0; i < totalPoints; i++) {
    playerPointsElem.innerHTML += '<i class="far fa-star"></i>';
    computerPointsElem.innerHTML += '<i class="far fa-star"></i>';
}

const playAudio = new Audio("./sound-effects/play.wav");
const winAudio = new Audio("./sound-effects/win.mp3");

// Setting up functions to change bettwen scenes/modals
function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}
function popUpScene(name, action) {
    document.querySelector(name).style.display = action;
    document.querySelector('.bg').style.display = action;
}

// Generating player and computer choices for a round
function generateChoices(elem) {
    playerChoice = elem.currentTarget.dataset.choice;
    computerChoice = listOfChoices[Math.floor(Math.random() * listOfChoices.length)];
}
// Displaying the current hand image depending the choice
function setHandImg(player, computer) {
    playerHandImg.setAttribute('src', `images/${player}.png`);
    computerHandImg.setAttribute('src', `images/${computer}2.png`);
}
// Adding an animation to the hand
function toggleAnimClasses() {
    playerHandImg.classList.toggle("player-hand");
    computerHandImg.classList.toggle("computer-hand");
}

// Calling all the other functions needed during each round of play
async function playGame(elem) {
    generateChoices(elem);
    inputChoiceElems.forEach(elem => elem.removeEventListener('click', playGame));
    playAudio.playbackRate = 1.5;
    playAudio.play();

    toggleAnimClasses();
    await new Promise(resolve => setTimeout(resolve, 1800));
    toggleAnimClasses();

    checkResult();

    setHandImg(playerChoice, computerChoice);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setHandImg('rock', 'rock');

    inputChoiceElems.forEach(elem => elem.addEventListener('click', playGame));
    checkWinner();
    nextRound();
}

function nextRound() {
    roundNumber++;
    roundNumberElem.innerHTML = `Round ${roundNumber}`;
}
// Changing star icon indicating player and computer points
function drawPoints(winner, winnerElem, winnerName) {
    messageElem.innerHTML = `${winnerName} wins!`;
    for(let i = 0; i < winner; i++)
        winnerElem.querySelectorAll('i')[i].classList.replace('far', 'fas');
}
// Check who won the round and display a message
function checkResult() {
    let playerIndex = listOfChoices.indexOf(playerChoice);
    let computerIndex = listOfChoices.indexOf(computerChoice);
    let result = (playerIndex - computerIndex + 3) % 3;

    if(result === 1)
        drawPoints(++playerPoints, playerPointsElem, playerName);
    else if(result === 2)
        drawPoints(++computerPoints, computerPointsElem, 'Computer');
    else
        messageElem.innerHTML = `It's a draw!`;
}

function winMessage(name) {
    popUpScene('.finish', 'flex');
    displayNameElem.innerHTML = name;
    winAudio.play();
}
// Check if the player or computer won the game and display a message
function checkWinner() {
    if(playerPoints === totalPoints)
        winMessage(playerName);
    else if(computerPoints === totalPoints) 
        winMessage('Computer');
}

// Reseting the game parameters and starting a new one
function resetGame() {
    playerPoints = computerPoints = 0;
    playerNameElem.innerHTML = playerName = "Player";
    messageElem.innerHTML = `Start`;
    roundNumber = 0;
    nextRound();

    playerPointsElem.innerHTML = computerPointsElem.innerHTML = '';
    for(let i = 0; i < totalPoints; i++) {
        playerPointsElem.innerHTML += '<i class="far fa-star"></i>';
        computerPointsElem.innerHTML += '<i class="far fa-star"></i>';
    }
}

playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
    popUpScene('.input-name', 'flex');
    inputElem.value = "";
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
    resetGame();
});

inputChoiceElems.forEach(elem => elem.addEventListener('click', playGame));