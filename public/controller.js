//vars
var canvas = document.getElementById('sigCanvas');
var clearButton = document.getElementById('clearButton');
var submit = document.getElementById('submitForm');
var ctx = canvas.getContext('2d');
var canvSize = canvas.getBoundingClientRect();
var prevX = 0;
var prevY = 0;
var currX = 0;
var currY = 0;
var flag = false;
function init () {
  var prevX = 0;
  var prevY = 0;
  var currX = 0;
  var currY = 0;
  var flag = false;
  var canvSize = canvas.getBoundingClientRect();
}

width = canvas.width;
height = canvas.height;

console.log(document.getElementById('sigInput').value);
//functions
function save() {
  var dataURL = canvas.toDataURL();
  console.log(dataURL);
  document.getElementById('sigInput').value = dataURL;
  console.log(document.getElementById('sigInput').value);
}

save();
function erase() {
  ctx.clearRect(0,0,width, height);
}

function setFlag(ev) {
  if(ev == 'mousedown') {
    flag = true;
  } else {
    flag = false;
  }
}

function draw() {
  if (flag) {
    //console.log('draw run');
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
  }
}

function trackMouse(e) {
  prevX = currX;
  prevY = currY;
  currX = (e.clientX - canvas.offsetLeft);
  //console.log(canvas.offsetTop);
  currY = (e.clientY - canvas.offsetTop);
  //console.log('currY', currY);
  // console.log(currX,currY);
  draw();
}
//events
console.log(submit.value);
console.log(document.g);
submit.addEventListener('submit', function(e) {
  console.log(e.target.value);
  e.preventDefault();
  save();
},false);

clearButton.addEventListener('click', function(e) {
  erase();
});

canvas.addEventListener('mousedown', function(e) {
  setFlag(e.type)
},false);

canvas.addEventListener('mouseup', function(e) {
  setFlag(e.type);
},false)

canvas.addEventListener('mousemove', function(e) {
  trackMouse(e);
}, false);

canvas.addEventListener('mouseout', function(e) {
  //console.log(e);
  setFlag(e.type)
});

window.onresize = function(ev) {
  //add init code here
  //need to re-init prevpos and currpos
  init()
};
