var stones = 0;
var stoneRate = 1;
var stoneMiners = 0;
var stonePrice = 20;
var stoneLevel = 0;

var stones2 = 0;
var stone2Rate = 1;
var transportAmount = 0;
var transportPrice = 15;
var transportLevel = 0;

var bricks = 100000000;
var brickRate = 1;
var brickTime = 15.00;
var brickPrice = 40;
var brickLevel = 0;

var bricks2 = 0;
var brick2Rate = 1;

var floor = 48;
var coins = 0;
var count = 0;

document.getElementById('stoneCutter').style.pointerEvents = "auto";

function addStone() {
    stones += stoneRate;
    document.getElementById('anim1').classList.remove("class1");
    setTimeout(function() {
        document.getElementById('anim1').classList.add("class1");
    }, 10);
}

function transportStone() {
    if(stones >= stone2Rate) {
        stones -= stone2Rate;
        stones2 += stone2Rate;
        document.getElementById('anim2').classList.remove("class2");
        setTimeout(function() {
            document.getElementById('anim2').classList.add("class2");
        }, 10);
    }
    else if(stones < stone2Rate && stones > 0) {
        stones2 += stones;
        stones -= stones;
        document.getElementById('anim2').classList.remove("class2");
        setTimeout(function() {
            document.getElementById('anim2').classList.add("class2");
        }, 10);
    }
}

function makeBrick() {
    if(stones2 >= brickRate) {
        stones2 -= brickRate;
        document.getElementById('stoneCutter').style.pointerEvents = "none";

        setTimeout(function() {
            document.getElementById('stoneCutter').style.pointerEvents = "auto";
        }, brickTime * 1000);

        
        setTimeout(function() {
            bricks += brickRate;
        }, brickTime * 1000);
        
        document.getElementById('anim3').classList.remove("class3");
        document.getElementById('progress').classList.remove("class5");
        document.getElementById('anim4').classList.remove("class4");
        setTimeout(function() {
            document.getElementById('anim3').classList.add("class3");
            document.getElementById('progress').style.animationDuration = brickTime + "s";
            document.getElementById('progress').classList.add("class5");
            document.getElementById('anim4').style.animationDelay = brickTime + "s";
            document.getElementById('anim4').classList.add("class4");
        }, 10);
    }
    else if(stones2 < brickRate && stones2 > 0) {
        let temp = stones2;
        stones2 -= stones2;
        document.getElementById('stoneCutter').style.pointerEvents = "none";

        setTimeout(function() {
            document.getElementById('stoneCutter').style.pointerEvents = "auto";
        }, brickTime * 1000);

        
        setTimeout(function() {
            bricks += temp;
        }, brickTime * 1000);
        
        document.getElementById('anim3').classList.remove("class3");
        document.getElementById('progress').classList.remove("class5");
        document.getElementById('anim4').classList.remove("class4");
        setTimeout(function() {
            document.getElementById('anim3').classList.add("class3");
            document.getElementById('progress').style.animationDuration = brickTime + "s";
            document.getElementById('progress').classList.add("class5");
            document.getElementById('anim4').style.animationDelay = brickTime + "s";
            document.getElementById('anim4').classList.add("class4");
        }, 10);
    }
}

