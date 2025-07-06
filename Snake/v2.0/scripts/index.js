const startBtn = document.querySelector('.start-btn');
const scoreElem = document.querySelector('.score');
const finalScoreElem = document.querySelector('.final-score');
const finishBtn = document.querySelector('.finish-btn');
const settingsBtn = document.querySelector('.settings-btn');
const closeSettingsBtn = document.querySelector('.close-settings');
let levelSelected;

let timeCount;
let timer = 15;
let numOfQuestions = 10;
let score = 0;

const clickAudio = new Audio("./sound-effects/click.mp3");
const winAudio = new Audio("./sound-effects/win.wav");
const loseAudio = new Audio("./sound-effects/lose.wav");

// Check which level of difficulty has player selected
function difficulty() {
    levelSelected = document.querySelector('.settings input:checked');
    numOfQuestions = levelSelected.dataset.question;
    timer = levelSelected.dataset.time;
}

function changeScene(prev, next) {
    clickAudio.play();
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

function scoreBonus() {
    score += timer * levelSelected.dataset.bonus;
    scoreElem.innerHTML = "Score: " + score;
}

function gameEnd(message) {
    changeScene('.stage', '.finish');
    finalScoreElem.innerHTML = "Score: " + score;
    messageElem.innerHTML = message;
    clearInterval(timeCount);
}

startBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
});
settingsBtn.addEventListener('click', () => {
    changeScene('.intro', '.settings');
});
closeSettingsBtn.addEventListener('click', () => {
    changeScene('.settings', '.intro');
});