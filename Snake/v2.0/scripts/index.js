const startBtn = document.querySelector('.start-btn');
const scoreElem = document.querySelector('.score');
const finalScoreElem = document.querySelector('.final-score');
const finishBtn = document.querySelector('.finish-btn');
const settingsBtn = document.querySelector('.settings-btn');
const closeSettingsBtn = document.querySelector('.close-settings');
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.height = 500;
let score;

const clickAudio = new Audio("./sound-effects/click.mp3");
const winAudio = new Audio("./sound-effects/win.wav");
const loseAudio = new Audio("./sound-effects/lose.wav");

// Check which level of difficulty has player selected
function gameSettings() {
    levelSelected = document.querySelector('.settings input:checked');
    numOfQuestions = levelSelected.dataset.question;
    timer = levelSelected.dataset.time;
}

function changeScene(prev, next) {
    clickAudio.play();
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

function scoreBonus() {
    score += timer * levelSelected.dataset.bonus;
    scoreElem.innerHTML = "Score: " + score;
}

function gameEnd(message) {
    changeScene('.stage', '.finish');
    finalScoreElem.innerHTML = "Score: " + score;
    messageElem.innerHTML = message;
    clearInterval(timeCount);
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
});
document.addEventListener('click', () => clickAudio.play());




// let size = 15;
// let unit = canvas.width / size;
// let score = 0;
// let snake = [];
// let direction;
// let food;

// snake[0] = {
//     posX: Math.floor(size / 2) * unit,
//     posY: Math.floor(size / 2) * unit
// }

// function generateFood() {
//     food = {
//         posX: Math.floor(Math.random() * size) * unit,
//         posY: Math.floor(Math.random() * size) * unit
//     }
// }
// generateFood();


// const snakeImg = new Image();
// snakeImg.src = "./images/snakeHead0.png";

// document.addEventListener("keydown", event => {
//     if(event.key === "ArrowLeft" && direction !== "right") {
//         direction = "left";
//         snakeImg.src = "./images/snakeHead3.png";
//     }
//     else if(event.key === "ArrowRight" && direction !== "left") {
//         direction = "right";
//         snakeImg.src = "./images/snakeHead1.png";
//     }
//     else if(event.key === "ArrowUp" && direction !== "down") {
//         direction = "up";
//         snakeImg.src = "./images/snakeHead2.png";
//     }
//     else if(event.key === "ArrowDown" && direction !== "up") {
//         direction = "down";
//         snakeImg.src = "./images/snakeHead0.png";
//     }
// });

// function drawSnake() {
//     for(let i = 0; i < snake.length; i++) {
//         if(i === 0) {
//             // rotate(90);
//             ctx.drawImage(snakeImg, snake[0].posX, snake[0].posY, unit, unit);
//         }
//         else {
//             ctx.fillStyle = "lightgreen";
//             ctx.fillRect(snake[i].posX, snake[i].posY, unit, unit);
//         }
//     }
// }

// function rotate(degrees) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.save();
//     ctx.translate(canvas.width / 2, canvas.height / 2);
//     ctx.rotate(degrees * Math.PI / 180);
//     ctx.drawImage(snakeImg, snake[0].posX, snake[0].posY, unit, unit);
//     ctx.restore();
// }

// const appleImg = new Image();
// appleImg.src = "./images/apple.png";

// function drawFood() {
//     ctx.drawImage(appleImg, food.posX, food.posY, unit, unit);
// }

// let snakeHeadPosX = snake[0].posX;
// let snakeHeadPosY = snake[0].posY;

// function moveSnake() {
//     if(direction === "left") 
//         snakeHeadPosX -= unit;
//     else if(direction === "right") 
//         snakeHeadPosX += unit;
//     else if(direction === "up") 
//         snakeHeadPosY -= unit;
//     else if(direction === "down") 
//         snakeHeadPosY += unit;
    
//     snake.unshift({
//         posX: snakeHeadPosX,
//         posY: snakeHeadPosY
//     });
// }

// function collectFood() {
//     if(snakeHeadPosX === food.posX && snakeHeadPosY === food.posY) {
//         generateFood();
//     } 
//     else {
//         snake.pop();
//     }
// }

// function headCollision() {
//     for(let i = 1; i < snake.length; i++) {
//         if(snakeHeadPosX === snake[i].posX && snakeHeadPosY === snake[i].posY) {
//             return true;
//         }
//     }
//     return false;
// }

// function wallCollision() {
//     if(snakeHeadPosX < 0 || snakeHeadPosX > canvas.width - unit || 
//         snakeHeadPosY < 0 || snakeHeadPosY > canvas.height - unit) {
//         return true;
//     }
//     return false;
// }

// function playGame() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawSnake();
//     drawFood();
//     moveSnake();
//     collectFood();

//     if(headCollision() || wallCollision())
//         clearInterval(speed)
// }

// let speed = setInterval(playGame, 100);