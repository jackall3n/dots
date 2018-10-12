import {ENEMY, GAME} from "../constants";

export class Enemy {
    props = {};

    constructor(game, origin) {
        this.game = game;
        this.props.x = origin.x;
        this.props.y = origin.y;

        this.create();
    }

    create = () => {
        this.props.radius = ENEMY.radius;
    };

    update = () => {

    };

    draw = () => {
        const {x, y, radius} = this.props;

        this.game.canvas_service.circle(x, y, radius, ENEMY.color);
    }
}