const startBtn = document.querySelector('.start-btn');
const timeElem = document.querySelector('.time');
const questionNumElem = document.querySelector('.question-number');
const scoreElem = document.querySelector('.score');
const questionElem = document.querySelector('.question');
const optionsElem = document.querySelectorAll('.options button');
const messageElem = document.querySelector('.message');
const finalScoreElem = document.querySelector('.final-score');
const finishBtn = document.querySelector('.finish-btn');
const infoBtn = document.querySelector('.info-btn');
const closeInfoBtn = document.querySelector('.close-info-btn');
const settingsBtn = document.querySelector('.settings-btn');
const closeSettingsBtn = document.querySelector('.close-settings-btn');


function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

startBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
});

infoBtn.addEventListener('click', () => {
    changeScene('.intro', '.info');
});
closeInfoBtn.addEventListener('click', () => {
    changeScene('.info', '.intro');
});
settingsBtn.addEventListener('click', () => {
    changeScene('.intro', '.settings');
});
closeSettingsBtn.addEventListener('click', () => {
    changeScene('.settings', '.intro');
});