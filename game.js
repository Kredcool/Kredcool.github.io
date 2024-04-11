let player, size, obstSize, objs, blocks, timer, speed;

function setup() {
    createCanvas(windowWidth, windowHeight);
    player = windowHeight / 2;
    size = [10, 10];
    obstSize = { min: 20, max: 60 }; // min, max
    objs = [obstGen(obstSize.min, obstSize.max)];
    objs.push(oppGen(objs[objs.length - 1]));
    speed = 2;
}

function draw() {
    background(50);
    rect(60, player, size[0], size[1]);
    // collision
    if (objs[0][0] - 10 < 60 < objs[0][0] + objs[0][3]) {
        if (player > objs[1][3] - 10 || player < objs[0][3]) {
            console.log("collision");
        }
    }
    // drawing
    for (let i = 0; i < objs.length; i++) {
        objs[i][0] -= speed;
        drawObst(objs[i]);
    }
    if (objs[objs.length - 1][0] < windowWidth - 100 && Math.random() > 0.9) {
        objs.push(obstGen(obstSize.min, obstSize.max));
        objs.push(oppGen(objs[objs.length - 1]));
    }
    if (objs[0][0] + objs[0][2] < 60) {
        objs.shift();
        objs.shift();
    }

    // player input
    if (keyIsDown(UP_ARROW)) {
        player -= 5;
    }

    if (keyIsDown(DOWN_ARROW)) {
        player += 5;
    }

    // to not go out of window
    if (player > windowHeight - size[0]) {
        player = windowHeight - size[0];
    }

    if (player < 0) {
        player = 0;
    }

    // falling down
    player += speed;
}

function obstGen(min, max) {
    let w = Math.random() * (max - min) + min;
    let y = Math.random() * (windowHeight / 2 - 20) + 20;
    let h = windowHeight - y;
    h = y;
    y = 0;

    return [windowWidth, y, w, h];
}

function oppGen(block) {
    y = block[3] + 300;
    h = windowHeight - y;
    return [block[0], y, block[2], h];
}

function drawObst(obst) {
    rect(obst[0], obst[1], obst[2], obst[3]);
}
