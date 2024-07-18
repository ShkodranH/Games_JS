import { possibleWords } from "./words-data.js";
import { possibleAnswers } from "./answers-data.js";

const gameboard = document.querySelector('.gameboard');
const keyboard = document.querySelector('.keyboard');
const playBtn = document.querySelector('.play-btn');
const infoBtn = document.querySelector('.info-btn');
const settingsBtn = document.querySelector('.settings-btn');
const closeInfo = document.querySelector('.close-info');
const closeSettings = document.querySelector('.close-settings');
const finishBtn = document.querySelector('.finish-btn');

// document.querySelector(':root').style.setProperty('--primary', '#333');

// Choose a random word as answer
const randomSelect = Math.floor(Math.random() * possibleAnswers.length);
const answer = possibleAnswers[randomSelect];



function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
});

infoBtn.addEventListener('click', () => {
    changeScene('.intro', '.info');
});
closeInfo.addEventListener('click', () => {
    changeScene('.info', '.intro');
});
settingsBtn.addEventListener('click', () => {
    changeScene('.intro', '.settings');
});
closeSettings.addEventListener('click', () => {
    changeScene('.settings', '.intro');
});