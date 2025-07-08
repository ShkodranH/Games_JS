const startBtn = document.querySelector('.start-btn');
const scoreElem = document.querySelector('.score');
const finalScoreElem = document.querySelector('.final-score');
const finishBtn = document.querySelector('.finish-btn');
const settingsBtn = document.querySelector('.settings-btn');
const closeSettingsBtn = document.querySelector('.close-settings');
const clickElems = document.querySelectorAll('button, input');
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.height = 450;
let gameInterval, snake, head, food, direction, nextDirection, score, modeSelected, speedSelected;
const gridNum = 18;
const unitSize = canvas.width / gridNum;
const foodPoint = 600;
const modeSettings = { classic: true, noWalls: false };
const speedSettings = { slow: 150, normal: 100, fast: 65 };

const clickAudio = new Audio("./sound-effects/click.ogg");
// const winAudio = new Audio("./sound-effects/win.wav");
// const loseAudio = new Audio("./sound-effects/lose.wav");

let appleImg = new Image(); appleImg.src = "./images/apple.png";

// Reseting game components for a new game
function restartGame() {
    clearInterval(gameInterval);
    gameInterval = setInterval(playGame, speedSettings[speedSelected]);
    direction = nextDirection = '';
    snake = [{
        posX: Math.floor(gridNum / 2) * unitSize,
        posY: Math.floor(gridNum / 2) * unitSize
    }];
    head = {...snake[0]};
    score = 0;
    scoreElem.innerHTML = "Score: " + score;
    generateFood();
}
// Check game settings that player has selected
function gameSettings() {
    modeSelected = document.querySelector('.game-mode input:checked').value;
    speedSelected = document.querySelector('.game-speed input:checked').value;
    restartGame();
}
gameSettings();

function changeScene(prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}
function isSamePosition(a, b) {
    return a.posX === b.posX && a.posY === b.posY;
}

// Draw the snake segments on the canvas
function drawSnake() {
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "#629f13" : "#a2ef3d";
        ctx.fillRect(snake[i].posX, snake[i].posY, unitSize, unitSize);
    }
}
// Move the snake by one block depending on the direction
function moveSnake() {
    direction = nextDirection;
    switch (direction) {
        case "left":  head.posX -= unitSize; break;
        case "right": head.posX += unitSize; break;
        case "up":    head.posY -= unitSize; break;
        case "down":  head.posY += unitSize; break;
    }
    if(!modeSettings[modeSelected]) wrapAround();
    snake.unshift({ ...head });
}

// Generate the food randomly on the canvas but not on top of the snake
function drawFood() {
    ctx.drawImage(appleImg, food.posX, food.posY, unitSize, unitSize);
}
function generateFood() {
    do { food = {
            posX: Math.floor(Math.random() * gridNum) * unitSize,
            posY: Math.floor(Math.random() * gridNum) * unitSize
        };
    } while (snake.some(e => isSamePosition(food, e)));
}

// Listen to the keyboard inputs for changing the direction
document.addEventListener("keydown", e => {
    if(["ArrowLeft", "a", "A"].includes(e.key) && direction !== "right")
        nextDirection = "left";
    else if(["ArrowRight", "d", "D"].includes(e.key) && direction !== "left")
        nextDirection = "right";
    else if(["ArrowUp", "w", "W"].includes(e.key) && direction !== "down")
        nextDirection = "up";
    else if(["ArrowDown", "s", "S"].includes(e.key) && direction !== "up")
        nextDirection = "down";
});

// Grow the snake and add the score when collecting the food
function collectFood() {
    if(isSamePosition(head, food)) {
        generateFood(); 
        scoreBonus();
    }
    else { 
        snake.pop(); 
    }
}
// Add the score points depending on the difficulty
function scoreBonus() {
    score += Math.floor(foodPoint / speedSettings[speedSelected]);
    scoreElem.innerHTML = "Score: " + score;
}

