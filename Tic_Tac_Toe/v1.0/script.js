var count = 0;
var btn = [];

for(let i = 0; i < 9; i++) {
    btn[i] = document.getElementById("btn" + (i + 1));
}

function symbol(n) {
    if(n.innerHTML === "") {
        n.className = "addClass";
        count += 1;
        if(count%2 === 0) {
            n.innerHTML = "O";
        }
        else {
            n.innerHTML = "X";
        }
    }
}

function win() {

    if( (btn[0].innerHTML === "X" && btn[1].innerHTML === "X" && btn[2].innerHTML === "X") || 
        (btn[3].innerHTML === "X" && btn[4].innerHTML === "X" && btn[5].innerHTML === "X") ||
        (btn[6].innerHTML === "X" && btn[7].innerHTML === "X" && btn[8].innerHTML === "X") ||
        (btn[0].innerHTML === "X" && btn[3].innerHTML === "X" && btn[6].innerHTML === "X") || 
        (btn[1].innerHTML === "X" && btn[4].innerHTML === "X" && btn[7].innerHTML === "X") ||
        (btn[2].innerHTML === "X" && btn[5].innerHTML === "X" && btn[8].innerHTML === "X") ||
        (btn[0].innerHTML === "X" && btn[4].innerHTML === "X" && btn[8].innerHTML === "X") || 
        (btn[2].innerHTML === "X" && btn[4].innerHTML === "X" && btn[6].innerHTML === "X") ) 
    {
        setTimeout(function() {
            alert("X wins");
            document.location.reload();
        }, 100);
        
    }

    else if( (btn[0].innerHTML === "O" && btn[1].innerHTML === "O" && btn[2].innerHTML === "O") || 
        (btn[3].innerHTML === "O" && btn[4].innerHTML === "O" && btn[5].innerHTML === "O") ||
        (btn[6].innerHTML === "O" && btn[7].innerHTML === "O" && btn[8].innerHTML === "O") ||
        (btn[0].innerHTML === "O" && btn[3].innerHTML === "O" && btn[6].innerHTML === "O") || 
        (btn[1].innerHTML === "O" && btn[4].innerHTML === "O" && btn[7].innerHTML === "O") ||
        (btn[2].innerHTML === "O" && btn[5].innerHTML === "O" && btn[8].innerHTML === "O") ||
        (btn[0].innerHTML === "O" && btn[4].innerHTML === "O" && btn[8].innerHTML === "O") || 
        (btn[2].innerHTML === "O" && btn[4].innerHTML === "O" && btn[6].innerHTML === "O") ) 
    {
        setTimeout(function() {
            alert("O wins");
            document.location.reload();
        }, 100);
    }
    
    else if( btn[0].innerHTML !== "" &&
        btn[1].innerHTML !== "" &&
        btn[2].innerHTML !== "" &&
        btn[3].innerHTML !== "" &&
        btn[4].innerHTML !== "" &&
        btn[5].innerHTML !== "" &&
        btn[6].innerHTML !== "" &&
        btn[7].innerHTML !== "" &&
        btn[8].innerHTML !== "" )
    {
        setTimeout(function() {
            alert("it's draw");
            document.location.reload();
        }, 100);
    }

}