function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//game config
const pipe_margin = 150;
const pipe_width = 128;
const pipe_height = 1280;
const pipe_speed = 5;
const spawn_pipe_interval = 1500;
const pipes_max_height_spawn = window.innerHeight/3.5;

const gravity = 2;
const max_gravity = 8;
const jump_force = 25;

const coin_probability = 2;
const coin_score = 3;

//in-game state
let pipes = [];
let coins = [];
let player = null;
let scores = 0;

function start(player_x, player_y, modal, scores_text)
{
    //switch ui
    modal.classList.add('hidden');
    scores_text.classList.remove('hidden');
    scores_text.innerHTML = 'Scores: 0';

    //clear in-game state
    pipes = [];
    scores = 0;
    engine.clearObjects();
    engine.clear();

    //respawn player
    player = new Player(player_x, player_y, 50, 50, bird_sprite, gravity, max_gravity, jump_force);
    engine.addObject(player);

    //spawning pipes
    let pipes_interval = setInterval(function(){
    
        if(engine.is_working)
        {
            const y_movement = getRandomInt(-pipes_max_height_spawn, pipes_max_height_spawn);

            let start_x = canvas.width-pipe_width-1;
            const pipe1 = new Pipe(start_x, canvas.height/2 - pipe_height - pipe_margin + y_movement, pipe_width, pipe_height, pipe_up_sprite, pipe_speed);
            const pipe2 = new Pipe(start_x, canvas.height/2 + pipe_margin + y_movement, pipe_width, pipe_height, pipe_down_sprite, pipe_speed);
            const score_area = new Pipe(start_x, pipe1.y + pipe1.height, pipe_width, pipe_margin*2, null, pipe_speed, true);
            
            pipes.push(pipe1);
            pipes.push(pipe2);
            pipes.push(score_area);

            engine.addObject(pipe1);
            engine.addObject(pipe2);
            engine.addObject(score_area);

            if(getRandomInt(0, coin_probability) == 1)
            {
                const coin = new Coin(start_x + pipe_width/2 - 25, score_area.y + score_area.height/2, 50, 50, coin_sprite, pipe_speed);
                coins.push(coin);
                engine.addObject(coin);
            }
        }
        else clearInterval(pipes_interval);

    }, spawn_pipe_interval);

    engine.start();
}

function die(engine, modal, death_text, final_scores_text, scores_text, last_highscores_text)
{
    //stop rendering
    engine.stop();
    let new_record = progress_tracker.setNewHighscore(scores);

    //switch ui
    modal.classList.remove('hidden');
    death_text.classList.remove('hidden');
    final_scores_text.classList.remove('hidden');
    scores_text.classList.add('hidden');

    //change ui
    last_highscores_text.innerHTML = 'Last highscores: '+progress_tracker.getHighscore();
    final_scores_text.innerHTML = 'Scores: '+scores;
    if(new_record) final_scores_text.innerHTML += ' (New record!)';
    start_button.innerHTML = 'Restart';
}

//configuring canvas
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//ui-elements
const modal = document.querySelector(".ui-container");
const death_text = document.querySelector('.death-text');
const start_button = document.querySelector("#startButton");
const scores_text = document.querySelector('#scoresText');
const last_highscores_text = document.querySelector('#lastHighscoresText');
const final_scores_text = document.querySelector("#finalScoresText");

const engine = new Engine(canvas, background_sprite);
const progress_tracker = new Progress();

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
        die(engine, modal, death_text, final_scores_text, scores_text, last_highscores_text);
    }
});

//check death by pipes collision
engine.addFrameAction(function(){

    let touched_score_area_id = null;

    pipes.forEach(function(pipe){

        if(pipe.rectangleCollided(player) && !pipe.is_score_area)
        {
            die(engine, modal, death_text, final_scores_text, scores_text, last_highscores_text);
        }
        else if(pipe.rectangleCollided(player) && pipe.is_score_area)
        {
            touched_score_area_id = pipe.id;
        }
        

    });

    if(touched_score_area_id != null)
    {
        scores++;
        scores_text.innerHTML = 'Scores: '+scores;

        engine.deleteObject(touched_score_area_id);
        pipes = pipes.filter(function(pipe){ return pipe.id != touched_score_area_id; });
    }

});

//check coins collision
engine.addFrameAction(function(){

    let coin_id = null;

    for(let coin of coins)
    {
        if(coin.rectangleCollided(player))
        {
            scores += coin_score;
            coin_id = coin.id;
            break;
        }
    }

    if(coin_id != null)
    {
        scores_text.innerHTML = 'Scores: '+scores;

        engine.deleteObject(coin_id);
        coins = coins.filter(function(coin){ return coin.id != coin_id; });
    }

});

//player jump
engine.addButtonPressEvent('Space', function(){
    player.jump();
});

//ui-binding
start_button.addEventListener('click', function(){
    start(canvas.width/2-25, canvas.height/2-25, modal, scores_text);
});

engine.clear();
last_highscores_text.innerHTML = 'Last highscores: '+progress_tracker.getHighscore();

//game loop
let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();