function transportBrick() {
    if(bricks >= brick2Rate) {
        bricks -= brick2Rate;
        bricks2 += 1;
        document.getElementById('anim6').classList.remove("class6");
        setTimeout(function() {
            document.getElementById('anim6').classList.add("class6");
        }, 10);
    }
    let base = document.getElementById('base2').getElementsByTagName('img');
    let img = document.createElement('img');
    document.getElementById('base2').appendChild(img);

    base[bricks2-1].src = "images/brick.png";
    base[bricks2-1].style.width = "5.6vmin";
    base[bricks2-1].style.height = "2.85vmin";
    base[bricks2-1].style.position = "absolute";

    let temp = Math.floor((bricks2-1) / 8);
    base[bricks2-1].style.zIndex = bricks2;
    base[bricks2-1].style.bottom = 23 + 2.7 * temp + "vmin";
    base[bricks2-1].style.left = 92.5 + 5.5 * bricks2 - 44 * temp + "vmin";

    if ((bricks2-1) % 16 == 7 || (bricks2-1) % 16 == 8) {
        base[bricks2-1].src = "images/brick2.png";
        base[bricks2-1].style.width = "2.8vmin";
        base[bricks2-1].style.height = "2.85vmin";
    }
    if((temp) % 2 == 1) {
        base[bricks2-1].style.left = 89.7 + 5.5 * bricks2 - 44 * temp + "vmin";
    }
    if((bricks2-1) % 16 == 8) {
        base[bricks2-1].style.left = 92.5 + 5.5 * bricks2 - 44 * temp + "vmin";
    }
}

function levelup() {
    for(let i = 1; i <= 10; i++) {
        if (bricks2 == i * floor) {
            brick2Rate = Math.pow(i + 1, 3);
            let img = document.createElement('img');
            document.getElementById('bg').appendChild(img);
            img.src = "images/floor2.png";
            img.style.width = "32vmin";
            img.style.height = "10vmin";
            img.style.position = "absolute";
            img.style.bottom = i * 16 + 11 + "vmin";
            img.style.left = "102vmin";
            img.style.zIndex = "9999";
            if(i == 1) {
                img.src = "images/floor.png";
                img.style.height = "13vmin";
                img.style.bottom = "23vmin";
            }
            if(i > 3) {
                document.getElementById('bg').style.height = 50 + (i * 16.5) + "vmin";
            }
            if (i == 10) {
                document.getElementById('final').style.display = "block";
                document.getElementById('transparent').style.display = "block";
                document.getElementById('win').style.display = "block";
            }
        }
    }
}

function transporter() {
        setInterval(function() {
            if(stones >= transportAmount && transportAmount >= 1) {
                stones -= Math.floor(transportAmount);
                setTimeout(function() {
                    stones2 += Math.floor(transportAmount);
                }, 1200);
                document.getElementById('transporter').classList.remove("class7");
                setTimeout(function() {
                    document.getElementById('transporter').classList.add("class7");
                }, 10);
                document.getElementById('transporter2').classList.remove("class8");
                setTimeout(function() {
                    document.getElementById('transporter2').classList.add("class8");
                }, 10);
            }
        }, 2400);
}
function miner() {
    setInterval(function() {
        if(stoneMiners >= 1) {
            stones += Math.floor(stoneMiners);
            document.getElementById('miner').style.opacity = "1";
            document.getElementById('axe').style.opacity = "1";
            document.getElementById('axe').classList.add("class9");   
        }
    }, 1000);
}
transporter();
miner();

