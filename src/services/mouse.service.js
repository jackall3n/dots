export class MouseService {
    constructor(game) {
        this.game = game;
        this.game.canvas.onmousemove = this.mouseMove;
    }

    mouseMove = event => {
        this.game.user.mouse = {
            ...this.game.user.mouse,
            x: event.clientX,
            y: event.clientY
        };
    };
}