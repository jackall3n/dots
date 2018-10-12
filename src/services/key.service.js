export class KeyService {
    constructor(game) {
        this.game = game;
        this.game.canvas.onkeydown = this.keyDown;
        this.game.canvas.onkeyup = this.keyUp;
    }

    keyDown = event => {
        this.game.user.keys[event.key] = true;
    };

    keyUp = event => {
        this.game.user.keys[event.key] = false;
    };
}