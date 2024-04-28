// import both possibleWords and matchedWords arrays
import { possibleWords } from './../data/words.js';
import { matchedWords } from './filterWords.js';
import { wordsLength, displayedList, waitTime } from './index.js';

let patterns = [];
const numberOfPatterns = Math.pow(3, 5);
// generate all possible patterns
for(let i = 0; i < numberOfPatterns; i++) {
    patterns[i] = [];
    let temp = i.toString(3).padStart(wordsLength, 0);
    for(let j = 0; j < wordsLength; j++) {
        patterns[i][j] = parseInt(temp[j]);
    }
}

let bestWord = [];
let maxValue = [];

async function informationEntropy() {
    let entropy = 0;
    let entropyArray = [];
    let matches = matchedWords.length;
    let percent = Math.floor(possibleWords.length / 100);
    let progress = 0;

    for(let h = 0, len = possibleWords.length; h < len; h++) {
        for(let i = 0; i < numberOfPatterns; i++) {
            for(let j = 0, len = matchedWords.length; j < len; j++) {   
                for(let k = 0; k < wordsLength; k++) {
                    // calculate the number of 'matches' of a word (from possibleWords) 
                    // whith another word (from matchedWord) for all possible patterns
                    if(patterns[i][k] === 2) {
                        if(possibleWords[h][k] !== matchedWords[j][k]) {
                            matches--;
                            break;
                        }
                    }
                    else if(patterns[i][k] === 1) {
                        if(!matchedWords[j].includes(possibleWords[h][k]) || possibleWords[h][k] === matchedWords[j][k]) {
                            matches--;
                            break;
                        }
                    }
                    else {
                        if(matchedWords[j].includes(possibleWords[h][k])) {
                            matches--;
                            break;
                        }
                    }
                }
            }
            // if there is no word match for a certain pattern, skip it
            // the sum of each patterns "probability * informations" is the entropy of this word 
            if(matches > 0) {
                let probability = matches / matchedWords.length;
                let information = Math.log2(matchedWords.length / matches);
                entropy += probability * information;
            }
            matches = matchedWords.length;
        }
        entropy = parseFloat(entropy.toFixed(2));
        entropyArray[h] = entropy;
        entropy = 0;

        if(entropyArray.length % percent === 0) {
            await waitTime(0);
            progress++;
            algoSpan[displayedList].style.width = progress + "%";
        }
    }
    // get the index of each word that is in matchedWords array
    let n = (entropyArray.length >= displayedList) ? displayedList : entropyArray.length;
    let indexArray = [];
    for(let i = 0, len = possibleWords.length; i < len; i++) {
        if(matchedWords.includes(possibleWords[i])) {
            indexArray.push(i);
        }
    }
    // find the word with the highest value
    for(let i = 0; i < n; i++) {
        maxValue[i] = 0;
        let tempIndex = 0;
        for(let j = 0, len = entropyArray.length; j < len; j++) {
            if(!bestWord.includes(possibleWords[j])) {
                if(maxValue[i] < entropyArray[j]) {
                    maxValue[i] = entropyArray[j];
                    bestWord[i] = possibleWords[j];
                    tempIndex = j;
                }
                // if two words have the same value of entropy choose the one which is in matchedWords array
                else if(maxValue[i] === entropyArray[j]) {
                    if(indexArray.includes(j) && !indexArray.includes(tempIndex)) {
                        maxValue[i] = entropyArray[j];
                        bestWord[i] = possibleWords[j];
                        tempIndex = j;
                    }
                }
            }
        }
    }
    displayWords();
}

// display the best words processed by the algorithm
const algoSpan = document.querySelectorAll("#informationEntropy span");
async function displayWords() {
    for(let i = 0; i < displayedList; i++) {
        algoSpan[i].innerText = "";
    }
    if(maxValue[0] === 0) {
        bestWord.length = 1;
        bestWord[0] = matchedWords[0];
    }
    // if word is a possible answer write it with green
    for(let j = 0; j < bestWord.length; j++) {
        algoSpan[j].innerText = bestWord[j] + "\n" + maxValue[j];
        if(matchedWords.includes(bestWord[j])) {
            algoSpan[j].style.color = "#53ed4e";
        }
        else {
            algoSpan[j].style.color = "#ffffff";
        }
    }
    // display the process of execution of the algorithm
    algoSpan[displayedList].classList.add("hideBg");
    await waitTime(200);
    algoSpan[displayedList].style.width = 0;
    algoSpan[displayedList].classList.remove("hideBg");
}

// define default values, so we don't have to calculate it for the first guess (because the output is the same)
function defaultValues() {
    const preCalcWord = ["tares", "lares", "rales", "rates", "teras"];
    const preCalcValue = [6.19, 6.15, 6.11, 6.1, 6.08];
    for(let i = 0; i < displayedList; i++) {
        algoSpan[i].innerText = preCalcWord[i] + "\n" + preCalcValue[i];
    }
}
defaultValues();

// run the algorithm when user enters a valid guess and filterWords have been executed
async function runAlgorithm() {
    await waitTime(600);
    if(callAlgo[5]) {
        informationEntropy();
        callAlgo[5] = false;
    }
}
document.addEventListener('keyup', runAlgorithm);
document.addEventListener('click', runAlgorithm);