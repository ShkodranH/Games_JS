const playerBtns = document.querySelectorAll('.players-controls button');
const playerPointsElems = document.querySelectorAll('.players-controls span');
const playerPaws = document.querySelectorAll('.players-paw img');
const plateFishImg = document.querySelector('.food img');
const playBtn = document.querySelector('.play-btn');
const settingsBtn = document.querySelector('.settings-btn');
const closeSettingsBtn = document.querySelector('.close-settings');
const finishBtn = document.querySelector('.finish-btn');
const winnerElem = document.querySelector('.finish h1');
const dashboardNameElem = document.querySelectorAll('.player-info .name');
const dashboardResultElem = document.querySelectorAll('.player-info .result');
const clickableElems = document.querySelectorAll(':not(.players-controls div) > button, [type="radio"]');

const winPoints = 5;
let numOfPlayer, interaction, players, fishTypes;

// Resetting players data for new game
function restartGame() {
    players = [
        { name: 'gray', points: 0, hidden: false, key: 'q' },
        { name: 'brown', points: 0, hidden: false, key: 'p' },
        { name: 'black', points: 0, hidden: false, key: 'x' },
        { name: 'orange', points: 0, hidden: false, key: 'm' },
    ];
    fishTypes = [
        { src: './images/fish.png', points: 1 },
        { src: './images/fish-2.png', points: 2 },
        { src: './images/fishbone.png', points: -2 },
    ];
    [dashboardNameElem, dashboardResultElem].forEach(e => e.forEach(i => i.innerText = ''));
    setNumOfPlayers();
    setUserInteraction();
    // updatePlayerPoints();
}
restartGame();
enableInputs();

const clickAudio = new Audio("./sound-effects/click.ogg");
const countdownAudio = new Audio('./sound-effects/countdown.wav');
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
    [playerBtns, playerPointsElems, playerPaws].forEach(e => e[index].style.visibility = 'hidden');
    players[index].hidden = true;
}
function setNumOfPlayers() {
    [playerBtns, playerPointsElems, playerPaws].forEach(e => e.forEach(i => i.style.visibility = 'visible'));
    players.forEach(e => e.hidden = false);

    numOfPlayer = document.querySelector('.num-of-players input:checked').value;
    if(numOfPlayer < 4) hidePlayer(0);
    if(numOfPlayer < 3) hidePlayer(3);
}

// Handling player inputs
function touchInputs(e) {
    for(let i = 0; i < players.length; i++) {
        if(e.target.className === players[i].name && !players[i].hidden)
            catchFish(i);
    }
}
function keyboardInputs(e) {
    for(let i = 0; i < players.length; i++) {
        if(e.key.toLowerCase() === players[i].key && !players[i].hidden)
            catchFish(i);
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

let displayFish = setInterval(generateFish, 4000);
let fishIndex;
// Generate a random fish every 1-5 seconds
async function generateFish() {
    fishIndex = Math.floor(Math.random() * fishTypes.length);
    let timeInterval = Math.floor(Math.random() * 4000) + 1000;
    plateFishImg.src = fishTypes[fishIndex].src;
    plateFishImg.style.display = 'block';
    await new Promise(resolve => setTimeout(resolve, 800));
    plateFishImg.style.display = 'none';
    clearInterval(displayFish);
    displayFish = setInterval(generateFish, timeInterval);
}
// Check if player has reached the finish line
function checkPlayerDistance(index) {
    if(players[index].distance >= finishPos) {
        const finishAudio = new Audio("./sound-effects/finish.wav");
        finishAudio.play();
        players[index] = { ...players[index], finished: true, time: startTime };
    }
}
// Each player who has not pressed the button, increases their time by 1ms
function updatePlayerPoints() {
    for(let i = 0; i < players.length; i++) {
        players[i].distance += players[i].speed;
        playerCars[i].style.marginLeft = `${players[i].distance}%`;
        players[i].speed *= 0.97;
    }
}

async function catchFish(index) {
    let animClass = `${players[index].name}-anim`;
    if(!playerPaws[index].classList.contains(animClass)) {
        playerPaws[index].classList.add(animClass);
        
        if(plateFishImg.style.display === 'block') {
            players[index].points += fishTypes[fishIndex].points;
            plateFishImg.style.display = 'none';
            playerPointsElems[index].innerText = players[index].points;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        playerPaws[index].classList.remove(animClass);
    }
}

// Start the game and let player race
// async function playGame() {
//     enableInputs();
//     updatePlayerPosition();
//     stopGame();
// }

// Stop the game if every player has arrived at the finish line or the time is up
async function stopGame() {
    if(players.some(e => e.result === 5)) {
        disableInputs();
        drawScore();
        winAudio.play();
        changeScene('.stage', '.finish');
    }
}

// Calculate the score and display it on the dashboard
function showWinner() {
    players.sort((a, b) => a.result - b.result);

    // if(players[0].time == players[1].time)
    //     winnerElem.innerText = `It's draw`;
    // else
        winnerElem.innerText = `${players[0].name} wins`;
}
function drawScore() {
    showWinner();
    for(let i = 0; i < numOfPlayer; i++) {
        dashboardNameElem[i].innerText = players[i].name;
        dashboardResultElem[i].innerText = players[i].result;
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