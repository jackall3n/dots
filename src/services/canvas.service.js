export class CanvasService {
    constructor(game) {
        this.canvas = game.canvas;
        this.canvas_context = this.canvas.getContext('2d');
        this._bounds = this.canvas.getBoundingClientRect();
    }

    get bounds() {
        return this._bounds;
    }

    clear = (x, y, width, height) => {
        this.canvas_context.clearRect(x, y, width, height)
    };

    fill = () => {
        this.canvas_context.fill();
    };

    fillStyle = style => {
        this.canvas_context.fillStyle = style;
        return style;
    };

    fillRect = (x, y, width, height, color) => {
        if (color) {
            this.fillStyle(color);
        }

        this.canvas_context.fillRect(x, y, width, height);
    };

    strokeWidth = width => {
        this.canvas_context.lineWidth = width;
        return width;
    };

    strokeStyle = style => {
        this.canvas_context.strokeStyle = style;
        return style;
    };

    strokeRect = (x, y, width, height, color) => {
        if (color) {
            this.strokeStyle(color);
        }

        this.canvas_context.strokeRect(x, y, width, height);
    };

    rect = (x, y, width, height) => {
        this.canvas_context.rect(x, y, width, height);
    };

    circle = (x, y, radius, color) => {
        this.fillStyle(color);
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

    font = font => {
        this.canvas_context.font = font;
    };

    fillText = (x, y, text) => {
        this.canvas_context.fillText(text, x, y);
    };
}