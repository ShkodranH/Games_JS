var arr = ["car1", "car2", "car3", "car4", "car5", "car6", "car7"];
var arr2 = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
];
var coins = 2000;
var price = 500;
var cars = 0;

var first;
var second;
var checkArr = [];
var sum;

for(let k = 0; k < arr2.length; k++) {
    document.getElementById('cars').getElementsByTagName('img')[k].style.display = "none";
}


setInterval(function() {
    sum = 0;
    for(let i = 0; i < arr2.length; i++) {
        sum += Math.floor(10 * Math.pow(2, arr2[i]) + Math.pow(3, arr2[i]) - 11);
    }
    drawRate();
    coins += sum;
    drawCoins();
}, 1000);

function drawRate() {
    document.getElementById('coinRate').getElementsByTagName('span')[0].innerHTML = sum;
}

function drawCoins() {
    document.getElementById('money').getElementsByTagName('span')[0].innerHTML = Math.round(coins);
}

function drawPrice() {
    document.getElementById('price').innerHTML = Math.round(price);
}

function drawCar() {
    for(let i = 0; i < arr2.length; i++) {
        if(document.getElementById('cars').getElementsByTagName('img')[i].style.display == "none") {
            document.getElementById('cars').getElementsByTagName('img')[i].src = "images/car1.png";
            document.getElementById('cars').getElementsByTagName('img')[i].style.display = "inline";
            arr2[i] = 1;
            cars++;
            break;
        }
    }
}

function buyCar() {
    if(coins >= price && cars < arr2.length) {
        coins -=price;
        price *= 1.07;
        drawCoins();
        drawPrice();
        drawCar();
    }
}

function levelup(n) {
    document.getElementById('levelup').style.display = "flex";
    document.getElementById('level').innerHTML = n;
    document.getElementById('lvCar').src = "images/car" + n + ".png";
    document.getElementById('earn').innerHTML = Math.floor(10 * Math.pow(2, n) + Math.pow(3, n) - 11);
}
function next() {
    document.getElementById('levelup').style.display = "none";
    if(Math.max(...arr2) == 7) {
        document.getElementById('main').style.display = "none";
        document.getElementById('finish').style.display = "flex";
    }
}

function merge(n) {
    let div = document.getElementById('cars').getElementsByTagName('div');
    let img = document.getElementById('cars').getElementsByTagName('img');

    div[n].style.backgroundColor = "#aaaaaa";

    checkArr.push(n);
    first = checkArr[0];
    second = checkArr[1];

    if(checkArr.length == 2) {
        var temp = Math.max(...arr2);

        if(arr2[first] == arr2[second]) {
            arr2[first] = 0;
            arr2[second]++;
            if(arr2[second] > temp) {
                levelup(arr2[second]);
            }
            img[first].style.display = "none";
            img[second].src = "images/car" + (arr2[second]) + ".png";
            cars--;
        }
        div[first].style.backgroundColor = "#ffffff";
        div[second].style.backgroundColor = "#ffffff";
        checkArr = [];
    }
}

function play() {
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display = "flex";
    drawCoins();
    drawPrice();
}