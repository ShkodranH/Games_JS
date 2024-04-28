// import words list and answer list
import { possibleWords } from './../data/Words.js'; 
import { possibleAnswers } from './../data/answers.js';
import { wordsLength, numberOfTries,
    colDiv, colSpan, tableCol,
    avgScore, progressVal, progressBar,
    timeSpent, finishTime, waitTime } from './testing.js';

// declare variable testResult where will be saved number of guesses for each answer
const answerLen = possibleAnswers.length;
let testResult = [];
let countRes = new Array(numberOfTries).fill(0);

// generate all possible patterns
let patterns = [];
const numberOfPatterns = Math.pow(3, 5);
for(let i = 0; i < numberOfPatterns; i++) {
    patterns[i] = [];
    let temp = i.toString(3).padStart(wordsLength, 0);
    for(let j = 0; j < wordsLength; j++) {
        patterns[i][j] = parseInt(temp[j]);
    }
}
let bestWord;


let index, counter, currentWord;
let startTime, endTime;
// The main function which will run the test
async function testAlgo() {
    startTime = Date.now();
    for(index = 0; index < answerLen; index++) {
        resetVal();
        for(counter = 0; counter < numberOfTries; counter++) {     
            // predefine some common value which are time-consumming
            if(counter === 0) {
                currentWord = "soare";
            }
            else if(counter === 1 && matchedAnswers.length === 183 || 
                counter === 1 && matchedAnswers.length === 138) {
                    currentWord = "clint";
            }
            else {
                informationEntropyAdv();
                await informationEntropyAdv();
                currentWord = bestWord;
            }
            
            if(currentWord === answer) {
                checkRes();
                displayBars();
                displayTable();
                break;
            }
            getPattern();
            filterAnswers();
        }   
    }
}


let answer, matchedAnswers; 
let gameboardValues, temp;
// reset the value after guessing one answer and continuing with the next one
function resetVal() {
    answer = possibleAnswers[index];
    matchedAnswers = [...possibleAnswers];

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
function filterAnswers() {
    for(let i = 0, len = matchedAnswers.length; i < len; i++) {
        for(let j = 0; j < wordsLength; j++) {
            if(gameboardValues[counter].pattern[j] === 0) {
                if(matchedAnswers[i].includes(gameboardValues[counter].values[j])) {
                    matchedAnswers[i] =  '';
                }
            }
            else if(gameboardValues[counter].pattern[j] === 2) {
                if(matchedAnswers[i][j] !== gameboardValues[counter].values[j]) {
                    matchedAnswers[i] = '';
                }
            }
            else {
                if (!matchedAnswers[i].includes(gameboardValues[counter].values[j])) {
                    matchedAnswers[i] = '';
                }
                if(matchedAnswers[i][j] === gameboardValues[counter].values[j]) {
                    matchedAnswers[i] = '';
                }
            }
        }
    }
    matchedAnswers = matchedAnswers.filter(e => e !== '');
}


let entropy = 0;
let entropyArray = [];
let possWordsLen = possibleWords.length
let h;
// calculate entropy of each word
async function informationEntropyAdv() {
    for(h = 0; h < possWordsLen; h++) {
        calcEntropy();
        if(h % 1000 === 0) {
            await waitTime(0);
            endTime = Date.now();
            calcTime();
        }
    }
    findBestWord();
}

function calcEntropy() {
    let matches = matchedAnswers.length;
    for(let i = 0; i < numberOfPatterns; i++) {
        for(let j = 0, len = matchedAnswers.length; j < len; j++) {   
            for(let k = 0; k < wordsLength; k++) {
                if(patterns[i][k] === 2) {
                    if(possibleWords[h][k] !== matchedAnswers[j][k]) {
                        matches--;
                        break;
                    }
                }
                else if(patterns[i][k] === 1) {
                    if(!matchedAnswers[j].includes(possibleWords[h][k]) || possibleWords[h][k] === matchedAnswers[j][k]) {
                        matches--;
                        break;
                    }
                }
                else {
                    if(matchedAnswers[j].includes(possibleWords[h][k])) {
                        matches--;
                        break;
                    }
                }
            }
        }
        if(matches > 0) {
            let probability = matches / matchedAnswers.length;
            let information = Math.log2(matchedAnswers.length / matches);
            entropy += probability * information;
        }
        matches = matchedAnswers.length;
    }
    entropy = parseFloat(entropy.toFixed(2));
    entropyArray[h] = entropy;
    entropy = 0;
}

function findBestWord() {
    let indexArray = [];
    for(let i = 0, len = possibleWords.length; i < len; i++) {
        if(matchedAnswers.includes(possibleWords[i])) {
            indexArray.push(i);
        }
    }
    let maxValue = 0;
    let tempIndex = 0;
    for(let j = 0, len = entropyArray.length; j < len; j++) {
        if(maxValue < entropyArray[j]) {
            maxValue = entropyArray[j];
            bestWord = possibleWords[j];
            tempIndex = j;
        }
        else if(maxValue === entropyArray[j]) {
            if(indexArray.includes(j) && !indexArray.includes(tempIndex)) {
                maxValue = entropyArray[j];
                bestWord = possibleWords[j];
                tempIndex = j;
            }
        }
    }
}


testAlgo();