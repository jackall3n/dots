import { random, rgba, distance } from "../utils";
import { STAR } from "../settings";

export class Star {
    settings = {};
    bounds;

    constructor(bounds) {
        this.bounds = bounds;

        this.create();
    }

    create = () => {
        this.settings.radius = random(1, 2);
        this.settings.x = random(0, this.bounds.width);
        this.settings.y = random(0, this.bounds.height);
        this.settings.y_velocity = random(STAR.velocity.min, STAR.velocity.max);
        this.settings.x_velocity = random(STAR.velocity.min, STAR.velocity.max);
        this.settings.a_velocity = STAR.alpha.velocity;
        this.settings.color = {
            r: 255,
            g: 255,
            b: 255,
            a: random(STAR.alpha.min, STAR.alpha.max)
        };
    };

    update = (timestamp, world) => {
        this.settings.y += this.settings.y_velocity;
        this.settings.x += this.settings.x_velocity;
        this.settings.color.a += this.settings.a_velocity;

        if (
            this.settings.color.a >= STAR.alpha.max ||
            this.settings.color.a <= STAR.alpha.min
        ) {
            this.settings.a_velocity = this.settings.a_velocity * -1;
        }

        if (this.settings.x > this.bounds.width + 10) {
            this.create();
            this.settings.x = -10;
        }

        if (this.settings.y > this.bounds.height + 10) {
            this.create();
            this.settings.y = -10;
        }

        if (this.settings.y < world.glow.y && this.settings.y_velocity < 0) {
            this.settings.y_velocity = this.settings.y_velocity * -1;
        }

        if (this.settings.x < world.glow.x && this.settings.y_velocity < 0) {
            this.settings.x_velocity = this.settings.x_velocity * -1;
        }

        let d = distance(
            this.settings.x,
            this.settings.y,
            world.glow.x,
            world.glow.y
        );

        /*this.settings.color.a = Math.max(
          1 - Math.min(1 * (d / 300), 1),
          STAR.alpha.min
        );*/

        this.settings.color.b =
            255 - Math.max(255 - Math.min(255 * (d / 300), 255), 0);
    };

    draw = context => {
        const { x, y, radius, color } = this.settings;

        context.fillStyle = rgba(color.r, color.g, color.b, color.a);
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.fill();
    };
}
