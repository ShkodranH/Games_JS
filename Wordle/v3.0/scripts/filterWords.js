// import the list of words
import { possibleWords } from './../data/words.js';
import { gameboardValues } from './game.js';
import { wordsLength, numberOfTries, displayedList, waitTime } from './index.js';

// create a new array which will contain only words not eliminated so far
export let matchedWords = [...possibleWords];
export let algoCounter = 0;

// remove the words that don't match the final answer
function filterWords() {
    for(let i = 0, len = matchedWords.length; i < len; i++) {
        for(let j = 0; j < wordsLength; j++) {
            // eliminate all words which contain letters not present in the answer 
            if(gameboardValues[algoCounter].pattern[j] === 0) {
                if(matchedWords[i].includes(gameboardValues[algoCounter].values[j])) {
                    matchedWords[i] =  '';
                }
            }
            // eliminate all words which don't have this letter in this position
            else if(gameboardValues[algoCounter].pattern[j] === 2) {
                if(matchedWords[i][j] !== gameboardValues[algoCounter].values[j]) {
                    matchedWords[i] = '';
                }
            }
            // eliminate all words which don't contain this letter or which have this letter in this position
            else {
                if (!matchedWords[i].includes(gameboardValues[algoCounter].values[j])) {
                    matchedWords[i] = '';
                }
                if(matchedWords[i][j] === gameboardValues[algoCounter].values[j]) {
                    matchedWords[i] = '';
                }
            }
        }
    }
    // remove the empty strings, created by the filter
    matchedWords = matchedWords.filter(e => e !== '');
    algoCounter++;
}

// display optimal words processed by the algorithm
async function displayWords() {
    // display the information we are left after each guess
    let posibilities = matchedWords.length;
    let uncertainty = Math.log2(posibilities).toFixed(2);
    let currentInfo = document.querySelectorAll("#availableInfo span");
    if(algoCounter !== numberOfTries) {
        currentInfo[algoCounter].innerText = posibilities + " words / " + uncertainty + " bits";
    }

    let algoSpan = document.querySelectorAll("#filterWords span");
    for(let i = 0; i < displayedList; i++) {
        algoSpan[i].innerText = "";
    }
    // display all optimal words, or if there are more than 5, display the first 5 ones
    let n = (matchedWords.length >= displayedList) ? displayedList : matchedWords.length;
    for(let j = 0; j < n; j++) {
        algoSpan[j].innerText = matchedWords[j];
    }
    // display the progress of the execution of the algorithm
    algoSpan[displayedList].classList.add("fillDiv");
    await waitTime(300);
    algoSpan[displayedList].style.width = 100 + "%";
    algoSpan[displayedList].classList.remove("fillDiv");
    algoSpan[displayedList].classList.add("hideBg");
    await waitTime(200);
    algoSpan[displayedList].style.width = 0;
    algoSpan[displayedList].classList.remove("hideBg");
}
displayWords();

// run the algorithm when user enter a valid guess
function runAlgorithm() {
    if(callAlgo[0]) {
        filterWords();
        displayWords();
        callAlgo.fill(true, 1, 6);
        callAlgo[0] = false;
    }
}
document.addEventListener('keyup', runAlgorithm);
document.addEventListener('click', runAlgorithm);