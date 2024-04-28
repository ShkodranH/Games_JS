var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var unit = 25;
var snake = [];

snake[0] = {
    x: 20 * unit,
    y: 13 * unit
}
var food = {
    x: Math.floor(Math.random() * 40) * unit,
    y: Math.floor(Math.random() * 26) * unit
}
var points = 0;
var d;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "right") {
        d = "left";
    }
    else if(event.keyCode == 38 && d != "down") {
        d = "up";
    }
    else if(event.keyCode == 39 && d != "left") {
        d = "right";
    }
    else if(event.keyCode == 40 && d != "up") {
        d = "down";
    }
}

function collision(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#629f13" : "#a2ef3d";
        ctx.fillRect(snake[i].x, snake[i].y, unit - 2, unit - 2);
        ctx.lineJoin = 'round';
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#629f13';
        ctx.strokeRect(snake[i].x, snake[i].y, unit - 2, unit - 2);
    }

    ctx.beginPath();
    ctx.arc(food.x + unit / 2, food.y + unit / 2, unit / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "left") snakeX -= unit;
    if(d == "up") snakeY -= unit;
    if(d == "right") snakeX += unit;
    if(d == "down") snakeY += unit;

    if(snakeX == food.x && snakeY == food.y) {
        points++;
        food = {
            x: Math.floor(Math.random() * 40) * unit,
            y: Math.floor(Math.random() * 26) * unit
        }
    }
    else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if(snakeX < 0 || snakeX > 39 * unit || snakeY < 0 || snakeY > 25 * unit ||
    collision(newHead, snake)) {
        clearInterval(game);
        setTimeout(function() {
            alert("You Lose");
            document.location.reload();
        }, 200);
    }

    snake.unshift(newHead);

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Points: " + points, 20, 30);
    
}

var game = setInterval(draw, 100);