export class CanvasService {
    constructor(game) {
        this.canvas = game.canvas;
        this.canvas_context = this.canvas.getContext('2d');
    }

    clear = (x, y, width, height) => {
        this.canvas_context.clearRect(x, y, width, height)
    };

    fill = style => {
        if (!style) {
            this.canvas_context.fill();
        }
        else {
            this.canvas_context.fillStyle = style;
        }

        return this.canvas_context.fillStyle;
    };

    rect = (x, y, width, height) => {
        this.canvas_context.rect(x, y, width, height);
    };

    circle = (x, y, radius, color) => {
        this.fill(color);
        this.beginPath();
        this.arc(x, y, radius, 0, Math.PI * 2, false);
        this.fill();
    };

    arc = (x, y, radius, start, end, counterClockwise) => {
        this.canvas_context.arc(x, y, radius, start, end, counterClockwise);
    };

    beginPath = () => {
        this.canvas_context.beginPath();
    };
}