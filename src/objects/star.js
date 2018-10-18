import {random, rgba, distance, collision} from "../utils";
import {STAR} from "../constants";

export class Star {
    game;
    props = {};
    state = {};

    constructor(game) {
        this.game = game;
        this.create();
    }

    create = () => {
        const bounds = this.game.canvas_service.bounds;

        this.state.active = true;

        this.props.radius = random(1, 2);
        this.props.x = random(0, bounds.width);
        this.props.y = random(0, bounds.height);
        this.props.y_velocity = random(STAR.velocity.min, STAR.velocity.max);
        this.props.x_velocity = random(STAR.velocity.min, STAR.velocity.max);
        this.props.a_velocity = STAR.alpha.velocity;
        this.props.color = {
            r: 255,
            g: 255,
            b: 255,
            a: random(STAR.alpha.min, STAR.alpha.max)
        };
    };

    update = () => {
        if (this.state.dying) {
            this.props.color.a -= 0.01;
            return;
        }

        if (this.state.dying && this.props.color.a <= 0) {
            this.state.active = false;
        }

        if (!this.state.active) {
            return;
        }

        const player = this.game.objects.player;

        if (collision(player.props.x, player.props.y, player.props.width, player.props.height, this.props.x, this.props.y)) {
            this.state.active = false;
            this.game.stats.score++;
            return;
        }

        const bounds = this.game.canvas_service.bounds;

        this.props.rotation = Math.atan2(player.props.y - this.props.y, player.props.x - this.props.x);

        let d = distance(
            this.props.x,
            this.props.y,
            player.props.x,
            player.props.y
        );

        const inside_glow = d < player.glow_radius;


        if (inside_glow) {
            this.props.y_velocity = Math.cos(this.props.rotation) * 2;
            this.props.x_velocity = Math.sin(this.props.rotation) * 2;
        }

        if (inside_glow && player.state.firing) {
            this.state.dying = true;
            this.props.color.r = 255;
            this.props.color.g = 0;
            this.props.color.b = 0;
            this.props.color.a = 1;
            this.game.stats.score++;
        }

        this.props.y += this.props.y_velocity;
        this.props.x += this.props.x_velocity;

        this.props.color.a += this.props.a_velocity;

        if (this.props.color.a >= STAR.alpha.max || this.props.color.a <= STAR.alpha.min) {
            this.props.a_velocity = this.props.a_velocity * -1;
        }

        if (this.props.x > bounds.width + 10) {
            this.create();
            this.props.x = -10;
        }

        if (this.props.y > bounds.height + 10) {
            this.create();
            this.props.y = -10;
        }

        if (this.props.y < player.props.y && this.props.y_velocity < 0) {
            this.props.y_velocity = this.props.y_velocity * -1;
        }

        if (this.props.x < player.props.x && this.props.y_velocity < 0) {
            this.props.x_velocity = this.props.x_velocity * -1;
        }

        if (!this.state.dying) {
            this.props.color.g = Math.max(255 - Math.min(255 * (d / player.glow_radius) * player.state.charge / 100, 255), 0);
            this.props.color.r = 255 - Math.max(255 - Math.min(255 * (d / player.glow_radius), 255), 0);
            this.props.color.b = 255 - Math.max(255 - Math.min(255 * (d / player.glow_radius), 255), 0);
            this.props.color.a = Math.max(1 - Math.min(d / player.glow_radius, 1), STAR.alpha.min);
        }
    };

    draw = () => {
        if (!this.state.active) {
            return;
        }

        const {x, y, radius, color} = this.props;

        this.game.canvas_service.circle(x, y, radius, rgba(color.r, color.g, color.b, color.a));
    };
}
