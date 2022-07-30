//configuring canvas
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, 'aqua');

engine.start();

//game loop
let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();