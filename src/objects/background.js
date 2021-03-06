import {GAME} from "../constants";

export class Background {
    constructor(game) {
        this.game = game;
    }

    draw = () => {
        this.game.canvas_service.fillStyle(GAME.background_color);
        this.game.canvas_service.fillRect(0, 0, this.game.bounds.width, this.game.bounds.height);
    }
}