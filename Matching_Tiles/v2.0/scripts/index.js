import { imagesArray } from "./data.js";

const levelElem = document.querySelector('.level');
const currentProgressElem = document.querySelector('.current');
const overallProgressElem = document.querySelector('.overall');
const cardElems = document.querySelectorAll('.card');
const playBtn = document.querySelector('.play-btn');
const finishBtn = document.querySelector('.finish-btn');
const finalResult = document.querySelector('.finish .msg');
const finalMessage = document.querySelector('.finish h1');

let progressCount;
let currentGuess;
let tilesImg;

// Reseting variables for the new game
function restartGame() {
    generatetilesImages();
}
restartGame();

const clickAudio = new Audio("./sound-effects/click.ogg");
const levelupAudio = new Audio("./sound-effects/levelup.wav");
const loseAudio = new Audio("./sound-effects/lose.ogg");
const winAudio = new Audio("./sound-effects/win.ogg");

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

// Generate tiles images and shuffle them
function generatetilesImages() {
    cardElems.forEach(e => e.innerHTML = '');
    tilesImg = [...imagesArray, ...imagesArray].sort(() => Math.random() - 0.5);
    displayCards();
}
function displayCards() {
    for(let i = 0; i < tilesImg.length; i++)
        cardElems[i].innerHTML = `<img src="${tilesImg[i]}">`;
}

// Handling player card clicks
function mouseClick(e) {
    checkGuess(e.target.getAttribute('src'));
}

// Check if the current guess is correct or not
async function checkGuess(imageSrc) {
    cardElems.forEach(e => e.removeEventListener('click', mouseClick));

    if(!currentGuesses.includes(imageSrc)) {
        clickAudio.play();
        await newRound(imageSrc);
        
        if(currentGuesses.length === levelImages.length)
            await gameFinish();
    }
    else {
        await new Promise(resolve => setTimeout(resolve, 500));
        await displayEnding(loseAudio, false);
    }
    cardElems.forEach(e => e.addEventListener('click', mouseClick));
}
// Shuffle the cards for the new round
async function newRound(image) {
    currentGuesses.push(image);
    generateCurrentProgress(++progressCount);

    cardElems.forEach(e => e.classList.add('card-flip'));
    await new Promise(resolve => setTimeout(resolve, 300));
    shuffleImages();
    await new Promise(resolve => setTimeout(resolve, 700));
    cardElems.forEach(e => e.classList.remove('card-flip'));
}

// Check if the player has finished all the levels
async function gameFinish() {
    await new Promise(resolve => setTimeout(resolve, 500));
    if(level < 10) 
        levelUp(++level, true);
    else
        displayEnding(winAudio, true);
}
function displayEnding(audio, hasWin) {
    [finalResult.innerText, finalMessage.innerText]
        = hasWin ? ["Won", "Wow!"] : ["Lost", "Oh no!"];
    changeScene('.stage', '.finish');
    audio.play();
}

playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
    clickAudio.play();
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    clickAudio.play();
    restartGame();
});
cardElems.forEach(e => e.addEventListener('click', mouseClick));