function market() {
    document.getElementById('market2').style.display = "block";
}
function closeMarket() {
    document.getElementById('market2').style.display = "none";
}
function sellPercent(n) {
    count += n;
    if (count%3 == 0) {
        document.getElementById('percent').innerHTML = "10%";

        document.getElementById('quantity1').innerHTML = Math.floor(stones / 10);
        document.getElementById('total1').innerHTML = Math.floor(stones / 10) * 2;

        document.getElementById('quantity2').innerHTML = Math.floor(bricks / 10);
        document.getElementById('total2').innerHTML = Math.floor(bricks / 10) * 5;
    }
    else if (count%3 == 1) {
        document.getElementById('percent').innerHTML = "50%";

        document.getElementById('quantity1').innerHTML = Math.floor(stones / 2);
        document.getElementById('total1').innerHTML = Math.floor(stones / 2) * 2;

        document.getElementById('quantity2').innerHTML = Math.floor(bricks / 2);
        document.getElementById('total2').innerHTML = Math.floor(bricks / 2) * 5;
    }
    else if (count%3 == 2) {
        document.getElementById('percent').innerHTML = "100%";

        document.getElementById('quantity1').innerHTML = Math.floor(stones);
        document.getElementById('total1').innerHTML = Math.floor(stones) * 2;

        document.getElementById('quantity2').innerHTML = Math.floor(bricks);
        document.getElementById('total2').innerHTML = Math.floor(bricks) * 5;
    }
}
function sell1() {
    if(count%3 == 0) {
        coins += Math.floor(stones / 10) * 2;
        stones -= Math.floor(stones / 10);
    }
    else if(count%3 == 1) {
        coins += Math.floor(stones / 2) * 2;
        stones -= Math.floor(stones / 2);
    }
    else if(count%3 == 2) {
        coins += Math.floor(stones) * 2;
        stones -= Math.floor(stones);
    }
}
function sell2() {
    if(count%3 == 0) {
        coins += Math.floor(bricks / 10) * 5;
        bricks -= Math.floor(bricks / 10);
    }
    else if(count%3 == 1) {
        coins += Math.floor(bricks / 2) * 5;
        bricks -= Math.floor(bricks / 2);
    }
    else if(count%3 == 2) {
        coins += Math.floor(bricks) * 5;
        bricks -= Math.floor(bricks);
    }
}

function closeStone() {
    document.getElementById('stoneLv').style.display = "none";
}
function closeTransport() {
    document.getElementById('transportLv').style.display = "none";
}
function closeBrick() {
    document.getElementById('brickLv').style.display = "none";
}

function levelupStone() {
    document.getElementById('stoneLv').style.display = "block";
    document.getElementById('transportLv').style.display = "none";
    document.getElementById('brickLv').style.display = "none";

    document.getElementById('stoneLevel').innerHTML = "Level " + stoneLevel;
    document.getElementById('stoneTap').innerHTML = "Stone per Tap: " + stoneRate + " => " + Math.floor(stoneRate * 1.2 + 1);
    document.getElementById('stoneMiners').innerHTML = "Miners: " + Math.floor(stoneMiners) + " => " + Math.floor(stoneMiners + 0.2);
    document.getElementById('stonePrice').innerHTML = "Upgrade Price: " + stonePrice + " coins";

    stoneLevelMax();
}
function levelupTransport() {
    document.getElementById('stoneLv').style.display = "none";
    document.getElementById('transportLv').style.display = "block";
    document.getElementById('brickLv').style.display = "none";

    document.getElementById('transportLevel').innerHTML = "Level " + transportLevel;
    document.getElementById('transportCapacity').innerHTML = "Transport Capacity: " + stone2Rate + " => " + Math.floor(stone2Rate * 1.1 + 3);
    document.getElementById('transportAmount').innerHTML = "Transporter Amount: " + Math.floor(transportAmount) + " => " + Math.floor(transportAmount + 0.5);
    document.getElementById('transportPrice').innerHTML = "Upgrade Price: " + transportPrice + " coins";

    transportLevelMax();
}
function levelupBrick() {
    document.getElementById('stoneLv').style.display = "none";
    document.getElementById('transportLv').style.display = "none";
    document.getElementById('brickLv').style.display = "block";

    document.getElementById('brickLevel').innerHTML = "Level " + brickLevel;
    document.getElementById('brickTime').innerHTML = "Brick per Time: " + brickTime.toFixed(2) + " => " + (brickTime * 0.9).toFixed(2);
    document.getElementById('brickNumber').innerHTML = "Number of Bricks: " + brickRate + " => " + Math.floor(brickRate * 1.15 + 1);
    document.getElementById('brickPrice').innerHTML = "Upgrade Price: " + brickPrice + " coins";

    brickLevelMax();
}

