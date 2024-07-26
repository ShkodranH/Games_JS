import { possibleWords } from "./words-data.js";
import { possibleAnswers } from "./answers-data.js";

const gameboardElem = document.querySelector('.gameboard');
const gameboardRows = [...gameboardElem.children];
const gameboardCells = Array.from(gameboardRows, row => Array.from(row.children));
const keyboardElem = document.querySelector('.keyboard');
const playBtn = document.querySelector('.play-btn');
const infoBtn = document.querySelector('.info-btn');
const settingsBtn = document.querySelector('.settings-btn');
const closeInfo = document.querySelector('.close-info');
const closeSettings = document.querySelector('.close-settings');
const finishBtn = document.querySelector('.finish-btn');

// document.querySelector(':root').style.setProperty('--primary', '#333');

// Choose a random word as answer
const wordsLength = 5;
const numberOfTries = 6;
const randomSelect = Math.floor(Math.random() * possibleAnswers.length);
const answer = possibleAnswers[randomSelect];
let gameGrid = new Array(numberOfTries).fill().map(() => new Array(wordsLength).fill(''));
let currentRow = 0;
let currentCol = 0;

function enableInputs() {
    document.addEventListener('keydown', keyPress);
    keyboardElem.addEventListener('click', mouseClick);
}
function disabledinputs() {
    document.removeEventListener('keydown', keyPress);
    keyboardElem.removeEventListener('click', mouseClick);
}
enableInputs();

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

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

function writeLetter(letter) {
    if(currentCol < wordsLength) {
        gameboardCells[currentRow][currentCol].classList.add('typing');
        updateGameGrid(currentRow, currentCol++, letter);
    }
}
function deleteLetter() {
    if(currentCol > 0) {
        updateGameGrid(currentRow, --currentCol, '');
        gameboardCells[currentRow][currentCol].classList.remove('typing');
    }
}
async function checkGuess() {
    let currentGuess = gameGrid[currentRow].join('');
    console.log(answer)
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
        checkWinLose(currentGuess);
    }
    else {
        gameboardRows[currentRow].classList.add('wrong');
        await new Promise(resolve => setTimeout(resolve, 500));
        gameboardRows[currentRow].classList.remove('wrong');
    }
}

async function checkWinLose(guess) {
    await new Promise(resolve => setTimeout(resolve, 500));
    if(guess === answer) {
        disabledinputs();
        for(const i of gameboardCells[currentRow]) {
            i.classList.add('correct');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        //you win modal
    }
    else if(++currentRow === numberOfTries) {
        disabledinputs();
        //you loose modal
    }
    currentCol = 0;
}


playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
});

infoBtn.addEventListener('click', () => {
    changeScene('.intro', '.info');
});
closeInfo.addEventListener('click', () => {
    changeScene('.info', '.intro');
});
settingsBtn.addEventListener('click', () => {
    changeScene('.intro', '.settings');
});
closeSettings.addEventListener('click', () => {
    changeScene('.settings', '.intro');
});