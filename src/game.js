import {AnimationService, CanvasService, KeyService, MouseService} from "./services";
import _ from "lodash";
import {GAME, STAR} from "./constants";
import {Star} from "./objects/star";

export class Game {
    static timestamp;

    user = {
        keys: {},
        mouse: {}
    };

    objects = {
        stars: [],
        players: []
    };

    constructor(canvas) {
        this.canvas = canvas;
        this.bounds = this.canvas.getBoundingClientRect();

        this.key_service = new KeyService(this);
        this.mouse_service = new MouseService(this);
        this.canvas_service = new CanvasService(this);
        this.animation_service = new AnimationService(this.loop);
    }

    init = () => {
        this.objects.stars = _.times(STAR.max, () => new Star(this.bounds));
        this.animation_service.request();
    };

    loop = timestamp => {
        Game.timestamp = timestamp;

        // Update objects
        this.update();

        // Draw objects
        this.draw();

        // Request new animation from for next iteration
        this.animation_service.request();
    };

    update = () => {
        this.objects.stars.forEach(star => star.update(this))
    };

    draw = () => {
        // Clear the existing content
        this.canvas_service.clear(0, 0, this.bounds.width, this.bounds.height);

        // Draw the background
        this.drawBackground();

        // Draw the stars;
        this.objects.stars.forEach(star => star.draw(this));
    };

    drawBackground = () => {
        this.canvas_service.fill(GAME.background_color);
        this.canvas_service.rect(0, 0, this.bounds.width, this.bounds.height);
        this.canvas_service.fill();
    }
}