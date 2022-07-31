class Player extends Rectangle
{
    y_velocity = 0;

    constructor(x, y, width, height, color, gravity, max_gravity, jump_force)
    {
        super(x, y, width, height, color);

        this.gravity = gravity;
        this.jump_force = jump_force;
        this.max_gravity = max_gravity;
    }

    render(canvas_context)
    {
        super.render(canvas_context);

        this.y += this.y_velocity;
        if(this.y_velocity < this.max_gravity) this.y_velocity += this.gravity;
    }

    jump()
    {
        this.y_velocity -= this.jump_force;
    }
}