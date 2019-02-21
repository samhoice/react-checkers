import React, { Component } from 'react'
import { Col } from "react-bootstrap";
import { Checker } from './Checker'

class BoardSquare extends Component {
    render() {
        console.log("board square render")
        let bg_class = "board-square black-square";
        if (this.props.square === 0) {
            bg_class = "board-square white-square";
        }
        //console.log(
        //    "compare active: " + this.props.activeSquare + " " + this.props.id
        //);
        if (this.props.activeSquare === this.props.id) {
            bg_class = bg_class + " active";
        }

        let checker = null;
        if (this.props.square > 1) {
            checker = <Checker type={this.props.square} />;
        }

        return (
            <Col
                xs={1}
                className={bg_class}
                id={this.props.id}
                onClick={() => this.props.onBoardClick(this.props.id)}>
                {checker}
            </Col>
        );
    }
}

export { BoardSquare }
