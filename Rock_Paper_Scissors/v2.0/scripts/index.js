const playBtn = document.querySelector('.start-btn');
const playerPointsElem = document.querySelector('.player-points');
const computerPointsElem = document.querySelector('.computer-points');
const finishBtn = document.querySelector('.finish-btn');

let listOfChoices = ['rock', 'paper', 'scissors'];
let playerPoints = 2;
let computerPoints = 4;
let playerChoice;
let computerChoice;
let totalPoints = 5;

for(let i = 0; i < totalPoints; i++) {
    playerPointsElem.innerHTML += '<i class="far fa-star"></i>';
    computerPointsElem.innerHTML += '<i class="far fa-star"></i>';
}
// const correctAudio = new Audio("./sound-effects/correct.mp3");
// const wrongAudio = new Audio("./sound-effects/wrong.mp3");
// const winAudio = new Audio("./sound-effects/win.mp3");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}
function popUpScene(name, action) {
    document.querySelector('.bg').style.display = action;
    document.querySelector(name).style.display = action;
}
function generateChoices(elem) {
    computerChoice = listOfChoices[Math.floor(Math.random() * listOfChoices.length)];
    playerChoice = elem.getAttribute('data-choice');
}
function drawPoints(winner, winnerElem) {
    for(let i = 0; i < winner; i++)
        winnerElem.querySelectorAll('i')[i].classList.replace('far', 'fas');
}

// async function resultColor(element, color) {
//     element.forEach(e => e.classList.add(color));
//     await new Promise(resolve => setTimeout(resolve, 700));
//     element.forEach(e => e.classList.remove(color));
// }

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


playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
});
// keyboardElems.forEach(elem => elem.addEventListener('click', (e) => {
//     let clickedKey = e.target.getAttribute('data-index');
//     drawNumber(clickedKey);
// }));