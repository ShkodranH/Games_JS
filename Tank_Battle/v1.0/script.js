var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var tank1PosX = 950;
var tank1PosY = canvas.height / 2;
var tank2PosX = 50;
var tank2PosY = canvas.height / 2;

var tankWidth = 50;
var tankHeight = 60;
var tankSpeed = 3;

var tank1Rotate = 0;
var tank2Rotate = 0;
var rotation1Speed = -180 * Math.PI / 180;
var rotation2Speed = 0 * Math.PI / 180;


var bullet1PosX = 950;
var bullet1PosY = canvas.height / 2;
var bullet2PosX = 50;
var bullet2PosY = canvas.height / 2;

var bullet1Rotate = 0;
var bullet2Rotate = 0;
var rotation1BulletSpeed = -180 * Math.PI / 180;
var rotation2BulletSpeed = 0 * Math.PI / 180;

var bulletWidth = 10;
var bulletHeight = 15;
var bulletColor = "#444444";
var bulletSpeed = 10;


var leftArrowPressed = false;
var rightArrowPressed = false;
var upArrowPressed = false;
var downArrowPressed = false;
var LkeyPressed = false;

var AkeyPressed = false;
var DkeyPressed = false;
var WkeyPressed = false;
var SkeyPressed = false;
var TkeyPressed = false;

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);

function keyPress(e) {
    if(e.keyCode == 37) {
        leftArrowPressed = true;
    }
    else if(e.keyCode == 39) {
        rightArrowPressed = true;
    }
    if(e.keyCode == 38) {
        upArrowPressed = true;
    }
    else if(e.keyCode == 40) {
        downArrowPressed = true;
    }
    if(e.keyCode == 76) {
        LkeyPressed = true;
    }

    if(e.keyCode == 65) {
        AkeyPressed = true;
    }
    else if(e.keyCode == 68) {
        DkeyPressed = true;
    }
    if(e.keyCode == 87) {
        WkeyPressed = true;
    }
    else if(e.keyCode == 83) {
        SkeyPressed = true;
    }
    if(e.keyCode == 84) {
        TkeyPressed = true;
    }
}

function keyRelease(e) {
    if(e.keyCode == 37) {
        leftArrowPressed = false;
    }
    else if(e.keyCode == 39) {
        rightArrowPressed = false;
    }
    if(e.keyCode == 38) {
        upArrowPressed = false;
    }
    else if(e.keyCode == 40) {
        downArrowPressed = false;
    }

    if(e.keyCode == 65) {
        AkeyPressed = false;
    }
    else if(e.keyCode == 68) {
        DkeyPressed = false;
    }
    if(e.keyCode == 87) {
        WkeyPressed = false;
    }
    else if(e.keyCode == 83) {
        SkeyPressed = false;
    }
}

function moveTank() {
    if(upArrowPressed) {
        if(tank1PosX < (tankHeight / 2) ) 
        {
            tank1PosX += tankSpeed;
        }
        else if(tank1PosX > canvas.width - (tankHeight / 2)) {
            tank1PosX -= tankSpeed;
        }
        else if(tank1PosY < (tankHeight / 2)) {
            tank1PosY += tankSpeed;
        }
        else if(tank1PosY > canvas.height - (tankHeight / 2)) {
            tank1PosY -= tankSpeed;
        }
        else {
            tank1PosX += tankSpeed * Math.cos(tank1Rotate - (90 * Math.PI / 180));
            tank1PosY += tankSpeed * Math.sin(tank1Rotate - (90 * Math.PI / 180));
        }
    }

    else if(downArrowPressed) {
        if(tank1PosX < (tankHeight / 2) ) 
        {
            tank1PosX += tankSpeed;
        }
        else if(tank1PosX > canvas.width - (tankHeight / 2)) {
            tank1PosX -= tankSpeed;
        }
        else if(tank1PosY < (tankHeight / 2)) {
            tank1PosY += tankSpeed;
        }
        else if(tank1PosY > canvas.height - (tankHeight / 2)) {
            tank1PosY -= tankSpeed;
        }
        else {
            tank1PosX -= tankSpeed * Math.sin(tank1Rotate);
            tank1PosY += tankSpeed * Math.cos(tank1Rotate);
        }
    }
}

