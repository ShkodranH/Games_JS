const playerBtns = document.querySelectorAll('.players-btn button');
const playerCars = document.querySelectorAll('.players-car img');
const playBtn = document.querySelector('.play-btn');
const settingsBtn = document.querySelector('.settings-btn');
const closeSettingsBtn = document.querySelector('.close-settings');
const finishBtn = document.querySelector('.finish-btn');
const winnerElem = document.querySelector('.finish h1');
const dashboardNameElem = document.querySelectorAll('.player-info .name');
const dashboardResultElem = document.querySelectorAll('.player-info .result');
const clickableElems = document.querySelectorAll(':not(.players-btn) > button, [type="radio"]');

const startPos = 6, finishPos = 73;
let numOfPlayer, interaction, startTime, players;

// Resetting players data for new game
function restartGame() {
    players = [
        { name: 'green', distance: startPos, time: 0, finished: false, key: 'q' },
        { name: 'blue', distance: startPos, time: 0, finished: false, key: 'p' },
        { name: 'red', distance: startPos, time: 0, finished: false, key: 'x' },
        { name: 'yellow', distance: startPos, time: 0, finished: false, key: 'm' },
    ];
    startTime = Date.now();
    [dashboardNameElem, dashboardResultElem].forEach(e => e.forEach(i => i.innerText = ''));
    setNumOfPlayers();
    setUserInteraction();
}
restartGame();
// setInterval(() => console.log(((Date.now()-startTime)/1000).toFixed(2)), 1000)

const clickAudio = new Audio("./sound-effects/click.ogg");
const countdownAudio = new Audio('./sound-effects/countdown.wav');
const finishAudio = new Audio("./sound-effects/finish.wav");
const winAudio = new Audio("./sound-effects/win.ogg");

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}
// Get player interaction type (touchscreen or keyboard) and adapt the game accordingly
function setUserInteraction() {
    interaction = document.querySelector('.interaction input:checked').value;
    if(interaction === 'touchscreen') 
        playerBtns.forEach(e => e.style.color = 'transparent');
    else
        playerBtns.forEach(e => e.style.color = '');
}
// Get the number of players and display their assets
function hidePlayer(index) {
    [playerBtns, playerCars].forEach(e => e[index].style.visibility = 'hidden');
    players[index] = { ...players[index], finished: true, time: 3000 };
}
function setNumOfPlayers() {
    [playerBtns, playerCars].forEach(e => e.forEach(i => i.style.visibility = 'visible'));
    players.forEach(e => (e.distance = startPos, e.time = 0, e.finished = false));

    numOfPlayer = document.querySelector('.num-of-players input:checked').value;
    if(numOfPlayer < 4) hidePlayer(0);
    if(numOfPlayer < 3) hidePlayer(3);
}

// Handling player inputs
function touchInputs(e) {
    for(let i = 0; i < players.length; i++) {
        if(e.target.className === players[i].name) {
            pushCar(i);
        }
    }
}
function keyboardInputs(e) {
    for(let i = 0; i < players.length; i++) {
        if(e.key.toLowerCase() === players[i].key) {
            pushCar(i);
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
// function displayTime(timeVal, elem) {
//     let sec = Math.floor(timeVal / 100).toString().padStart(2, '0');
//     let micro = (timeVal % 100).toString().padStart(2, '0');
//     elem.innerText = `${sec}:${micro}`;
// }
// Each player who has not pressed the button, increases their time by 1ms
// function updatePlayerTimer() {
//     for(let i = 0; i < players.length; i++) {
//         if(!players[i].finished)
//             displayTime(++players[i].time, playerTimerElems[i]);
//     }
// }

// Start the game by starting the stopwatches and enabling the inputs
async function startGame() {
    countdownAudio.play();
    await new Promise(resolve => setTimeout(resolve, 4000));
    changeScene('.bg', '.stage', 'flex');
    enableInputs();
    // setTimer = setInterval(() => {
    //     updatePlayerTimer();
    //     stopGame();
    // }, 10);
}
// Stop the game if every player has pressed the button
async function stopGame() {
    if(players.every(e => e.stopedTimer) || startTime == 3000) {
        // clearInterval(setTimer);
        disableInputs();
        drawScore();
        revealAudio.play();
        await new Promise(resolve => setTimeout(resolve, 2000));
        winAudio.play();
        changeScene('.stage', '.finish');
    }
}
function pushCar(index) {
    players[index].distance += 3;
    playerCars[index].style.marginLeft = `${players[index].distance}%`;
}

// Calculate the margin and display the winner and the dashboard!
function calculateMargin() {
    players.sort((a, b) => a.time - b.time);
}
function showWinner() {
    if(players[0].time == players[1].time)
        winnerElem.innerText = `It's draw`;
    else
        winnerElem.innerText = `${players[0].name} wins`
}
function drawScore() {
    calculateMargin();
    showWinner();
    for(let i = 0; i < numOfPlayer; i++) {
        dashboardNameElem[i].innerText = players[i].name;
        displayTime(players[i].time, dashboardResultElem[i]);
    }
}
playBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
    startGame();
});
settingsBtn.addEventListener('click', () => {
    changeScene('.intro', '.settings');
});
closeSettingsBtn.addEventListener('click', () => {
    changeScene('.settings', '.intro');
    setNumOfPlayers();
    setUserInteraction();
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    restartGame();
});
clickableElems.forEach(e => e.addEventListener('click', () => clickAudio.play()));