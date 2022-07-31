class Pipe extends Rectangle
{
    constructor(x, y, width, height, sprite, speed, is_score_area = false)
    {
        super(x, y, width, height, 'green');

        this.sprite = sprite;
        this.speed = speed;
        this.is_score_area = is_score_area;
    }

    render(canvas_context)
    {
        if(this.sprite != null) this.sprite.draw(canvas_context, this.x, this.y, this.width, this.height);

        this.x -= this.speed
    }
}