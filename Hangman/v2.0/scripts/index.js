import { wordList } from "./data.js";

const streakElem = document.querySelector('.streak span');
const pointsElem = document.querySelector('.points span');
const hintBtn = document.querySelector('.hint-cost img');
const wordElem = document.querySelector('.word');
const keyboardElem = document.querySelector('.keyboard');
const keyboardKeyElems = keyboardElem.querySelectorAll('[data-item]');
const finalScoreElem = document.querySelector('.final-score');
const playBtn = document.querySelector('.play-btn');
const finishBtn = document.querySelector('.finish-btn');
const hangmanElemsArray = [
    document.querySelectorAll('.rope'),
    document.querySelectorAll('.head'),
    document.querySelectorAll('.body'),
    document.querySelectorAll('.left-arm'),
    document.querySelectorAll('.right-arm'),
    document.querySelectorAll('.left-leg'),
    document.querySelectorAll('.right-leg'),
    document.querySelectorAll('.head *')
];

const hintCost = 10;
let streak = 0;
let points = 30;
let answer, mistakes, currentGuess;

// Reseting variables for new game
function initVariables(value, number) {
    streak = value;
    points = number
    answer = wordList[Math.floor(Math.random() * wordList.length)];
    mistakes = 0;
    currentGuess = [];
    generateWordField();
    keyboardKeyElems.forEach(key => key.className = '');
    hangmanElemsArray.forEach(arr => arr.forEach(e => e.classList.remove('reveal-item')));
    streakElem.innerText = streak;
    pointsElem.innerText = points;
}
initVariables(streak, points);

const clickAudio = new Audio("./sound-effects/click.ogg");
const correctAudio = new Audio("./sound-effects/correct.ogg");
const wrongAudio = new Audio("./sound-effects/wrong.ogg");
const loseAudio = new Audio("./sound-effects/lose.ogg");
const winAudio = new Audio("./sound-effects/win.ogg");

function changeScene(prev, next, action) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = action;
}
function enableInputs() {
    document.addEventListener('keydown', keyPress);
    keyboardElem.addEventListener('click', mouseClick);
}
function disabledinputs() {
    document.removeEventListener('keydown', keyPress);
    keyboardElem.removeEventListener('click', mouseClick);
}
enableInputs();

// Handling player inputs
function keyPress(e) {
    if(e.key.match(/^[a-z]$/i))
        checkLetter(e.key.toLowerCase()); 
}
function mouseClick(e) {
    if(e.target.closest('[data-item]'))
        checkLetter(e.target.dataset.item);
}
// Generate HTML elements for the word guess container
function generateWordField() {
    wordElem.innerHTML = "";
    [...answer].forEach(() => wordElem.innerHTML += "<div></div>");
}

// Update the words current letter and the corresponding HTML element
function updateWordGuess(index, value) {
    currentGuess[index] = value.toLowerCase();
    wordElem.childNodes[index].innerText = value;
}
// Check if the letter is correctly guessed only if the letter was not used before
function checkLetter(letter) {
    const currentKey = keyboardElem.querySelector(`[data-item="${letter}"]`);
    if(currentKey.classList.contains('hidden-key')) return;
    currentKey.classList.add('hidden-key');
    
    if(!answer.includes(letter)) {
        drawHangman();
        return;
    }
    for(let i = 0; i < answer.length; i++) {
        if(letter === answer[i]) {
            updateWordGuess(i, letter);
            checkGuess();
            correctAudio.play();
        }
    }
}

// Check if the player has successfully guessed the word
async function checkGuess() {
    if(currentGuess.join('') == answer) {
        disabledinputs();
        await new Promise(resolve => setTimeout(resolve, 700));
        winAudio.play();
        await new Promise(resolve => setTimeout(resolve, 2000));
        initVariables(++streak, points += 5);
        enableInputs();
    }
}
// Draw the hangman if the player guessed a wrong letter
function drawHangman() {
    wrongAudio.play();
    hangmanElemsArray[mistakes++].forEach(e => e.classList.add('reveal-item'));
    if(mistakes === hangmanElemsArray.length) 
        gameFinish();
}
// Check if the player has lost the game
async function gameFinish() {
    disabledinputs();
    await new Promise(resolve => setTimeout(resolve, 1000));
    loseAudio.play();
    finalScoreElem.innerText = streak;
    await new Promise(resolve => setTimeout(resolve, 1500));
    changeScene('.stage', '.finish', 'flex');
}
// Add a letter to the current guess for 10 points
function generateHint() {
    if(points < hintCost) return;
    points -= hintCost;
    pointsElem.innerText = points;
    let availableLetters = [...answer].filter(letter =>!currentGuess.includes(letter));
    let selectedLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
    checkLetter(selectedLetter);
}

hintBtn.addEventListener('click', () => {
    generateHint();
    clickAudio.play();
});
playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage', 'grid');
    enableInputs();
    clickAudio.play();
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro', 'flex');
    clickAudio.play();
    initVariables(0, 30);
});