let isDrawing = false;
let x = 0;
let y = 0;
let lines = '';

const myPics = document.getElementById('canvas');
const context = myPics.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

doClear();

myPics.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

myPics.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2) {
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
