const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth; // window.innerWidth
canvas.height = innerHeight;
class Player {
    constructor() {
        this.position = { x: 100, y: 100 }
        this.velocity = { x: 0, y: 1 }
        this.width = 30;
        this.height = 30;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
    }
}

const player = new Player();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
}
animate();