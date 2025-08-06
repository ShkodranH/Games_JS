const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const unitSize = 40;
canvas.width = unitSize * 11;
canvas.height = unitSize * 13;

const finalEl = document.querySelector('#finalEl');
const scoreEl = document.querySelector('#scoreEl');
let score = 0;

class Boundary {
    constructor({ position, image }) {
        this.position = position;
        this.image = image;
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, unitSize, unitSize);
    }
}

class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.radians = 0.75;
        this.openRate = 0.1;
        this.rotation = 0;
    }
    draw() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.translate(-this.position.x, -this.position.y);
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, this.radians, (Math.PI * 2) - this.radians);
        ctx.lineTo(this.position.x, this.position.y)
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        if(this.radians < 0 || this.radians > 0.75)
            this.openRate *= -1;
        this.radians += this.openRate;
    }
}

class Ghost {
    constructor({ position, velocity, color }) {
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.radius = 15;
        this.prevCollisions = [];
        this.scared = false;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.scared ? 'blue' : this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Pellet {
    constructor({ position }) {
        this.position = position;
        this.radius = 3;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
}

class PowerUp {
    constructor({ position }) {
        this.position = position;
        this.radius = 7;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
}

const boundaries = [];
const pellets = [];
const powerUps = [];
const player = new Player({ position: { x: unitSize * 1.5, y: unitSize * 1.5 }, velocity: { x: 0, y: 0 } });
const ghosts = [
    new Ghost({ position: { x: unitSize * 6.5, y: unitSize * 1.5 }, velocity: { x: 2, y: 0 }, color: 'red' }),
    new Ghost({ position: { x: unitSize * 3.5, y: unitSize * 7.5 }, velocity: { x: 2, y: 0 }, color: 'pink' }),
    new Ghost({ position: { x: unitSize * 8.5, y: unitSize * 9.5 }, velocity: { x: 2, y: 0 }, color: 'orange' })
]
const keys = {
    w: { pressed: false }, 
    a: { pressed: false }, 
    s: { pressed: false }, 
    d: { pressed: false }
}
let lastkey = '';

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', 'o', ' ', '<', '5', '>', ' ', 'o', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', '_', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', '<', '>', ' ', ' ', ' ', '<', '>', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', '^', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', 'o', ' ', '<', '+', '>', ' ', 'o', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', '_', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', '<', '>', ' ', ' ', ' ', '<', '>', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', '^', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', 'o', ' ', '<', '7', '>', ' ', 'o', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '*', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
];
function creatImg(src) {
    const image = new Image();
    image.src = `./img/${src}.png`;
    return image;
}
map.forEach((row, i) => {
    row.forEach((cell, j) => {
        switch(cell) {
            case '-': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('pipeHorizontal') })); break;
            case '|': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('pipeVertical') })); break;
            case '1': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('pipeCorner1') })); break;
            case '2': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('pipeCorner2') })); break;
            case '3': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('pipeCorner3') })); break;
            case '4': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('pipeCorner4') })); break;
            case 'o': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('block') })); break;
            case '<': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('capLeft') })); break;
            case '>': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('capRight') })); break;
            case '^': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('capTop') })); break;
            case '_': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('capBottom') })); break;
            case '+': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('pipeCross') })); break;
            case '5': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('pipeConnectorBottom') })); break;
            case '7': boundaries.push(new Boundary({ position: { x: unitSize * j, y: unitSize * i }, image: creatImg('pipeConnectorTop') })); break;
            case ' ': pellets.push(new Pellet({ position: { x: (unitSize * j) + (unitSize / 2), y: (unitSize * i) + (unitSize / 2) } })); break;
            case '*': powerUps.push(new PowerUp({ position: { x: (unitSize * j) + (unitSize / 2), y: (unitSize * i) + (unitSize / 2) } })); break;
        }
    });
});

function collisionDetection({ circle, rectangle }) {
    const padding = (unitSize / 2) - circle.radius - 1;
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + unitSize + padding
        && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding
        && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding
        && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + unitSize + padding);
}

