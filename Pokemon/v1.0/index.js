import { collision, battleZones } from './data.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
const unitSize = 48;
const offset = { x: -740, y: -600 };

const collisionMap = [];
for (let i = 0; i < collision.length; i += 70)
    collisionMap.push(collision.slice(i, i + 70));

const battleZonesMap = [];
for (let i = 0; i < battleZones.length; i += 70)
    battleZonesMap.push(battleZones.slice(i, i + 70));

class Boundary {
    constructor({ position }) {
        this.position = position;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(this.position.x, this.position.y, unitSize, unitSize);
    }
}

class Sprite {
    constructor({ position, image, frames = 1, sprites, animate = false, frameHold = 10, rotation = 0 }) {
        this.position = position;
        this.image = image;
        this.frames = frames;
        this.frameVal = 0;
        this.frameCount = 0;
        this.frameHold = frameHold;
        this.width = this.image.width / this.frames;
        this.height = this.image.height;
        this.animate = animate;
        this.sprites = sprites;
        this.opacity = 1;
        this.rotation = rotation;
    }
    draw() {
        ctx.save();
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.image, this.frameVal * this.width, 0, this.width, this.height,
            this.position.x, this.position.y, this.width, this.height);
        ctx.restore();

        if (!this.animate) return;
        this.frameCount++;
        if (this.frameCount % this.frameHold === 0) {
            this.frameVal++
            this.frameVal %= this.frames;
        }
    }
}

class Monster extends Sprite {
    constructor({ position, image, frames = 1, sprites, animate = false, frameHold = 10, rotation = 0, isEnemy = false, name, attacks }) {
        super({ position, image, frames, sprites, animate, frameHold, rotation })
        this.health = 100;
        this.isEnemy = isEnemy;
        this.name = name;
        this.attacks = attacks;
    }
    faint() {
        document.querySelector('.dialogBox').innerHTML = this.name + ' fainted!';
        gsap.to(this.position, { y: this.position.y + 20});
        gsap.to(this, { opacity: 0 });
        audio.Victory.play();
        audio.Battle.stop();
    }
    attack({ attack, recipient, renderedSprites }) {
        document.querySelector('.dialogBox').style.display = 'block';
        document.querySelector('.dialogBox').innerHTML = this.name + ' used ' + attack.name;

        let healthBar = '#draggleHealth';
        if(this.isEnemy) healthBar = '#embyHealth';

        let rotation = 1;
        if(this.isEnemy) rotation = -2.2;

        recipient.health -= attack.damage;

        switch(attack.name) {
            case 'Fireball':
                audio.InitFireball.play();
                const fireballImg = new Image();
                fireballImg.src = './images/fireball.png';

                const fireball = new Sprite({ position: {x: this.position.x, y: this.position.y }, 
                    image: fireballImg, frames: 4, animate: true, rotation });
                renderedSprites.splice(1, 0, fireball);

                gsap.to(fireball.position, { x: recipient.position.x, y: recipient.position.y, 
                    onComplete: () => { 
                        audio.FireballHit.play();
                        gsap.to(healthBar, { width: recipient.health + '%' })
                        gsap.to(recipient.position, { x: recipient.position.x + 10,
                            yoyo: true, repeat: 5, duration: 0.08 });
                        gsap.to(recipient, { opacity: 0, repeat: 5, yoyo: true, duration: 0.08 });
                        renderedSprites.splice(1, 1); 
                    }
                });
                break
            case 'Tackle':
                const tl = gsap.timeline();

                let movementDist = 20;
                if(this.isEnemy) movementDist = -20;

                tl.to(this.position, { x: this.position.x - movementDist })
                    .to(this.position, { x: this.position.x + movementDist * 2, duration: 0.1, 
                        onComplete: () => { 
                            audio.TackleHit.play();
                            gsap.to(healthBar, { width: recipient.health + '%' });
                            gsap.to(recipient.position, { x: recipient.position.x + 10,
                                yoyo: true, repeat: 5, duration: 0.08 });
                            gsap.to(recipient, { opacity: 0, repeat: 5, yoyo: true, duration: 0.08 });
                        }
                    }).to(this.position, { x: this.position.x });
                break;
        }
    }
}

