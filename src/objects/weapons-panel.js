import {WEAPONS_PANEL} from "../constants";
import {rgba} from "../utils";

export class WeaponsPanel {
    props = {};

    constructor(game) {
        this.game = game;
        this.create();
    }

    create = () => {
        this.props.x = this.game.bounds.width - WEAPONS_PANEL.width - WEAPONS_PANEL.margin;
        this.props.y = WEAPONS_PANEL.margin;
        this.props.width = WEAPONS_PANEL.width;
        this.props.height = this.game.bounds.height - (WEAPONS_PANEL.margin * 2);
    };

    update = () => {
        if (this.game.user.keys.b) {
            const charge_rate = 0.4;
            this.game.objects.player.state.charge = Math.min(this.game.objects.player.state.charge + charge_rate, 100);
        }

        if (this.game.objects.player.state.charge && !this.game.user.keys.b) {
            this.game.objects.player.state.firing = true;
        }

        if (!this.game.objects.player.state.charge) {
            this.game.objects.player.state.firing = false;
        }
    };

    draw = () => {
        const percentage_fill = this.game.objects.player.state.charge / 100;
        const fill = this.props.height * percentage_fill;

        const color = {
            r: Math.ceil(255 * percentage_fill),
            g: 255 - Math.ceil(255 * percentage_fill),
            b: 0
        };

        this.game.canvas_service.strokeStyle('#fff');
        this.game.canvas_service.strokeWidth(WEAPONS_PANEL.strokeWidth);
        this.game.canvas_service.strokeRect(this.props.x, this.props.y, this.props.width, this.props.height);
        this.game.canvas_service.fillStyle(rgba(color.r, color.g, color.b));
        this.game.canvas_service.fillRect(this.props.x, (this.props.height + this.props.y) - fill, this.props.width, fill);
    }
}