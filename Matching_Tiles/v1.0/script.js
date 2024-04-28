var arr = [
    {
        icon: "fas fa-fan",
        color: "#ff3b30"
    },
    {
        icon: "fas fa-seedling",
        color: "#38bc1c"
    },
    {
        icon: "fas fa-lemon",
        color: "#ecf210"
    },
    {
        icon: "fas fa-tshirt",
        color: "#ed9121"
    },
    {
        icon: "fas fa-feather-alt",
        color: "#13e6ea"
    },
    {
        icon: "fas fa-dove",
        color: "#ef909b"
    },
    {
        icon: "fas fa-paw",
        color: "#824902"
    },
    {
        icon: "fas fa-spider",
        color: "#444444"
    },
    {
        icon: "fas fa-book-open",
        color: "#864a92"
    },
    {
        icon: "fas fa-puzzle-piece",
        color: "#187bcd"
    }
]
var cards = [];
var checkArr = [];
var counter = 0;
var matches = 0;
var first;
var second;

for(let i = 0; i < arr.length; i++) {
    cards.push(arr[i]);
    cards.push(arr[i]);
}

function shuffle() {
    for(let i = cards.length-1; i > 0; i--) {
        let rnd = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[rnd]] = [cards[rnd], cards[i]];
    }
}

function openCard(n) {
    counter ++;
    let x = document.getElementById('main').getElementsByTagName('span');

    x[n].getElementsByTagName('i')[0].setAttribute("class", cards[n].icon);
    x[n].getElementsByTagName('i')[0].style.color = cards[n].color;
    x[n].getElementsByTagName('i')[0].style.transform = "rotate(0deg)";
    x[n].getElementsByTagName('i')[0].style.fontSize = "3.5vw";
    x[n].style.backgroundColor = "#fff";

    checkArr.push(n);
    first = checkArr[0];
    second = checkArr[1];

    if(checkArr.length == 2) {
        for(let k = 0; k < cards.length; k++) {
            x[k].style.pointerEvents = "none";
        }
        setTimeout(function() {
            for(let j = 0; j < cards.length; j++) {
                x[j].style.pointerEvents = "auto";
            }
        }, 1000);
        if(cards[first].icon != cards[second].icon) {
            setTimeout(function() {
                x[first].getElementsByTagName('i')[0].setAttribute("class", "fas fa-gamepad");
                x[first].getElementsByTagName('i')[0].style.color = "#aaaaaa";
                x[first].getElementsByTagName('i')[0].style.transform = "rotate(-30deg)";
                x[first].getElementsByTagName('i')[0].style.fontSize = "3vw";
                x[first].style.backgroundColor = "#504d4d";

                x[second].getElementsByTagName('i')[0].setAttribute("class", "fas fa-gamepad");
                x[second].getElementsByTagName('i')[0].style.color = "#aaaaaa";
                x[second].getElementsByTagName('i')[0].style.transform = "rotate(-30deg)";
                x[second].getElementsByTagName('i')[0].style.fontSize = "3vw";
                x[second].style.backgroundColor = "#504d4d";
            }, 1000);
        }
        else {
            x[first].onclick = "";
            x[second].onclick ="";
            matches++;
            if(matches == 10) {
                setTimeout(function() {
                    alert("You Win");
                    document.location.reload();
                }, 100);
            }
        }
        checkArr = [];
    }
    if(counter == 60) {
        setTimeout(function() {
            alert("You Lose");
            document.location.reload();
        }, 100);
    }
    document.getElementById('moves').innerHTML = 30 - parseInt(counter / 2);
}

shuffle();

function play() {
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display = "flex";
    document.getElementById('score').style.display = "flex";
}