// Detect collision of snake with wall or with itself
function headCollision() {
    return snake.slice(1).some(e => isSamePosition(head, e));
}
function wallCollision() {
    return head.posX < 0 || head.posX > canvas.width - unitSize || 
           head.posY < 0 || head.posY > canvas.height - unitSize
}
// Wrap around the snake if no wall mode is selected
function wrapAround() {
    if(head.posX < 0) 
        head.posX = canvas.width - unitSize;
    else if(head.posX >= canvas.width) 
        head.posX = 0;

    if(head.posY < 0)
        head.posY = canvas.height - unitSize;
    else if(head.posY >= canvas.height) 
        head.posY = 0;
}

// Stop the game and display the final result
async function gameEnd() {
    clearInterval(gameInterval);
    await new Promise(resolve => setTimeout(resolve, 1000));
    changeScene('.stage', '.finish');
    finalScoreElem.innerHTML = "Score: " + score;
}
// Calling all the functions that should be executed during the game
function playGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawFood();
    collectFood();
    drawSnake();
    if(headCollision() || (wallCollision() && modeSettings[modeSelected]))
        gameEnd();
}

startBtn.addEventListener('click', () => {
    changeScene('.intro', '.stage');
});
finishBtn.addEventListener('click', () => {
    changeScene('.finish', '.intro');
    restartGame();
});
settingsBtn.addEventListener('click', () => {
    changeScene('.intro', '.settings');
});
closeSettingsBtn.addEventListener('click', () => {
    changeScene('.settings', '.intro');
    gameSettings();
});
clickElems.forEach(e => e.addEventListener('click', () => clickAudio.play()));


/////////////////////////////////////////////////////////

// let numOfPlayer, interaction, setTimer, time, players;

// function restartGame() {
//     players = [
//         { name: 'green', result: 0, margin: 0, stopedTimer: false, key: 'q' },
//         { name: 'blue', result: 0, margin: 0, stopedTimer: false, key: 'p' },
//         { name: 'red', result: 0, margin: 0, stopedTimer: false, key: 'x' },
//         { name: 'yellow', result: 0, margin: 0, stopedTimer: false, key: 'm' },
//     ];
//     // Generate a random time between 5 and 25 seconds and round to 1/4 of a seconds
//     time = Math.ceil(Math.random() * 2000 + 500);
//     time -= time % 25;
//     timeElem.forEach(e => displayTime(time, e));
//     // Resetting players data
//     playerClockBtns.forEach(e => e.classList.remove('pressed'));
//     playerTimerElems.forEach(e => displayTime(0, e));
//     [dashboardNameElem, dashboardTimeElem, dashboardResultElem, dashboardMarginElem]
//         .forEach(e => e.forEach(i => i.innerText = ''));
//     setNumOfPlayers();
//     setUserInteraction();
// }
// restartGame();

// const clickAudio = new Audio("./sound-effects/click.ogg");
// const revealAudio = new Audio("./sound-effects/reveal.wav");
// const winAudio = new Audio("./sound-effects/win.ogg");

// function changeScene(prev, next, action) {
//     document.querySelector(prev).style.display = 'none';
//     document.querySelector(next).style.display = action;
// }
// // Get player interaction type (touchscreen or keyboard) and adapt the game
// function interactionSettings(displayVal, colorVal, rotateDeg) {
//     timeElem[0].style.display = displayVal;
//     playerBtns.forEach(e => e.style.color = colorVal);
//     [playerClockElems[0], playerClockElems[1]].forEach(e => e.style.rotate = rotateDeg);
// }
// function setUserInteraction() {
//     interaction = document.querySelector('.interaction input:checked').value;
//     if(interaction === 'touchscreen') interactionSettings('block', 'transparent', '180deg');
//     else interactionSettings('none', 'unset', '0deg');
// }
// // Get the number of players and display their assets
// function hidePlayer(index) {
//     playerElems[index].style.visibility = 'hidden';
//     players[index] = { ...players[index], stopedTimer: true, margin: 3000 };
// }
// function setNumOfPlayers() {
//     playerElems.forEach(e => e.style.visibility = 'visible');
//     players.forEach(e => (e.result = 0, e.margin = 0, e.stopedTimer = false));

