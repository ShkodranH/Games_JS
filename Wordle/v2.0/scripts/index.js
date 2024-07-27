import { possibleWords } from "./words-data.js";
import { possibleAnswers } from "./answers-data.js";

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
const bgElem = document.querySelector('.bg');


const colorPalettes = {
    names: [
        '--transparent-black',
        '--bg-color',
        '--green-color',
        '--yellow-color',
        '--black-color',
        '--keyboard-color',
        '--white-color'
    ],
    dark: [
        '#00000080',
        '#121213',
        '#538d4e',
        '#b59f3b',
        '#3a3a3c',
        '#818384',
        '#ffffff'
    ],
    light: [
        '#ffffff80',
        '#ffffff',
        '#538d4e',
        '#b59f3b',
        '#3a3a3c',
        '#818384',
        '#121213'
    ],
    palestine: [
        '#00000080',
        '#121213',
        '#008525',
        '#bc000d',
        '#000000',
        '#818384',
        '#ffffff'
    ]
}
for(let i = 0; i < colorPalettes.names.length; i++) {
    document.querySelector(':root').style.setProperty(colorPalettes.names[i], colorPalettes.dark[i]);
}
// document.querySelector(':root').style.setProperty('--color-scheme', 'light');
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
    }
}
// Remove the last letter of the current guess if it has any
function deleteLetter() {
    if(currentCol > 0) {
        updateGameGrid(currentRow, --currentCol, '');
        gameboardCells[currentRow][currentCol].classList.remove('typing');
    }
}
// Check if the current guess is in the word list and mark the letter accordingly
async function checkGuess() {
    let currentGuess = gameGrid[currentRow].join('');
    
    if(possibleWords.includes(currentGuess)) {
        disabledinputs();
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
        for(const i of gameboardCells[currentRow]) {
            i.classList.add('correct');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        finishModal(true);
    }
    else if(++currentRow === numberOfTries) {
        disabledinputs();
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