function moveTank2() {
    if(WkeyPressed) {
        if(tank2PosX < (tankHeight / 2) ) {
            tank2PosX += tankSpeed;
        }
        else if(tank2PosX > canvas.width - (tankHeight / 2)) {
            tank2PosX -= tankSpeed;
        }
        else if(tank2PosY < (tankHeight / 2)) {
            tank2PosY += tankSpeed;
        }
        else if(tank2PosY > canvas.height - (tankHeight / 2)) {
            tank2PosY -= tankSpeed;
        }
        else {
            tank2PosX += tankSpeed * Math.cos(tank2Rotate - (90 * Math.PI / 180));
            tank2PosY += tankSpeed * Math.sin(tank2Rotate - (90 * Math.PI / 180));
        }
    }

    else if(SkeyPressed) {
        if(tank2PosX < (tankHeight / 2) ) 
        {
            tank2PosX += tankSpeed;
        }
        else if(tank2PosX > canvas.width - (tankHeight / 2)) {
            tank2PosX -= tankSpeed;
        }
        else if(tank2PosY < (tankHeight / 2)) {
            tank2PosY += tankSpeed;
        }
        else if(tank2PosY > canvas.height - (tankHeight / 2)) {
            tank2PosY -= tankSpeed;
        }
        else {
            tank2PosX -= tankSpeed * Math.sin(tank2Rotate);
            tank2PosY += tankSpeed * Math.cos(tank2Rotate);
        }
    }
}

function moveBullet() {
    if(upArrowPressed) {
        if(bullet1PosX < (tankHeight / 2) ) {
            bullet1PosX += tankSpeed;
        }
        else if(bullet1PosX > canvas.width - (tankHeight / 2)) {
            bullet1PosX -= tankSpeed;
        }
        else if(bullet1PosY < (tankHeight / 2)) {
            bullet1PosY += tankSpeed;
        }
        else if(bullet1PosY > canvas.height - (tankHeight / 2)) {
            bullet1PosY -= tankSpeed;
        }
        else {
            bullet1PosX += tankSpeed * Math.cos(bullet1Rotate - (90 * Math.PI / 180));
            bullet1PosY += tankSpeed * Math.sin(bullet1Rotate - (90 * Math.PI / 180));
        }
    }

    else if(downArrowPressed) {
        if(bullet1PosX < (tankHeight / 2)) 
        {
            bullet1PosX += tankSpeed;
        }
        else if(bullet1PosX > canvas.width - (tankHeight / 2)) {
            bullet1PosX -= tankSpeed;
        }
        else if(bullet1PosY < (tankHeight / 2)) {
            bullet1PosY += tankSpeed;
        }
        else if(bullet1PosY > canvas.height - (tankHeight / 2)) {
            bullet1PosY -= tankSpeed;
        }
        else {
            bullet1PosX -= tankSpeed * Math.sin(bullet1Rotate);
            bullet1PosY += tankSpeed * Math.cos(bullet1Rotate);
        }
    }
}

function moveBullet2() {
    if(WkeyPressed) {
        if(bullet2PosX < (tankHeight / 2) ) {
            bullet2PosX += tankSpeed;
        }
        else if(bullet2PosX > canvas.width - (tankHeight / 2)) {
            bullet2PosX -= tankSpeed;
        }
        else if(bullet2PosY < (tankHeight / 2)) {
            bullet2PosY += tankSpeed;
        }
        else if(bullet2PosY > canvas.height - (tankHeight / 2)) {
            bullet2PosY -= tankSpeed;
        }
        else {
            bullet2PosX += tankSpeed * Math.cos(bullet2Rotate - (90 * Math.PI / 180));
            bullet2PosY += tankSpeed * Math.sin(bullet2Rotate - (90 * Math.PI / 180));
        }
    }

    else if(SkeyPressed) {
        if(bullet2PosX < (tankHeight / 2)) 
        {
            bullet2PosX += tankSpeed;
        }
        else if(bullet2PosX > canvas.width - (tankHeight / 2)) {
            bullet2PosX -= tankSpeed;
        }
        else if(bullet2PosY < (tankHeight / 2)) {
            bullet2PosY += tankSpeed;
        }
        else if(bullet2PosY > canvas.height - (tankHeight / 2)) {
            bullet2PosY -= tankSpeed;
        }
        else {
            bullet2PosX -= tankSpeed * Math.sin(bullet2Rotate);
            bullet2PosY += tankSpeed * Math.cos(bullet2Rotate);
        }
    }
}

