var all = [
    {
        question: "12 + 17",
        options: ["29", "31", "25", "30"]
    },
    {
        question: "14 + 28",
        options: ["42", "32", "44", "56"]
    },
    {
        question: "47 + 19",
        options: ["66", "71", "59", "56"]
    },
    {
        question: "72 + 8",
        options: ["80", "76", "44", "61"]
    },
    {
        question: "23 + 37",
        options: ["60", "22", "50", "47"]
    },
    {
        question: "88 + 5",
        options: ["93", "84", "36", "57"]
    },
    {
        question: "55 + 19",
        options: ["74", "51", "65", "84"]
    },
    {
        question: "39 + 58",
        options: ["97", "99", "86", "79"]
    },
    {
        question: "11 + 32",
        options: ["43", "21", "35", "60"]
    },
    {
        question: "70 + 16",
        options: ["86", "77", "66", "93"]
    },

    {
        question: "44 - 27",
        options: ["17", "21", "24", "10"]
    },
    {
        question: "87 - 38",
        options: ["49", "51", "34", "22"]
    },
    {
        question: "99 - 69",
        options: ["30", "40", "59", "66"]
    },
    {
        question: "75 - 3",
        options: ["72", "66", "68", "81"]
    },
    {
        question: "63 - 47",
        options: ["16", "24", "14", "22"]
    },
    {
        question: "71 - 15",
        options: ["56", "24", "53", "48"]
    },
    {
        question: "32 - 31",
        options: ["1", "27", "63", "12"]
    },
    {
        question: "83 - 68",
        options: ["15", "91", "22", "9"]
    },
    {
        question: "22 - 4",
        options: ["18", "26", "33", "47"]
    },
    {
        question: "70 - 32",
        options: ["38", "29", "30", "43"]
    },

    {
        question: "12 × 7",
        options: ["84", "71", "65", "90"]
    },
    {
        question: "14 × 4",
        options: ["56", "38", "84", "72"]
    },
    {
        question: "9 × 11",
        options: ["99", "90", "81", "77"]
    },
    {
        question: "13 × 6",
        options: ["78", "66", "54", "32"]
    },
    {
        question: "29 × 2",
        options: ["58", "39", "41", "87"]
    },
    {
        question: "19 × 5",
        options: ["95", "85", "70", "80"]
    },
    {
        question: "16 × 6",
        options: ["96", "61", "78", "64"]
    },
    {
        question: "13 × 7",
        options: ["91", "89", "84", "70"]
    },
    {
        question: "9 × 8",
        options: ["72", "56", "38", "94"]
    },
    {
        question: "6 × 7",
        options: ["42", "24", "67", "39"]
    },

    {
        question: "51 ÷ 3",
        options: ["17", "21", "44", "12"]
    },
    {
        question: "38 ÷ 2",
        options: ["19", "22", "24", "16"]
    },
    {
        question: "65 ÷ 5",
        options: ["13", "11", "9", "17"]
    },
    {
        question: "72 ÷ 6",
        options: ["12", "16", "14", "20"]
    },
    {
        question: "88 ÷ 8",
        options: ["11", "18", "10", "24"]
    },
    {
        question: "96 ÷ 4",
        options: ["24", "18", "36", "17"]
    },
    {
        question: "48 ÷ 12",
        options: ["4", "5", "18", "2"]
    },
    {
        question: "49 ÷ 7",
        options: ["7", "22", "13", "9"]
    },
    {
        question: "63 ÷ 9",
        options: ["7", "33", "27", "6"]
    },
    {
        question: "87 ÷ 3",
        options: ["29", "34", "28", "17"]
    },

    {
        question: "∛27",
        options: ["3", "7", "2", "9"]
    },
    {
        question: "∛64",
        options: ["4", "12", "8", "16"]
    },
    {
        question: "∜81",
        options: ["3", "9", "6", "8"]
    },
    {
        question: "√49",
        options: ["7", "8", "6", "2"]
    },
    {
        question: "4!",
        options: ["24", "30", "16", "48"]
    },
    {
        question: "0!",
        options: ["1", "0", "99", "50"]
    },
    {
        question: "2⁶",
        options: ["64", "12", "36", "26"]
    },
    {
        question: "6²",
        options: ["36", "12", "60", "62"]
    },
    {
        question: "28¹",
        options: ["28", "34", "85", "73"]
    },
    {
        question: "1¹⁷",
        options: ["1", "17", "84", "69"]
    }
]
var allCopy = [
    {
        question: "12 + 17",
        options: ["29", "31", "25", "30"]
    },
    {
        question: "14 + 28",
        options: ["42", "32", "44", "56"]
    },
    {
        question: "47 + 19",
        options: ["66", "71", "59", "56"]
    },
    {
        question: "72 + 8",
        options: ["80", "76", "44", "61"]
    },
    {
        question: "23 + 37",
        options: ["60", "22", "50", "47"]
    },
    {
        question: "88 + 5",
        options: ["93", "84", "36", "57"]
    },
    {
        question: "55 + 19",
        options: ["74", "51", "65", "84"]
    },
    {
        question: "39 + 58",
        options: ["97", "99", "86", "79"]
    },
    {
        question: "11 + 32",
        options: ["43", "21", "35", "60"]
    },
    {
        question: "70 + 16",
        options: ["86", "77", "66", "93"]
    },

    {
        question: "44 - 27",
        options: ["17", "21", "24", "10"]
    },
    {
        question: "87 - 38",
        options: ["49", "51", "34", "22"]
    },
    {
        question: "99 - 69",
        options: ["30", "40", "59", "66"]
    },
    {
        question: "75 - 3",
        options: ["72", "66", "68", "81"]
    },
    {
        question: "63 - 47",
        options: ["16", "24", "14", "22"]
    },
    {
        question: "71 - 15",
        options: ["56", "24", "53", "48"]
    },
    {
        question: "32 - 31",
        options: ["1", "27", "63", "12"]
    },
    {
        question: "83 - 68",
        options: ["15", "91", "22", "9"]
    },
    {
        question: "22 - 4",
        options: ["18", "26", "33", "47"]
    },
    {
        question: "70 - 32",
        options: ["38", "29", "30", "43"]
    },

    {
        question: "12 × 7",
        options: ["84", "71", "65", "90"]
    },
    {
        question: "14 × 4",
        options: ["56", "38", "84", "72"]
    },
    {
        question: "9 × 11",
        options: ["99", "90", "81", "77"]
    },
    {
        question: "13 × 6",
        options: ["78", "66", "54", "32"]
    },
    {
        question: "29 × 2",
        options: ["58", "39", "41", "87"]
    },
    {
        question: "19 × 5",
        options: ["95", "85", "70", "80"]
    },
    {
        question: "16 × 6",
        options: ["96", "61", "78", "64"]
    },
    {
        question: "13 × 7",
        options: ["91", "89", "84", "70"]
    },
    {
        question: "9 × 8",
        options: ["72", "56", "38", "94"]
    },
    {
        question: "6 × 7",
        options: ["42", "24", "67", "39"]
    },

    {
        question: "51 ÷ 3",
        options: ["17", "21", "44", "12"]
    },
    {
        question: "38 ÷ 2",
        options: ["19", "22", "24", "16"]
    },
    {
        question: "65 ÷ 5",
        options: ["13", "11", "9", "17"]
    },
    {
        question: "72 ÷ 6",
        options: ["12", "16", "14", "20"]
    },
    {
        question: "88 ÷ 8",
        options: ["11", "18", "10", "24"]
    },
    {
        question: "96 ÷ 4",
        options: ["24", "18", "36", "17"]
    },
    {
        question: "48 ÷ 12",
        options: ["4", "5", "18", "2"]
    },
    {
        question: "49 ÷ 7",
        options: ["7", "22", "13", "9"]
    },
    {
        question: "63 ÷ 9",
        options: ["7", "33", "27", "6"]
    },
    {
        question: "87 ÷ 3",
        options: ["29", "34", "28", "17"]
    },

    {
        question: "∛27",
        options: ["3", "7", "2", "9"]
    },
    {
        question: "∛64",
        options: ["4", "12", "8", "16"]
    },
    {
        question: "∜81",
        options: ["3", "9", "6", "8"]
    },
    {
        question: "√49",
        options: ["7", "8", "6", "2"]
    },
    {
        question: "4!",
        options: ["24", "30", "16", "48"]
    },
    {
        question: "0!",
        options: ["1", "0", "99", "50"]
    },
    {
        question: "2⁶",
        options: ["64", "12", "36", "26"]
    },
    {
        question: "6²",
        options: ["36", "12", "60", "62"]
    },
    {
        question: "28¹",
        options: ["28", "34", "85", "73"]
    },
    {
        question: "1¹⁷",
        options: ["1", "17", "84", "69"]
    }
]

