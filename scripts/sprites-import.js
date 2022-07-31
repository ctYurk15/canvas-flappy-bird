const bird_texture = document.querySelector('#bird-texture');
const coin_texture = document.querySelector('#coin-texture');
const background_texture = document.querySelector('#backgroud-texture');
const pipe_up_texture = document.querySelector('#pipe-up');
const pipe_down_texture = document.querySelector('#pipe-down');

const bird_sprite = new Sprite(bird_texture, 0, 0, 136, 136);
const coin_sprite = new Sprite(coin_texture, 0, 0, 128, 128);
const background_sprite = new Sprite(background_texture, 0, 0, 900, 504);
const pipe_up_sprite = new Sprite(pipe_up_texture, 0, 0, 128, 1280);
const pipe_down_sprite = new Sprite(pipe_down_texture, 0, 0, 128, 1280);