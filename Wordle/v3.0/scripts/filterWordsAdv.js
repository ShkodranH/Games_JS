// import the list of answers
import { possibleAnswers } from './../data/answers.js';
import { gameboardValues } from './game.js';
import { wordsLength, waitTime } from './index.js';

// create a new array which will contain only words not eliminated so far
export let matchedAnswers = [...possibleAnswers];
let algoCounter = 0;

// remove the words that don't match the final answer
export function filterWordsAdv() {
    for(let i = 0, len = matchedAnswers.length; i < len; i++) {
        for(let j = 0; j < wordsLength; j++) {
            // eliminate all words which contain letters not present in the answer 
            if(gameboardValues[algoCounter].pattern[j] === 0) {
                if(matchedAnswers[i].includes(gameboardValues[algoCounter].values[j])) {
                    matchedAnswers[i] =  '';
                }
            }
            // eliminate all words which don't have this letter in this position
            else if(gameboardValues[algoCounter].pattern[j] === 2) {
                if(matchedAnswers[i][j] !== gameboardValues[algoCounter].values[j]) {
                    matchedAnswers[i] = '';
                }
            }
            // eliminate all words which don't contain this letter or which have this letter in this position
            else {
                if (!matchedAnswers[i].includes(gameboardValues[algoCounter].values[j])) {
                    matchedAnswers[i] = '';
                }
                if(matchedAnswers[i][j] === gameboardValues[algoCounter].values[j]) {
                    matchedAnswers[i] = '';
                }
            }
        }
    }
    // remove the empty strings, created by the filter
    matchedAnswers = matchedAnswers.filter(e => e !== '');
    algoCounter++;
}

// run the algorithm when user enter a valid guess
function runAlgorithm() {
    if(callAlgo[1]) {
        filterWordsAdv();
        callAlgo[6] = true;
        callAlgo[1] = false;
    }
}
document.addEventListener('keyup', runAlgorithm);
document.addEventListener('click', runAlgorithm);