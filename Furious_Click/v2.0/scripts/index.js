const startBtn = document.querySelector('.start-btn');
const levelElem = document.querySelector('.level');
const originalImg = document.querySelector('.original');
const silhouetteImg = document.querySelector('.silhouette');
const percentageElem = document.querySelector('.percentage');
const nameElem = document.querySelector('.name');
const clickBtn = document.querySelector('.click-btn');
const finishBtn = document.querySelector('.finish-btn');


// const clickAudio = new Audio("./sound-effects/click.mp3");
// const winAudio = new Audio("./sound-effects/win.wav");
// const loseAudio = new Audio("./sound-effects/lose.wav");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

function levelUp() {
    questionNum++;
    questionNumElem.innerHTML = questionNum;
}

startBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
    difficulty();
    displayQuestion();
    timeCounter();
    timeElem.innerHTML = "Time: " + timer + "s";
    questionNumElem.innerHTML = questionNum;
    scoreElem.innerHTML = "Score: " + score;
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    timer = parseInt(levelSelected.getAttribute('data-time'));
    score = 0;
    questionNum = 1;
});