import {GAME, PLAYER} from "../constants";

export class Player {
    props = {};
    state = {};

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
        this.glow_radius = PLAYER.glow_radius;

        this.state = {
            charge: 0,
            firing: false
        }
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

        if (this.props.y > this.game.bounds.height + GAME.bounds) {
            this.props.y = -GAME.bounds;
        }

        if (this.props.x > this.game.bounds.width + GAME.bounds) {
            this.props.x = -GAME.bounds;
        }

        if (this.props.x < -GAME.bounds) {
            this.props.x = this.game.bounds.width + GAME.bounds;
        }

        if (this.props.y < -GAME.bounds) {
            this.props.y = this.game.bounds.height + GAME.bounds;
        }

        // If firing, deplete charge
        if (this.state.firing) {
            const depletion_rate = 20;

            this.glow_radius += depletion_rate ;
            this.state.charge = Math.max(this.state.charge - depletion_rate, 0);
        }

        // If not firing and glow is now back to normal, reduce it
        if (!this.state.firing && this.glow_radius !== PLAYER.glow_radius && !this.state.charge) {
            this.glow_radius -= 10;
        }
    };

    draw = () => {
        const {x, y, width, height} = this.props;
        this.game.canvas_service.strokeWidth(PLAYER.strokeWidth);
        this.game.canvas_service.fillRect(x, y, width, height, PLAYER.color);
        this.game.canvas_service.strokeRect(x, y, width, height, PLAYER.strokeColor);
        this.game.canvas_service.strokeRect(x + 2, y + 2, width - 4, height - 4, PLAYER.strokeColor2);
        this.game.canvas_service.strokeRect(x + 4, y + 4, width - 8, height - 8, PLAYER.strokeColor3);
    }
}