var rez = 0;
function func1() {
    document.getElementById('div').style.display='none';
    document.getElementById('div1').style.display='block';
}
function func2(choice) {
    if (choice=='yes1') { rez += 16; }
    document.getElementById('div1').style.display='none';
    document.getElementById('div2').style.display='block';
}
function func3(choice) {
    if (choice=='yes2') { rez += 2; }
    document.getElementById('div2').style.display='none';
    document.getElementById('div3').style.display='block';
}
function func4(choice) {
    if (choice=='yes3') { rez += 8; }
    document.getElementById('div3').style.display='none';
    document.getElementById('div4').style.display='block';
}
function func5(choice) {
    if (choice=='yes4') { rez += 1; }
    document.getElementById('div4').style.display='none';
    document.getElementById('div5').style.display='block';
}
function func6(choice) {
    if (choice=='yes5') { rez += 32; }
    document.getElementById('div5').style.display='none';
    document.getElementById('div6').style.display='block';
}
function func(choice) {
    if (choice=='yes6') { rez += 4; }
    document.getElementById('div6').style.display='none';
    document.getElementById('lastdiv').style.display='flex';
    document.getElementById('result').innerHTML = rez;
}
function reset(loop) {
    if (loop =='lastbtn') { rez = 0; }
    document.getElementById('div').style.display='flex';
    document.getElementById('lastdiv').style.display='none';
}