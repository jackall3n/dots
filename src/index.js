import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { STAR, CANVAS } from "./settings";

import { Star } from "./objects/star";

import "./styles.css";

console.clear();

class Sky extends React.Component {
  state = {
    stars: []
  };

  ctx;
  bounds;

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.bounds = this.canvas.getBoundingClientRect();
    this.ctx = this.canvas.getContext("2d");
    this.canvas.onmousemove = this.hover;
    this.world = {
      glow: {
        x: this.bounds.width / 2,
        y: this.bounds.height / 2
      }
    };

    let stars = _.times(STAR.max, () => new Star(this.bounds));

    this.setState(
      {
        stars
      },
      () => requestAnimationFrame(this.update)
    );
  }

  hover = e => {
    this.world.glow.x = e.clientX;
    this.world.glow.y = e.clientY;
  };

  resize = () => {
    console.log("resize");
  };

  drawBackground = () => {
    this.ctx.fillStyle = CANVAS.background_color;
    this.ctx.rect(0, 0, this.bounds.width, this.bounds.height);
    this.ctx.fill();
  };

  update = timestamp => {
    this.draw();
    this.state.stars.forEach(s => s.update(timestamp, this.world));

    requestAnimationFrame(this.update);
  };

  draw = () => {
    this.ctx.clearRect(0, 0, this.bounds.width, this.bounds.height);
    this.drawBackground();
    this.state.stars.forEach(s => s.draw(this.ctx));
  };

  render() {
    return (
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={el => (this.canvas = el)}
      />
    );
  }
}

ReactDOM.render(<Sky />, document.getElementById("root"));
