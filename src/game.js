import {AnimationService, CanvasService, KeyService, MouseService} from "./services";
import _ from "lodash";
import {GAME, STAR} from "./constants";
import {Star} from "./objects/star";
import {Player} from "./objects/player";
import {Scoreboard} from "./objects/scoreboard";
import {Background} from "./objects/background";

export class Game {
    static timestamp;

    stats = {
        score: 0
    };

    user = {
        keys: {},
        mouse: {
            x: 150,
            y: 150
        }
    };

    objects = {
        scoreboard: {},
        background: {},
        player: {},
        stars: []
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
        this.canvas_service.font('20px Georgia');

        this.objects.background = new Background(this);
        this.objects.stars = _.times(STAR.max, () => new Star(this));
        this.objects.player = new Player(this);
        this.objects.scoreboard = new Scoreboard(this);

        this.animation_service.request();
    };

    loop = timestamp => {
        Game.timestamp = timestamp;

        // Draw objects
        this.draw();

        // Update objects
        this.update();

        // Request new animation from for next iteration
        this.animation_service.request();
    };

    draw = () => {
        // Clear the existing content
        this.canvas_service.clear(0, 0, this.bounds.width, this.bounds.height);

        // Draw the objects;
        this.objects.background.draw();
        this.objects.stars.forEach(star => star.draw());
        this.objects.player.draw();
        this.objects.scoreboard.draw();
    };

    update = () => {
        this.objects.player.update();
        this.objects.stars.forEach(star => star.update());
    };
}