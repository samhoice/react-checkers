import React, { Component } from "react"
import { Col } from "react-bootstrap"
import { Checker } from "./Checker"

class BoardSquare extends Component {
    render() {
        let bg_class = "board-square black-square"
        if (this.props.square === 0) {
            bg_class = "board-square white-square"
        }

        if (this.props.activeSquare === this.props.id) {
            bg_class = bg_class + " active"
        }

        let checker = null
        if (this.props.square > 1) {
            checker = <Checker type={this.props.square} />
        }

        let number = this.props.id.split("-")[1]
        let xy = number.split('')

        let sq_num = parseInt(xy[1])*4 + Math.floor(parseInt(xy[0])/2)
        return (
            <Col
                xs={1}
                className={bg_class}
                id={this.props.id}
                onClick={
                    this.props.square
                        ? () => this.props.onBoardClick(this.props.id)
                        : null
                }
            >
                {checker}
                {this.props.square ? sq_num : ""}
            </Col>
        )
    }
}

export { BoardSquare }
