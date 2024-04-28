// import the list of words
import { possibleWords } from './../data/words.js';
import { counter } from './game.js';
import { matchedWords } from './filterWords.js';
import { wordsLength, numberOfTries, displayedList, waitTime } from './index.js';

// declare a variable where will be store the best words chosen by algorithm
let bestWord = [];

async function predefineWords() {
    let bestFiveWord = '';
    let uniqueWords = [];
    let uniqueLetter = [];
    // remove all words that have duplicate letters eg. happy, remaining words save in uniqueWords array 
    for(let i = 0, len = possibleWords.length; i < len; i++) {
        for(let j = 0; j < wordsLength; j++) {
            if(!uniqueLetter.includes(possibleWords[i][j])) {
                uniqueLetter.push(possibleWords[i][j]);
            }
        }
        if(uniqueLetter.length === wordsLength) {
            uniqueWords.push(possibleWords[i]);
        }
        uniqueLetter = [];
    }

    let maxValue = 0;
    let numberOfLetters = 0;
    let uniquenessValue = 0;
    let requiredValue = 5;
    let percent = Math.floor(uniqueWords.length / 100);
    let progress = 0;
    // iterate throught all unique words
    for(let h = 0, len = uniqueWords.length; h < len; h++) {
        for(let i = h, len = uniqueWords.length + h; i < len; i++) {
            let i2 = i % uniqueWords.length;
            //count the number of new letters of next word that aren't in the bestFiveWord variable
            for(let j = 0; j < wordsLength; j++) {
                if(!bestFiveWord.includes(uniqueWords[i2][j])) {
                    uniquenessValue++;
                }
            }
            // if the word doesn't contain any of the letter of bestFiveWord (requiredValue = 5), add the word to bestFiveWord
            if(uniquenessValue === requiredValue) {
                bestFiveWord += uniqueWords[i2];
                numberOfLetters += requiredValue;
            }
            uniquenessValue = 0;
        }
        // if we couldn't find 5 words whith this criteria then redo the iteration and decrease requiredValue
        if(bestFiveWord.length < wordsLength * 5) {
            requiredValue--;
            h--;
        }
        // otherwise we trim the variable to only five words and find the bestFiveWords with the most unique letters
        else {
            if(bestFiveWord.length > wordsLength * 5) {
                let substractValue = (bestFiveWord.length - wordsLength * 5) / wordsLength * requiredValue;
                bestFiveWord = bestFiveWord.slice(0, wordsLength * 5);
                numberOfLetters -= substractValue;
            }
            if(numberOfLetters > maxValue) {
                maxValue = numberOfLetters;
                for(let k = 0; k < numberOfTries-1; k++) {
                    bestWord[k] = bestFiveWord.slice(k * wordsLength, (k+1) * wordsLength);
                }
            }
            numberOfLetters = 0;
            bestFiveWord = '';
            requiredValue = 5;

            if(h % percent === 0) {
                await waitTime(0);
                progress++;
                algoSpan[displayedList].style.width = progress + "%";
            }
        }
    }
    bestWord.sort();
    for(let j = 0; j < bestWord.length; j++) {
        algoSpan[j].innerText = bestWord[j];
    }  
    algoSpan[displayedList].classList.add("hideBg");
    await waitTime(200);
    algoSpan[displayedList].style.width = 0;
    algoSpan[displayedList].classList.remove("hideBg");
}

let algoSpan = document.querySelectorAll("#predefineWords span");

for(let j = 0; j < displayedList; j++) {
    algoSpan[j].innerText = "-----";
} 
setTimeout(() => {
    predefineWords();
}, 500)

// display best words processed by the algorithm
async function displayWords() {
    for(let i = 0; i < displayedList; i++) {
        algoSpan[i].innerText = "";
    }
    if(counter > 3 || matchedWords.length === 1) {
        let n = (matchedWords.length >= displayedList) ? displayedList : matchedWords.length;
        for(let j = 0; j < n; j++) {
            algoSpan[j].innerText = matchedWords[j];
        }
    }
    else {
        for(let j = 0; j < bestWord.length; j++) {
            algoSpan[j].innerText = bestWord[j];
        }
    }
    // display the progress of the execution of the algorithm
    algoSpan[displayedList].classList.add("fillDiv");
    await waitTime(300)
    algoSpan[displayedList].style.width = 100 + "%";
    algoSpan[displayedList].classList.remove("fillDiv");
    algoSpan[displayedList].classList.add("hideBg");
    await waitTime(200);
    algoSpan[displayedList].style.width = 0;
    algoSpan[displayedList].classList.remove("hideBg");
}

// run only the display because the algorithm needs to run only once
function runAlgorithm() {
    if(callAlgo[2]) {
        displayWords();
        callAlgo[2] = false;
    }
}
document.addEventListener('keyup', runAlgorithm);
document.addEventListener('click', runAlgorithm);