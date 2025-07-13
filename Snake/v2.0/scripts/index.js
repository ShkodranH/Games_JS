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
    if(headCollision() || (wallCollision() && modeSettings[modeSelected]))
        console.log(head);gameEnd();
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