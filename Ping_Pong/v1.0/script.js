var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ballPosX = canvas.width / 2;
var ballPosY = canvas.height / 2;
var ballSpeedX = Math.random() < 0.5 ? 7 : -7;
var ballSpeedY = Math.random() < 0.5 ? 7 : -7;
var ballRadius = 12;
var ballColor = "darkorange";

var paddleWidth = 20;
var paddleHeight = 120;
var paddle1PosY = (canvas.height - paddleHeight) / 2;
var paddle2PosY = (canvas.height - paddleHeight) / 2;
var paddleColor = "green";

var player1pt = 0;
var player2pt = 0;
var font = "20px Arial";
var color = "white";

var upArrowPressed = false;
var downArrowPressed = false;
var WkeyPressed = false;
var SkeyPressed = false;

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);

function keyPress(e) {
    if(e.keyCode == 38) {
        upArrowPressed = true;
    }
    else if(e.keyCode == 40) {
        downArrowPressed = true;
    }
    if(e.keyCode == 87) {
        WkeyPressed = true;
    }
    else if(e.keyCode == 83) {
        SkeyPressed = true;
    }
}

function keyRelease(e) {
    if(e.keyCode == 38) {
        upArrowPressed = false;
    }
    else if(e.keyCode == 40) {
        downArrowPressed = false;
    }
    if(e.keyCode == 87) {
        WkeyPressed = false;
    }
    else if(e.keyCode == 83) {
        SkeyPressed = false;
    }
}

function ball() {
    ctx.beginPath();
    ctx.arc(ballPosX, ballPosY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}
function ballCollision() {
    if(ballPosY > canvas.height - ballRadius || ballPosY < ballRadius) {
        ballSpeedY = -ballSpeedY;
    }

    if(ballPosX > canvas.width - ballRadius - paddleWidth) {
        if(ballPosY > paddle2PosY && ballPosY < paddle2PosY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }
        else {
            player1pt++;

            if(player1pt == 5) {
                setTimeout(function() {
                    alert("Player1 Wins");
                    document.location.reload();
                }, 20);
            }
            else {
                ballPosX = canvas.width / 2;
                ballPosY = canvas.height / 2;
                ballSpeedX = -6;
                ballSpeedY = Math.random() < 0.5 ? 7 : -7; 
                paddle1PosY = (canvas.height - paddleHeight) / 2;
                paddle2PosY = (canvas.height - paddleHeight) / 2;
            }
        }
    }
    else if(ballPosX < ballRadius + paddleWidth) {
        if(ballPosY > paddle1PosY && ballPosY < paddle1PosY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }
        else {
            player2pt++;
            
            if(player2pt == 5) {
                setTimeout(function() {
                    alert("Player2 Wins");
                    document.location.reload();
                }, 20);
            }
            else {
                ballPosX = canvas.width / 2;
                ballPosY = canvas.height / 2;
                ballSpeedX = 6;
                ballSpeedY = Math.random() < 0.5 ? 7 : -7; 
                paddle1PosY = (canvas.height - paddleHeight) / 2;
                paddle2PosY = (canvas.height - paddleHeight) / 2;
            }
        }
    }
    ballPosX += ballSpeedX;
    ballPosY += ballSpeedY;
}

function paddle(x, i) {
    var y = (i == 1) ? paddle1PosY : paddle2PosY;
    ctx.fillStyle = paddleColor;
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function movePaddle() {
    if(upArrowPressed && paddle2PosY > 0) {
        paddle2PosY -=4;
    }
    else if (downArrowPressed && paddle2PosY < canvas.height - paddleHeight) {
        paddle2PosY +=4;
    }

    if(WkeyPressed && paddle1PosY > 0) {
        paddle1PosY -=4;
    }
    else if (SkeyPressed && paddle1PosY < canvas.height - paddleHeight) {
        paddle1PosY +=4;
    }
}

function points(player, i, x) {
    var point = (i == 1) ? player1pt : player2pt;
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(player + ": " + point, x, 30);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ead723";
    ctx.fillRect((canvas.width - 6) / 2, 0, 6, canvas.height);

    ball();
    paddle(0, 1);
    paddle(canvas.width - paddleWidth, 2);
    points("Player1", 1, (canvas.width / 4 - 50));
    points("Player2", 2, (3 * canvas.width / 4 - 50));

    movePaddle();
    ballCollision();

    requestAnimationFrame(draw);
}
draw();