const colorPicker = document.getElementById('color-picker');
const canvasColor = document.getElementById('bg-color');
const canvas = document.getElementById('my-canvas');
const clearbtn = document.getElementById('clearbtn');
const savebtn = document.getElementById('savebtn');
const fontpicker = document.getElementById('fontsize');
const ctx = canvas.getContext('2d');
const retrieve = document.getElementById('retreivebtn');

colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Function to get correct coordinates for both mouse and touch events
function getCoords(event) {
    if (event.touches) {
        return {
            x: event.touches[0].clientX - canvas.getBoundingClientRect().left,
            y: event.touches[0].clientY - canvas.getBoundingClientRect().top,
        };
    } else {
        return {
            x: event.offsetX,
            y: event.offsetY,
        };
    }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const coords = getCoords(e);
    lastX = coords.x;
    lastY = coords.y;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const coords = getCoords(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        lastX = coords.x;
        lastY = coords.y;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    const coords = getCoords(e);
    lastX = coords.x;
    lastY = coords.y;
    e.preventDefault(); // Prevent scrolling while drawing
});

canvas.addEventListener('touchmove', (e) => {
    if (isDrawing) {
        const coords = getCoords(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        lastX = coords.x;
        lastY = coords.y;
    }
    e.preventDefault(); // Prevent scrolling while drawing
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});

// Background color change
canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Font size (line width) picker
fontpicker.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
});

// Clear button
clearbtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save button
savebtn.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    const link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Retrieve saved signature from localStorage
retrieve.addEventListener('click', () => {
    const savedCanvas = localStorage.getItem('canvasContents');
    if (savedCanvas) {
        const img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
});
