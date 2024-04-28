var arr = [
    [
        "naruto", 
        "sasuke", 
        "sakura"
    ],
    [
        "naruto", 
        "sasuke", 
        "sakura", 
        "kakashi"
    ],
    [
        "naruto", 
        "sasuke", 
        "sakura", 
        "kakashi", 
        "hinata"
    ],
    [
        "naruto", 
        "sasuke", 
        "sakura", 
        "kakashi", 
        "hinata", 
        "minato"
    ],
    [
        "naruto", 
        "sasuke", 
        "sakura", 
        "kakashi", 
        "hinata", 
        "minato", 
        "killer_bee"
    ],
    [
        "naruto", 
        "sasuke", 
        "sakura", 
        "kakashi", 
        "hinata", 
        "minato", 
        "killer_bee", 
        "itachi"
    ],
    [
        "naruto", 
        "sasuke", 
        "sakura", 
        "kakashi", 
        "hinata", 
        "minato", 
        "killer_bee", 
        "itachi", 
        "boruto"
    ],
    [
        "naruto", 
        "sasuke", 
        "sakura", 
        "kakashi", 
        "hinata", 
        "minato", 
        "killer_bee", 
        "itachi", 
        "boruto", 
        "sarada"
    ],
    [
        "naruto", 
        "sasuke", 
        "sakura", 
        "kakashi", 
        "hinata", 
        "minato", 
        "killer_bee", 
        "itachi", 
        "boruto", 
        "sarada", 
        "mitsuki"
    ],
    [
        "naruto", 
        "sasuke", 
        "sakura", 
        "kakashi", 
        "hinata", 
        "minato", 
        "killer_bee", 
        "itachi", 
        "boruto", 
        "sarada", 
        "mitsuki", 
        "kawaki"
    ]
]
var level = 1;
var score = 0;
var tempArr;

function levels() {
    document.getElementById('level').innerHTML = "Level " + level;
    tempArr = arr[level-1];
    emptyArr = [];
}

function cards() {
    for(let i = 0; i < arr[level-1].length; i++) {
        document.getElementById('cards').getElementsByTagName('div')[i].style.display = "flex";
        let img = document.createElement('img');
        document.getElementById('cards').getElementsByTagName('div')[i].appendChild(img);
        document.getElementById('cards').getElementsByTagName('div')[i].getElementsByTagName('img')[0].setAttribute("src", "images/" + arr[level-1][i] + ".png");
    }
}

function clickCard(elem) {
    for(let j = 0; j < tempArr.length; j++) {
        if(elem.getElementsByTagName('img')[0].getAttribute('src') == "images/"+tempArr[j]+".png") {
            if(emptyArr.includes(tempArr[j]) ) {
                alert("You lost");
                document.location.reload();
            }
            else {
                emptyArr.push(tempArr[j]);
                score++;
                document.getElementById('score').innerHTML = "Completed: " + parseInt(score*100/(level+2)) + "%";

                if(score == tempArr.length) {
                    setTimeout(function() {
                        level++;
                        if(level == 11) {
                            document.getElementById('main').style.display = "none";
                            document.getElementById('win').style.display = "flex";
                        }
                        score = 0;
                        alert("You Cleared this Level, Congrats!");
                        levels();
                        cards();
                        document.getElementById('score').innerHTML = "Completed: " + score + "%";
                    }, 100);
                }
            }
        }
    }
    for(let i = tempArr.length-1; i > 0; i--) {
        let rnd = Math.floor(Math.random() * (i + 1));
        [tempArr[i], tempArr[rnd]] = [tempArr[rnd], tempArr[i]];

        for(let k = 0; k < tempArr.length; k++) {
            document.getElementById('cards').getElementsByTagName('div')[k].getElementsByTagName('img')[0].src = "images/"+tempArr[k]+".png";
        }
    }
}

function start() {
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display = "flex";
    levels();
    cards();
}