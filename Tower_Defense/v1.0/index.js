import { waypoints, placementData } from './data.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 768;
const unitSize = 64;

const backgroundImg = new Image();

class Sprite {
    constructor({ position, offset = { x: 0, y: 0 }, imgSrc, frames = { max: 1 } }) {
        this.position = position;
        this.offset = offset;
        this.image = new Image();
        this.image.src = imgSrc;
        this.frames = {
            max: frames.max,
            current: 0,
            elapsed: 0,
            hold: 3
        }
    }
    draw() {
        const crop = { position: { x: this.image.width / this.frames.max * this.frames.current, y: 0 }, 
            width: this.image.width / this.frames.max, height: this.image.height };
        
        ctx.drawImage(this.image, crop.position.x, crop.position.y, crop.width, crop.height, 
            this.position.x + this.offset.x, this.position.y + this.offset.y, crop.width, crop.height);
    }
    update() {
        this.frames.elapsed++;
        if(this.frames.elapsed % this.frames.hold === 0) {
            this.frames.current++;
            this.frames.current %= this.frames.max;
        }
    }
}

class Enemy extends Sprite {
    constructor({ position }) {
        super({ position, imgSrc: './images/orc.png', frames: { max: 7 } })
        this.radius = 50;
        this.waypointIndex = 0;
        this.center = { x: this.position.x + this.radius, y: this.position.y + this.radius };
        this.health = 100;
        this.speed = 3;
    }
    draw() {
        super.draw();

        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y - 15, this.radius * 2, 10)
        ctx.fillStyle = 'green'
        ctx.fillRect(this.position.x, this.position.y - 15, this.health, 10)
    }
    update() {
        this.draw();
        super.update();

        const waypoint = waypoints[this.waypointIndex];
        const angle = Math.atan2(waypoint.y - this.center.y, waypoint.x - this.center.x);
        this.position.x += Math.cos(angle) * this.speed;
        this.position.y += Math.sin(angle) * this.speed;
        this.center = { x: this.position.x + this.radius, y: this.position.y + this.radius };
        
        if(Math.abs(Math.round(this.center.x) - waypoint.x) < Math.abs(this.speed) 
        && Math.abs(Math.round(this.center.y) - waypoint.y) < Math.abs(this.speed) 
        && this.waypointIndex < waypoints.length - 1)
            this.waypointIndex++;
    }
}

class PlacementTile {
    constructor({ position }) {
        this.position = position;
        this.color = 'rgba(255, 255, 255, 0.15)';
        this.occupied = false;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, unitSize, unitSize);
    }
    update(mouse) {
        this.draw();
        if(mouse.x > this.position.x && mouse.x < this.position.x + unitSize 
        && mouse.y > this.position.y && mouse.y < this.position.y + unitSize) {
            this.color = 'white';
        } else {
            this.color = 'rgba(255, 255, 255, 0.15)';
        }
    }
}

class Building extends Sprite {
    constructor({ position }) {
        super({ position, offset: { x: 0, y: -80 }, imgSrc: './images/tower.png', frames: { max: 19 } })
        this.center = { x: this.position.x + unitSize, y: this.position.y + unitSize / 2 };
        this.projectiles = [];
        this.radius = 250;
        this.target;
    }
    update() {
        this.draw();
        if(this.target || !this.target && this.frames.current !== 0) 
            super.update();

        if(this.target && this.frames.current === 6 
        && this.frames.elapsed % this.frames.hold === 0) 
            this.projectiles.push(new Projectile({ position: { x: this.center.x - 20, y: this.center.y - 110 }, enemy: this.target }));
    }
}

class Projectile extends Sprite {
    constructor({ position, enemy, imgSrc }) {
        super({ position, imgSrc: './images/projectile.png' })
        this.velocity = { x: 0, y: 0 };
        this.radius = 10;
        this.speed = 7;
        this.enemy = enemy;
    }
    update() {
        this.draw();
        const angle = Math.atan2(this.enemy.center.y - this.position.y, this.enemy.center.x - this.position.x);
        this.position.x += Math.cos(angle) * this.speed;
        this.position.y += Math.sin(angle) * this.speed;
    }
}

const placementTiles = [];
placementData.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1) 
            placementTiles.push(new PlacementTile({ position: { x: j * unitSize, y: i * unitSize } }));
    });
});

const buildings = [];
let activeTile = undefined;
let hearts = 10;
let coins = 100;
const explosions = [];

const enemies = [];
let spawnCount = 5;
function spawnEnemies(spawnCount) {
    for(let i = 1; i < spawnCount + 1; i++)
        enemies.push(new Enemy({ position: { x: waypoints[0].x - i * 150, y: waypoints[0].y } }));
}
spawnEnemies(spawnCount);

function animate() {
    let animateId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImg.src = './images/gameMap.png';
    ctx.drawImage(backgroundImg, 0, 0);
    for(let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.update();
        if(enemy.position.x > canvas.width) {
            document.querySelector('#hearts').innerHTML = --hearts;
            enemies.splice(i, 1);
            if(hearts === 0) {
                cancelAnimationFrame(animateId);
                document.querySelector('.text').style.display = 'flex';
            }
        }
    }

    for(let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i];
        explosion.draw();
        explosion.update();
        if(explosion.frames.current >= explosion.frames.max - 1)
            explosions.splice(i, 1);
    }

    if(enemies.length === 0) spawnEnemies(spawnCount += 2);

    placementTiles.forEach(tile => tile.update(mouse));

    buildings.forEach(building => {
        building.update();
        building.target = null;
        const validEnemies = enemies.filter(enemy => {
            const dist = Math.hypot(enemy.center.x - building.center.x, enemy.center.y - building.center.y);
            return dist < enemy.radius + building.radius;
        });
        building.target = validEnemies[0];

        for(let i = building.projectiles.length - 1; i >= 0; i--) {
            const projectile = building.projectiles[i];
            projectile.update();
            const xDiff = projectile.enemy.center.x - projectile.position.x;
            const yDiff = projectile.enemy.center.y - projectile.position.y;
            const dist = Math.hypot(xDiff, yDiff);
            if(dist < projectile.enemy.radius + projectile.radius) {
                projectile.enemy.health -= 20;
                if(projectile.enemy.health <= 0) {
                    const enemyIndex = enemies.findIndex(enemy => projectile.enemy === enemy);
                    if(enemyIndex > -1) {
                        enemies.splice(enemyIndex, 1);
                        document.querySelector('#coins').innerHTML = coins += 25;
                    }
                }
                building.projectiles.splice(i, 1);
                explosions.push(new Sprite({ position: { x: projectile.position.x, y: projectile.position.y }, 
                    imgSrc: './images/explosion.png', frames: { max: 4 } }));
            }
        }
    });
}

const mouse = { x: undefined, y: undefined };
canvas.addEventListener('click', e => {
    if(activeTile && !activeTile.occupied && coins >= 50) {
        document.querySelector('#coins').innerHTML = coins -= 50;
        buildings.push(new Building({ position: { x: activeTile.position.x, y: activeTile.position.y } }));
        activeTile.occupied = true;
        buildings.sort((a, b) => a.position.y - b.position.y);
    }
});
canvas.addEventListener('mousemove', e => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    console.log(e)
    activeTile = null;
    for(let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i];
        if(mouse.x > tile.position.x && mouse.x < tile.position.x + unitSize 
        && mouse.y > tile.position.y && mouse.y < tile.position.y + unitSize) {
            activeTile = tile;
            break;
        }
    }
});
animate();