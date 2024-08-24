const timeElem = document.querySelector('.time');
const playerElems = document.querySelectorAll('.stage [class*="player"]');
const playerTimerElems = Array.from(playerElems, e => e.querySelector('.body'));
const playerBtns = Array.from(playerElems, e => e.querySelector('button'));
const playBtn = document.querySelector('.play-btn');
const settingsBtn = document.querySelector('.settings-btn');
const closeSettingsBtn = document.querySelector('.close-settings');
const finishBtn = document.querySelector('.finish-btn');
let numOfPlayer;
let interaction;

let players = [
    { name: 'red', result: 0, stopedTimer: false },
    { name: 'blue', result: 0, stopedTimer: false },
    { name: 'yellow', result: 0, stopedTimer: false },
    { name: 'green', result: 0, stopedTimer: false }
];
let time = Math.ceil(Math.random() * 2000 + 500);
time -= time % 25;

let startTimer = setInterval(updatePlayerTimer, 10);

// Reseting variables for new game
function restartGame() {
    displayTime(time, timeElem);
}
restartGame();

const clickAudio = new Audio("./sound-effects/click.ogg");
const levelupAudio = new Audio("./sound-effects/levelup.wav");
const loseAudio = new Audio("./sound-effects/lose.ogg");
const winAudio = new Audio("./sound-effects/win.ogg");

function changeScene(prev, next, action) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = action;
}
function getUserSettings() {
    numOfPlayer = document.querySelector('.num-of-players input:checked').value;
    interaction = document.querySelector('.interaction input:checked').value;
}
function updatePlayerTimer() {
    for(let i = 0; i < players.length; i++) {
        if(!players[i].stopedTimer)
            displayTime(++players[i].result, playerTimerElems[i]);
    }
}

function displayTime(timeVal, elem) {
    let sec = Math.floor(timeVal / 100).toString().padStart(2, '0');
    let micro = (timeVal % 100).toString().padStart(2, '0');
    elem.innerText = `${sec}:${micro}`;
}

// Handling player card clicks
function touchInputS(e) {
    checkGuess(e.target.getAttribute('src'));
}
function keyboardInputs(e) {
    if(e.key === 'Enter')
        checkGuess(document.querySelector('.selected').getAttribute('src'));
}
function handleInputs() {

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
function shuffleImages() {
    levelImages.sort(() => Math.random() - 0.5);
    displayCards();
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
    changeScene('.stage', '.finish');
    finalScoreElem.innerText = (level === 1) ? 0 : (hasWin) ? 12 : level + 1;
    audio.play();
}

playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage', 'grid');
});
settingsBtn.addEventListener('click', () => {
    changeScene('.intro', '.settings', 'flex');
});
closeSettingsBtn.addEventListener('click', () => {
    changeScene('.settings', '.intro', 'flex');
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro', 'flex');
    resetGame();
});