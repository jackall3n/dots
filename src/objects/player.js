import {GAME, PLAYER} from "../constants";

export class Player {
    props = {};

    constructor(game) {
        this.game = game;
        this.create();
    }

    create = () => {
        const width = PLAYER.width;
        const height = PLAYER.height;

        this.props.x = this.game.bounds.width / 2 - width;
        this.props.y = this.game.bounds.height / 2 - height;
        this.props.width = width;
        this.props.height = height;
    };

    update = () => {
        const velocity = 1 + (this.game.stats.score / 10);

        if (this.game.user.keys.w) {
            this.props.y -= velocity;
        }

        if (this.game.user.keys.a) {
            this.props.x -= velocity;
        }

        if (this.game.user.keys.d) {
            this.props.x += velocity;
        }

        if (this.game.user.keys.s) {
            this.props.y += velocity;
        }

        if (this.props.y > this.game.bounds.height + GAME.margin) {
            this.props.y = -GAME.margin;
        }

        if (this.props.x > this.game.bounds.width + GAME.margin) {
            this.props.x = -GAME.margin;
        }

        if (this.props.x < -GAME.margin) {
            console.log(this.props.x, -GAME.margin);
            this.props.x = this.game.bounds.width + GAME.margin;
        }

        if (this.props.y < -GAME.margin) {
            this.props.y = this.game.bounds.height + GAME.margin;
        }
    };

    draw = () => {
        const {x, y, width, height} = this.props;
        this.game.canvas_service.strokeWidth(PLAYER.strokeWidth);
        this.game.canvas_service.fillRect(x, y, width, height, PLAYER.color);
        this.game.canvas_service.strokeRect(x, y, width, height, PLAYER.strokeColor);
        this.game.canvas_service.strokeRect(x + 2, y + 2, width - 4, height - 4, PLAYER.strokeColor2);
        this.game.canvas_service.strokeRect(x + 4, y + 4, width - 8, height - 8, PLAYER.strokeColor2);

    }
}