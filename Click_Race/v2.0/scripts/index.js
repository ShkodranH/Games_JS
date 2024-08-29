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
let numOfPlayer, interaction, startTime, players, carAnimation;

// Resetting players data for new game
function restartGame() {
    players = [
        { name: 'green', distance: startPos, speed: 0, time: 0, finished: false, key: 'q' },
        { name: 'blue', distance: startPos, speed: 0, time: 0, finished: false, key: 'p' },
        { name: 'red', distance: startPos, speed: 0, time: 0, finished: false, key: 'x' },
        { name: 'yellow', distance: startPos, speed: 0, time: 0, finished: false, key: 'm' },
    ];
    startTime = 0;
    [dashboardNameElem, dashboardResultElem].forEach(e => e.forEach(i => i.innerText = ''));
    setNumOfPlayers();
    setUserInteraction();
}
restartGame();

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
        if(e.target.className === players[i].name && !players[i].finished) {
            players[i].speed = (players[i].speed + 0.05) * 1.15;
            checkPlayerDistance(i);
        }
    }
}
function keyboardInputs(e) {
    if(e.repeat) return;
    for(let i = 0; i < players.length; i++) {
        if(e.key.toLowerCase() === players[i].key && !players[i].finished) {
            players[i].speed = (players[i].speed + 0.05) * 1.15;
            checkPlayerDistance(i);
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

// Each player who has not pressed the button, increases their time by 1ms
function updatePlayerPosition() {
    for(let i = 0; i < players.length; i++) {
        players[i].distance += players[i].speed;
        playerCars[i].style.marginLeft = `${players[i].distance}%`;
        players[i].speed *= 0.97;
    }
}
// Check if player has reached the finish line
function checkPlayerDistance(index) {
    if(players[index].distance >= finishPos) {
        finishAudio.play();
        players[index] = { ...players[index], finished: true, time: startTime };
    }
}

// Start the game and let player race
async function startGame() {
    countdownAudio.play();
    await new Promise(resolve => setTimeout(resolve, 4000));
    changeScene('.bg', '.stage', 'flex');
    enableInputs();
    carAnimation = setInterval(() => {
        updatePlayerPosition();
        stopGame();
        startTime += 2;
    }, 20);
}
// Stop the game if every player has pressed the button
async function stopGame() {
    if(players.every(e => e.finished) || startTime == 3000) {
        disableInputs();
        await new Promise(resolve => setTimeout(resolve, 2000));
        clearInterval(carAnimation);
        drawScore();
        winAudio.play();
        changeScene('.stage', '.finish');
    }
}

// Calculate the margin and display the winner and the dashboard!
function showWinner() {
    players.sort((a, b) => a.time - b.time);

    if(players[0].time == players[1].time)
        winnerElem.innerText = `It's draw`;
    else
        winnerElem.innerText = `${players[0].name} wins`;
}
function drawScore() {
    showWinner();
    for(let i = 0; i < numOfPlayer; i++) {
        dashboardNameElem[i].innerText = players[i].name;
        dashboardResultElem[i].innerText = `${(players[i].time / 100).toFixed(2)}`;
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