function upgradeStone() {
    if(coins >= stonePrice) {
        coins -= stonePrice;
        stoneLevel++;
        stoneRate = Math.floor(stoneRate * 1.2) + 1;
        stoneMiners += 0.2;
        stonePrice = Math.floor(stonePrice * 1.3) + 20;
        levelupStone();
    }
    stoneLevelMax();
}
function upgradeTransport() {
    if(coins >= transportPrice) {
        coins -= transportPrice;
        transportLevel++;
        stone2Rate = Math.floor(stone2Rate * 1.1) + 3;
        transportAmount += 0.5;
        transportPrice = Math.floor(transportPrice * 1.2) + 15;
        levelupTransport();
    }
    transportLevelMax();
}
function upgradeBrick() {
    if(coins >= brickPrice && document.getElementById('stoneCutter').style.pointerEvents == "auto") {
        coins -= brickPrice;
        brickLevel++;
        brickRate = Math.floor(brickRate * 1.15) + 1;
        brickTime = brickTime * 0.9;
        brickTime.toFixed(2);
        brickPrice = Math.floor(brickPrice * 1.3) + 40;
        levelupBrick();
    }
    brickLevelMax();
}

function checkUpgrades() {
    if(coins >= stonePrice) {
        document.getElementById('levelup').style.backgroundColor = "#da8e57";
        document.getElementById('btn').style.backgroundColor = "#da8e57";
    }
    else {
        document.getElementById('levelup').style.backgroundColor = "#707070";
        document.getElementById('btn').style.backgroundColor = "#606060";
    }

    if(coins >= transportPrice) {
        document.getElementById('levelup2').style.backgroundColor = "#da8e57";
        document.getElementById('btn2').style.backgroundColor = "#da8e57";
    }
    else {
        document.getElementById('levelup2').style.backgroundColor = "#707070";
        document.getElementById('btn2').style.backgroundColor = "#606060";
    }

    if(coins >= brickPrice) {
        document.getElementById('levelup3').style.backgroundColor = "#da8e57";
        document.getElementById('btn3').style.backgroundColor = "#da8e57";
    }
    else {
        document.getElementById('levelup3').style.backgroundColor = "#707070";
        document.getElementById('btn3').style.backgroundColor = "#606060";
    }
}

function stoneLevelMax() {
    if(stoneLevel == 30) {
        document.getElementById('stoneTap').innerHTML = "Stone per Tap: " + stoneRate;
        document.getElementById('stoneMiners').innerHTML = "Miners: " + Math.floor(stoneMiners);
        document.getElementById('stonePrice').innerHTML = "Upgrade Price: -- coins";
        document.getElementById('btn').style.pointerEvents = "none";
    }
}
function transportLevelMax() {
    if(transportLevel == 30) {
        document.getElementById('transportCapacity').innerHTML = "Transport Capacity: " + stone2Rate;
        document.getElementById('transportAmount').innerHTML = "Transporter Amount: " + Math.floor(transportAmount);
        document.getElementById('transportPrice').innerHTML = "Upgrade Price: -- coins";
        document.getElementById('btn2').style.pointerEvents = "none";
    }
}
function brickLevelMax() {
    if(brickLevel == 30) {
        document.getElementById('brickTime').innerHTML = "Brick per Time: " + brickTime.toFixed(2);
        document.getElementById('brickNumber').innerHTML = "Number of Bricks: " + brickRate;
        document.getElementById('brickPrice').innerHTML = "Upgrade Price: -- coins";
        document.getElementById('btn3').style.pointerEvents = "none";
    }
}

setInterval(function() {
    document.getElementById('stoneCollect').innerHTML = Math.floor(stones);
    document.getElementById('stoneCollect2').innerHTML = Math.floor(stones2);
    document.getElementById('brickCollect').innerHTML = Math.floor(bricks);
    document.getElementById('coins').innerHTML = '<img src="images/coin.png">' + coins;
    sellPercent(0);
    levelup();
    checkUpgrades();
}, 50);
    
function start() {
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display = "block";
}