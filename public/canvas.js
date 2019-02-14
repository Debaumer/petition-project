let canvas = $("#sigCanvas")[0];
console.log(canvas);
let ctx = canvas.getContext("2d");
console.log(ctx);

function drawline(prevX, prevY, currX, currY) {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.moveTo(currX, currY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 14;
    ctx.stroke();
    ctx.closePath();
}

function clearSig(m) {
    if (m) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

canvas.addEventListener("mousedown", function(e) {
    console.log("x:", e.pageX, "y:", e.pageY); //subtract offsets to get box x and y
    canvas.addEventListener("mousemove", function(ev) {
        console.log("x:" + ev.pageX, "y:" + ev.pageY);
    });
    drawline();
});

canvas.addEventListener("mouseup", function(e) {
    canvas.removeEventListener("mousedown", canvas);
    canvas.removeEventListener("mousemove", canvas);
});

function saveSig() {
    var dataURL = canvas.toDataURL();
}
