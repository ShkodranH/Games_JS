function rectangularCollision({ rect1, rect2 }) {
    return ( rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x
    && rect1.attackBox.position.x <= rect2.position.x + rect2.width
    && rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y
    && rect1.attackBox.position.y <= rect2.position.y + rect2.height)
}

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId);
    document.querySelector('.win-msg').style.display = 'flex';
    if(player.health === enemy.health)
        document.querySelector('.win-msg').innerHTML = 'Tie';
    else if(player.health > enemy.health)
        document.querySelector('.win-msg').innerHTML = 'Player 1 Wins';
    else if(player.health < enemy.health)
        document.querySelector('.win-msg').innerHTML = 'Player 2 Wins';  
    setTimeout(() => {
        cancelAnimationFrame(animateId);
        document.location.reload();
    }, 2000);
}

let timer = 60;
let timerId;
function decreaseTimer() {
    if(timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('.timer').innerHTML = timer
    }
    if(timer === 0) {
        determineWinner({ player, enemy, timerId });
    }
}