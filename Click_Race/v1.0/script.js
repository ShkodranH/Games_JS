var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var car1PosX = 10;
var car2PosX = 10;
var car1Speed = 0;
var car2Speed = 0;

var AkeyPressed = 0;
var LkeyPressed = 0;

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);

function keyPress(e) {
    if(e.keyCode == 65) {
        AkeyPressed++;
        if(AkeyPressed == 1) {
            car1Speed += 1;
            car1Speed *= 1.3;
        }
    }
    if(e.keyCode == 76) {
        LkeyPressed++;
        if(LkeyPressed == 1) {
            car2Speed += 1;
            car2Speed *= 1.3;
        }
    }
}
function keyRelease(e) {
    if(e.keyCode == 65) {
        AkeyPressed = 0;
    }
    if(e.keyCode == 76) {
        LkeyPressed = 0;
    }
}

function road() {
    img = new Image();
    img.src = "images/road.png";
    ctx.drawImage(img, 0, 125, 1500, 400);
}
function car1() {
    img4 = new Image();
    img4.src = "images/car4.png";
    ctx.drawImage(img4, car1PosX, 190, 120, 80);
}
function car2() {
    img2 = new Image();
    img2.src = "images/car2.png";
    ctx.drawImage(img2, car2PosX, 380, 120, 80);
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    road();
    car1();
    car2();
    car1Speed *= 0.96;
    if(car1Speed < 0) {
        car1Speed = 0;
    }
    car1PosX += car1Speed;

    car2Speed *= 0.96;
    if (car2Speed < 0) {
        car2Speed = 0;
    }
    car2PosX += car2Speed;

    if(car1PosX >= 1300) {
        setTimeout(function() {
            cancelAnimationFrame(animate);
            alert("Green Car Wins");
            document.location.reload();
        }, 10);
    }
    if(car2PosX >= 1300) {
        setTimeout(function() {
            cancelAnimationFrame(animate);
            alert("Blue Car Wins");
            document.location.reload();
        }, 10);
    }

    var animate = requestAnimationFrame(draw);
}

function start() {
    document.getElementById('intro').style.display = "none";
    document.getElementById('canvas').style.display = "flex";
    car1PosX = 10;
    car2PosX = 10;
    car1Speed = 0;
    car2Speed = 0;

    draw();
}