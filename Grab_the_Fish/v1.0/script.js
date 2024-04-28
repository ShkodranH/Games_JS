var QkeyPress = 0;
var PkeyPress = 0;
var execute1 = 0;
var execute2 = 0;
var player1 = 0;
var player2 = 0;

(function loop() {
    var randTime = Math.floor(Math.random() * 2500 + 1500);
    var randFish = Math.floor(Math.random() * 2);

    setTimeout(function() {
        document.getElementById('fish').style.display = "flex";

        if(randFish == 0) document.getElementById('fish').src = "images/fish.png";
        else if(randFish == 1) document.getElementById('fish').src = "images/fishbone.png";

        setTimeout(function() {
            document.getElementById('fish').style.display = "none";
        }, 800)

        loop();  
    }, randTime);
}());

function keypress(event) {
    if (event.keyCode == 81) {
        QkeyPress +=1;
        let date = new Date();
        let miliseconds = date.getTime();
        if((miliseconds - execute1) > 500 && QkeyPress == 1) {
            execute1 = miliseconds;
            document.getElementById('cat1div').style.width = "30vw";
            document.getElementById('cat1').style.left = "40vw";

            if (document.getElementById('fish').style.display == "flex" &&
                document.getElementById('fish').getAttribute('src') == "images/fish.png") 
            {
                player1 += 1;
                document.getElementById('fish').src = "";
                document.getElementById('fish').style.display = "none";
                document.getElementById('score1').innerHTML = player1;
                if(player1 == 3) {
                    setTimeout(function() {
                        alert("Player1 Wins");
                        document.location.reload();
                    }, 200);
                }
            }
            else if (document.getElementById('fish').style.display == "flex" &&
                document.getElementById('fish').getAttribute('src') == "images/fishbone.png") 
            {
                player1 -= 2;
                document.getElementById('fish').src = "";
                document.getElementById('fish').style.display = "none";
                document.getElementById('score1').innerHTML = player1;
            }
        }
        else {
            document.getElementById('cat1div').style.width = "0vw";
            document.getElementById('cat1').style.left = "20vw";
        }
    }

    if(event.keyCode == 80) {
        PkeyPress += 1;
        let date = new Date();
        let miliseconds = date.getTime();
        if((miliseconds - execute2) > 500 && PkeyPress == 1) {
            execute2 = miliseconds;
            document.getElementById('cat2div').style.width = "30vw";
            document.getElementById('cat2').style.right = "40vw";

            if (document.getElementById('fish').style.display == "flex" &&
                document.getElementById('fish').getAttribute('src') == "images/fish.png") 
            {
                player2 += 1;
                document.getElementById('fish').src = "";
                document.getElementById('fish').style.display = "none";
                document.getElementById('score2').innerHTML = player2;
                if(player2 == 3) {
                    setTimeout(function() {
                        alert("Player2 Wins");
                        document.location.reload();
                    }, 200);
                }
            }
            else if (document.getElementById('fish').style.display == "flex" &&
                document.getElementById('fish').getAttribute('src') == "images/fishbone.png") 
            {
                player2 -= 2;
                document.getElementById('fish').src = "";
                document.getElementById('fish').style.display = "none";
                document.getElementById('score2').innerHTML = player2;
            }
        }
        else {
            document.getElementById('cat2div').style.width = "0vw";
            document.getElementById('cat2').style.right = "20vw";
        }
    }
}


function keyrelease(event) {
    if (event.keyCode == 81) {
        QkeyPress = 0;
        document.getElementById('cat1div').style.width = "0vw";
        document.getElementById('cat1').style.left = "20vw";
    }
    if(event.keyCode == 80) {
        PkeyPress = 0;
        document.getElementById('cat2div').style.width = "0vw";
        document.getElementById('cat2').style.right = "20vw";
    }
}