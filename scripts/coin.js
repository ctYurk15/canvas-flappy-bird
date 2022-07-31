class Coin extends Rectangle
{
    constructor(x, y, width, height, sprite, speed)
    {
        super(x, y, width, height, 'gold');
        this.sprite = sprite;
        this.speed = speed;
    }

    render(canvas_context)
    {
        this.sprite.draw(canvas_context, this.x, this.y, this.width, this.height);

        this.x -= this.speed
    }
}