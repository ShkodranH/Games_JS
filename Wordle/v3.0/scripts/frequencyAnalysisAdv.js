// import matchedWords from filterWords algorithm
import { matchedWords, algoCounter } from './filterWords.js';
import { wordsLength, displayedList, waitTime } from './index.js';

let bestWord = [];
let maxValue = [];

function frequencyAnalysisAdv() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let alphabetLength = alphabet.length;
    bestWord = [];

    let alphabetFrequency = [];
    let positionFrequency = [];
    for(let i = 0; i < alphabetLength; i++) {
        alphabetFrequency[i] = 0;
        positionFrequency[i] = [0, 0, 0, 0, 0];
    } 
    // count the number of each letter and the number of each letter in each position
    for(let i = 0, len = matchedWords.length; i < len; i++) {
        for(let j = 0; j < wordsLength; j++) {
            for(let k = 0; k < alphabetLength; k++) {
                if(matchedWords[i][j] === alphabet[k]){
                    alphabetFrequency[k]++;
                    positionFrequency[k][j]++;
                    break;
                }
            }
        }
    }
    // convert those numbers to percentages
    for(let i = 0; i < alphabetLength; i++) {
        for(let j = 0; j < wordsLength; j++) {
             positionFrequency[i][j] /= alphabetFrequency[i] / 100;
             positionFrequency[i][j] = parseFloat(positionFrequency[i][j].toFixed(2));
        }
    }
    let toPercent = (matchedWords.length * wordsLength) / 100;
    for(let i = 0; i < alphabetLength; i++) {
        alphabetFrequency[i] /= toPercent;
        alphabetFrequency[i] = parseFloat(alphabetFrequency[i].toFixed(2));
    }

    let wordValues = [];
    for(let i = 0, len = matchedWords.length; i < len; i++) {
        wordValues[i] = 0;
    }
    // calculate the value of each word by multiplying the percentage of letters and it's position (skip the duplicates)
    let tempArray = [];
    for(let i = 0, len = matchedWords.length; i < len; i++) {
        for(let j = 0; j < wordsLength; j++) {
            for(let k = 0; k < alphabetLength; k++) {
                if(matchedWords[i][j] === alphabet[k]) {
                    if(!tempArray.includes(alphabet[k])) {
                        tempArray.push(alphabet[k]);
                        let tempValue = alphabetFrequency[k] * positionFrequency[k][j];
                        wordValues[i] += tempValue / 100;
                    }
                    break;
                }
            }
        }
        wordValues[i] = parseFloat(wordValues[i].toFixed(2));
        tempArray = [];
    }
    // find the top 5 words whith the highest value
    let n = (matchedWords.length >= displayedList) ? displayedList : matchedWords.length;
    for(let i = 0; i < n; i++) {
        maxValue[i] = 0;
        for(let j = 0, len = wordValues.length; j < len; j++) {
            if(maxValue[i] < wordValues[j] && !bestWord.includes(matchedWords[j])) {
                maxValue[i] = wordValues[j];
                bestWord[i] = matchedWords[j];
            }
        }
    }
    displayWords();
}

// display the best word processed by algorithm
async function displayWords() {
    const algoSpan = document.querySelectorAll("#frequencyAnalysisAdv span");
    for(let i = 0; i < displayedList; i++) {
        algoSpan[i].innerText = "";
    }
    for(let j = 0; j < bestWord.length; j++) {
        algoSpan[j].innerText = bestWord[j] + "\n" + maxValue[j];
    }
    // display the process of execution of the algorithm
    if(algoCounter !== 0) {
        algoSpan[displayedList].classList.add("fillDiv");
        await waitTime(300)
        algoSpan[displayedList].style.width = 100 + "%";
        algoSpan[displayedList].classList.remove("fillDiv");
        algoSpan[displayedList].classList.add("hideBg");
        await waitTime(200);
        algoSpan[displayedList].style.width = 0;
        algoSpan[displayedList].classList.remove("hideBg");
    }
}
frequencyAnalysisAdv();

// run the algorithm when user enters a valid guess and filterWords have been executed
function runAlgorithm() {
    if(callAlgo[4]) {
        frequencyAnalysisAdv();
        callAlgo[4] = false;
    }
}
document.addEventListener('keyup', runAlgorithm);
document.addEventListener('click', runAlgorithm);