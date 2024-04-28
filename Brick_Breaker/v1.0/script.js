var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ballPosX = canvas.width / 2;
var ballPosY = canvas.height - 100;
var ballSpeedX = 4;
var ballSpeedY = -4;

var paddleWidth = 150;
var paddleHeight = 20;
var paddleColor = "	#0f5e9c";
var paddlePosX = (canvas.width - paddleWidth) / 2;

var ballRadius = 10;
var ballColor = "#0a8919";

var numOfRow = 6;
var numOfColumn = 7;
var bricks = [];
for(var row = 0; row < numOfRow; row++) {
    bricks[row] = [];
    for(var col = 0; col < numOfColumn; col++) {
        bricks[row][col] = { x: 0, y: 0, display: 1 };
    }
}
var brickColor = "#8f6638";
var brickWidth = 120;
var brickHeight = 30;
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 50;

var leftArrowPressed = false;
var rightArrowPressed = false;

var score = 0;
var lives = 3;
var font = "22px Arial";
var color = "black";

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);
document.addEventListener("mousemove", moveMouse);

function keyPress(e) {
    if(e.keyCode == 37) {
        leftArrowPressed = true;
    }
    else if(e.keyCode == 39) {
        rightArrowPressed = true;
    }
}

function keyRelease(e) {
    if(e.keyCode == 37) {
        leftArrowPressed = false;
    }
    else if(e.keyCode == 39) {
        rightArrowPressed = false;
    }
}

function moveMouse(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddlePosX = relativeX - paddleWidth / 2;
    }
}

function collision() {
    for(var row = 0; row < numOfRow; row++) {
        for(var col = 0; col < numOfColumn; col++) {
            var brick = bricks[row][col];
            if(brick.display == 1) {
                if(ballPosX > brick.x && ballPosX < brick.x + brickWidth &&
                    ballPosY > brick.y && ballPosY < brick.y + brickHeight) {
                    ballSpeedY = -ballSpeedY;
                    brick.display = 0;
                    score++;
                    if(score == numOfRow * numOfColumn) {
                        setTimeout(function() {
                            alert("You Win");
                            document.location.reload();
                        }, 100);
                    }
                }
            }
        }
    }
}

function paddle() {
    ctx.fillStyle = paddleColor;
    ctx.fillRect(paddlePosX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}

function ball() {
    ctx.beginPath();
    ctx.arc(ballPosX, ballPosY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function brickss() {
    for(var row = 0; row < numOfRow; row++) {
        for(var col = 0; col < numOfColumn; col++) {
            if(bricks[row][col].display == 1) {
                var brickPosX = col * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickPosY = row * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[row][col].x = brickPosX;
                bricks[row][col].y = brickPosY;

                ctx.fillStyle = brickColor;
                ctx.fillRect(brickPosX, brickPosY, brickWidth, brickHeight);
            }
        }
    }
}

function scoree() {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText("Score: " + score, 15, 30);
}

function livess() {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText("Lives: " + lives, 900, 30);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle();
    ball();
    brickss();
    collision();
    scoree();
    livess();
    if(ballPosX > canvas.width - ballRadius || ballPosX < ballRadius) {
        ballSpeedX = -ballSpeedX;
    }
    if(ballPosY < ballRadius) {
        ballSpeedY = -ballSpeedY;
    }
    else if(ballPosY > canvas.height - ballRadius - paddleHeight) {
        if(ballPosX > paddlePosX && ballPosX < paddlePosX + paddleWidth) {
            ballSpeedY = -ballSpeedY;
        }
        else {
            lives--;
            if(lives == 0) {
                setTimeout(function() {
                    alert("Game Over");
                    document.location.reload();
                }, 10);
            }
            else {
                ballPosX = canvas.width / 2;
                ballPosY = canvas.height - 100;
                ballSpeedX = 4;
                ballSpeedY = -4; 
                paddlePosX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    if(rightArrowPressed && paddlePosX < canvas.width - paddleWidth) {
        paddlePosX +=7;
    }
    else if (leftArrowPressed && paddlePosX > 0) {
        paddlePosX -=7;
    }
    ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;
    requestAnimationFrame(draw);
}

draw();