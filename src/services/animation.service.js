// There's an issue with the dev-server that it doesn't clear previously invoked animation frames
cancelAnimationFrame(window.animation);

export class AnimationService {
    animation;

    constructor(loop) {
        this.loop = loop;
    }

    request = () => {
        window.animation = this.animation = window.requestAnimationFrame(this.loop);
    };

    cancel = animation_id => {
        cancelAnimationFrame(animation_id || this.animation || window.animation);
    };
}