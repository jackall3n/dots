import React from "react";
import ReactDOM from "react-dom";

import {Game} from "./game";

import "./styles.css";

console.clear();

class GameController extends React.Component {

    componentDidMount() {
        this.game = new Game(this.canvas);
        this.game.init();
    }

    render() {
        return (
            <canvas
                tabIndex={1}
                width={window.innerWidth}
                height={window.innerHeight}
                ref={el => (this.canvas = el)}
            />
        );
    }
}

ReactDOM.render(<GameController/>, document.getElementById("root"));
