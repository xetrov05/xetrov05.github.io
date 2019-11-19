'use strict';
/*jshint esversion: 6 */
var canvas = document.getElementById("tetris");
var ctx = canvas.getContext('2d');
canvas.height = 601;
canvas.width = 301;
var das = 100;
var arr = 0;
var field;
var currentBlock;
var currentBlockX;
var currentBlockY;
var currentBlockRot;
var queue = createBag();
newPiece();


var keydowns = [];
var timeOuts = [];

function keyPress(e) {
    if (e.repeat) return;
    keydowns.push(e.key)
    switch (e.key) {
        case "f":
            field.forEach((n) => { console.log(n) })
            break;
        case "l":
            console.log(`${currentBlockX} , ${currentBlockY}`);
            break;
        case "z":

            if (keydowns.includes("c") || keydowns.includes("x")) return;
            var valid = true
            getPos(currentBlockX, currentBlockY, ((n) => {
                return (n + 3) % 4
            })(currentBlockRot))
                .forEach((i) => {
                    valid = (field[i[1]]) ? (field[i[1]][i[0]] === 0 && valid) : (false);
                })

            if (valid) {
                currentBlockRot += 3;
                currentBlockRot = currentBlockRot % 4;
                draw();
            }
            break;

        case "x":
            if (keydowns.includes("z") || keydowns.includes("c")) return;
            var valid = true
            getPos(currentBlockX, currentBlockY, ((n) => {
                return (n + 2) % 4
            })(currentBlockRot))
                .forEach((i) => {
                    valid = (field[i[1]]) ? (field[i[1]][i[0]] === 0 && valid) : (false);
                })

            if (valid) {
                currentBlockRot += 2;
                currentBlockRot = currentBlockRot % 4;
                draw();
            }
            break;
        case "c":
            if (keydowns.includes("z") || keydowns.includes("x")) return;
            var valid = true
            getPos(currentBlockX, currentBlockY, ((n) => {
                return (n + 1) % 4
            })(currentBlockRot))
                .forEach((i) => {
                    valid = (field[i[1]]) ? (field[i[1]][i[0]] === 0 && valid) : (false);
                })

            if (valid) {
                currentBlockRot++;
                currentBlockRot = currentBlockRot % 4;
                draw();
            }
            break;
        case "ArrowDown":
            var active = true
            while (active) {
                getPos(currentBlockX, currentBlockY - 1, currentBlockRot)
                    .forEach((i) => {
                        active = (field[i[1]]) ? (field[i[1]][i[0]] === 0 && active) : (false);
                    })

                if (active) {
                    currentBlockY--
                }
            }
            lock();
            break;
        case "ArrowUp":
            const softDrop = () => {
                if (!keydowns.includes("ArrowUp")) return;
                var valid = true
                getPos(currentBlockX, currentBlockY - 1, currentBlockRot)
                    .forEach((i) => {
                        valid = (field[i[1]]) ? (field[i[1]][i[0]] === 0 && valid) : (false);
                    })
                if (valid) { currentBlockY-- }
                setTimeout(softDrop, arr)
                draw();
            }
            softDrop()
            setTimeout(softDrop, das)
            break;
        case "a": //Debugging purposes
            console.log(getPos(currentBlockX, currentBlockY, currentBlockRot))
            break;
        case "ArrowLeft":
            const moveLeft = (isDas) => {
                if (keydowns.includes("ArrowRight") || !keydowns.includes("ArrowLeft")) return;
                var valid = true
                getPos(currentBlockX - 1, currentBlockY, currentBlockRot)
                    .forEach((i) => {
                        valid = (field[i[1]]) ? (field[i[1]][i[0]] === 0 && valid) : (false);
                    })
                if (valid) {
                    currentBlockX--
                    draw();
                    if (isDas) {
                        setTimeout(moveLeft, das)
                    }
                    else {
                        if (arr == 0) {
                            moveLeft();
                        }
                        else {
                            setTimeOut(moveLeft, arr)
                        }
                    }
                }

            }
            moveLeft(true)
            break;
        case "ArrowRight":
            const moveRight = (isDas) => {
                if (keydowns.includes("ArrowLeft") || !keydowns.includes("ArrowRight")) return;
                var valid = true
                getPos(currentBlockX + 1, currentBlockY, currentBlockRot)
                    .forEach((i) => {
                        valid = (field[i[1]]) ? (field[i[1]][i[0]] === 0 && valid) : (false);
                    })
                if (valid) {
                    currentBlockX++
                    draw();
                    if (isDas) {
                        setTimeout(moveRight, das)
                    }
                    else {
                        if (arr == 0) {
                            moveRight();
                        }
                        else {
                            setTimeOut(moveRight, arr)
                        }
                    }
                }

            }
            moveRight(true)
            break;
    }
}

function reset() {
    field = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    draw();
}

function lock() {
    getPos(currentBlockX, currentBlockY, currentBlockRot)
        .forEach((i) => {
            field[i[1]][i[0]] = currentBlock;
        })
    var clears = []
    for (var i = 0; i < 20; i++) {
        if (!field[i].includes(0)) {
            clears.push(i);
        }
    }

    clears.reverse().forEach((row) => {
        field.splice(row, 1);
    })

    clears.forEach((row) => {
        field.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    })
    newPiece();
    draw();
}

function createBag() {
    var bag = [];
    while (bag.length < 7) {
        var x = Math.floor((Math.random() * 7) + 1);
        if (!bag.includes(x)) {
            bag.push(x);
        }
    }
    return bag;
}

function newPiece() {
    if (queue.length < 1) {
        createBag().forEach((i) => queue.push(i));
        console.log("run")
    }

    currentBlock = queue[0];
    queue.splice(0, 1);

    currentBlockX = 3;
    currentBlockY = 18;
    currentBlockRot = 0;
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    for (var i = 1; i <= 600; i += 30) {
        ctx.strokeRect(-0.5, i - 0.5, 302, 30);
    }

    for (var j = 1; j <= 300; j += 30) {
        ctx.strokeRect(j - 0.5, -0.5, 30, 602);
    }

    for (var k = 0; k < 20; k++) {
        for (var l = 0; l < 10; l++) {
            ctx.fillStyle = colors[field[k][l]];
            ctx.fillRect(l * 30 + 2, (19 - k) * 30 + 2, 27, 27);
        }
    }
    
    var x = blocks[currentBlock - 1][currentBlockRot]
    console.clear()
    
    // for (var i = 0; i < x.length; i++) {
    //     for (var j = 0; j < x[i].length; j++) {
    //         if (x[0 - i][j] !== 0) {
    //             console.log(`${19 - currentBlockY - i} , ${currentBlockX + j} `)
    //             ctx.fillStyle = colors[x[0 - i][j]];
    //             ctx.fillRect((currentBlockX + j) * 30 + 2, (18 - currentBlockY - i) * 30 + 2, 27, 27);
    //         }
    //     }
    // }
}

function getPos(offX, offY, rot) {
    var t = []
    var x = blocks[currentBlock - 1][rot];
    for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < x[i].length; j++) {
            var y = x[i][j];
            if (y !== 0) {
                t.push([j + offX, i + offY])
            }
        }
    }
    return (t)
}
document.addEventListener('DOMContentLoaded', (event) => {
    reset();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('keyup', (event) => {
        if (!event.repeat) {
            for (var i = 0; i < keydowns.length; i++) {
                if (keydowns[i] === event.key) {
                    keydowns.splice(i, 1);
                }
            }
        }
    });
});
