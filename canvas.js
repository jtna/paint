let isDrawing = false;
let x = 0;
let y = 0;
let lines = '';
console.log("xy", x, y);

const myCanvas = document.getElementById('canvas');
const context = myCanvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const xoff = canvas.offsetLeft;
const yoff = canvas.offsetTop;

doClear();

// X and Y coordinates that take into account scroll, plus the canvas' offset
function getX(e) { return e.pageX - xoff; }
function getY(e) { return e.pageY - yoff; }

function onMousedown(e)
{
  //console.log("onMousedown");
  x = getX(e);
  y = getY(e);
  isDrawing = true;
}

function onMousemove(e) {
  //console.log("onMousemove");
  if (isDrawing === true) {
    drawLine(context, x, y, getX(e), getY(e));
    x = getX(e);
    y = getY(e);
  }
}

function onMouseup(e) {
  //console.log("onMouseup");
  if (isDrawing === true) {
    drawLine(context, x, y, getX(e), getY(e));
    x = 0;
    y = 0;
    isDrawing = false;
  }
}

myCanvas.addEventListener('mousedown', onMousedown);
myCanvas.addEventListener('mousemove', onMousemove);
myCanvas.addEventListener('mouseup', onMouseup);

myCanvas.addEventListener('touchstart', e => {
  var touches = e.changedTouches;
  for (var i=0; i<touches.length; i++) {
    onMousedown(touches[i]);
  }
});

myCanvas.addEventListener('touchmove', e => {
  var touches = e.changedTouches;
  for (var i=0; i<touches.length; i++) {
    onMousemove(touches[i]);
  }
});

myCanvas.addEventListener('touchend', e => {
  var touches = e.changedTouches;
  for (var i=0; i<touches.length; i++) {
    onMouseup(touches[i]);
  }
});

function drawLine(context, x1, y1, x2, y2) {
  //console.log("drawLine: ", x1, y1, x2, y2);
  lines += String.fromCodePoint(x1, y1, x2, y2); // convert coordinates to string
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 10;
  context.lineCap = 'round';
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function doClear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  lines = '';
}

function doSave() {
  localStorage.setItem('lines', lines);
}

function doLoad() {
  lines = localStorage.getItem('lines');
  if (!lines) return;
  let i = 0;
  const arr = new Array(4);

  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let codePoint of lines) {
    arr[i++] = codePoint.codePointAt(0);
    if (i==4) {
      drawLine(context, arr[0], arr[1], arr[2], arr[3]);
      i = 0;
    }
  }
}
