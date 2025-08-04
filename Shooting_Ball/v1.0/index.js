const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
const halfW = canvas.width / 2;
const halfH = canvas.height / 2;

const scoreEl = document.querySelector('#scoreEl');
const startBtn = document.querySelector('#startBtn');
const modalEl = document.querySelector('#modalEl');
const bigScoreEl = document.querySelector('#bigScoreEl');
let score = 0;

class Player {
    constructor(posX, posY, radius, color) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Projectile {
    constructor(posX, posY, radius, color, velX, velY) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
        this.velX = velX;
        this.velY = velY;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.draw();
        this.posX += this.velX;
        this.posY += this.velY;
    }
}

class Enemy {
    constructor(posX, posY, radius, color, velX, velY) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
        this.velX = velX;
        this.velY = velY;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.draw();
        this.posX += this.velX;
        this.posY += this.velY;
    }
}

class Particle {
    constructor(posX, posY, radius, color, velX, velY) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
        this.velX = velX;
        this.velY = velY;
        this.alpha = 1;
        this.friction = 0.98;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    update() {
        this.draw();
        this.velX *= this.friction;
        this.velY *= this.friction;
        this.posX += this.velX;
        this.posY += this.velY;
        this.alpha -= 0.01;
    }
}

let player = new Player(halfW, halfH, 20, 'white');
let projectiles = [];
let enemies = [];
let particles = [];

function init() {
    player = new Player(halfW, halfH, 20, 'white');
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEl.innerHTML = score;
    animate();
    spawnEnemies();
    modalEl.style.display = 'none';
}

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.floor(Math.random() * 30) + 5;
        let posX, posY;
        if(Math.random() < 0.5) {
            posX = (Math.random() < 0.5) ? 0 - radius : canvas.width + radius;
            posY = Math.random() * canvas.height;
        } else {
            posX = Math.random() * canvas.width;
            posY = (Math.random() < 0.5) ? 0 - radius : canvas.height + radius;
        }
        const color = `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`;
        const angle = Math.atan2(halfH - posY, halfW - posX);
        enemies.push(new Enemy(posX, posY, radius, color, Math.cos(angle), Math.sin(angle)));
    },1000);
}

function animate() {
    let animateId = requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    particles.forEach((particle, ind) => {
        if(particle.alpha <= 0)
            particles.splice(ind, 1);
        else
            particle.update();
    });
    //remove projectiles off screen
    projectiles.forEach((projectile, ind) => {
        if(projectile.posX + projectile.radius < 0 || projectile.posX - projectile.radius > canvas.width
        || projectile.posY + projectile.radius < 0 || projectile.posY - projectile.radius > canvas.height) 
            setTimeout(() => projectiles.splice(ind, 1), 0);
        else
            projectile.update();
    });
    enemies.forEach((enemy, i) => {
        enemy.update();
        // enemy touch player
        const dist = Math.hypot(player.posX - enemy.posX, player.posY - enemy.posY);
        if(dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animateId);
            modalEl.style.display = 'flex';
            bigScoreEl.innerHTML = score;
        }
        // projectile touch enemy
        projectiles.forEach((projectile, j) => {
            const dist = Math.hypot(projectile.posX - enemy.posX, projectile.posY - enemy.posY);
            if(dist - enemy.radius - projectile.radius < 1) {
                setTimeout(() => projectiles.splice(j, 1), 0);

                // create explosion
                for (let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(new Particle(projectile.posX, projectile.posY, Math.random() * 2, enemy.color, 
                        (Math.random() - 0.5) * (Math.random() * 6), (Math.random() - 0.5) * (Math.random() * 6)));
                }
                
                if(enemy.radius > 20) {
                    score += 100;
                    scoreEl.innerHTML = score;
                    gsap.to(enemy, {radius: enemy.radius - 10});
                } else {
                    score += 250;
                    scoreEl.innerHTML = score;
                    setTimeout(() => enemies.splice(i, 1), 0);
                }
            }
        });
    });
}

addEventListener('click', e => {
    const angle = Math.atan2(e.clientY - halfH, e.clientX - halfW);
    projectiles.push(new Projectile(halfW, halfH, 5, 'white', Math.cos(angle) * 5, Math.sin(angle) * 5));
});
startBtn.addEventListener('click', () => init());