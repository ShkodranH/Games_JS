var arr = [
    {
        level: 1,
        question: "<pre>1, 3, 5, <span style='color:#ff5522'>?</span></pre>",
        answer: [7]
    },
    {
        level: 2,
        question: "<pre>6, 12, 24, <span style='color:#ff5522'>?</span></pre>",
        answer: [4, 8]
    },
    {
        level: 3,
        question: "<pre>6 = 30<br>3 = 15<br>7 = 35<br>4 = <span style='color:#ff5522'>?</span></pre>",
        answer: [2, 0]
    },
    {
        level: 4,
        question: "<pre> 5    4    6    7    5<br>30  12  42  63  <span style='color:#ff5522'>?</span><br> 6    3    7    9    8</pre>",
        answer: [4, 0]
    },
    {
        level: 5,
        question: "<pre>A + 3B = 60<br>A - 2B  = 10<br>A ÷ B = <span style='color:#ff5522'>?</span></pre>",
        answer: [3]
    },
    {
        level: 6,
        question: "<pre>0, 40, 70, <span style='color:#ff5522'>?</span>, 100</pre>",
        answer: [9, 0]
    },
    {
        level: 7,
        question: "<pre>B12 = 24<br>A29 = 29<br>D51 = <span style='color:#ff5522'>?</span></pre>",
        answer: [2, 0, 4]
    },
    {
        level: 8,
        question: "<pre>36 = 73<br>22 = 45<br>25 = 51<br>49 = <span style='color:#ff5522'>?</span></pre>",
        answer: [9, 9]
    },
    {
        level: 9,
        question: "<pre>8 = 72<br>3 = 12<br>5 = 30<br>6 = <span style='color:#ff5522'>?</span></pre>",
        answer: [4, 2]
    },
    {
        level: 10,
        question: "<pre>12, 3, 23, 5<br>36, 9, 76, <span style='color:#ff5522'>?</span></pre>",
        answer: [1, 3]
    },
    {
        level: 11,
        question: "<pre> <i class='far fa-square'></i> = 4<br><i class='far fa-hexagon'></i> = 6<br><i class='far fa-triangle'></i> = 3<br><i class='far fa-circle'></i> = <span style='color:#ff5522'>?</span></pre>",
        answer: [0]
    },
    {
        level: 12,
        question: "<pre>1 = 3<br>2 = 6<br>3 = 18<br>4 = 72<br>5 = <span style='color:#ff5522'>?</span></pre>",
        answer: [3, 6, 0]
    },
    {
        level: 13,
        question: "<pre>3 + 9 = 90<br>4 + 2 = 20<br>6 + 5 = 61<br>1 + 8 = <span style='color:#ff5522'>?</span></pre>",
        answer: [6, 5]
    },
    {
        level: 14,
        question: "<pre>   22, 55 | 29<br>   37, 85 | 61<br>49, 285 | <span style='color:#ff5522'>?</span></pre>",
        answer: [1, 1, 6]
    },
    {
        level: 15,
        question: "<pre>4<br>6  2<br>9  <span style='color:#ff5522'>?</span>  1</pre>",
        answer: [3]
    },
]
var count = 0;
var count2 = 0;
var correct = 0;

function answers() {
    document.getElementById('answer').innerHTML = "";
    for(let i = 0; i < arr[count].answer.length; i++) {
        var span = document.createElement('span');
        document.getElementById('answer').appendChild(span);
    }
}

function numClick(elem) {
    let ans = document.getElementById('answer').getElementsByTagName('span');
    if(count2 < arr[count].answer.length) {
        ans[count2].style.backgroundColor = "#ffff9e";
        ans[count2].innerHTML = elem.innerHTML;
        count2++;
        if(ans[count2 - 1].innerHTML == arr[count].answer[count2 - 1]) {
            correct++;
        }
    }
}
function check() {
    let ans = document.getElementById('answer').getElementsByTagName('span');
    if(arr[count].answer.length == correct) {
        for(let i = 0; i < arr[count].answer.length; i++) {
            ans[i].style.backgroundColor = "#4bb543";
            ans[i].style.color = "white";
            ans[i].style.transition = "0.2s";
            setTimeout(function() {
                questions();
                answers();
                level();
                ans[i].innerHTML = "";
                ans[i].style.backgroundColor = "#222222";
                ans[i].style.color = "black";
            }, 1000);
        }
        count2 = 0;
        correct = 0;
        count++;
        if(count == 15) {
            setTimeout(function() {
                document.getElementById('main').style.display = "none";
                document.getElementById('win').style.display = "flex";
            }, 1000);
        }
    }
    else if(count2 == arr[count].answer.length && count2 != correct) {
        for(let i = 0; i < arr[count].answer.length; i++) {
            ans[i].style.backgroundColor = "#df4759";
            ans[i].style.color = "white";
            ans[i].style.transition = "0.2s";
            setTimeout(function() {
                ans[i].innerHTML = "";
                ans[i].style.backgroundColor = "#222222";
                ans[i].style.color = "black";
            }, 1000);
        }
        count2 = 0;
        correct = 0;
    }
}
function redo() {
    let ans = document.getElementById('answer').getElementsByTagName('span');
    for(let j = 0; j < arr[count].answer.length; j++) {
        ans[j].innerHTML = "";
        ans[j].style.backgroundColor = "#222222";
    }
    count2 = 0;
    correct = 0;
}

function questions() {
    document.getElementById('question').innerHTML = arr[count].question;
}

function level() {
    document.getElementById('level').innerHTML = "Level " + arr[count].level;
}

function start() {
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display = "flex";
    questions();
    answers();
    level();
}

function finish() {
    document.location.reload();
}