import {GAME} from "../constants";

export class Enemy {
    props = {};

    constructor(game, origin) {
        this.game = game;
        this.props.x = origin.x;
        this.props.y = origin.y;
    }

    draw = () => {
        this.game.canvas_service.fillStyle(GAME.background_color);
        this.game.canvas_service.fillRect(0, 0, this.game.bounds.width, this.game.bounds.height);
    }
}