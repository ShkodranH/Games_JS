// import the list of words and answers
import { possibleWords } from './../data/words.js';
import { possibleAnswers } from './../data/answers.js';
import { numberOfTries, wordsLength, 
    letters, gameboard, keyboard, 
    endScene, waitTime } from './index.js';

// choose a random word as answer
const randomSelect = Math.floor(Math.random() * possibleAnswers.length);
const answer = possibleAnswers[randomSelect];

//create an array of objects were will be store the letters entered by the user and the color revealed
export let counter = 0;
export let gameboardValues = [];

for(let i = 0; i < numberOfTries; i++) {
    let temp = {
        values: [],
        pattern: []
    };
    for(let j = 0; j < wordsLength; j++) {
        temp.values.push('');
        temp.pattern.push(0);
    }
    gameboardValues.push(temp);
}

// add functionality of each key in (non-physical) keyboard
const gameboardCells = gameboard.querySelectorAll('div span');
const newLetters = letters.flat();
export const keyboardButtons = keyboard.querySelectorAll('div span');

for(let i = 0, len = newLetters.length; i < len; i++) {
    if(newLetters[i].length === 1) {
        keyboardButtons[i].addEventListener('click', function() {
            keyButtons(newLetters[i])
        });
    }
    else {
        keyboardButtons[i].classList.add("special");
        if(newLetters[i] === 'remove') {
            keyboardButtons[i].innerHTML = '<i class="fas fa-backspace"></i>';
            keyboardButtons[i].addEventListener('click', remove);
        }
        else if(newLetters[i] === 'enter') {
            keyboardButtons[i].innerText = "Enter";
            keyboardButtons[i].addEventListener('click', enter);
        }
    }
}
// create an global variable to manage the order of running the algorithms
window.callAlgo = new Array(7).fill(false);

// saves all the letters entered by the user in 'gameboardValues'
function write() {
    for(let i = 0; i < numberOfTries; i++) {
        for(let j = 0; j < wordsLength; j++) {
            gameboardCells[i * wordsLength + j].innerText = 
            gameboardValues[i].values[j].toUpperCase();
        }
    }
}

// check if word entered by the user is valid word or not
function enter() {
    let currentWord = gameboardValues[counter].values.join("").toLowerCase();
    if(possibleWords.includes(currentWord)) {
        for(let j = 0; j < wordsLength; j++) {
            if(currentWord[j] === answer[j]) {
                gameboardValues[counter].pattern[j] = 2;
            }
            else if(answer.includes(currentWord[j])) {
                gameboardValues[counter].pattern[j] = 1;
            }
            else {
                gameboardValues[counter].pattern[j] = 0;
            }
        }
        callAlgo.fill(true, 0, 2);
        keyboardButtons[19].removeEventListener('click', remove);
        keyboardButtons[27].removeEventListener('click', enter);
        document.removeEventListener('keydown', keyPress);
        checkPattern();
    }
    else {
        gameboard.querySelectorAll("div")[counter].classList.add("wrong");
        setTimeout(() => {
            gameboard.querySelectorAll("div")[counter].classList.remove("wrong");
        }, 500);
    }
}

// erases one letter at a time when user click backspace
function remove() {
    for(let i = wordsLength - 1; i >= 0; i--) {
        if(gameboardValues[counter].values[i].length !== 0) {
            gameboardValues[counter].values[i] = '';
            gameboardCells[counter * wordsLength + i].classList.remove("typing");
            gameboardCells[counter * wordsLength + i].style.borderColor = "#3a3a3c";
            break;
        }
    }
    write();
}

// adds the current letter clicked by the user
function keyButtons(val) {
    for(let i = 0; i < wordsLength; i++) {
        if(gameboardValues[counter].values[i].length === 0) {
            gameboardValues[counter].values[i] = val.toLowerCase();
            gameboardCells[counter * wordsLength + i].classList.add("typing");
            gameboardCells[counter * wordsLength + i].style.borderColor = "#6a6a6c";
            break; 
        }
    }
    write();
}

// adds functionality of all letter-keys in physical keyboard (including enter and backspace keys)
function keyPress(e) {
    if(e.keyCode > 64 && e.keyCode < 91) {
        keyButtons(e.key);
    }
    else if(e.keyCode === 13) {
        enter();
    }
    else if(e.keyCode === 8) {
        remove();
    }
}
document.addEventListener('keydown', keyPress);

// add the color to the letters depending on the patterns displayed
function keyColors() {
    for(let i = 0, len = newLetters.length; i < len; i++) {
        for(let j = 0; j < numberOfTries; j++) {
            for(let k = 0; k < wordsLength; k++) {
                if(newLetters[i] === gameboardValues[j].values[k]) {
                    if(gameboardValues[j].pattern[k] === 2) {
                        keyboardButtons[i].style.backgroundColor = "#538d4e";
                    }
                    else if(gameboardValues[j].pattern[k] === 1) {
                        if(keyboardButtons[i].style.backgroundColor !== "#538d4e") {
                            keyboardButtons[i].style.backgroundColor = "#b59f3b";
                        }
                    }
                    else if(gameboardValues[j].pattern[k] === 0) {
                        keyboardButtons[i].style.backgroundColor = "#3a3a3c";
                    }
                }
            }
        }
    }
}

// display the pattern of each guess made by the user
async function checkPattern() {
    let green = "#538d4e";
    let yellow = "#b59f3b";
    let black = "#3a3a3c";
    for(let i = 0; i < wordsLength; i++) {
        gameboardCells[counter * wordsLength + i].classList.add("reveal");
        await waitTime(300);
        gameboardCells[counter * wordsLength + i].style.borderColor = "transparent";
        
        if(gameboardValues[counter].pattern[i] === 2) {
            gameboardCells[counter * wordsLength + i].style.backgroundColor = green;
        }
        else if(gameboardValues[counter].pattern[i] === 1) {
            gameboardCells[counter * wordsLength + i].style.backgroundColor = yellow;
        }
        else {
            gameboardCells[counter * wordsLength + i].style.backgroundColor = black;
        }
    }
    await waitTime(500);
    keyColors();
    keyboardButtons[19].addEventListener('click', remove);
    keyboardButtons[27].addEventListener('click', enter);
    document.addEventListener('keydown', keyPress);
    endGame();
}

// display the win or lose modal depending the guesses made so far
async function endGame() {
    if(gameboardValues[counter].pattern.every(e => e === 2)) {
        for(let i = 0; i < wordsLength; i++) {
            await waitTime(100);
            gameboardCells[counter * wordsLength + i].classList.add("correct");
        }
        await waitTime(1000);
        document.removeEventListener('keydown', keyPress);

        let winMessage = "You Win in " + (counter+1) + " guess";
        if(counter > 0) { winMessage += "es" }
        let winButton = "Play another game";
        endScene(winMessage, winButton);
    }
    else if(counter === 5) {
        await waitTime(1000);
        let loseMessage = "The answer was " + answer.toUpperCase();
        let loseButton = "Play again";
        endScene(loseMessage, loseButton);
    }
    counter++;
}