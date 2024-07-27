import { questionData } from "./data.js";

const startBtn = document.querySelector('.start-btn');
const levelElem = document.querySelector('.level');
const questionElem = document.querySelector('.question');
const hintElem = document.querySelector('.hint img');
const answerDiv = document.querySelector('.input');
const keyboardElems = document.querySelectorAll('.key-buttons');
const undoKey = document.querySelector('.undo-key');
const checkKey = document.querySelector('.check-key');
const finishBtn = document.querySelector('.finish-btn');

let level = 1;
let currentQuestion = questionData[level - 1];
let areEventsActive = true;

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
// Add/remove events from clickable elements
function togglePointerEvents(value) {
    areEventsActive = !areEventsActive;
    keyboardElems.forEach(elem => elem.style.pointerEvents = value);
    undoKey.style.pointerEvents = value;
    checkKey.style.pointerEvents = value;
}

// Show/hide hint for the current question
function hintFunction(hintImg, textDisplay, color, eventValue) {
    hintElem.setAttribute("src", `images/${hintImg}.png`);
    questionElem.innerHTML = textDisplay;
    questionElem.style.color = color;
    togglePointerEvents(eventValue);
}
function enableHint() {
    if(areEventsActive)
        hintFunction('close', currentQuestion.hint, "#ff5522", "none");
    else
        hintFunction('hint', currentQuestion.question, "#000000", "auto");
}

async function resultColor(element, color) {
    togglePointerEvents("none");
    element.forEach(e => e.classList.add(color));
    await new Promise(resolve => setTimeout(resolve, 700));
    element.forEach(e => e.classList.remove(color));
    togglePointerEvents("auto");
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

// Check if user inputs the correct number as an answer
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

// Display the number which user choose on the answer field
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

// Erase the answer number which user input before
function undoFunction() {
    answerDiv.querySelectorAll('div').forEach(elem => {
        elem.innerHTML = "";
        elem.classList.remove('input-color');
    });
}

// Check the answer and display the next question or finish scene if the answer is correct
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

// Display number on the answer field even if user press them on physical keyboard
function keyPress(event) {
    if(areEventsActive) {
        if(event.key == 'Enter')
            checkFunction();
        else if(event.key == 'Backspace')
            undoFunction();
        else if("0123456789".includes(event.key)) 
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
    let clickedKey = e.target.dataset.index;
    drawNumber(clickedKey);
}));
document.addEventListener('keydown', keyPress);
undoKey.addEventListener('click', undoFunction);
checkKey.addEventListener('click', checkFunction);
hintElem.addEventListener("click", enableHint);