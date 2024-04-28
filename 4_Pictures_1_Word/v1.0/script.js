var words = [
"ball", "book", "capture", "chest", "date", 
"drink", "fan", "fast", "full", "game", 
"green", "hard", "hot", "net", "old", 
"train", "vacuum", "water"
]
var keyArr = [];
var random = Math.floor(Math.random() * words.length);
var counter = 0;
var correct = 0;

function images() {
    for(let i = 0; i < 4; i++) {
        document.getElementById('pictures').getElementsByTagName('img')[i].src = 
        "images/" + words[random] + (i + 1) + ".jpg";
    }
}

function imgWord() {
    for(let j = 0; j < words[random].length; j++) {
        var span = document.createElement('span');
        document.getElementById('word').appendChild(span);
        keyArr.push(words[random][j]);
    }
}

function charFill() {
    for(let k = keyArr.length; k < 12; k++) {
        let randChar = Math.floor(Math.random() * 26) + 97;
        keyArr.push(String.fromCharCode(randChar));
    }
}

function shuffle() {
    for(let l = keyArr.length-1; l > 0; l--) {
        let rnd = Math.floor(Math.random() * (l + 1));
        [keyArr[l], keyArr[rnd]] = [keyArr[rnd], keyArr[l]];
    }
}

function characters() {
    for(let m = 0; m < 12; m++) {
        document.getElementById('char').getElementsByTagName('span')[m].innerHTML = keyArr[m].toUpperCase();
    }
}

images();
imgWord();
charFill();
shuffle();
characters();

function play() {
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display = "flex";
}

function press(elem) {
    if (counter < words[random].length) {
        elem.style.visibility = "hidden";
        document.getElementById('word').getElementsByTagName('span')[counter].style.backgroundColor
            = "#cccccc";
        document.getElementById('word').getElementsByTagName('span')[counter].innerHTML
            = elem.innerHTML;
        counter++;

        if(words[random][counter-1].toUpperCase() == elem.innerHTML) {
            correct++;

            if (words[random].length == correct) {
                setTimeout(function() {
                    alert("You Win");
                    document.location.reload();
                }, 100);
            }
        }
        else if (counter == words[random].length && counter != correct) {
            setTimeout(function() {
                alert("You Lose");
                document.location.reload();
            }, 100);
        }
    }
}

function undo() {
    counter = 0;
    correct = 0;
    for(let i = 0; i < 12; i++) {
        document.getElementById('char').getElementsByTagName('span')[i].style.visibility
            = "visible";
    }
    for(let j = 0; j < words[random].length; j++) {
        document.getElementById('word').getElementsByTagName('span')[j].style.backgroundColor
            = "transparent";
        document.getElementById('word').getElementsByTagName('span')[j].innerHTML = "";
    }
}