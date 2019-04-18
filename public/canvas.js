const canvasUrlInput = document.querySelector("#sigInput");
let rect;
const canvas = document.querySelector("#sigCanvas");
if (canvas) {
    var ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", e => {
        rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        initialize(x, y);
        canvas.addEventListener("mousemove", handleMove);
    });

    canvas.addEventListener("mouseup", () => {
        canvas.removeEventListener("mousemove", handleMove);
        canvasUrlInput.value = canvas.toDataURL();
    });
}

function handleMove(e) {
    console.log("moving", e);
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    draw(x, y);
}

function initialize(x, y) {
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
}
