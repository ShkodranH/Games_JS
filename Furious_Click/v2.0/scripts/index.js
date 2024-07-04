import { levelsData } from "./data.js";

const startBtn = document.querySelector('.start-btn');
const levelElem = document.querySelector('.level');
const iconElem = document.querySelector('.original');
const originalImg = document.querySelector('.original img');
const silhouetteImg = document.querySelector('.silhouette img');
const percentageElem = document.querySelector('.percentage');
const nameElem = document.querySelector('.name');
const clickBtn = document.querySelector('.click-btn');
const finishBtn = document.querySelector('.finish-btn');

let level;
let currentLevel;
let percentage;
let eraseProgress;

function initVariables(levelValue) {
    level = levelValue;
    currentLevel = levelsData[levelValue - 1];
    percentage = 0;
    eraseProgress = setInterval(() => handleProgress(-currentLevel.speed), 50);

    levelElem.innerHTML = `Level ${currentLevel.level}`;
    [originalImg, silhouetteImg].forEach(e => e.setAttribute('src', currentLevel.image));
}
initVariables(1);

// const clickAudio = new Audio("./sound-effects/click.mp3");
// const winAudio = new Audio("./sound-effects/win.wav");
// const loseAudio = new Audio("./sound-effects/lose.wav");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

function handleProgress(value) {
    percentage += value;
    percentage = (percentage > 100) ? 100 : (percentage < 0) ? 0 : percentage;
    percentageElem.innerHTML = parseInt(percentage) + "%";
    iconElem.style.width = percentage + "%";
}

clickBtn.addEventListener('click', () => {
    handleProgress(10)
    if(percentage == 100) {
        clearInterval(eraseProgress);
        percentageElem.classList.add('fadeInOut');
        setTimeout(() => {
            percentageElem.innerHTML = `${currentLevel.name}`;
            clickBtn.innerHTML = 'Next';
        }, 500);
    }
});

startBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
    displayQuestion();
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    level = 1;
});