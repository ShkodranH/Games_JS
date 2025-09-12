const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024; // 64 * 16
canvas.height = 576; // 64 * 9

class Player {
    constructor({ position, width, height }) {
        this.position = position;
        this.width = width;
        this.height = height;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
}

const player = new Player();

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
}
animate();

addEventListener('keydown', ({key}) => {
    switch(key) {
        case 'w': break;
        case 'a': break;
        case 's': break;
        case 'd': break;
    }
});
addEventListener('keyup', ({key}) => {
    switch(key) {
        case 'w': break;
        case 'a': break;
        case 's': break;
        case 'd': break;
    }
});