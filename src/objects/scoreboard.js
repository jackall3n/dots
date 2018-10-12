import {rgba} from "../utils";

export class Scoreboard {
    props = {
        padding: {}
    };

    constructor(game) {
        this.game = game;
        this.create();
    }

    create = () => {
        this.props.x = 20;
        this.props.y = 20;
        this.props.padding.x = 20;
        this.props.padding.y = 40;
    };

    draw = () => {
        const score = `You've collected ${this.game.stats.score} so far.`;

        this.game.canvas_service.fillStyle(rgba(0, 0, 255, 0.4));
        this.game.canvas_service.fillText(this.props.x + this.props.padding.x + 4, this.props.y + this.props.padding.y + 4, score);

        this.game.canvas_service.fillStyle(rgba(255, 0, 0, 0.6));
        this.game.canvas_service.fillText(this.props.x + this.props.padding.x + 2, this.props.y + this.props.padding.y + 2, score);

        this.game.canvas_service.fillStyle(rgba(255, 255, 255, 1));
        this.game.canvas_service.fillText(this.props.x + this.props.padding.x, this.props.y + this.props.padding.y, score);
    }
}