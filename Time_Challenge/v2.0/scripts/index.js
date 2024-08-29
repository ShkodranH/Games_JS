const timeElem = document.querySelectorAll('.time p');
const playerElems = document.querySelectorAll('.stage [class*="player"]');
const playerTimerElems = Array.from(playerElems, e => e.querySelector('.body'));
const playerClockElems = Array.from(playerElems, e => e.querySelector('.clock'));
const playerClockBtns = Array.from(playerElems, e => e.querySelector('.button'));
const playerBtns = Array.from(playerElems, e => e.querySelector('button'));
const playBtn = document.querySelector('.play-btn');
const settingsBtn = document.querySelector('.settings-btn');
const closeSettingsBtn = document.querySelector('.close-settings');
const finishBtn = document.querySelector('.finish-btn');
const winnerElem = document.querySelector('.finish h1');
const dashboardNameElem = document.querySelectorAll('.player-info .name');
const dashboardTimeElem = document.querySelectorAll('.player-info .time');
const dashboardResultElem = document.querySelectorAll('.player-info .result');
const dashboardMarginElem = document.querySelectorAll('.player-info .margin');
const clickableElems = document.querySelectorAll('button, [type="radio"]');

let numOfPlayer, interaction, setTimer, time, players;

function restartGame() {
    players = [
        { name: 'green', result: 0, margin: 0, stopedTimer: false, key: 'q' },
        { name: 'blue', result: 0, margin: 0, stopedTimer: false, key: 'p' },
        { name: 'red', result: 0, margin: 0, stopedTimer: false, key: 'x' },
        { name: 'yellow', result: 0, margin: 0, stopedTimer: false, key: 'm' },
    ];
    // Generate a random time between 5 and 25 seconds and round to 1/4 of a seconds
    time = Math.ceil(Math.random() * 2000 + 500);
    time -= time % 25;
    timeElem.forEach(e => displayTime(time, e));
    // Resetting players data
    playerClockBtns.forEach(e => e.classList.remove('pressed'));
    playerTimerElems.forEach(e => displayTime(0, e));
    [dashboardNameElem, dashboardTimeElem, dashboardResultElem, dashboardMarginElem]
        .forEach(e => e.forEach(i => i.innerText = ''));
    setNumOfPlayers();
    setUserInteraction();
}
restartGame();

const clickAudio = new Audio("./sound-effects/click.ogg");
const revealAudio = new Audio("./sound-effects/reveal.wav");
const winAudio = new Audio("./sound-effects/win.ogg");

function changeScene(prev, next, action) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = action;
}
// Get player interaction type (touchscreen or keyboard) and adapt the game
function interactionSettings(displayVal, colorVal, rotateDeg) {
    timeElem[0].style.display = displayVal;
    playerBtns.forEach(e => e.style.color = colorVal);
    [playerClockElems[0], playerClockElems[1]].forEach(e => e.style.rotate = rotateDeg);
}
function setUserInteraction() {
    interaction = document.querySelector('.interaction input:checked').value;
    if(interaction === 'touchscreen') interactionSettings('block', 'transparent', '180deg');
    else interactionSettings('none', 'unset', '0deg');
}
// Get the number of players and display their assets
function hidePlayer(index) {
    playerElems[index].style.visibility = 'hidden';
    players[index] = { ...players[index], stopedTimer: true, margin: 3000 };
}
function setNumOfPlayers() {
    playerElems.forEach(e => e.style.visibility = 'visible');
    players.forEach(e => (e.result = 0, e.margin = 0, e.stopedTimer = false));

    numOfPlayer = document.querySelector('.num-of-players input:checked').value;
    if(numOfPlayer < 4) hidePlayer(0);
    if(numOfPlayer < 3) hidePlayer(3);
}

// Handling player inputs
function touchInputs(e) {
    for(let i = 0; i < players.length; i++) {
        if(e.target.className === players[i].name) {
            players[i].stopedTimer = true;
            playerClockBtns[i].classList.add('pressed');
        }
    }
}
function keyboardInputs(e) {
    for(let i = 0; i < players.length; i++) {
        if(e.key.toLowerCase() === players[i].key) {
            players[i].stopedTimer = true;
            playerClockBtns[i].classList.add('pressed');
        }
    }
}
function enableInputs() {
    if(interaction === 'touchscreen')
        playerBtns.forEach(e => e.addEventListener('touchstart', touchInputs));
    else
        document.addEventListener('keydown', keyboardInputs);
}
function disableInputs() {
    playerBtns.forEach(e => e.removeEventListener('touchstart', touchInputs));
    document.removeEventListener('keydown', keyboardInputs);
}

// Format time from numeric value to ss:SS format
function displayTime(timeVal, elem) {
    let sec = Math.floor(timeVal / 100).toString().padStart(2, '0');
    let micro = (timeVal % 100).toString().padStart(2, '0');
    elem.innerText = `${sec}:${micro}`;
}
// Each player who has not pressed the button, increases their time by 1ms
function updatePlayerTimer() {
    for(let i = 0; i < players.length; i++) {
        if(!players[i].stopedTimer)
            displayTime(++players[i].result, playerTimerElems[i]);
    }
}

// Start the game by starting the stopwatches and enabling the inputs
async function startGame() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    playerTimerElems.forEach(e => e.classList.replace('fade-in', 'fade-out'));
    enableInputs();
    setTimer = setInterval(() => {
        updatePlayerTimer();
        stopGame();
    }, 10);
}
// Stop the game if every player has pressed the button
async function stopGame() {
    if(players.every(e => e.stopedTimer) || players.some(e => e.result == 3000)) {
        clearInterval(setTimer);
        disableInputs();
        playerTimerElems.forEach(e => e.classList.replace('fade-out' ,'fade-in'));
        drawScore();
        revealAudio.play();
        await new Promise(resolve => setTimeout(resolve, 2000));
        winAudio.play();
        changeScene('.stage', '.finish', 'flex');
    }
}

// Calculate the margin and display the winner and the dashboard!
function calculateMargin() {
    for(let i of players)
        i.margin += Math.abs(i.result - time);
    players.sort((a, b) => a.margin - b.margin);
}
function showWinner() {
    if(players[0].margin == players[1].margin)
        winnerElem.innerText = `It's draw`;
    else
        winnerElem.innerText = `${players[0].name} wins`
}
function drawScore() {
    calculateMargin();
    showWinner();
    for(let i = 0; i < numOfPlayer; i++) {
        dashboardNameElem[i].innerText = players[i].name;
        displayTime(time, dashboardTimeElem[i]);
        displayTime(players[i].result, dashboardResultElem[i]);
        displayTime(players[i].margin, dashboardMarginElem[i]);
    }
}
playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage', 'grid');
    startGame();
});
settingsBtn.addEventListener('click', () => {
    changeScene('.intro', '.settings', 'flex');
});
closeSettingsBtn.addEventListener('click', () => {
    changeScene('.settings', '.intro', 'flex');
    setNumOfPlayers();
    setUserInteraction();
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro', 'flex');
    restartGame();
});
clickableElems.forEach(e => e.addEventListener('click', () => clickAudio.play()));