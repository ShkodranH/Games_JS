import { wordList } from "./data.js";

const levelElem = document.querySelector('.level');
const pictureElems = document.querySelectorAll('.pictures img');
const wordElem = document.querySelector('.word');
const keyboard = document.querySelector('.keyboard');
const keyboardKeyElems = keyboard.querySelectorAll('[data-key]');
const playBtn = document.querySelector('.play-btn');
const finishBtn = document.querySelector('.finish-btn');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
let levelIndex = 0;
let currentLevelData = levelsData[levelIndex];
let currentAnswer = currentLevelData.answer;
let keyboardKeys = [];
let currentGuess = [];
let letterCounter = 0;

// Reseting variables for new level
function levelUp(levelNum) {
    currentLevelData = levelsData[levelNum];
    currentAnswer = currentLevelData.answer;
    levelElem.innerText = `Level ${currentLevelData.level}`;
    letterCounter = 0;
    generateWordField();
    generateKeyboardKeys();
    addPictures();
}
levelUp(levelIndex++);

const clickAudio = new Audio("./sound-effects/click.mp3");
const correctAudio = new Audio("./sound-effects/correct.wav");
const wrongAudio = new Audio("./sound-effects/wrong.mp3");
const winAudio = new Audio("./sound-effects/win.mp3");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}
// Generate HTML elements for the word guess container
function generateWordField() {
    wordElem.innerHTML = "";
    for(let i of currentAnswer)
        wordElem.innerHTML += "<div></div>";
}
// Generate an array with 12 random characters for the keyboar 
// But should contain the letters for the current answer
function generateKeyboardKeys() {
    keyboardKeys = Array.from({ length: 12 }, (_, i) => i < currentAnswer.length 
        ? currentAnswer[i] : alphabet[Math.floor(Math.random() * alphabet.length)])
        .sort(() => Math.random() - 0.5);
    keyboardKeyElems.forEach((e, i) => e.innerText = keyboardKeys[i]);
}
// Add the file path for the pictures
function addPictures() {
    pictureElems.forEach((e, i) => {
        e.src = currentLevelData.pictures[i];
        e.onerror = () => {
            e.src = '../v1.0/images/default.jpg';
            e.onerror = null;
        }
    });
    
}
// Handling player click inputs
function mouseClick(e) {
    if(e.target.closest('[data-key]')) {
        addLetter(e.target.innerText);
        e.target.classList.add('hidden-key');
        clickAudio.play();
    }
    else if(e.target.closest('[data-undo]'))
        deleteGuess();
}

// Update the words current letter and the corresponding HTML element
function updateWordGuess(index, value) {
    currentGuess[index] = value.toLowerCase();
    wordElem.childNodes[index].innerText = value;
}
// Add the letter clicked to the current guess
function addLetter(letter) {
    updateWordGuess(letterCounter++, letter);
    if(letterCounter == currentAnswer.length)
        checkGuess();
}
// Remove all the letters from the guess (undo)
function deleteGuess() {
    wordElem.childNodes.forEach(e => e.innerText = '');
    keyboardKeyElems.forEach(e => e.classList.remove('hidden-key'));
    currentGuess.length = letterCounter = 0;
}

// Check if the current guess is correct or not
async function checkGuess() {
    keyboard.removeEventListener('click', mouseClick);
    await new Promise(resolve => setTimeout(resolve, 200));

    if(currentGuess.join('') == currentAnswer) {
        correctAudio.play();
        for(let i of wordElem.childNodes) {
            i.classList.add('correct');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        await new Promise(resolve => setTimeout(resolve, 700));
        wordElem.childNodes.forEach(e => e.classList.remove('correct'));
        gameFinish();
    }
    else {
        wrongAudio.play();
        wordElem.classList.add('wrong');
        await new Promise(resolve => setTimeout(resolve, 700));
        wordElem.classList.remove('wrong');
    }
    deleteGuess();
    keyboard.addEventListener('click', mouseClick);
}
// Check if the player has finished all the levels
async function gameFinish() {
    if(levelIndex < levelsData.length) 
        levelUp(levelIndex++);
    else {
        changeScene('.stage', '.finish');
        winAudio.play();
    }
}

playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    levelIndex = 0;
    levelUp(levelIndex++);
});
keyboard.addEventListener('click', mouseClick);