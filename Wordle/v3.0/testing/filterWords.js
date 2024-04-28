// import words list and answer list
import { possibleWords } from './../data/Words.js'; 
import { possibleAnswers } from './../data/answers.js';
import { wordsLength, numberOfTries,
    colDiv, colSpan, tableCol,
    avgScore, progressVal, progressBar,
    timeSpent, finishTime, waitTime } from './testing.js';

// declare array testResult where will be saved number of guesses for each answer
const answerLen = possibleAnswers.length;
let testResult = [];
let countRes = new Array(numberOfTries).fill(0);


let index, counter, currentWord;
let startTime, endTime;
// The main function which will run the test
async function testAlgo() {
    startTime = Date.now();
    for(index = 0; index < answerLen; index++) {
        resetVal();
        for(counter = 0; counter < numberOfTries; counter++) {
            currentWord = matchedWords[0];
            if(currentWord === answer) {
                await waitTime(0);
                endTime = Date.now();
                calcTime();
                checkRes();
                displayBars();
                displayTable();
                break;
            }
            getPattern();
            filterWords();
        }   
    }
}


let answer, matchedWords; 
let gameboardValues, temp;
// reset the value after guessing one answer and continuing with the next one
function resetVal() {
    answer = possibleAnswers[index];
    matchedWords = [...possibleWords];

    temp = {
        values: new Array(wordsLength).fill(''),
        pattern: new Array(wordsLength).fill(0)
    };
    gameboardValues = new Array(numberOfTries).fill(temp);
}


let time, totalTime, remainingTime;
// measure the time spent time and estimate the remaining time
function calcTime() {
    time = parseInt((endTime - startTime)/1000);
    totalTime = parseInt(answerLen * time / (index + 1));
    remainingTime = totalTime - time; 

    function formateTime(param) {
        const seconds = param % 60;
        const minutes = parseInt(param / 60) % 60;
        const hours = parseInt(param / 3600);
        param = hours + "h : " + minutes + "m : " + seconds + "s";
        return param;
    }

    time = formateTime(time);
    remainingTime = formateTime(remainingTime);

    timeSpent.innerText = "Time : " + time; 
    finishTime.innerText = "Remaining : " + remainingTime;
}


let maxCountVal = 0; 
let loseVal = 0; 
let totalSum = 0; 
let average, percent;
// save the number of tries of current answer and calculate the average score
function checkRes() {
    testResult[index] = counter + 1;
    countRes[counter]++;

    if(maxCountVal < countRes[counter]) {
        maxCountVal = countRes[counter];
    }
    if(counter > 5) {
        loseVal++;
    }
    totalSum += (counter + 1);
    average = (totalSum / (index + 1)).toFixed(2);
    percent = (index + 1) * 100 / answerLen;
}

// display informations gathered so far
function displayBars() {
    if(counter < 6) {
        colSpan[counter].innerText = countRes[counter];
        colDiv[counter].style.height = countRes[counter] / 50 + "vw";
    }
    else {
        colSpan[6].innerText = loseVal;
        colDiv[6].style.height = loseVal / 50 + "vw";
    }
    for(let i = 0; i < 6; i++) {
        colDiv[i].style.backgroundColor = "#b59f3b";
        if(countRes[i] === maxCountVal) {
            colDiv[i].style.backgroundColor = "#538d4e";
        }
    }
    avgScore.innerText = "Average Score : " + average;
    progressVal.innerText = index + 1 + " / " + answerLen;
    progressBar.style.width = percent + "%";
}

const tableHeadCell = tableCol[0].getElementsByTagName("span");
const tableCell = tableCol[1].getElementsByTagName("span");
let maxResVal = -1;
// display the table of number of guesses
function displayTable() {
    tableCell[counter].innerText = countRes[counter];
    if(maxResVal < counter) {
        for(let i = maxResVal+1; i <= counter; i++) {
            tableHeadCell[i].style.display = "flex";
            tableCell[i].style.display = "flex";
        }
        maxResVal = counter;
    }
}

// get the pattern of each guess
function getPattern() {
    for(let j = 0; j < wordsLength; j++) {
        gameboardValues[counter].values[j] = currentWord[j];
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
}

// eliminate incorrect words
function filterWords() {
    for(let i = 0, len = matchedWords.length; i < len; i++) {
        for(let j = 0; j < wordsLength; j++) {
            if(gameboardValues[counter].pattern[j] === 0) {
                if(matchedWords[i].includes(gameboardValues[counter].values[j])) {
                    matchedWords[i] =  '';
                }
            }
            else if(gameboardValues[counter].pattern[j] === 2) {
                if(matchedWords[i][j] !== gameboardValues[counter].values[j]) {
                    matchedWords[i] = '';
                }
            }
            else {
                if (!matchedWords[i].includes(gameboardValues[counter].values[j])) {
                    matchedWords[i] = '';
                }
                if(matchedWords[i][j] === gameboardValues[counter].values[j]) {
                    matchedWords[i] = '';
                }
            }
        }
    }
    matchedWords = matchedWords.filter(e => e !== '');
}


testAlgo();