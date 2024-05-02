var round = 0;
var playerScore = 0;
var computerScore = 0;

function choice(event) {
    if(event.keyCode == 65) {
        rock();
        choose();
        rounds();
        winner();
        stars();
    }
    else if(event.keyCode == 83) {
        paper();
        choose();
        rounds();
        winner();
        stars();
    }
    else if(event.keyCode == 68) {
        scissor();
        choose();
        rounds();
        winner();
        stars();
    }
}

function rounds() {
    round +=1;
    document.getElementById('round').innerHTML = "Round " + round;
}

function rock() {
    document.getElementById('pRock').style.display = "block";
    document.getElementById('pPaper').style.display = "none";
    document.getElementById('pScissor').style.display = "none";
}
function paper() {
    document.getElementById('pRock').style.display = "none";
    document.getElementById('pPaper').style.display = "block";
    document.getElementById('pScissor').style.display = "none";
}
function scissor() {
    document.getElementById('pRock').style.display = "none";
    document.getElementById('pPaper').style.display = "none";
    document.getElementById('pScissor').style.display = "block";
}

function choose() {
    let random = Math.floor(Math.random() * 3);

    if (random === 0) {
        document.getElementById('rock').style.display = "block";
        document.getElementById('paper').style.display = "none";
        document.getElementById('scissor').style.display = "none";
    }
    else if (random === 1) {

        document.getElementById('paper').style.display = "block";
        document.getElementById('rock').style.display = "none";
        document.getElementById('scissor').style.display = "none";
    }
    else if(random === 2) {

        document.getElementById('scissor').style.display = "block";
        document.getElementById('paper').style.display = "none";
        document.getElementById('rock').style.display = "none";
    }
}

function winner() {
    let pRock = document.getElementById('pRock');
    let pPaper = document.getElementById('pPaper');
    let pScissor = document.getElementById('pScissor');

    let cRock = document.getElementById('rock');
    let cPaper = document.getElementById('paper');
    let cScissor = document.getElementById('scissor');

    if( (pRock.style.display == "block" && cRock.style.display == "block") ||
        (pPaper.style.display == "block" && cPaper.style.display == "block") ||
        (pScissor.style.display == "block" && cScissor.style.display == "block") ) 
    {
        document.getElementById('winner').innerHTML = "No one wins this round";
    }
    else if( (pRock.style.display == "block" && cScissor.style.display == "block") ||
        (pPaper.style.display == "block" && cRock.style.display == "block") ||
        (pScissor.style.display == "block" && cPaper.style.display == "block") ) 
    {
        document.getElementById('winner').innerHTML = "Player wins this round";
        playerScore++;

        if(playerScore == 5) {
            setTimeout(function() {
                alert("Player wins");
                document.location.reload();
            }, 100);
        }
    }
    else if( (pScissor.style.display == "block" && cRock.style.display == "block") ||
        (pRock.style.display == "block" && cPaper.style.display == "block") ||
        (pPaper.style.display == "block" && cScissor.style.display == "block") ) 
    {
        document.getElementById('winner').innerHTML = "Computer wins this round";
        computerScore++;

        if(computerScore == 5) {
            setTimeout(function() {
                alert("Computer wins");
                document.location.reload();
            }, 100);
        }
    }
}

function stars() {
    for(let i = 0; i < playerScore; i++) {
        document.getElementById('pfstar' + i).style.display = "inline";
        document.getElementById('pstar' + i).style.display = "none";
    }
    for(let i = 0; i < computerScore; i++) {
        document.getElementById('cfstar' + i).style.display = "inline";
        document.getElementById('cstar' + i).style.display = "none";
    }
}