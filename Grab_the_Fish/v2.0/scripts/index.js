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
let stopFishGeneration = true;
let numOfPlayer, interaction, players, fishTypes, displayFish, fishIndex;

const clickAudio = new Audio("./sound-effects/click.ogg");
const correctAudio = new Audio('./sound-effects/correct.wav');
const wrongAudio = new Audio("./sound-effects/wrong.wav");
const winAudio = new Audio("./sound-effects/win.ogg");

// Resetting players data for new game
function restartGame() {
    players = [
        { name: 'gray', points: 0, hidden: false, key: 'q' },
        { name: 'brown', points: 0, hidden: false, key: 'p' },
        { name: 'black', points: 0, hidden: false, key: 'x' },
        { name: 'orange', points: 0, hidden: false, key: 'm' }
    ];
    fishTypes = [
        { src: './images/fish.png', points: 1, audio: correctAudio },
        { src: './images/fish-2.png', points: 2, audio: correctAudio },
        { src: './images/fishbone.png', points: -2, audio: wrongAudio }
    ];
    [dashboardNameElem, dashboardResultElem].forEach(e => e.forEach(i => i.innerText = ''));
    playerPointsElems.forEach(e => e.innerText = 0);
    setNumOfPlayers();
    setUserInteraction();
}
restartGame();

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
    players[index] = { ...players[index], points: -99, hidden: true };
}
function setNumOfPlayers() {
    [playerBtns, playerPointsElems, playerPaws].forEach(e => e.forEach(i => i.style.visibility = 'visible'));
    players.forEach(e => (e.points = 0, e.hidden = false));

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

// Generate a random fish every 2-5 seconds
async function generateFish() {
    if(stopFishGeneration) return;

    fishIndex = Math.floor(Math.random() * fishTypes.length);
    let timeInterval = Math.floor(Math.random() * 3000) + 2000;
    
    plateFishImg.src = fishTypes[fishIndex].src;
    plateFishImg.style.display = 'block';
    await new Promise(resolve => setTimeout(resolve, 800));
    plateFishImg.style.display = 'none';

    clearInterval(displayFish);
    displayFish = setInterval(generateFish, timeInterval);
}
displayFish = setInterval(generateFish, 4000);

// Add the animation of the paw and remove the fish if the player catches it
async function catchFish(index) {
    let animClass = `${players[index].name}-paw-anim`;

    if(!playerPaws[index].classList.contains(animClass)) {
        playerPaws[index].classList.add(animClass);

        if(plateFishImg.style.display === 'block') {
            plateFishImg.style.display = 'none';
            updatePlayerPoints(index);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        playerPaws[index].classList.remove(animClass);
    }
}
// Update player points and display them each time a fish is caught
function updatePlayerPoints(i) {
    players[i].points += fishTypes[fishIndex].points;
    playerPointsElems[i].innerText = players[i].points;
    fishTypes[fishIndex].audio.play();
    stopGame();
}

// Start the game and let player duel
function startGame() {
    enableInputs();
    stopFishGeneration = false;
}
// Stop the game if any player has scored 5 points
async function stopGame() {
    if(players.some(e => e.points >= 5)) {
        disableInputs();
        drawScore();
        stopFishGeneration = true;
        await new Promise(resolve => setTimeout(resolve, 1000));
        winAudio.play();
        changeScene('.stage', '.finish');
    }
}
// Calculate the score and display it on the dashboard
function drawScore() {
    players.sort((a, b) => b.points - a.points);
    winnerElem.innerText = `${players[0].name} wins`;

    for(let i = 0; i < numOfPlayer; i++) {
        dashboardNameElem[i].innerText = players[i].name;
        dashboardResultElem[i].innerText = players[i].points;
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