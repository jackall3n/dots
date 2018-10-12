import {AnimationService, CanvasService, KeyService, MouseService} from "./services";
import _ from "lodash";
import {GAME, STAR} from "./constants";
import {Star} from "./objects/star";
import {Player} from "./objects/player";
import {Scoreboard} from "./objects/scoreboard";
import {Background} from "./objects/background";
import {Enemy} from "./objects/enemy";
import {WeaponsPanel} from "./objects/weapons-panel";

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
        weapons_panel: {},
        background: {},
        player: {},
        stars: [],
        enemies: []
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
        this.objects.weapons_panel = new WeaponsPanel(this);
        this.objects.enemies = [
            new Enemy(this, {x: GAME.padding.left, y: GAME.padding.top}),
            new Enemy(this, {x: this.bounds.width - GAME.padding.right, y: GAME.padding.top}),
            new Enemy(this, {x: this.bounds.width - GAME.padding.right, y: this.bounds.height - GAME.padding.bottom}),
            new Enemy(this, {x: GAME.padding.left, y: this.bounds.height - GAME.padding.bottom}),
        ];

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
        this.objects.enemies.forEach(enemy => enemy.draw());
        this.objects.player.draw();
        this.objects.weapons_panel.draw();
        this.objects.scoreboard.draw();
    };

    update = () => {
        this.objects.weapons_panel.update();
        this.objects.player.update();
        this.objects.enemies.forEach(enemy => enemy.update());
        this.objects.stars.forEach(star => star.update());
    };
}