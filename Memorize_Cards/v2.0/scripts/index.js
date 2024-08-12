import { imagesArray } from "./data.js";

const levelElem = document.querySelector('.level');
const currentProgressElem = document.querySelector('.current');
const overallProgressElem = document.querySelector('.overall');
// const cardContainerElem = document.querySelector('.card-container');
const cardElems = document.querySelectorAll('.card');
const playBtn = document.querySelector('.play-btn');
const finishBtn = document.querySelector('.finish-btn');
const finalScoreElem = document.querySelector('.final-score');

let level, progressCount, overallProgress;
let levelImages = [], currentGuesses = [];

// Reseting variables for new level
function levelUp(value) {
    level = value;
    levelElem.innerText = `Level ${level}`;
    generateCurrentProgress(0);
    generateOverallProgress(level + 2);
    generatelevelImages();
}
levelUp(10);

const clickAudio = new Audio("./sound-effects/click.mp3");
const correctAudio = new Audio("./sound-effects/correct.wav");
const loseAudio = new Audio("./sound-effects/lose.mp3");
const winAudio = new Audio("./sound-effects/win.mp3");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}
function generateCurrentProgress(value) {
    progressCount = value;
    currentProgressElem.innerText = progressCount;
}
function generateOverallProgress(value) {
    overallProgress = value;
    overallProgressElem.innerText = overallProgress;
}

// Generate HTML elements for the word guess container
function generatelevelImages() {
    levelImages = imagesArray.sort(() => Math.random() - 0.5).slice(0, overallProgress);
    for(let i = 0; i < levelImages.length; i++)
        cardElems[i].innerHTML = `<img src="${levelImages[i]}">`;
    console.log(levelImages);
}

// Handling player click inputs
function mouseClick(e) {
    addLetter(e.target.src);
    clickAudio.play();
}

// Update the words current letter and the corresponding HTML element
function updateWordGuess(value) {
    currentGuesses[index] = value.toLowerCase();
    wordElem.childNodes[index].innerText = value;
}
// Add the letter clicked to the current guess
function addLetter(letter) {
    updateWordGuess(letterCounter++, letter);
    if(letterCounter == currentAnswer.length)
        checkGuess();
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
        loseAudio.play();
        wordElem.classList.add('wrong');
        await new Promise(resolve => setTimeout(resolve, 700));
        wordElem.classList.remove('wrong');
    }
    deleteGuess();
    keyboard.addEventListener('click', mouseClick);
}
// Check if the player has finished all the levels
async function gameFinish() {
    if(level < 10) 
        levelUp(level++);
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
    levelUp(1);
});
cardElems.forEach(e => e.addEventListener('click', mouseClick));