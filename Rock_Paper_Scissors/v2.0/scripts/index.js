import { questionData } from "./data.js";

const startBtn = document.querySelector('.start-btn');
const levelElem = document.querySelector('.level');
const keyboardElems = document.querySelectorAll('.key-buttons');
const finishBtn = document.querySelector('.finish-btn');

let level = 1;
let currentQuestion = questionData[level - 1];
let isHintShown = true;

const correctAudio = new Audio("./sound-effects/correct.mp3");
const wrongAudio = new Audio("./sound-effects/wrong.mp3");
const winAudio = new Audio("./sound-effects/win.mp3");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}
function generateAnswerField(answer) {
    answerDiv.innerHTML = "";
    for(let i of answer) {
        answerDiv.innerHTML += "<div></div>";
    }
}
function enableHint() {
    let icon = hintElem.querySelector('img');
    if(isHintShown) {
        isHintShown = false;
        icon.setAttribute("src", "images/hint.png");
        questionElem.innerHTML = currentQuestion.question;
        questionElem.style.color = "#000000";
        checkKey.addEventListener('click', checkFunction);
    }
    else {
        isHintShown = true;
        icon.setAttribute("src", "images/close.png");
        questionElem.innerHTML = currentQuestion.hint;
        questionElem.style.color = "#ff5522";
        checkKey.removeEventListener('click', checkFunction);
    }
}
async function resultColor(element, color) {
    element.forEach(e => e.classList.add(color));
    await new Promise(resolve => setTimeout(resolve, 700));
    element.forEach(e => e.classList.remove(color));
}

function levelUp() {
    level++;
    levelElem.innerHTML = "Level " + level;
}
function displayQuestion() {
    currentQuestion = questionData[level - 1];
    questionElem.innerHTML = currentQuestion.question;
    generateAnswerField(currentQuestion.answer);
}
async function checkAnswer(answer) {
    let input = answerDiv.querySelectorAll('div');
    for(let i = 0; i < answer.length; i++) {
        if(input[i].innerText != currentQuestion.answer[i]) {
            wrongAudio.play();
            await resultColor(input, 'wrong');
            return false;
        }
    }
    correctAudio.play();
    await resultColor(input, 'correct');
    return true;
}

function drawNumber(clickedKey) {
    let answerFields = answerDiv.querySelectorAll('div');
    for(let item of answerFields) {
        if(item.innerHTML == "") {
            item.innerHTML = clickedKey;
            item.classList.add('input-color');
            break;
        }
    }
}
function undoFunction() {
    answerDiv.querySelectorAll('div').forEach(elem => {
        elem.innerHTML = "";
        elem.classList.remove('input-color');
    });
}
async function checkFunction() {
    if(await checkAnswer(currentQuestion.answer)) {
        if(level < questionData.length) {
            levelUp();
            displayQuestion();
        }
        else {
            changeScene('.stage', '.finish');
            winAudio.play();
        }
    }
    else {
        undoFunction();
    }
}

function keyPress(event) {
    if(event.key == 'Enter' && !isHintShown) {
        checkFunction();
    }
    else if(event.key == 'Backspace') {
        undoFunction();
    }
    else if("0123456789".includes(event.key)) {  
        drawNumber(event.key);
    }
}

startBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
    displayQuestion();
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    level = 1;
    levelElem.innerHTML = "Level " + level;
});
keyboardElems.forEach(elem => elem.addEventListener('click', (e) => {
    let clickedKey = e.target.getAttribute('data-index');
    drawNumber(clickedKey);
}));
document.addEventListener('keydown', keyPress);
undoKey.addEventListener('click', undoFunction);
hintElem.addEventListener("click", enableHint);
enableHint();