const boundaries = [];
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(new Boundary({ position: { x: j * unitSize + offset.x, y: i * unitSize + offset.y } }));
    });
});

const battleAreas = [];
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            battleAreas.push(new Boundary({ position: { x: j * unitSize + offset.x, y: i * unitSize + offset.y } }));
    });
});

const audio = {
    Map: new Howl({ src: './audio/map.wav', volume: 0.1, html5: true }),
    InitBattle: new Howl({ src: './audio/initBattle.wav', volume: 0.1, html5: true }),
    Battle: new Howl({ src: './audio/battle.mp3', volume: 0.1, html5: true }),
    TackleHit: new Howl({ src: './audio/tackleHit.wav', volume: 0.1, html5: true }),
    FireballHit: new Howl({ src: './audio/fireballHit.wav', volume: 0.1, html5: true }),
    InitFireball: new Howl({ src: './audio/initFireball.wav', volume: 0.1, html5: true }),
    Victory: new Howl({ src: './audio/victory.wav', volume: 0.1, html5: true }),
}

const image = new Image();
image.src = './images/PelletTown.png';
const foregroundImg = new Image();
foregroundImg.src = './images/foreground.png';
const playerImg = new Image();
playerImg.src = './images/playerDown.png';
const playerUpImg = new Image();
playerUpImg.src = './images/playerUp.png';
const playerLeftImg = new Image();
playerLeftImg.src = './images/playerLeft.png';
const playerRightImg = new Image();
playerRightImg.src = './images/playerRight.png';

const battleBg = new Image();
battleBg.src = './images/battleBackground.png';
const draggleImg = new Image();
draggleImg.src = './images/draggleSprite.png';
const embyImg = new Image();
embyImg.src = './images/embySprite.png';

const attacks = {
    Tackle: { name: 'Tackle', damage: 10, type: 'Normal', color: 'black' },
    Fireball: { name: 'Fireball', damage: 25, type: 'Fire', color: 'red' }
};
const monsters = {
    Emby: { position: { x: 280, y: 325 }, image: embyImg, frames: 4, animate: true, frameHold: 15, name: 'Emby', attacks: [attacks.Tackle, attacks.Fireball] },
    Draggle: { position: { x: 800, y: 100 }, image: draggleImg, frames: 4, animate: true, frameHold: 30, isEnemy: true, name: 'Draggle', attacks: [attacks.Tackle, attacks.Fireball] }
};

const player = new Sprite({
    position: { x: canvas.width / 2 - 192 / 8, y: canvas.height / 2 - 68 / 8 }, image: playerImg, frames: 4,
    sprites: { up: playerUpImg, left: playerLeftImg, down: playerImg, right: playerRightImg } });
const background = new Sprite({ position: { x: offset.x, y: offset.y }, image: image });
const foreground = new Sprite({ position: { x: offset.x, y: offset.y }, image: foregroundImg });

const battleBackground = new Sprite({ position: { x: 0, y: 0}, image: battleBg });
let draggle, emby, renderedSprites, queue;

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
};
let lastKey = '';
const battle = { initiated: false };

const movables = [background, foreground, ...boundaries, ...battleAreas];

function collisionDetection({ rect1, rect2 }) {
    return (rect1.position.x + rect1.width >= rect2.position.x
        && rect1.position.x <= rect2.position.x + unitSize
        && rect1.position.y <= rect2.position.y + unitSize
        && rect1.position.y + rect1.height >= rect2.position.y);
}

