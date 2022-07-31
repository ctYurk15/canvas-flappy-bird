class Pipe extends Rectangle
{
    constructor(x, y, width, height, color, speed, is_score_area = false)
    {
        super(x, y, width, height, color);

        this.speed = speed;
        this.is_score_area = is_score_area;
    }

    render(canvas_context)
    {
        super.render(canvas_context);

        this.x -= this.speed
    }
}