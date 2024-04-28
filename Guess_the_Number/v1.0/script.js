var randomNum = Math.floor(Math.random() * 100 + 1);
var score = 15;

function numValue() {
    document.getElementById('win').style.display = "block";
    document.getElementById('prev').style.display = "block";
    
    if(document.getElementById('inp').value == "" || document.getElementById('inp').value < 0) {
        document.getElementById('inp').value = 0;
    }
    else if (document.getElementById('inp').value > 100) {
        document.getElementById('inp').value = 100;
    }
    document.getElementById('prev').innerHTML += (document.getElementById('inp').value + ", ");

    if (document.getElementById('inp').value == randomNum) {
        document.getElementById('score').style.display = "block";
        document.getElementById('hint').style.display = "none";
        document.getElementById('new').style.display = "block";
        document.getElementById('score').innerHTML = "Your Score: <b>" + score + "</b>";
        document.getElementById('win').style.backgroundColor = "#0bd336";
        document.getElementById('win').innerHTML = "Congrats! You got it right";
        document.getElementById('inp').disabled = true;
        document.getElementById('guess').disabled = true;
    }
    else if (document.getElementById('inp').value < randomNum) {
        document.getElementById('hint').style.display = "block";
        document.getElementById('win').innerHTML = "Wrong!";
        document.getElementById('win').style.backgroundColor = "#df4b3e";
        document.getElementById('hint').innerHTML = "Number was too <b>low!</b>";
        document.getElementById('inp').value = "";
        document.getElementById('inp').focus();
        score--;
    }
    else if (document.getElementById('inp').value > randomNum) {
        document.getElementById('hint').style.display = "block";
        document.getElementById('win').innerHTML = "Wrong!";
        document.getElementById('win').style.backgroundColor = "#df4b3e";
        document.getElementById('hint').innerHTML = "Number was too <b>high!</b>";
        document.getElementById('inp').value = "";
        document.getElementById('inp').focus();
        score--;
    }
    if(score === 0) {
        document.getElementById('score').style.display = "block";
        document.getElementById('hint').style.display = "none";
        document.getElementById('new').style.display = "block";
        document.getElementById('score').innerHTML = "Your Score: <b>" + score + "</b>";
        document.getElementById('win').style.backgroundColor = "#ff2b1e";
        document.getElementById('win').innerHTML = "Game Over";
        document.getElementById('inp').disabled = true;
        document.getElementById('guess').disabled = true;
    }
}

function reset() {
    document.location.reload();
}