var selected = [];
var shuffled = [];

var counter = 0;
var timer = 10;
var score = -10;
var stopTimer;

for(let i = 0; i < 10; i++) {
    let rand = Math.floor(Math.random() * all.length);
    selected.push(all[rand]);
    shuffled.push(allCopy[rand]);
    all.splice(rand, 1);
    allCopy.splice(rand, 1);

    for(let j = 3; j > 0; j--) {
        let rand2 = Math.floor(Math.random() * (j + 1));
        [shuffled[i].options[j], shuffled[i].options[rand2]] = 
        [shuffled[i].options[rand2], shuffled[i].options[j]];
    }
}

function question() {
    let btn = document.getElementById('main').getElementsByTagName('button');
    score += timer;
    timer = 10;
    document.getElementById('score').innerHTML = "Score: " + score;
    document.getElementById('question').innerHTML = shuffled[counter].question;
    for(let i = 0; i < 4; i++) {
        btn[i].innerHTML = shuffled[counter].options[i];
    }
}

function check(elem) {
    if(elem.innerHTML == selected[counter].options[0]) {
        counter++;

        if(counter == 10) {
            document.getElementById('main').style.display = "none";
            document.getElementById('finish').style.display = "flex";
            document.getElementById('finish').getElementsByTagName('h1')[0].innerHTML = "You Win!";
            document.getElementById('finish').getElementsByTagName('p')[0].innerHTML = "Score: " + score;
            clearInterval(stopTimer);
        }
    }
    else {
        document.getElementById('main').style.display = "none";
        document.getElementById('finish').style.display = "flex";
        document.getElementById('finish').getElementsByTagName('h1')[0].innerHTML = "You Lose";
        document.getElementById('finish').getElementsByTagName('p')[0].innerHTML = "Score: " + score;
        clearInterval(stopTimer);
    }
}

function start() {
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display = "flex";

    stopTimer = setInterval(function() {
        timer--;
        setInterval(function() {
            document.getElementById('time').innerHTML = "Time: " + timer + "s";
        }, 300);
        if(timer == 0) {
            document.getElementById('main').style.display = "none";
            document.getElementById('finish').style.display = "flex";
            document.getElementById('finish').getElementsByTagName('h1')[0].innerHTML = "You Lose";
            document.getElementById('finish').getElementsByTagName('p')[0].innerHTML = "Score: " + score;
        }
    }, 1000);
}

function finish() {
    document.location.reload();
}