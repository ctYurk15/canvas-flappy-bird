class Coin extends Rectangle
{
    constructor(x, y, width, height, color, speed)
    {
        super(x, y, width, height, color);
        this.speed = speed;
    }

    render(canvas_context)
    {
        super.render(canvas_context);

        this.x -= this.speed
    }
}