function animate() {
    let animateId = requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => boundary.draw());
    battleAreas.forEach(battleArea => battleArea.draw());
    player.draw();
    foreground.draw();

    let moving = true;
    player.animate = false;
    if(battle.initiated) return;

    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleAreas.length; i++) {
            const battleArea = battleAreas[i];
            const overlappingArea = (Math.min(player.position.x + player.width, battleArea.position.x + unitSize) - Math.max(player.position.x, battleArea.position.x))
                * (Math.min(player.position.y + player.height, battleArea.position.y + unitSize) - Math.max(player.position.y, battleArea.position.y))
            
            if (collisionDetection({ rect1: player, rect2: battleArea }) 
            && overlappingArea > (player.width * player.height) / 4 && Math.random() < 0.01) {
                cancelAnimationFrame(animateId);
                audio.Map.stop();
                audio.InitBattle.play();
                audio.Battle.play();
                battle.initiated = true;
                gsap.to('.area', { opacity: 1, repeat: 3, yoyo: true, duration: 0.4, onComplete() { 
                    gsap.to('.area', { opacity: 1, duration: 0.4, onComplete() { 
                        initBattle();
                        animateBattle();
                        gsap.to('.area', { opacity: 0, duration: 0.4 });
                    }});
                }});
                break;
            }
        }
    }

    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (collisionDetection({ rect1: player, rect2: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y + 3 } } })) {
                moving = false;
                break;
            }
        }
        if (moving) movables.forEach(movable => movable.position.y += 3);
    }
    else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (collisionDetection({ rect1: player, rect2: { ...boundary, position: { x: boundary.position.x + 3, y: boundary.position.y } } })) {
                moving = false;
                break;
            }
        }

        if (moving) movables.forEach(movable => movable.position.x += 3);
    }
    else if (keys.s.pressed && lastKey === 's') {
        player.animate = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (collisionDetection({ rect1: player, rect2: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y - 3 } } })) {
                moving = false;
                break;
            }
        }
        if (moving) movables.forEach(movable => movable.position.y -= 3);
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (collisionDetection({ rect1: player, rect2: { ...boundary, position: { x: boundary.position.x - 3, y: boundary.position.y } } })) {
                moving = false;
                break;
            }
        }
        if (moving) movables.forEach(movable => movable.position.x -= 3);
    }
}
animate();

function initBattle() {
    document.querySelector('.userInterface').style.display = 'block';
    document.querySelector('.dialogBox').style.display = 'none';
    document.querySelectorAll('.status').forEach(e => e.style.width = '100%');
    document.querySelector('#attacksBox').replaceChildren();

    draggle = new Monster(monsters.Draggle);
    emby = new Monster(monsters.Emby);
    renderedSprites = [draggle, emby];
    queue = [];

    emby.attacks.forEach(attack => { 
        const button = document.createElement('button');
        button.innerHTML = attack.name;
        document.querySelector('#attacksBox').appendChild(button);
    });

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            emby.attack({ attack: selectedAttack, recipient: draggle, renderedSprites });
            if(draggle.health <= 0) {
                queue.push(() => draggle.faint());
                queue.push(() => gsap.to('.area', { opacity: 1, onComplete: () => { 
                    cancelAnimationFrame(animateBattleId) 
                    animate();
                    document.querySelector('.userInterface').style.display = 'none';
                    gsap.to('.area', { opacity: 0 });
                    battle.initiated = false;
                    audio.Map.play();
                } }));
            }
            const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)];
            queue.push(() => { draggle.attack({ attack: randomAttack, recipient: emby, renderedSprites })
                if(emby.health <= 0) {
                    queue.push(() => emby.faint());
                    queue.push(() => { gsap.to('.area', { opacity: 1, onComplete: () => { 
                        cancelAnimationFrame(animateBattleId) 
                        animate();
                        document.querySelector('.userInterface').style.display = 'none';
                        gsap.to('.area', { opacity: 0 });
                        battle.initiated = false;
                        audio.Map.play();
                    }})})
                }
            })
        });
        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            document.querySelector('.info').innerHTML = selectedAttack.type;
            document.querySelector('.info').style.color = selectedAttack.color;
        });
    });
}

let animateBattleId;
function animateBattle() {
    animateBattleId = requestAnimationFrame(animateBattle);
    battleBackground.draw();
    renderedSprites.forEach(sprite => sprite.draw());
    console.log(queue)
}
// initBattle();
// animateBattle();

document.querySelector('.dialogBox').addEventListener('click', (e) => {
    if(queue.length > 0) {
        queue[0]();
        queue.shift();
    } else {
        e.currentTarget.style.display = 'none';
    }
});

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
});
addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w': keys.w.pressed = false; break;
        case 'a': keys.a.pressed = false; break;
        case 's': keys.s.pressed = false; break;
        case 'd': keys.d.pressed = false; break;
    }
});

let clicked = false;
addEventListener('click', () => {
    if(!clicked) {
        audio.Map.play();
        clicked = true;
    }
});