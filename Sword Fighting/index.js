const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// canvas.width = 576 / innerHeight * innerWidth;
canvas.width = 1024;
canvas.height = 576;
const gravity = 0.7;
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({ position, velocity, offset, color = 'red' }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50
        this.height = 150;
        this.lastKey;
        this.attackBox = { 
            position: { x: this.position.x, y: this.position.y },
            offset, width: 100, height: 50 }
        this.isAttacking;
        this.color = color;
    }
    draw() {
        //player
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        // attack box
        if(this.isAttacking) {
            ctx.fillStyle = 'green';
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }
    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height)
            this.velocity.y = 0;
        else  
            this.velocity.y += gravity;
    }
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}

const player = new Sprite({
    position: { x: 0, y: 0 }, 
    velocity: { x: 0, y: 10 },
    offset: { x: 0, y: 10 }
});

const enemy = new Sprite({
    position: { x: 400, y: 100 },
    velocity: { x: 0, y: 10 },
    offset: { x: -50, y: 10 },
    color: 'blue'
});

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    d: { pressed: false },
    ArrowUp:    { pressed: false },
    ArrowLeft:  { pressed: false },
    ArrowRight: { pressed: false },
}

function rectangularCollision({ rect1, rect2 }) {
    return ( rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x
    && rect1.attackBox.position.x <= rect2.position.x + rect2.width
    && rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y
    && rect1.attackBox.position.y <= rect2.position.y + rect2.height)
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    //player movement
    player.velocity.x = 0;
    if(keys.a.pressed && player.lastKey === 'a')
        player.velocity.x = -5;
    else if(keys.d.pressed && player.lastKey === 'd')
        player.velocity.x = 5;

    //enemy movement
    enemy.velocity.x = 0;
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft')
        enemy.velocity.x = -5;
    else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight')
        enemy.velocity.x = 5;

    //dettect collision
    if(rectangularCollision({ rect1: player, rect2: enemy}) && player.isAttacking) {
        player.isAttacking = false;
    }
    if(rectangularCollision({ rect1: enemy, rect2: player}) && enemy.isAttacking) {
        enemy.isAttacking = false;
    }
}
animate();

addEventListener('keydown', e => {
    switch(e.key) {
        case 'w':
            player.velocity.y -= 20;
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case ' ':
            player.attack();
            break;
        
        case 'ArrowUp':
            enemy.velocity.y -= 20;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowDown':
            enemy.attack();
            break;
    }
});

addEventListener('keyup', e => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;

        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }
});