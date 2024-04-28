var lives = 3;

function start() {
    document.getElementById('info').style.display = "none";
    document.getElementById('question1').style.display = "block";
    document.getElementById('live').style.display = "block";
    document.getElementById('number').innerHTML = lives;
}

function quest1(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question1').style.display = "none";
            document.getElementById('question2').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question1').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest2(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question2').style.display = "none";
            document.getElementById('question3').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question2').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest3(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question3').style.display = "none";
            document.getElementById('question4').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question3').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest4(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question4').style.display = "none";
            document.getElementById('question5').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question4').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest5(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question5').style.display = "none";
            document.getElementById('question6').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question5').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest6(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question6').style.display = "none";
            document.getElementById('question7').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question6').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest7(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question7').style.display = "none";
            document.getElementById('question8').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question7').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest8(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question8').style.display = "none";
            document.getElementById('question10').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question8').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest10(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question10').style.display = "none";
            document.getElementById('question11').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question10').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest11(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question11').style.display = "none";
            document.getElementById('question12').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question11').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest12(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question12').style.display = "none";
            document.getElementById('question13').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question12').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest13(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question13').style.display = "none";
            document.getElementById('question14').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question13').style.display = "none";   
                    document.getElementById('live').style.display = "none";
                }
        }
}
function quest14(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question14').style.display = "none";
            document.getElementById('question15').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question14').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest15(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question15').style.display = "none";
            document.getElementById('question16').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question15').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest16(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question16').style.display = "none";
            document.getElementById('question17').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question16').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest17(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question17').style.display = "none";
            document.getElementById('question18').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question17').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest18(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question18').style.display = "none";
            document.getElementById('question19').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question18').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest19(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question19').style.display = "none";
            document.getElementById('question20').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question19').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest20(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question20').style.display = "none";
            document.getElementById('question21').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives--;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question20').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest21(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question21').style.display = "none";
            document.getElementById('question22').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives= lives - 3;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question21').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest22(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question22').style.display = "none";
            document.getElementById('question23').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives= lives - 3;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question22').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest23(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question23').style.display = "none";
            document.getElementById('question24').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives= lives - 3;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question23').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest24(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question24').style.display = "none";
            document.getElementById('question25').style.display = "block";
        } 
    else if (answer == 'no')
        {
            lives= lives - 3;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question24').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}
function quest25(answer) {
    if (answer == 'yes') 
        {
            document.getElementById('question25').style.display = "none";
            document.getElementById('finish').style.display = "block";
            document.getElementById('live').style.display = "none";
        } 
    else if (answer == 'no')
        {
            lives= lives - 3;
            document.getElementById('number').innerHTML = lives;

            if (document.getElementById('number').innerHTML <= 0) 
                {
                    document.getElementById('lost').style.display = 'block';
                    document.getElementById('question25').style.display = "none";
                    document.getElementById('live').style.display = "none"; 
                }
        }
}

function fin () {
    document.getElementById('finish').style.display = "none";
    document.getElementById('info').style.display = "block";
    document.getElementById('lost').style.display = "none";
    document.getElementById('live').style.display = "none";
    lives = 3;
}