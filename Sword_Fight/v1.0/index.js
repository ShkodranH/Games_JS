const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
const gravity = 0.7;

const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: './images/background.png'
});
const shop = new Sprite({
    position: { x: 630, y: 128 },
    imageSrc: './images/shop.png',
    scale: 2.75, framesMax: 6
});


const player = new Fighter({
    position: { x: 200, y: 100 }, 
    velocity: { x: 0, y: 10 },
    imageSrc: './images/samuraiMack/Idle.png',
    scale: 2.5, framesMax: 8,
    offset: { x: 215, y: 157 },
    sprites: {
        idle: { imageSrc: './images/samuraiMack/Idle.png', framesMax: 8 },
        run: { imageSrc: './images/samuraiMack/Run.png', framesMax: 8 },
        jump: { imageSrc: './images/samuraiMack/Jump.png', framesMax: 2 },
        fall: { imageSrc: './images/samuraiMack/Fall.png', framesMax: 2 },
        attack1: { imageSrc: './images/samuraiMack/Attack1.png', framesMax: 6 },
        takeHit: { imageSrc: './images/samuraiMack/Take_Hit.png', framesMax: 4 },
        death: { imageSrc: './images/samuraiMack/Death.png', framesMax: 6 }
    },
    attackBox: { offset: { x: 80, y: 50 }, width: 160, height: 50 }
});
const enemy = new Fighter({
    position: { x: 800, y: 100 },
    velocity: { x: 0, y: 10 },
    imageSrc: './images/kenji/Idle.png',
    scale: 2.5, framesMax: 4,
    offset: { x: 215, y: 167 },
    sprites: {
        idle: { imageSrc: './images/kenji/Idle.png', framesMax: 4 },
        run: { imageSrc: './images/kenji/Run.png', framesMax: 8 },
        jump: { imageSrc: './images/kenji/Jump.png', framesMax: 2 },
        fall: { imageSrc: './images/kenji/Fall.png', framesMax: 2 },
        attack1: { imageSrc: './images/kenji/Attack1.png', framesMax: 4 },
        takeHit: { imageSrc: './images/kenji/Take_Hit.png', framesMax: 3 },
        death: { imageSrc: './images/kenji/Death.png', framesMax: 7 }
    },
    attackBox: { offset: { x: -170, y: 50 }, width: 160, height: 50 }
});

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    d: { pressed: false },
    ArrowUp:    { pressed: false },
    ArrowLeft:  { pressed: false },
    ArrowRight: { pressed: false },
}

decreaseTimer();

let animateId;
function animate() {
    animateId = requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    //player movement
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
        player.switchSprite('run');
    }
    else if(keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprite('run');
    }
    else {
        player.switchSprite('idle');
    }
    //jumping
    if(player.velocity.y < 0)
        player.switchSprite('jump');
    else if(player.velocity.y > 0)
        player.switchSprite('fall');

    //enemy movement
    enemy.velocity.x = 0;
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    }
    else {
        enemy.switchSprite('idle');
    }
    //jumping
    if(enemy.velocity.y < 0)
        enemy.switchSprite('jump');
    else if(enemy.velocity.y > 0)
        enemy.switchSprite('fall');

    //dettect collision and enemy hit
    if(rectangularCollision({ rect1: player, rect2: enemy}) 
    && player.isAttacking && player.frameCurrent === 4) {
        enemy.takeHit();
        player.isAttacking = false;
        gsap.to('.enemy-health', { width: enemy.health + '%' });
    }
    //missed attack
    if(player.isAttacking && player.frameCurrent === 4)
        player.isAttacking = false;

    if(rectangularCollision({ rect1: enemy, rect2: player}) 
    && enemy.isAttacking && enemy.frameCurrent === 2) {
        player.takeHit();
        enemy.isAttacking = false;
        gsap.to('.player-health', { width: player.health + '%' });
    }
    if(enemy.isAttacking && enemy.frameCurrent === 2)
        enemy.isAttacking = false;

    //end game based on health
    if(enemy.health <= 0 || player.health <= 0)
        determineWinner({ player, enemy, timerId });
}
animate();

addEventListener('keydown', e => {
    if(!player.dead) {
        switch(e.key) {
            case 'w': player.velocity.y -= 20; break;
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            case ' ': player.attack(); break;
        }
    }
    if(!enemy.dead) {
        switch(e.key) {
            case 'ArrowUp': enemy.velocity.y -= 20; break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break;
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break;
            case 'ArrowDown': enemy.attack(); break;
        }
    }
});

addEventListener('keyup', e => {
    switch(e.key) {
        case 'w': keys.w.pressed = false; break;
        case 'a': keys.a.pressed = false; break;
        case 'd': keys.d.pressed = false; break;

        case 'ArrowUp': keys.ArrowUp.pressed = false; break;
        case 'ArrowLeft': keys.ArrowLeft.pressed = false; break;
        case 'ArrowRight': keys.ArrowRight.pressed = false; break;
    }
});