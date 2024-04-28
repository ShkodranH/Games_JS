const scoreElem = document.querySelector('.score');
const inputElem = document.querySelector('.input');
const guessElem = document.querySelector('.guess');
const guessesElem = document.querySelector('.guesses');
const hintElem = document.querySelector('.hint');
const resetElem = document.querySelector('.reset');

let score = 15;
let randomNumber = Math.ceil(Math.random() * 100);
let guessesArray = [];
let messages = {
    win: 'Congrats! You got it right',
    lose: 'Game Over! You lost',
    low: 'Number was too low!',
    high: 'Number was too high!',
}

// Play music in background
const bgLoopAudio = new Audio("./sound-effects/bg-loop.mp3");
document.addEventListener('click', () => {
    bgLoopAudio.volume = 0.05;
    bgLoopAudio.loop = true;
    bgLoopAudio.play();
});

// Format numbers to be inside the range of 1-100
function formatNumbers() {
    if(inputElem.value == '' || inputElem.value < 1) {
        inputElem.value = 1;
    }
    else if(inputElem.value > 100) {
        inputElem.value = 100;
    }
    guessesArray.push(inputElem.value);
    guessesElem.children[0].innerHTML = guessesArray.join(', ');
}

function nextTry() {
    inputElem.value = '';
    inputElem.focus();
    score--;
}

function gameEnd(message) {
    scoreElem.style.display = 'flex';
    scoreElem.innerHTML = `Your Score:<span>${score}</span>`;
    hintElem.innerHTML = message;
    [inputElem, guessElem]
        .forEach(elem => elem.disabled = true);
    document.removeEventListener('keydown', keyboard);
}

// Check if user guessed the right number or if he has run out of tries 
function checkGuess() {
    formatNumbers();
    [guessesElem, hintElem, resetElem]
        .forEach(elem => elem.style.display = 'flex');

    if(inputElem.value == randomNumber) {
        gameEnd(messages.win);
    }
    else {
        hintElem.innerHTML = inputElem.value < randomNumber 
            ? messages.low
            : messages.high;
        nextTry();
    }

    if(score === 0)
        gameEnd(messages.lose);
}

function resetGame() {
    score = 15;
    randomNumber = Math.ceil(Math.random() * 100);
    guessesArray = [];
    [inputElem, guessElem]
        .forEach(elem => elem.disabled = false);
    [scoreElem, guessesElem, hintElem, resetElem]
        .forEach(elem => elem.style.display = 'none');
    inputElem.value = '';
    inputElem.focus();
    document.addEventListener('keydown', keyboard);
}

function keyboard(event) {
    if(event.key === 'Enter')
        checkGuess();
}

document.addEventListener('keydown', keyboard);
guessElem.addEventListener('click', checkGuess);
resetElem.addEventListener('click', resetGame);