//     numOfPlayer = document.querySelector('.num-of-players input:checked').value;
//     if(numOfPlayer < 4) hidePlayer(0);
//     if(numOfPlayer < 3) hidePlayer(3);
// }

// // Handling player inputs
// function touchInputs(e) {
//     for(let i = 0; i < players.length; i++) {
//         if(e.target.className === players[i].name) {
//             players[i].stopedTimer = true;
//             playerClockBtns[i].classList.add('pressed');
//         }
//     }
// }
// function keyboardInputs(e) {
//     for(let i = 0; i < players.length; i++) {
//         if(e.key.toLowerCase() === players[i].key) {
//             players[i].stopedTimer = true;
//             playerClockBtns[i].classList.add('pressed');
//         }
//     }
// }
// function enableInputs() {
//     if(interaction === 'touchscreen')
//         playerBtns.forEach(e => e.addEventListener('touchstart', touchInputs));
//     else
//         document.addEventListener('keydown', keyboardInputs);
// }
// function disableInputs() {
//     playerBtns.forEach(e => e.removeEventListener('touchstart', touchInputs));
//     document.removeEventListener('keydown', keyboardInputs);
// }

// // Format time from numeric value to ss:SS format
// function displayTime(timeVal, elem) {
//     let sec = Math.floor(timeVal / 100).toString().padStart(2, '0');
//     let micro = (timeVal % 100).toString().padStart(2, '0');
//     elem.innerText = `${sec}:${micro}`;
// }
// // Each player who has not pressed the button, increases their time by 1ms
// function updatePlayerTimer() {
//     for(let i = 0; i < players.length; i++) {
//         if(!players[i].stopedTimer)
//             displayTime(++players[i].result, playerTimerElems[i]);
//     }
// }

// // Start the game by starting the stopwatches and enabling the inputs
// async function startGame() {
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     playerTimerElems.forEach(e => e.classList.replace('fade-in', 'fade-out'));
//     enableInputs();
//     setTimer = setInterval(() => {
//         updatePlayerTimer();
//         stopGame();
//     }, 10);
// }
// // Stop the game if every player has pressed the button
// async function stopGame() {
//     if(players.every(e => e.stopedTimer) || players.some(e => e.result == 3000)) {
//         clearInterval(setTimer);
//         disableInputs();
//         playerTimerElems.forEach(e => e.classList.replace('fade-out' ,'fade-in'));
//         drawScore();
//         revealAudio.play();
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         winAudio.play();
//         changeScene('.stage', '.finish', 'flex');
//     }
// }

// // Calculate the margin and display the winner and the dashboard!
// function calculateMargin() {
//     for(let i of players)
//         i.margin += Math.abs(i.result - time);
//     players.sort((a, b) => a.margin - b.margin);
// }
// function showWinner() {
//     if(players[0].margin == players[1].margin)
//         winnerElem.innerText = `It's draw`;
//     else
//         winnerElem.innerText = `${players[0].name} wins`
// }
// function drawScore() {
//     calculateMargin();
//     showWinner();
//     for(let i = 0; i < numOfPlayer; i++) {
//         dashboardNameElem[i].innerText = players[i].name;
//         displayTime(time, dashboardTimeElem[i]);
//         displayTime(players[i].result, dashboardResultElem[i]);
//         displayTime(players[i].margin, dashboardMarginElem[i]);
//     }
// }
// playBtn.addEventListener('click', () => {
//     changeScene('.intro', '.stage', 'grid');
//     startGame();
// });
// settingsBtn.addEventListener('click', () => {
//     changeScene('.intro', '.settings', 'flex');
// });
// closeSettingsBtn.addEventListener('click', () => {
//     changeScene('.settings', '.intro', 'flex');
//     setNumOfPlayers();
//     setUserInteraction();
// });
// finishBtn.addEventListener('click', () => {
//     changeScene('.finish', '.intro', 'flex');
//     restartGame();
// });
// clickableElems.forEach(e => e.addEventListener('click', () => clickAudio.play()));