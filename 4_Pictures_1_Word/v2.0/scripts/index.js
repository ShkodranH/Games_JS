import { levelsData } from "./data.js";

const levelElem = document.querySelector('.level');
const pictureElems = document.querySelectorAll('.pictures img');
const wordElem = document.querySelector('.word');
const keyboard = document.querySelector('.keyboard');
const keyboardKeyElems = keyboard.querySelectorAll('[data-key]');
const playBtn = document.querySelector('.play-btn');
const finishBtn = document.querySelector('.finish-btn');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
let level = 1;
let currentLevelData = levelsData[level - 1];
let currentAnswer = currentLevelData.answer;
let keyboardKeys = [];
let currentGuess = [];
let letterCounter = 0;

// Reseting variables for new level
function levelUp(levelNum) {
    currentLevelData = levelsData[levelNum];
    currentAnswer = currentLevelData.answer;
    letterCounter = 0;
    generateWordField();
    generateKeyboardKeys();
    addPictures();
}
levelUp(level);

// const clickAudio = new Audio("./sound-effects/click.wav");
// const wrongAudio = new Audio("./sound-effects/wrong.mp3");
// const revealAudio = new Audio("./sound-effects/reveal.wav");
// const winAudio = new Audio("./sound-effects/win.wav");
// const loseAudio = new Audio("./sound-effects/lose.wav");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}
function generateWordField() {
    wordElem.innerHTML = "";
    for(let i of currentAnswer)
        wordElem.innerHTML += "<div></div>";
}
function generateKeyboardKeys() {
    keyboardKeys = Array.from({ length: 12 }, (_, i) => i < currentAnswer.length 
        ? currentAnswer[i] : alphabet[Math.floor(Math.random() * alphabet.length)])
        .sort(() => Math.random() - 0.5);
    keyboardKeyElems.forEach((e, i) => e.innerText = keyboardKeys[i]);
}
function addPictures() {
    pictureElems.forEach((e, i) => {
        e.src = currentLevelData.pictures[i];
        e.onerror = () => e.src = '../v1.0/images/default.jpg';
    });
    
}
// Handling player click inputs
function mouseClick(e) {
    if(e.target.closest('[data-key]')) {
        addLetter(e.target.innerText);
        e.target.classList.add('hidden-key');
    }
    else if(e.target.closest('[data-undo]'))
        deleteGuess();
}

function updateWordGuess(index, value) {
    currentGuess[index] = value.toLowerCase();
    wordElem.children[index].innerText = value;
}
// Add the letter inputed to the current guess if it has still space
function addLetter(letter) {
    if(letterCounter < currentAnswer.length)
        updateWordGuess(letterCounter++, letter);
    else
        checkGuess();
}
// Remove all the letters from the guess (undo)
function deleteGuess() {
    Array.from(wordElem.children).forEach(e => e.innerText = '');
    keyboardKeyElems.forEach(e => e.classList.remove('hidden-key'));
    currentGuess.length = letterCounter = 0;
}
// Check if the current guess is in the word list and mark the letter accordingly
async function checkGuess() {
    if(currentGuess.join('') == currentAnswer) {
        
        // disabledinputs();
        // for(let i = 0; i < wordsLength; i++){
        //     gameboardCells[currentRow][i].classList.add('reveal');
        //     await new Promise(resolve => setTimeout(resolve, 300));

        //     if(answer[i] === currentGuess[i])
        //         gameboardCells[currentRow][i].classList.add('green-mark');
        //     else if(answer.includes(currentGuess[i])) 
        //         gameboardCells[currentRow][i].classList.add('yellow-mark');
        //     else
        //         gameboardCells[currentRow][i].classList.add('gray-mark');
        // }
        // enableInputs();
        levelUp(++level);
    }
    else {
        // gameboardRows[currentRow].classList.add('wrong');
        // await new Promise(resolve => setTimeout(resolve, 500));
        // gameboardRows[currentRow].classList.remove('wrong');
        deleteGuess()
    }
}

playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
});
finishBtn.addEventListener('click', async () => {
    changeScene('.stage', '.intro');
});
keyboard.addEventListener('click', mouseClick);