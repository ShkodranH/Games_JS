import { levelsData } from "./data.js";

const startBtn = document.querySelector('.start-btn');
const levelElem = document.querySelector('.level');
const iconElem = document.querySelector('.original');
const originalImg = document.querySelector('.original img');
const silhouetteImg = document.querySelector('.silhouette img');
const percentageElem = document.querySelector('.percentage');
const clickBtn = document.querySelector('.click-btn');
const nextBtn = document.querySelector('.next-btn');
const finishBtn = document.querySelector('.finish-btn');

const levelupAudio = new Audio("./sound-effects/levelup.mp3");
const winAudio = new Audio("./sound-effects/win.mp3");

let level;
let currentLevel;
let percentage;
let eraseProgress;

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

function initVariables(levelValue) {
    level = levelValue;
    currentLevel = levelsData[levelValue - 1];
    percentage = 0;
    eraseProgress = setInterval(() => handleProgress(-currentLevel.speed), 50);

    iconElem.style.width = percentage + "%";
    levelElem.innerHTML = `Level ${currentLevel.level}`;
    [originalImg, silhouetteImg].forEach(e => e.setAttribute('src', currentLevel.image));
}
initVariables(1);

function handleProgress(value) {
    percentage += value;
    percentage = (percentage > 100) ? 100 : (percentage < 0) ? 0 : percentage;
    percentageElem.innerHTML = parseInt(percentage) + "%";
    iconElem.style.width = percentage + "%";
}

clickBtn.addEventListener('click', async() => {
    const clickAudio = new Audio("./sound-effects/click.mp3");
    handleProgress(10);
    clickAudio.play();

    if(percentage == 100) {
        clearInterval(eraseProgress);
        percentageElem.classList.add('fadeInOut');
        
        clickBtn.style.pointerEvents = 'none';
        await new Promise(resolve => setTimeout(resolve, 1500));
        clickBtn.style.pointerEvents = 'auto';
        levelupAudio.play();
        
        percentageElem.innerHTML = `${currentLevel.name}`;
        changeScene('.click-btn', '.next-btn');
    }
});

nextBtn.addEventListener('click', () => {
    if(level == 10) {
        changeScene('.stage', '.finish');
        winAudio.play();
    }
    else {
        initVariables(++level);
    }
    changeScene('.next-btn', '.click-btn');
    percentageElem.classList.remove('fadeInOut');
});

startBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    initVariables(1);
});