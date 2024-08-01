import { possibleWords } from "./words-data.js";

const gameboardElem = document.querySelector('.gameboard');
const gameboardRows = [...gameboardElem.children];
const gameboardCells = Array.from(gameboardRows, row => Array.from(row.children));
const keyboardElem = document.querySelector('.keyboard');
const playBtn = document.querySelector('.play-btn');
const infoBtn = document.querySelector('.info-btn');
const settingsBtn = document.querySelector('.settings-btn');
const infoModal = document.querySelector('.info');
const closeInfo = document.querySelector('.close-info');
const settingsModal = document.querySelector('.settings');
const closeSettings = document.querySelector('.close-settings');
const finishPopup = document.querySelector('.finish');
const messageElem = document.querySelector('.message');
const finishBtn = document.querySelector('.finish-btn');
const themeRadioBtns = document.querySelectorAll('input[data-theme]');
const bgElem = document.querySelector('.bg');


const wordsLength = 5;
const numberOfTries = 6;
let randomSelect = Math.floor(Math.random() * possibleAnswers.length);
let answer = possibleAnswers[randomSelect];
let gameGrid = new Array(numberOfTries).fill().map(() => new Array(wordsLength).fill(''));
let currentRow = 0;
let currentCol = 0;

// Reseting variables for new game
function initVariables() {
    randomSelect = Math.floor(Math.random() * possibleAnswers.length);
    answer = possibleAnswers[randomSelect];
    gameGrid = new Array(numberOfTries).fill().map(() => new Array(wordsLength).fill(''));
    currentRow = currentCol = 0;
    gameboardCells.forEach(row => row.forEach(cell => cell.className = cell.innerText = ''));
    keyboardElem.querySelectorAll('[data-item]').forEach(key => key.className = '');
}

const clickAudio = new Audio("./sound-effects/click.wav");
const wrongAudio = new Audio("./sound-effects/wrong.mp3");
const revealAudio = new Audio("./sound-effects/reveal.wav");
const winAudio = new Audio("./sound-effects/win.wav");
const loseAudio = new Audio("./sound-effects/lose.wav");

function enableInputs() {
    document.addEventListener('keydown', keyPress);
    keyboardElem.addEventListener('click', mouseClick);
}
function disabledinputs() {
    document.removeEventListener('keydown', keyPress);
    keyboardElem.removeEventListener('click', mouseClick);
}

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}
function popUpScene(name, action) {
    document.querySelector(name).style.display = action;
    document.querySelector('.bg').style.display = action;
}

// Handling player inputs (mouse or keyboard)
function mouseClick(e) {
    if(e.target.closest('[data-item="enter"]'))
        checkGuess();
    else if(e.target.closest('[data-item="backspace"]'))
        deleteLetter();
    else if(e.target.closest('[data-item]'))
        writeLetter(e.target.dataset.item);
}
function keyPress(e) {
    if(e.key === 'Enter')
        checkGuess();
    else if(e.key === 'Backspace')
        deleteLetter();
    else if(e.key.match(/^[a-z]$/i))
        writeLetter(e.key); 
}
function updateGameGrid(row, col, value) {
    gameGrid[row][col] = value.toLowerCase();
    gameboardCells[row][col].innerText = value.toUpperCase();
}

// Add the letter inputed to the current guess if it has still space
function writeLetter(letter) {
    if(currentCol < wordsLength) {
        gameboardCells[currentRow][currentCol].classList.add('typing');
        updateGameGrid(currentRow, currentCol++, letter);
        clickAudio.play();
    }
}
// Remove the last letter of the current guess if it has any
function deleteLetter() {
    if(currentCol > 0) {
        updateGameGrid(currentRow, --currentCol, '');
        gameboardCells[currentRow][currentCol].classList.remove('typing');
        clickAudio.play();
    }
}
// Check if the current guess is in the word list and mark the letter accordingly
async function checkGuess() {
    let currentGuess = gameGrid[currentRow].join('');
    
    if(possibleWords.includes(currentGuess)) {
        disabledinputs();
        revealAudio.play();
        for(let i = 0; i < wordsLength; i++){
            gameboardCells[currentRow][i].classList.add('reveal');
            await new Promise(resolve => setTimeout(resolve, 300));

            if(answer[i] === currentGuess[i])
                gameboardCells[currentRow][i].classList.add('green-mark');
            else if(answer.includes(currentGuess[i])) 
                gameboardCells[currentRow][i].classList.add('yellow-mark');
            else
                gameboardCells[currentRow][i].classList.add('gray-mark');
        }
        enableInputs();
        addKeyboardColor();
        checkWinLose(currentGuess);
    }
    else {
        wrongAudio.play();
        gameboardRows[currentRow].classList.add('wrong');
        await new Promise(resolve => setTimeout(resolve, 500));
        gameboardRows[currentRow].classList.remove('wrong');
    }
}

// Check if the player has won the game or if it has run out of tries
async function checkWinLose(guess) {
    await new Promise(resolve => setTimeout(resolve, 500));
    if(guess === answer) {
        disabledinputs();
        winAudio.play();
        for(const i of gameboardCells[currentRow]) {
            i.classList.add('correct');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        finishModal(true);
    }
    else if(++currentRow === numberOfTries) {
        disabledinputs();
        loseAudio.play();
        finishModal(false);
    }
    currentCol = 0;
}
// Display the correct message depending of game ending status
async function finishModal(isWinner) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    messageElem.innerText = isWinner ? `You won on \n${currentRow + 1} guesses!` : `The answer was ${answer.toUpperCase()}`;
    popUpScene('.finish', 'flex');
}

// Get the letter and the color of the current guess and mark them in keyboard
function addKeyboardColor() {
    for(const i of gameboardCells[currentRow]) {
        let letter = i.innerText.toLowerCase();
        let color = i.classList[2];
        keyboardElem.querySelector(`[data-item=${letter}]`).className = color;
    }
}

function toggleClass(modal) {
    modal.classList.toggle('fade-out-down');
    bgElem.classList.toggle('fade-out');
}
playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
    enableInputs();
});
finishBtn.addEventListener('click', async () => {
    toggleClass(finishPopup);
    await new Promise(resolve => setTimeout(resolve, 500));
    toggleClass(finishPopup);
    popUpScene('.finish', 'none');
    changeScene('.stage', '.intro');
    initVariables();
});

infoBtn.addEventListener('click', () => {
    popUpScene('.info', 'flex');
});
closeInfo.addEventListener('click', async () => {
    toggleClass(infoModal);
    await new Promise(resolve => setTimeout(resolve, 500));
    toggleClass(infoModal);
    popUpScene('.info', 'none');
});
settingsBtn.addEventListener('click', () => {
    popUpScene('.settings', 'flex');
});
closeSettings.addEventListener('click', async () => {
    toggleClass(settingsModal);
    await new Promise(resolve => setTimeout(resolve, 500));
    toggleClass(settingsModal);
    popUpScene('.settings', 'none');
});
themeRadioBtns.forEach(e => e.addEventListener('click', () => changeColorTheme()));