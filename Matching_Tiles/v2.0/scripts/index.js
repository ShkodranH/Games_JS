import { imagesArray } from "./data.js";

const movesElem = document.querySelector(".num-moves");
const cardElems = document.querySelectorAll('.card');
const cardElemsImg = document.querySelectorAll('.card .back');
const playBtn = document.querySelector('.play-btn');
const finishBtn = document.querySelector('.finish-btn');
const finalResult = document.querySelector('.finish .msg');
const finalMessage = document.querySelector('.finish h1');

let tilesImg, tilesPosition, tilesOpen, moves;

// Reseting variables for the new game
function restartGame() {
    movesElem.innerText = moves = 25;
    tilesOpen = [];
    generateTiles();
    cardElems.forEach(e => e.addEventListener('click', mouseClick));
}
restartGame();

const clickAudio = new Audio("./sound-effects/click.ogg");
const correctAudio = new Audio("./sound-effects/correct.wav");
const loseAudio = new Audio("./sound-effects/lose.ogg");
const winAudio = new Audio("./sound-effects/win.ogg");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

// Generate tiles images and shuffle them
// Set all tiles to face-down position (false)
function generateTiles() {
    tilesImg = [...imagesArray, ...imagesArray].sort(() => Math.random() - 0.5);
    tilesPosition = new Array(tilesImg.length).fill(false);
    tilesImg.forEach((img, i) => cardElemsImg[i].src = img);
    cardElems.forEach(e => e.classList.remove("card-flip", "card-backflip"));
}
// Handling player tile clicks
function mouseClick(e) {
    let i = Number(e.currentTarget.dataset.index);
    if(!tilesPosition[i]) {
        flipTile(i);
        if(tilesOpen.length === 2) {
            checkGuess();
            drawMoves();
        }
    }
}

// Add flipping animation and mark the tile
function flipTile(index) {
    clickAudio.play();
    tilesOpen.push(index);
    cardElems[index].classList.add("card-flip");
    tilesPosition[index] = true;
}
// Check if the current tiles match or not
async function checkGuess() {
    cardElems.forEach(e => e.removeEventListener('click', mouseClick));
    if(tilesImg[tilesOpen[0]] === tilesImg[tilesOpen[1]]) {
        correctAudio.play();
        if(tilesPosition.every(e => e))
            gameFinish(true);
    }
    else {
        tilesPosition[tilesOpen[0]] = tilesPosition[tilesOpen[1]] = false;
        await new Promise(resolve => setTimeout(resolve, 2000));
        tilesOpen.forEach(e => cardElems[e].classList.add("card-backflip"));
        await new Promise(resolve => setTimeout(resolve, 600));
        tilesOpen.forEach(e => cardElems[e].classList.remove("card-flip", "card-backflip"));
    }
    cardElems.forEach(e => e.addEventListener('click', mouseClick));
    tilesOpen.length = 0;   
}

// Update the number of moves/flips and check if player has run out of moves
function drawMoves() {
    movesElem.innerText = --moves;
    if(moves === 0 && tilesPosition.some(e => !e))
        gameFinish(false);
}
// Display the win/lose scene
async function gameFinish(isWinner) {
    cardElems.forEach(e => e.removeEventListener('click', mouseClick));
    await new Promise(resolve => setTimeout(resolve, 2500));
    [finalResult.innerText, finalMessage.innerText] = isWinner ? ["Won", "Wow!"] : ["Lost", "Oh no!"];
    isWinner ? winAudio.play() : loseAudio.play();
    changeScene('.stage', '.finish');
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