let animateId;
function animate() {
    animateId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(keys.w.pressed && lastkey === 'w') {
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collisionDetection({ circle: { ...player, velocity: { x: 0, y: -5 } }, rectangle: boundary })) {
                player.velocity.y = 0; 
                break;
            } else {
                player.velocity.y = -5;
            }
        }
    } else if(keys.a.pressed && lastkey === 'a') {
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collisionDetection({ circle: { ...player, velocity: { x: -5, y: 0 } }, rectangle: boundary })) {
                player.velocity.x = 0; 
                break;
            } else {
                player.velocity.x = -5;
            }
        }
    } else if(keys.s.pressed && lastkey === 's') {
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collisionDetection({ circle: { ...player, velocity: { x: 0, y: 5 } }, rectangle: boundary })) {
                player.velocity.y = 0; 
                break;
            } else {
                player.velocity.y = 5;
            }
        }
    } else if(keys.d.pressed && lastkey === 'd') {
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collisionDetection({ circle: { ...player, velocity: { x: 5, y: 0 } }, rectangle: boundary })) {
                player.velocity.x = 0; 
                break;
            } else {
                player.velocity.x = 5;
            }
        }
    }

    if(pellets.length === 0) {
        cancelAnimationFrame(animateId);
        finalEl.innerHTML = 'You Win';
    }

    for(let i = ghosts.length - 1; i >= 0; i--) {
        const ghost = ghosts[i];
        if(Math.hypot(ghost.position.x - player.position.x, ghost.position.y - player.position.y) < ghost.radius + player.radius) {
            if(ghost.scared) {
                ghosts.splice(i, 1);
            } else {
                cancelAnimationFrame(animateId);
                finalEl.innerHTML = 'You Lose';
            }
        }
    }

    for(let i = powerUps.length - 1; i >= 0; i--) {
        const powerUp = powerUps[i];
        powerUp.draw();
        if(Math.hypot(powerUp.position.x - player.position.x, powerUp.position.y - player.position.y) < powerUp.radius + player.radius) {
            powerUps.splice(i, 1);
            ghosts.forEach(ghost => {
                ghost.scared = true;
                setTimeout(() => ghost.scared = false, 5000);
            });
        }
    }

    for(let i = pellets.length - 1; i >= 0; i--) {
        const pellet = pellets[i];
        pellet.draw();
        if(Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius) {
            score += 10;
            scoreEl.innerHTML = score;
            pellets.splice(i, 1);
        }
    }

    boundaries.forEach(boundary => {
        boundary.draw();
        if(collisionDetection({ circle: player, rectangle: boundary }))
            player.velocity.x = player.velocity.y = 0;
    });
    player.update();

    ghosts.forEach((ghost) => {
        ghost.update();
        const collisions = [];

        boundaries.forEach(boundary => {
            if(!collisions.includes('right') &&
            collisionDetection({ circle: { ...ghost, velocity: { x: 2, y: 0 } }, rectangle: boundary }))
                collisions.push('right');
            if(!collisions.includes('left') &&
            collisionDetection({ circle: { ...ghost, velocity: { x: -2, y: 0 } }, rectangle: boundary }))
                collisions.push('left');
            if(!collisions.includes('down') &&
            collisionDetection({ circle: { ...ghost, velocity: { x: 0, y: 2 } }, rectangle: boundary }))
                collisions.push('down');
            if(!collisions.includes('up') &&
            collisionDetection({ circle: { ...ghost, velocity: { x: 0, y: -2 } }, rectangle: boundary }))
                collisions.push('up');
        });

        if(collisions.length > ghost.prevCollisions.length)
            ghost.prevCollisions = collisions;

        if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            if(ghost.velocity.x > 0) ghost.prevCollisions.push('right');
            else if(ghost.velocity.x < 0) ghost.prevCollisions.push('left');
            else if(ghost.velocity.y < 0) ghost.prevCollisions.push('up');
            else if(ghost.velocity.y > 0) ghost.prevCollisions.push('down');
            
            const pathways = ghost.prevCollisions.filter(collision => !collisions.includes(collision));
            const direction = pathways[Math.floor(Math.random() * pathways.length)];
        
            switch(direction) {
                case 'right': 
                    ghost.velocity.x = 2; 
                    ghost.velocity.y = 0; 
                    break;
                case 'left': 
                    ghost.velocity.x = -2; 
                    ghost.velocity.y = 0; 
                    break;
                case 'up': 
                    ghost.velocity.x = 0; 
                    ghost.velocity.y = -2; 
                    break;
                case 'down': 
                    ghost.velocity.x = 0; 
                    ghost.velocity.y = 2; 
                    break;
            }
            ghost.prevCollisions = [];
        }
    });
    if(player.velocity.x > 0) player.rotation = 0;
    else if(player.velocity.x < 0) player.rotation = Math.PI;
    else if(player.velocity.y > 0) player.rotation = Math.PI / 2;
    else if(player.velocity.y < 0) player.rotation = Math.PI * 1.5;
}
animate();

addEventListener('keydown', ({key}) => {
    switch(key) {
        case 'w': 
            keys.w.pressed = true; 
            lastkey = 'w';
            break;
        case 'a': 
            keys.a.pressed = true; 
            lastkey = 'a';
            break;
        case 's': 
            keys.s.pressed = true; 
            lastkey = 's';
            break;
        case 'd': 
            keys.d.pressed = true; 
            lastkey = 'd';
            break;
    }
});
addEventListener('keyup', ({key}) => {
    switch(key) {
        case 'w': keys.w.pressed = false; break;
        case 'a': keys.a.pressed = false; break;
        case 's': keys.s.pressed = false; break;
        case 'd': keys.d.pressed = false; break;
    }
});