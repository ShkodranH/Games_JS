import { levelsData } from "./data.js";

const startBtn = document.querySelector('.start-btn');
const levelElem = document.querySelector('.level');
const originalImg = document.querySelector('.original');
const silhouetteImg = document.querySelector('.silhouette');
const percentageElem = document.querySelector('.percentage');
const nameElem = document.querySelector('.name');
const clickBtn = document.querySelector('.click-btn');
const finishBtn = document.querySelector('.finish-btn');

let currentLevel = levelsData[0];
let percentage = 0;

// const clickAudio = new Audio("./sound-effects/click.mp3");
// const winAudio = new Audio("./sound-effects/win.wav");
// const loseAudio = new Audio("./sound-effects/lose.wav");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

function levelUp() {
    currentLevel++;
    levelElem.innerHTML = currentLevel;
}

function displayProgress() {
    percentageElem.innerHTML = parseInt(percentage) + "%";
    originalImg.style.width = percentage + "%";
}
function clickHandler() {
    percentage += 10;
    boundaryHandler();
    displayProgress();
}

function boundaryHandler() {
    percentage = (percentage > 100) ? 100 : (percentage < 0) ? 0 : percentage;
}
setInterval(() => {
    percentage -= 1;
    boundaryHandler();
    displayProgress();
}, 50);

clickBtn.addEventListener('click', clickHandler);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter')
        clickHandler();
});
startBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
    displayQuestion();
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    level = 1;
});