function rotateTank() {
    tank1Rotate += rotation1Speed;
    ctx.save();
    ctx.translate(tank1PosX, tank1PosY);

    if(leftArrowPressed) {
        rotation1Speed = -2 * Math.PI / 180;
    }
    else if(rightArrowPressed) {
        rotation1Speed = 2 * Math.PI / 180;
    }
    else {
        rotation1Speed = 0;
    }

    ctx.rotate(tank1Rotate);

    img1 = new Image();
    img1.src = "images/tank1.png";
    ctx.drawImage(img1, - tankWidth / 2, - tankHeight / 2, tankWidth, tankHeight);

    ctx.restore();
}

function rotateTank2() {
    tank2Rotate += rotation2Speed;
    ctx.save();
    ctx.translate(tank2PosX, tank2PosY);

    if(AkeyPressed) {
        rotation2Speed = -2 * Math.PI / 180;
    }
    else if(DkeyPressed) {
        rotation2Speed = 2 * Math.PI / 180;
    }
    else {
        rotation2Speed = 0;
    }

    ctx.rotate(tank2Rotate);

    img2 = new Image();
    img2.src = "images/tank2.png";
    ctx.drawImage(img2, - tankWidth / 2, - tankHeight / 2, tankWidth, tankHeight);

    ctx.restore();
}

function rotateBullet() {
    bullet1Rotate += rotation1BulletSpeed;
    ctx.save();
    ctx.translate(bullet1PosX, bullet1PosY);

    if(leftArrowPressed) {
        rotation1BulletSpeed = -2 * Math.PI / 180;
    }
    else if(rightArrowPressed) {
        rotation1BulletSpeed = 2 * Math.PI / 180;
    }
    else {
        rotation1BulletSpeed = 0;
    }

    ctx.rotate(bullet1Rotate);

    ctx.fillStyle = bulletColor;
    ctx.fillRect(- bulletWidth / 2, - bulletHeight / 2, bulletWidth, bulletHeight);
    
    ctx.restore();
}

function rotateBullet2() {
    bullet2Rotate += rotation2BulletSpeed;
    ctx.save();
    ctx.translate(bullet2PosX, bullet2PosY);

    if(AkeyPressed) {
        rotation2BulletSpeed = -2 * Math.PI / 180;
    }
    else if(DkeyPressed) {
        rotation2BulletSpeed = 2 * Math.PI / 180;
    }
    else {
        rotation2BulletSpeed = 0;
    }

    ctx.rotate(bullet2Rotate);

    ctx.fillStyle = bulletColor;
    ctx.fillRect(- bulletWidth / 2, - bulletHeight / 2, bulletWidth, bulletHeight);
    
    ctx.restore();
}

function fireTank() {
    if(LkeyPressed) {
        if(upArrowPressed) {
            if(bullet1PosX < (tankHeight / 2)) {
                bullet1PosX -= tankSpeed;
            }
            else if(bullet1PosX > canvas.width - (tankHeight / 2)) {
                bullet1PosX += tankSpeed;
            }
            else if(bullet1PosY < (tankHeight / 2)) {
                bullet1PosY -= tankSpeed;
            }
            else if(bullet1PosY > canvas.height - (tankHeight / 2)) {
                bullet1PosY += tankSpeed;
            }
            else {
                bullet1PosX -= tankSpeed * Math.cos(bullet1Rotate - (90 * Math.PI / 180));
                bullet1PosY -= tankSpeed * Math.sin(bullet1Rotate - (90 * Math.PI / 180));
            }
        }
        else if(downArrowPressed) {
            if(bullet1PosX < (tankHeight / 2)) {
                bullet1PosX -= tankSpeed;
            }
            else if(bullet1PosX > canvas.width - (tankHeight / 2)) {
                bullet1PosX += tankSpeed;
            }
            else if(bullet1PosY < (tankHeight / 2)) {
                bullet1PosY -= tankSpeed;
            }
            else if(bullet1PosY > canvas.height - (tankHeight / 2)) {
                bullet1PosY += tankSpeed;
            }
            else {
                bullet1PosX += tankSpeed * Math.sin(bullet1Rotate);
                bullet1PosY -= tankSpeed * Math.cos(bullet1Rotate);
            }
        }
        rotation1BulletSpeed = 0;
        bulletSpeed = 10;
        bullet1PosX += bulletSpeed * Math.cos(bullet1Rotate - (90 * Math.PI / 180));
        bullet1PosY += bulletSpeed * Math.sin(bullet1Rotate - (90 * Math.PI / 180));

        if(bullet1PosX < 0 - bulletHeight || bullet1PosX > canvas.width + bulletHeight ||
        bullet1PosY < 0 - bulletHeight || bullet1PosY > canvas.height + bulletHeight) {
            bullet1PosX = tank1PosX;
            bullet1PosY = tank1PosY;
            bullet1Rotate = tank1Rotate;
            LkeyPressed = false;
        }
    }
}

