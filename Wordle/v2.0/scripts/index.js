import { possibleWords } from "./words-data.js";
import { possibleAnswers } from "./answers-data.js";

const gameboardElem = document.querySelector('.gameboard');
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
let gameGridMark = new Array(numberOfTries).fill().map(()  => new Array(wordsLength).fill(''));
let currentRow = 0;
let currentCol = 0;

function mouseClick(e) {
    if(e.target.closest('[data-item="enter"]'))
        checkGuess();
    else if(e.target.closest('[data-item="backspace"]'))
        deleteLetter();
    else if(e.target.closest('[data-item]'))
        writeLetter(e.target.dataset.item);
}

function keyPress(e) {
    if(e.key == 'Enter')
        checkGuess();
    else if(e.key == 'Backspace')
        deleteLetter();
    else if(e.key.match(/^[a-z]$/i))
        writeLetter(e.key); 

}

function updateGameGrid(row, col, value) {
    gameGrid[row][col] = value.toLowerCase();
    const currentCellElem = gameboardElem.querySelectorAll('.row')[row].querySelectorAll('div')[col];
    currentCellElem.innerText = value.toUpperCase();
}

function deleteLetter() {
    if(currentCol > 0)
        updateGameGrid(currentRow, --currentCol, '');
}
function writeLetter(letter) {
    if(currentCol < wordsLength)
        updateGameGrid(currentRow, currentCol++, letter);
}
function checkGuess() {
    let currentGuess = gameGrid[currentRow].join('');
    if(possibleWords.includes(currentGuess)) {
        for(let i = 0; i < wordsLength; i++){
            if(answer[i] == currentGuess[i]) {
                gameGridMark[currentRow][i] = 'green';
            }
            else if(answer.includes(currentGuess[i])) {
                
                gameGridMark[currentRow][i] = 'yellow';
            }
            else {
                
                gameGridMark[currentRow][i] = 'gray';
            }
        }
        currentRow++;
        currentCol = 0;
    }
    else {
        
    }
}
document.addEventListener('keydown', keyPress);
keyboardElem.addEventListener('click', mouseClick);

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
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