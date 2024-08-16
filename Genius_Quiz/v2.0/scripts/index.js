import { questionData } from './data.js'

const startBtn = document.querySelector('.start-btn');
const questionNumElem = document.querySelector('.question-number');
const questionElem = document.querySelector('.question');
const optionsElem = document.querySelectorAll('.options button');
const livesElems = document.querySelectorAll('.lives img');
const finishTitleElem = document.querySelector('.finish .title');
const finishMessageElem = document.querySelector('.finish p');
const medalElem = document.querySelector('.medal');
const finishBtn = document.querySelector('.finish-btn');

const finishPhrases = {
    winTitle: 'Congrats!',
    winMessage: 'We have got a medal for you:',
    loseTitle: 'Game Over!',
    loseMessage: 'You have run out of lives'
};

let lives = 3;
let dataIndex, currentData, questionNumber, question, answer;
let options = [];

// Reseting variables for new question
function nextQuestion(value, hasAudio) {
    currentData = questionData[value];
    ({ number: questionNumber, question, options, answer } = currentData);
    
    questionNumElem.innerText = questionNumber;
    questionElem.innerHTML = question;
    optionsElem.forEach((e, i) => e.innerText = options[i]);
    hasAudio && levelupAudio.play();
}
nextQuestion(0, false);

const clickAudio = new Audio("./sound-effects/click.ogg");
const levelupAudio = new Audio("./sound-effects/levelup.wav");
const loseAudio = new Audio("./sound-effects/lose.ogg");
const winAudio = new Audio("./sound-effects/win.ogg");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

// Handling player card clicks
function mouseClick(e) {
    if(e.target.closest('.options'))
        console.log(e.target.innerText);
    else if(e.target.closest('.question-number'))
        console.log(e.target.innerHTML);
    else if(e.target.closest('.question span'))
        console.log(e.target.innerHTML);
    // checkGuess(e.target.innerText);
}

// Check if the current guess is correct or not
async function checkGuess(value) {
    document.removeEventListener('click', mouseClick);

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
    document.addEventListener('click', mouseClick);
}

// Check the state of the lives remaining
async function loseLives() {
    livesElems[--lives].style.display = 'none';
    wrongAudio.play();
    await new Promise(resolve => setTimeout(resolve, 500));
    if(lives === 0)
        displayEnding(false);
}
// Check if the player has finished all the questions
async function gameFinish() {
    await new Promise(resolve => setTimeout(resolve, 500));
    if(questionNumber < 10)
        levelUp(++dataIndex, true);
    else
        displayEnding(true);
}
function displayEnding(isWin) {
    finishTitleElem.innerText = (isWin) ? finishPhrases.winTitle : finishPhrases.loseTitle;
    finishMessageElem.innerText = (isWin) ? finishPhrases.winMessage : finishPhrases.loseMessage;
    medalElem.style.display = (isWin) ? 'block' : 'none';
    changeScene('.stage', '.finish');
}

startBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    nextQuestion(0, false);
    lives = 3;
    livesElems.forEach(e => e.style.display = 'inline');
});
document.addEventListener('click', mouseClick);