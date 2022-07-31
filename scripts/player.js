class Player extends Rectangle
{
    y_velocity = 0;

    constructor(x, y, width, height, sprite, gravity, max_gravity, jump_force)
    {
        super(x, y, width, height, 'gold');

        this.gravity = gravity;
        this.jump_force = jump_force;
        this.max_gravity = max_gravity;
        this.sprite = sprite;
    }

    render(canvas_context)
    {
        this.sprite.draw(canvas_context, this.x, this.y, this.width, this.height);

        this.y += this.y_velocity;
        if(this.y_velocity < this.max_gravity) this.y_velocity += this.gravity;
    }

    jump()
    {
        this.y_velocity = -this.jump_force;
    }
}