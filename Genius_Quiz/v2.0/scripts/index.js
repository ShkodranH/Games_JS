import { questionData } from './data.js'

const startBtn = document.querySelector('.start-btn');
const questionNumElem = document.querySelector('.question-number');
const questionElem = document.querySelector('.question');
const optionsElem = document.querySelectorAll('.options button');
const livesElems = document.querySelectorAll('.lives img');
const finishTitleElem = document.querySelector('.finish .title');
const finishMessageElem = document.querySelector('.finish p');
const finishBtn = document.querySelector('.finish-btn');
const medalElem = document.querySelector('.medal');

const finishPhrases = {
    winTitle: 'Congrats!',
    winMessage: 'We have got a medal for you:',
    loseTitle: 'Game Over!',
    loseMessage: 'You have run out of lives'
};
let lives = 3;
let dataIndex, currentData, questionNumber, question, options, answer;

// Reseting variables for new question
function nextQuestion(value, hasAudio) {
    dataIndex = value;
    currentData = questionData[dataIndex];
    ({ number: questionNumber, question, options, answer } = currentData);
    
    questionNumElem.innerText = questionNumber;
    questionElem.innerHTML = question;
    optionsElem.forEach((e, i) => e.innerText = options[i]);
    hasAudio && levelupAudio.play();
    applyAnimation(questionNumber);
}
nextQuestion(0, false);

const clickAudio = new Audio("./sound-effects/click.ogg");
const wrongAudio = new Audio("./sound-effects/wrong.mp3");
const levelupAudio = new Audio("./sound-effects/levelup.wav");
const loseAudio = new Audio("./sound-effects/lose.ogg");
const winAudio = new Audio("./sound-effects/win.ogg");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}
function applyAnimation(value) {
    optionsElem[1].className = (value === "20") ? 'pop-in-out' : '';
}

// Handling player card clicks
function mouseClick(e) {
    if(e.target.closest('.options, .question-number, .question span'))
        checkGuess(e.target.innerText);
}

// Check if the current guess is correct or not
async function checkGuess(value) {
    document.removeEventListener('click', mouseClick);
    if(answer === value)
        await gameFinish();
    else
        await loseLives();
    document.addEventListener('click', mouseClick);
}

// Check the state of the lives remaining
async function loseLives() {
    livesElems[--lives].style.visibility = 'hidden';
    wrongAudio.play();
    await new Promise(resolve => setTimeout(resolve, 500));
    if(lives === 0)
        displayEnding(false);
}
// Check if the player has finished all the questions
async function gameFinish() {
    await new Promise(resolve => setTimeout(resolve, 500));
    if(questionNumber === "20")
        displayEnding(true);
    else
        nextQuestion(++dataIndex, true);
}
// Display the correct ending scene
function displayEnding(isWin) {
    finishTitleElem.innerText = (isWin) ? finishPhrases.winTitle : finishPhrases.loseTitle;
    finishMessageElem.innerText = (isWin) ? finishPhrases.winMessage : finishPhrases.loseMessage;
    medalElem.style.display = (isWin) ? 'grid' : 'none';
    (isWin) ? winAudio.play() : loseAudio.play();
    changeScene('.stage', '.finish');
}

startBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
    clickAudio.play();
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    clickAudio.play();
    nextQuestion(0, false);
    lives = 3;
    livesElems.forEach(e => e.style.visibility = 'visible');
});
document.addEventListener('click', mouseClick);