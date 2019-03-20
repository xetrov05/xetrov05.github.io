"use strict"
var minoColors = ["#FFFFFF", "#2AFFFF", "#FFA501", "#2A2AFF", "#FFFF2A", "#2AFF2A", "#FF2AFF", "#FF2A2A", "#787878"];
/*
0: nothing 
1: I
2: J
3: L
4: O 
5: S
6: T
7: Z
8: Garbage
 */
var pieces = [
    [[0, 0], [0, 1], [0, 2], [0, -1]], // I
    [[0, 0], [1, 1], [-1, 0], [1, 0]], // J
    [[0, 0], [-1, 1], [-1, 0], [1, 0]], // L
    [[0, 0], [0, 1], [1, 1], [1, 0]], // O
    [[0, 0], [0, 1], [1, 1], [-1, 0]], // S
    [[0, 0], [0, -1], [1, -1], [-1, 0]], // Z
    [[0, 0], [0, 1], [0, -1], [1, 0]], // T

]

function x() {
    console.log("Ran!");
}
class Board {
    constructor(id, isSelf) {
        /* HTML LINK SETUP 
        id: id of canvas in html
        isSelf: 0: outside user control; 1: User's board */

        this.isSelf = isSelf;
        this.id = id;

        this.parent = document.getElementById("boards").appendChild(document.createElement("div"));
        this.parent.id = "parent" + this.id;
        this.parent.style.left = 0;

        this.board = document.getElementById("parent" + this.id).appendChild(document.createElement("canvas"));
        this.board.id = "tetris" + this.id;
        this.board.width = "301";
        this.board.height = "601";
        this.ctx = this.board.getContext('2d'); //CTX
        this.board.style.border = (this.isSelf) ? ("2px solid black") : ("2px solid blue");

        this.queue = this.board = document.getElementById("parent" + this.id).appendChild(document.createElement("canvas"));
        this.queue.id = "queue" + this.id;
        this.queue.width = "141"
        this.queue.height = "501";
        this.queuectx = this.queue.getContext('2d'); //CTX
        this.queue.style.border = (this.isSelf) ? ("2px solid black") : ("2px solid blue");
        this.queue.style.marginLeft = "14px";
        this.queue.style.marginTop = "14px";
        this.queue.style.position = "absolute";

        /* START */
        this.matrix = new Array(24).fill(new Array(10).fill(0));

        this.currentPiece = 1;
        this.currentX = 4;
        this.currentRot = 0;

        this.queuePieces = [1, 3, 4, 5];

        this.mainLoop = this.mainLoop.bind(this);
    }

    update() {

    }

    draw() {
        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.beginPath();
        for (var i = 0; i < 20; i++) {
            this.ctx.strokeRect(0.5, 30 * i + 0.5, 300, 30);
        }

        for (var i = 0; i < 10; i++) {
            this.ctx.strokeRect(30 * i + 0.5, 0.5, 30, 600);
        }

        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 10; j++) {
                this.ctx.fillStyle = minoColors[this.matrix[i + 4][j]];
                this.ctx.fillRect(30 * j + 2, 30 * i + 2, 27, 27);
            }
        }
        for (var i = 0; i < this.queuePieces.length; i++) {
            this.drawPiece(this.queuectx, 30, 120 * i + 30, this.queuePieces[i], 3);
        }
    }

    drawPiece(ctx, x, y, pieceId, rot) {
        for (var i = 0; i < pieces[pieceId - 1][rot].length; i++) {
            for (var j = 0; j < pieces[pieceId - 1][rot][0].length; j++) {
                ctx.fillStyle = minoColors[pieces[pieceId - 1][rot][i][j]];
                var propx = (i - offset[pieceId - 1][rot][0]) * 30 + x + ((pieceId == 1 && (rot % 2 == 0) ? (32) : (2)));
                var propy = (j - offset[pieceId - 1][rot][1]) * 30 + y + 1;
                ctx.fillRect((propx > 0) ? (propx) : (0), (propy > 0) ? (propy) : (0), 27, 27)
            }
        }

    }

    keypress(key) {
        if (this.isSelf) {
            switch (key) {
                case "ArrowRight":
                    this.currentX++;
                    break;
                case "ArrowLeft":
                    this.currentX--;
                    break;
                case "z":
                    this.currentRot = (this.currentRot + 1) % 4;
            }
        }
    }

    mainLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.mainLoop);
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    var self = new Board(0, true);
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        x();
        if ("key" in evt) {
            self.keypress(evt.key);
        };
    };
    x();
    requestAnimationFrame(self.mainLoop);
});