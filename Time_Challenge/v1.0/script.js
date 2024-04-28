var player1timer = 0;
var player2timer = 0;

var AkeyPressed = false;
var LkeyPressed = false;

var t1;
var t2;

var time = Math.floor(Math.random() * 1501 + 1000);

var minutes = Math.floor(time / 100);
var seconds = Math.floor(time % 100);

if(seconds < 10) {
    seconds = "0" + seconds;
}

document.getElementById('time').innerHTML = minutes + ":" + seconds;

function keyboard(event) {
    if (event.keyCode == 65) {
        clearInterval(t1);
        AkeyPressed = true;
        document.getElementById('pressbtn1').style.height = "1.5vh";
    }
    if (event.keyCode == 76) {
        clearInterval(t2);
        LkeyPressed = true;
        document.getElementById('pressbtn2').style.height = "1.5vh";
    }

    if(AkeyPressed && LkeyPressed) {
        let opct = 0;
        document.getElementById('timer1').getElementsByTagName('p')[0].style.opacity = opct;
        document.getElementById('timer2').getElementsByTagName('p')[0].style.opacity = opct;

        document.getElementById('timer1').getElementsByTagName('p')[0].style.animationName = "";
        document.getElementById('timer2').getElementsByTagName('p')[0].style.animationName = "";

        setTimeout(function() {
            let res1 = Math.abs(time - player1timer);
            let res2 = Math.abs(time - player2timer);

            if(res1 < res2) {
                alert("Player1 Wins");
                document.location.reload();
            }
            else if(res1 > res2) {
                alert("Player2 Wins");
                document.location.reload();
            }
            else {
                alert("It's a Draw");
                document.location.reload();
            }
            
        }, 2100);

        setInterval(function() {
            opct += 0.01;
            document.getElementById('timer1').getElementsByTagName('p')[0].style.opacity = opct;
            document.getElementById('timer2').getElementsByTagName('p')[0].style.opacity = opct;
        }, 20);
    }
}

function timer1() {
    document.getElementById('timer1').getElementsByTagName('p')[0].style.animationName = "anim1";
    t1 = setInterval(function() {
        player1timer++;
        let minutes1 = Math.floor(player1timer / 100);
        let seconds1 = Math.floor(player1timer % 100);

        if(minutes1 < 10) {
            minutes1 = "0" + minutes1;
        }
        if(seconds1 < 10) {
            seconds1 = "0" + seconds1;
        }
        document.getElementById('timer1').getElementsByTagName('p')[0].innerHTML = 
        minutes1 + ":" + seconds1;

        if (player1timer == 3000) {
            clearInterval(t1);

            let opct = 0;
            document.getElementById('timer1').getElementsByTagName('p')[0].style.opacity = opct;
            document.getElementById('timer2').getElementsByTagName('p')[0].style.opacity = opct;

            document.getElementById('timer1').getElementsByTagName('p')[0].style.animationName = "";
            document.getElementById('timer2').getElementsByTagName('p')[0].style.animationName = "";

            setTimeout(function() {
                let res1 = Math.abs(time - player1timer);
                let res2 = Math.abs(time - player2timer);

                if(res1 < res2) {
                    alert("Player1 Wins");
                    document.location.reload();
                }
                else if(res1 > res2) {
                    alert("Player2 Wins");
                    document.location.reload();
                }
                else {
                    alert("It's a Draw");
                    document.location.reload();
                }        
            }, 2100);

            setInterval(function() {
                opct += 0.01;
                document.getElementById('timer1').getElementsByTagName('p')[0].style.opacity = opct;
                document.getElementById('timer2').getElementsByTagName('p')[0].style.opacity = opct;
            }, 20);
        }
    }, 10);
}

function timer2() {
    document.getElementById('timer2').getElementsByTagName('p')[0].style.animationName = "anim1";
    t2 = setInterval(function() {
        player2timer++;
        let minutes2 = Math.floor(player2timer / 100);
        let seconds2 = Math.floor(player2timer % 100);

        if(minutes2 < 10) {
            minutes2 = "0" + minutes2;
        }
        if(seconds2 < 10) {
            seconds2 = "0" + seconds2;
        }
        document.getElementById('timer2').getElementsByTagName('p')[0].innerHTML = 
        minutes2 + ":" + seconds2;

        if (player2timer == 3000) {
            clearInterval(t2);

            let opct = 0;
            document.getElementById('timer1').getElementsByTagName('p')[0].style.opacity = opct;
            document.getElementById('timer2').getElementsByTagName('p')[0].style.opacity = opct;

            document.getElementById('timer1').getElementsByTagName('p')[0].style.animationName = "";
            document.getElementById('timer2').getElementsByTagName('p')[0].style.animationName = "";

            setTimeout(function() {
                let res1 = Math.abs(time - player1timer);
                let res2 = Math.abs(time - player2timer);

                if(res1 < res2) {
                    alert("Player1 Wins");
                    document.location.reload();
                }
                else if(res1 > res2) {
                    alert("Player2 Wins");
                    document.location.reload();
                }
                else {
                    alert("It's a Draw");
                    document.location.reload();
                }        
            }, 2100);

            setInterval(function() {
                opct += 0.01;
                document.getElementById('timer1').getElementsByTagName('p')[0].style.opacity = opct;
                document.getElementById('timer2').getElementsByTagName('p')[0].style.opacity = opct;
            }, 20);
        }
    }, 10);
}

function start() {
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display = "flex";
    setTimeout(function() {
        timer1();
        timer2();
    }, 2000);  
}