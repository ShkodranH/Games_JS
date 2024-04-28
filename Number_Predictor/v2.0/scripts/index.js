const numbersDiv = document.querySelector('.numbers');
const messageElem = document.querySelector('.message');
const resultElem = document.querySelector('.result');
const startBtns = document.querySelectorAll('.start');
const stageBtns = document.querySelectorAll('.stage .btn');
const resetBtn = document.querySelector('#reset');

let size;
let numberLength;
let numbersArray;
let stageSequence;

let result = 0;
let stagePoints = 0;
let stageCount = 0;
let stageMessage = [
    'Do you see your number below?',
    'How about there?',
    'And there?',
    'Make sure if it\'s there.',
    'Almost finish!',
    'That\'s the last one &#128512;'
]

const clickAudio = new Audio("./sound-effects/click.mp3");
const winAudio = new Audio("./sound-effects/win.mp3");

//Initializing variables and arrays based on user selection (0-31 or 0-63)
function initVariables(value) {
    size = value;
    numberLength = Math.log2(size);
    numbersArray = Array.from({ length: numberLength }, () => []);
    stageSequence = Array.from({ length: numberLength }, (_, i) => i);
    generateNumbers();
    shufflingArrays();
}

//Generating numbers for each stage by counting 1s in binary representation
function generateNumbers() {
    for(let i = 0; i < size; i++) {
        let temp = i.toString(2).padStart(numberLength, 0);
        for(let j = 0; j < numberLength; j++) {
            if(temp[j] === '1') {
                numbersArray[j].push(i);
            }
        }
    }
}

//Shuffling numbers for each stage and Creating a random sequence
function shufflingArrays() {
    numbersArray.forEach(elem => elem.sort(() => Math.random() - 0.5));
    stageSequence.sort(() => Math.random() - 0.5);
}

function changeScene (prev, next) {
    clickAudio.play();
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

function showNumbers(array) {
    array.forEach(elem => {
        numbersDiv.innerHTML += `<div>${elem}</div>`;
    });
}
function showMessage(message) {
    messageElem.innerHTML = message;
}

//Changing numbers displayed in each stage and calculating the effect (points) of each one
function changeStage() {
    clickAudio.play();
    showMessage(stageMessage[stageCount]);
    numbersDiv.innerHTML = '';
    showNumbers(numbersArray[stageSequence[stageCount]]);
    stagePoints = Math.pow(2, numberLength - stageSequence[stageCount] - 1);
    stageCount++;
}

startBtns.forEach(elem => {
    elem.addEventListener('click', event => {
        initVariables(event.target.id);
        changeScene('.info', '.stage');
        changeStage();
    });
})

stageBtns.forEach(elem => {
    elem.addEventListener('click', event => {
        if(event.target.id === 'yes') {
            result += stagePoints;
        }
        if(stageCount === numberLength) {
            setTimeout(() => {
                winAudio.volume = .15;
                winAudio.play();
            }, 3000);
            resultElem.innerHTML = result;
            return changeScene('.stage', '.finish');
        }
        changeStage();
    });
});

resetBtn.addEventListener('click', () => {
    result = stageCount = stagePoints = 0;
    changeScene('.finish', '.info');
});