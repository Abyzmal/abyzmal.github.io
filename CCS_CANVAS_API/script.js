// get rid of the default padding
document.body.style.margin   = 0
document.body.style.overflow = `hidden`

// create an html canvas element
// > <canvas></canvas>
const cnv  = document.createElement ('canvas')

//adjusting the wdth and height
cnv.width  = window.innerWidth
cnv.height = window.innerHeight

//incoporate into the DOM 
document.body.appendChild (cnv)

//
const ctx = cnv.getContext ('2d')

// console.log ('hello css')

// Set line width
ctx.lineWidth = 10;

// Wall
ctx.strokeRect(75, 140, 150, 110);

// Door
ctx.fillRect(130, 190, 40, 60);

// Roof
ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();