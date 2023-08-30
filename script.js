const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let isErasing = false;
let isAddingText = false;
let textX = 0;
let textY = 0;
let isPainting = false;
let selectedColor = 'black';

const eraserSize = 40;
const eraserLineWidth = 5;
const eraserLineColor = 'black';

canvas.addEventListener('mousedown', (event) => {
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  if (isErasing) {
    isDrawing = true;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, eraserSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  } else {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
});

canvas.addEventListener('mousemove', (event) => {
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  if (isDrawing) {
    if (isErasing) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, eraserSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    } else {
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'black';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx.beginPath();
});

canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
});

const borrarButton = document.getElementById('borrarButton');
const lapizButton = document.getElementById('lapizButton');
const addTextButton = document.getElementById('addTextButton');
const paintButton = document.getElementById('paintButton');
const colorPicker = document.getElementById('colorPicker');

borrarButton.addEventListener('click', () => {
  isErasing = true;
  isPainting = false;
  canvas.style.cursor = 'crosshair';
});

lapizButton.addEventListener('click', () => {
  isErasing = false;
  isPainting = false;
  canvas.style.cursor = 'default';
});

addTextButton.addEventListener('click', () => {
  isAddingText = true;
  isPainting = false;
  canvas.style.cursor = 'text';
  isErasing = false;
});

paintButton.addEventListener('click', () => {
  isPainting = true;
  isAddingText = false;
  isErasing = false;
  canvas.style.cursor = 'crosshair';
});

colorPicker.addEventListener('input', (event) => {
  selectedColor = event.target.value;
});

canvas.addEventListener('click', (event) => {
  if (isAddingText) {
    textX = event.clientX - canvas.offsetLeft;
    textY = event.clientY - canvas.offsetTop;
    const newText = prompt('Escribe tu texto:');
    if (newText) {
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(newText, textX, textY);
    }
  } else if (isPainting) {
    ctx.fillStyle = selectedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    isPainting = false;
    canvas.style.cursor = 'default';
  } else if (!isErasing) {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, eraserSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
});
// Event listener para el botón de Descargar
const downloadButton = document.getElementById('downloadButton');
downloadButton.addEventListener('click', () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'mi_dibujo.png';
  link.click();
});