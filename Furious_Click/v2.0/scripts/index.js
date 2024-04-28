let level = 1;
let progress = 0;

function levelUp() {
    level++;
    progress = 0;
    document.querySelector('.level').innerHTML = 'Level ' + level; 
}

function changeScene (prev, next) {
    document.querySelector(prev).style.display = 'none';
    document.querySelector(next).style.display = 'flex';
}

document.querySelector('.start').addEventListener('click', () => {
    changeScene('.intro', '.stage');
});
