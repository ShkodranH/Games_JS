const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 576 / innerHeight * innerWidth;
canvas.height = 576;
const gravity = 1.4;

class Player {
    constructor() {
        this.speed = 10;
        this.position = { x: 100, y: 100 }
        this.velocity = { x: 0, y: 0 }
        this.width = 66;
        this.height = 150;
        this.image = createImage('./images/spriteStandRight.png');
        this.frames = 0;
        this.sprites = {
            stand: { 
                right: createImage('./images/spriteStandRight.png'),
                left: createImage('./images/spriteStandLeft.png'),
                frameRate: 60,
                cropWidth: 177,
                width: 66
            },
            run: { 
                right: createImage('./images/spriteRunRight.png'),
                left: createImage('./images/spriteRunLeft.png'),
                frameRate: 30,
                cropWidth: 340,
                width: 127.875
            }
        };
        this.currentSprite = this.sprites.stand.right;
        this.currentCropWidth = this.sprites.stand.cropWidth;
        this.currentframeRate = this.sprites.stand.frameRate;
    }
    draw() {
        ctx.drawImage(
            this.currentSprite, 
            this.currentCropWidth * this.frames, 0, this.currentCropWidth, 400, 
            this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.frames++;
        this.frames %= this.currentframeRate;
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity;
    }
}

class Platform {
    constructor({x, y, image}) {
        this.position = { x, y } // { x: x, y: y }
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = { x, y } // { x: x, y: y }
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

function createImage(imageSrc) {
    const image = new Image();
    image.src = imageSrc;
    return image;
}

let player = new Player();
let platforms = [];
let genericObjects = [];
let scrollOffset = 0;

function init() {
    player = new Player();
    platforms = [
        new Platform({ x: 2991, y: 270, image: createImage('./images/platformSmall.png') }), 
        new Platform({ x: -1, y: 470, image: createImage('./images/platform.png') }), 
        new Platform({ x: 577, y: 470, image: createImage('./images/platform.png') }),
        new Platform({ x: 1300, y: 470, image: createImage('./images/platform.png') }),
        new Platform({ x: 2126, y: 470, image: createImage('./images/platform.png') }),
        new Platform({ x: 2703, y: 470, image: createImage('./images/platform.png') }),
        new Platform({ x: 3683, y: 470, image: createImage('./images/platform.png') })
    ];
    genericObjects = [
        new GenericObject({ x: -1, y: -1, image: createImage('./images/background.png') }),
        new GenericObject({ x: -1, y: -1, image: createImage('./images/hills.png') })
    ]
    scrollOffset = 0;
}

const keys = {
    right: { pressed: false },
    left: { pressed: false }
}

let animateId;
function animate() {
    animateId = requestAnimationFrame(animate);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    genericObjects.forEach(genericObject => genericObject.draw());
    platforms.forEach(platform => platform.draw());
    player.update();

    if(keys.right.pressed && player.position.x < 400)
        player.velocity.x = player.speed;
    else if((keys.left.pressed && player.position.x > 100)
    || (keys.left.pressed && scrollOffset === 0 && player.position.x))
        player.velocity.x = -player.speed;
    else {
        player.velocity.x = 0;
        if(keys.right.pressed) {
            scrollOffset += player.speed;
            platforms.forEach(platform => platform.position.x -= player.speed);
            genericObjects.forEach(genericObject => genericObject.position.x -= player.speed * 0.6);
        }
        else if(keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed;
            platforms.forEach(platform => platform.position.x += player.speed);
            genericObjects.forEach(genericObject => genericObject.position.x += player.speed * 0.6);
        }
    }

    platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y
        && player.position.y + player.height + player.velocity.y >= platform.position.y 
        && player.position.x + player.width >= platform.position.x
        && player.position.x <= platform.position.x + platform.width)
            player.velocity.y = 0;
    });

    if(scrollOffset > 3700) {
        ctx.font = "80px Fantasy";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("You Win!", canvas.width / 2, 130);
        setTimeout(function() {
            cancelAnimationFrame(animateId);
            document.location.reload();
        }, 1000);
    }
    if(player.position.y > canvas.height)
        init()
}
init();
animate();

addEventListener('keydown', ({key}) => {
    switch(key) {
        case 'w': 
            player.velocity.y -= 25; 
            break;
        case 'a': 
            keys.left.pressed = true; 
            player.currentSprite = player.sprites.run.left;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width;
            player.currentframeRate = player.sprites.run.frameRate;
            break;
        case 'd': 
            keys.right.pressed = true; 
            player.currentSprite = player.sprites.run.right;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width;
            player.currentframeRate = player.sprites.run.frameRate;
            break;
    }
});
addEventListener('keyup', ({key}) => {
    switch(key) {
        case 'a': 
            keys.left.pressed = false; 
            player.currentSprite = player.sprites.stand.left;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width;
            player.currentframeRate = player.sprites.stand.frameRate;
            break;
        case 'd': 
            keys.right.pressed = false;
            player.currentSprite = player.sprites.stand.right;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width;
            player.currentframeRate = player.sprites.stand.frameRate;
            break;
    }
});