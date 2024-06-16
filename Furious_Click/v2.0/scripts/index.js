import { levelsData } from "./data.js";

const startBtn = document.querySelector('.start-btn');
const levelElem = document.querySelector('.level');
const originalImg = document.querySelector('.original');
const silhouetteImg = document.querySelector('.silhouette');
const percentageElem = document.querySelector('.percentage');
const nameElem = document.querySelector('.name');
const clickBtn = document.querySelector('.click-btn');
const finishBtn = document.querySelector('.finish-btn');

let level = 1;
let currentLevel = levelsData[level - 1];
let percentage = 0;

// const clickAudio = new Audio("./sound-effects/click.mp3");
// const winAudio = new Audio("./sound-effects/win.wav");
// const loseAudio = new Audio("./sound-effects/lose.wav");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

function levelUp() {
    level++;
    levelElem.innerHTML = currentLevel;
}

function handleProgress(value) {
    percentage += value;
    percentage = (percentage > 100) ? 100 : (percentage < 0) ? 0 : percentage;
    percentageElem.innerHTML = parseInt(percentage) + "%";
    originalImg.style.width = percentage + "%";
}
let eraseProgress = setInterval(() => {
    handleProgress(-1);
}, 50);

clickBtn.addEventListener('click', () => {
    handleProgress(10)
    if(percentage == 100) 
        clearInterval(eraseProgress);
});

startBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
    displayQuestion();
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    level = 1;
});