function fireTank2() {
    if(TkeyPressed) {
        if(WkeyPressed) {
            if(bullet2PosX < (tankHeight / 2)) {
                bullet2PosX -= tankSpeed;
            }
            else if(bullet2PosX > canvas.width - (tankHeight / 2)) {
                bullet2PosX += tankSpeed;
            }
            else if(bullet2PosY < (tankHeight / 2)) {
                bullet2PosY -= tankSpeed;
            }
            else if(bullet2PosY > canvas.height - (tankHeight / 2)) {
                bullet2PosY += tankSpeed;
            }
            else {
                bullet2PosX -= tankSpeed * Math.cos(bullet2Rotate - (90 * Math.PI / 180));
                bullet2PosY -= tankSpeed * Math.sin(bullet2Rotate - (90 * Math.PI / 180));
            }
        }
        else if(SkeyPressed) {
            if(bullet2PosX < (tankHeight / 2)) {
                bullet2PosX -= tankSpeed;
            }
            else if(bullet2PosX > canvas.width - (tankHeight / 2)) {
                bullet2PosX += tankSpeed;
            }
            else if(bullet2PosY < (tankHeight / 2)) {
                bullet2PosY -= tankSpeed;
            }
            else if(bullet2PosY > canvas.height - (tankHeight / 2)) {
                bullet2PosY += tankSpeed;
            }
            else {
                bullet2PosX += tankSpeed * Math.sin(bullet2Rotate);
                bullet2PosY -= tankSpeed * Math.cos(bullet2Rotate);
            }
        }
        rotation2BulletSpeed = 0;
        bulletSpeed = 10;
        bullet2PosX += bulletSpeed * Math.cos(bullet2Rotate - (90 * Math.PI / 180));
        bullet2PosY += bulletSpeed * Math.sin(bullet2Rotate - (90 * Math.PI / 180));

        if(bullet2PosX < 0 - bulletHeight || bullet2PosX > canvas.width + bulletHeight ||
        bullet2PosY < 0 - bulletHeight || bullet2PosY > canvas.height + bulletHeight) {
            bullet2PosX = tank2PosX;
            bullet2PosY = tank2PosY;
            bullet2Rotate = tank2Rotate;
            TkeyPressed = false;
        }
    }
}
function bulletCollision() {
    if(bullet1PosX > tank2PosX - tankWidth / 2 && bullet1PosX < tank2PosX + tankWidth / 2 &&
    bullet1PosY > tank2PosY - tankWidth / 2 && bullet1PosY < tank2PosY + tankWidth / 2 &&
    
    bullet2PosX > tank1PosX - tankWidth / 2 && bullet2PosX < tank1PosX + tankWidth / 2 &&
    bullet2PosY > tank1PosY - tankWidth / 2 && bullet2PosY < tank1PosY + tankWidth / 2) 
    {
        setTimeout(function() {
            cancelAnimationFrame(animate);
            alert("Both Tanks Crashed");
            document.location.reload();
        }, 10);
    }
    else if(bullet1PosX > tank2PosX - tankWidth / 2 &&
    bullet1PosX < tank2PosX + tankWidth / 2 &&
    bullet1PosY > tank2PosY - tankWidth / 2 && 
    bullet1PosY < tank2PosY + tankWidth / 2) 
    {
        setTimeout(function() {
            cancelAnimationFrame(animate);
            alert("Red Tank Wins");
            document.location.reload();
        }, 10);
    }
    else if(bullet2PosX > tank1PosX - tankWidth / 2 && 
    bullet2PosX < tank1PosX + tankWidth / 2 &&
    bullet2PosY > tank1PosY - tankWidth / 2 && 
    bullet2PosY < tank1PosY + tankWidth / 2) 
    {
        setTimeout(function() {
            cancelAnimationFrame(animate);
            alert("Blue Tank Wins");
            document.location.reload();
        }, 10);
    }
} 

var animate;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    rotateBullet();
    rotateBullet2();
    rotateTank();
    rotateTank2();
    moveBullet();
    moveBullet2();
    moveTank();
    moveTank2();
    fireTank();
    fireTank2();
    bulletCollision();
    
    animate = requestAnimationFrame(draw);
}
draw();