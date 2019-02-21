var canvas,
    ctx,
    flag,
    clearButton = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;
var submit = false;

// function init() {
//     canvas = document.getElementById('sigCanvas');
//     ctx = canvas.getContext("2d");
//     submit = document.getElementById("petitionForm");
//     clearButton = document.getElementById("clearButton");
//     console.log(document.querySelectorAll('button'));
//     console.log(submit);
//     console.log(clearButton);
//     // console.log(canvas);
//     w = canvas.width;
//     h = canvas.height;
//     // console.log(w);
//     // console.log(h);
//     submit.addEventListener('submit', function(e) {
//       //e.preventDefault();
//       save();
//       console.log(e.target);
//       console.log(e.target[3].value);
//       console.log(e.target[2].value);
//     });
//
//     clearButton.addEventListener('click', function(e) {
//       erase();
//     });
//
//
//     canvas.addEventListener("mousemove", function (e) {
//         findxy('move', e)
//         //console.log(e);
//     }, false);
//     canvas.addEventListener("mousedown", function (e) {
//         findxy('down', e)
//         //console.log(e);
//     }, false);
//     canvas.addEventListener("mouseup", function (e) {
//         findxy('up', e)
//         //console.log(e);
//     }, false);
//     canvas.addEventListener("mouseout", function (e) {
//         findxy('out', e)
//         //console.log(e);
//     }, false);
// }
canvas = document.getElementById("sigCanvas");
ctx = canvas.getContext("2d");
submit = document.getElementById("petitionForm");
clearButton = document.getElementById("clearButton");
console.log(submit);
console.log(clearButton);
// console.log(canvas);
w = canvas.width;
h = canvas.height;
// console.log(w);
// console.log(h);
submit.addEventListener("submit", function(e) {
    //e.preventDefault();
    save();
    console.log(e.target);
    console.log(e.target[3].value);
    console.log(e.target[2].value);
});

clearButton.addEventListener("click", function(e) {
    erase();
});

canvas.addEventListener(
    "mousemove",
    function(e) {
        findxy("move", e);
    },
    false
);
canvas.addEventListener(
    "mousedown",
    function(e) {
        findxy("down", e);
    },
    false
);
canvas.addEventListener(
    "mouseup",
    function(e) {
        findxy("up", e);
    },
    false
);
canvas.addEventListener(
    "mouseout",
    function(e) {
        findxy("out", e);
    },
    false
);

function draw() {
    console.log("draw run");
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function test() {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(50, 50);
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    ctx.clearRect(0, 0, w, h);
}

function save() {
    var dataURL = canvas.toDataURL();
    document.getElementById("sigInput").value = dataURL;
}

function findxy(res, e) {
    console.log(res);
    if (res == "down") {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == "up" || res == "out") {
        flag = false;
    }
    if (res == "move") {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}
test();
draw();
