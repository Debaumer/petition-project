//vars
var canvas = document.getElementById("sigCanvas");
var clearButton = document.getElementById("clearButton");
var submit = document.getElementById("signatureForm");
var ctx = canvas.getContext("2d");
var canvSize = canvas.getBoundingClientRect();
var prevX = 0;
var prevY = 0;
var currX = 0;
var currY = 0;
var flag = false;
function init() {
    prevX = 0;
    prevY = 0;
    currX = 0;
    currY = 0;
    flag = false;
    canvSize = canvas.getBoundingClientRect();
}
console.log(submit);

var width = canvSize.width;
var height = canvSize.height;

//functions
function save() {
    var dataURL = canvas.toDataURL();
    console.log(dataURL);
    document.getElementById("sigInput").value = dataURL;
}

function erase() {
    ctx.clearRect(0, 0, width, height);
}

function setFlag(ev) {
    if (ev == "mousedown") {
        flag = true;
    } else {
        flag = false;
    }
}

function draw() {
    if (flag) {
        //console.log('draw run');
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.stroke();
    }
}

function trackMouse(e) {
    prevX = currX;
    prevY = currY;
    currX = e.offsetX;
    currY = e.offsetY;
    draw();
}
//events
submit.addEventListener(
    "submit",
    function() {
        save();
    },
    false
);

clearButton.addEventListener("click", function() {
    erase();
});

canvas.addEventListener(
    "mousedown",
    function(e) {
        setFlag(e.type);
    },
    false
);

canvas.addEventListener(
    "mouseup",
    function(e) {
        setFlag(e.type);
    },
    false
);

canvas.addEventListener(
    "mousemove",
    function(e) {
        trackMouse(e);
    },
    false
);

canvas.addEventListener("mouseout", function(e) {
    //console.log(e);
    setFlag(e.type);
});

window.onresize = function() {
    //add init code here
    //need to re-init prevpos and currpos
    init();
};
