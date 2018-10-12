import {random, rgba, distance} from "../utils";
import {STAR} from "../constants";

export class Star {
    props = {};
    bounds;

    constructor(bounds) {
        this.bounds = bounds;

        this.create();
    }

    create = () => {
        this.props.radius = random(1, 2);
        this.props.x = random(0, this.bounds.width);
        this.props.y = random(0, this.bounds.height);
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

    update = game => {
        this.props.y += this.props.y_velocity;
        this.props.x += this.props.x_velocity;
        this.props.color.a += this.props.a_velocity;

        if (
            this.props.color.a >= STAR.alpha.max ||
            this.props.color.a <= STAR.alpha.min
        ) {
            this.props.a_velocity = this.props.a_velocity * -1;
        }

        if (this.props.x > this.bounds.width + 10) {
            this.create();
            this.props.x = -10;
        }

        if (this.props.y > this.bounds.height + 10) {
            this.create();
            this.props.y = -10;
        }

        if (this.props.y < game.user.mouse.y && this.props.y_velocity < 0) {
            this.props.y_velocity = this.props.y_velocity * -1;
        }

        if (this.props.x < game.user.mouse.x && this.props.y_velocity < 0) {
            this.props.x_velocity = this.props.x_velocity * -1;
        }

        let d = distance(
            this.props.x,
            this.props.y,
            game.user.mouse.x,
            game.user.mouse.y
        );

        this.props.color.a = Math.max(
            1 - Math.min(d / 300, 1),
            STAR.alpha.min
        );

        this.props.color.b =
            255 - Math.max(255 - Math.min(255 * (d / 300), 255), 0);
    };

    draw = game => {
        const {x, y, radius, color} = this.props;

        game.canvas_service.circle(x, y, radius, rgba(color.r, color.g, color.b, color.a));
    };
}
