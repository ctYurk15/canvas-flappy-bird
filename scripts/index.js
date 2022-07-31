function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//game config
const pipe_margin = 150;
const pipe_width = 125;
const pipe_height = 1000;
const pipe_speed = 5;
const spawn_pipe_interval = 1500;
const pipes_max_height_spawn = window.innerHeight/3.5;
const gravity = 2;
const max_gravity = 8;
const jump_force = 25;

//in-game state
let pipes = [];
let player = null;

function start(player_x, player_y, modal)
{
    modal.classList.add('hidden');
    pipes = [];

    engine.clearObjects();
    engine.clear();

    player = new Player(player_x, player_y, 50, 50, 'yellow', gravity, max_gravity, jump_force);
    engine.addObject(player);

    //spawning pipes
    let pipes_interval = setInterval(function(){
    
        if(engine.is_working)
        {
            const y_movement = getRandomInt(-pipes_max_height_spawn, pipes_max_height_spawn);

            const pipe1 = new Pipe(canvas.width-pipe_width-1, canvas.height/2 - pipe_height - pipe_margin + y_movement, pipe_width, pipe_height, 'green', pipe_speed);
            const pipe2 = new Pipe(canvas.width-pipe_width-1, canvas.height/2 + pipe_margin + y_movement, pipe_width, pipe_height, 'green', pipe_speed);
            
            pipes.push(pipe1);
            pipes.push(pipe2);

            engine.addObject(pipe1);
            engine.addObject(pipe2);
        }
        else clearInterval(pipes_interval);

    }, spawn_pipe_interval);

    engine.start();
}

function die(engine, modal, death_text)
{
    engine.stop();

    modal.classList.remove('hidden');
    death_text.classList.remove('hidden');
}

//configuring canvas
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//ui-elements
const modal = document.querySelector(".ui-container");
const death_text = document.querySelector('.death-text');
const start_button = document.querySelector("#startButton");

const engine = new Engine(canvas, 'aqua');

//delete pipes
engine.addFrameAction(function(){

    let pipes_to_delete = [];

    //delete from engine
    pipes.forEach(function(pipe){
        if(pipe.x + pipe.width < 0) 
        {
            pipes_to_delete.push(pipe.id);
            engine.deleteObject(pipe.id)
        }
    });

    //delete from in-game array
    pipes = pipes.filter(function(pipe){ return !pipes_to_delete.includes(pipe.id); });

});

//check death by y coordinates
engine.addFrameAction(function(){
    if(player.y - player.height > canvas.height)
    {
        die(engine, modal, death_text);
    }
});

//check death by pipes collision
engine.addFrameAction(function(){

    pipes.forEach(function(pipe){

        if(pipe.rectangleCollided(player))
        {
            die(engine, modal, death_text);
        }

    });

});

//player jump
engine.addButtonPressEvent('Space', function(){
    player.jump();
});

//ui-binding
start_button.addEventListener('click', function(){
    start(canvas.width/2-25, canvas.height/2-25, modal);
});

engine.clear();

//game loop
let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();