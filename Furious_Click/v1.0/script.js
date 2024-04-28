var arr = [
"star",
"envelope",
"lightbulb",
"paperplane",
"cherry",
"cake",
"rocket",
"house",
"bus",
"atom"
];
var level = 1;
var percent = 0;

function keypress(event) {
    if (event.keyCode == 71) {
        clickMe();
    }
}

function drawIcon() {
    for(let i = 0; i < 10; i++) {
        if(level == i + 1) {
            document.getElementById('iconbg').getElementsByTagName('img')[0].src = "images/" + arr[i] + "bg.png";
            document.getElementById('iconfill').getElementsByTagName('img')[0].src = "images/" + arr[i] + ".png";
            document.getElementById('iconfill').style.width = percent + "vw";
        }

    }
}

var x = setInterval(function() {
    if(percent >= 20) {
        percent -= 0;
    }
    else {
        percent -= (level - 1) * 0.05;
    }
    document.getElementById('iconfill').style.width = percent + "vw";
    percentage();
},50);

function clickMe() {
    percent += 2;
    percentage();

    if(percent >= 20) {
        setTimeout(function() {
            levelup();
        }, 50)
    }
    drawIcon();
}

function percentage() {
    if(percent > 20) {
        percent = 20;
    }
    else if(percent < 0) {
        percent = 0;
    }
    document.getElementById('percent').innerHTML = parseInt(5 * percent) + "%";  
}

function win() {
    document.getElementById('main').style.display = "none";
    document.getElementById('finish').style.display = "flex";
}

function levelup() {
    alert('You Completed this Level');
    if(level == 10) {
        win();
    }
    level++;
    document.getElementById('level').innerHTML = "Level " + level;
    percent = 0;
    percentage();

    drawIcon();
}


function start() {
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display = "flex";
    drawIcon();
}