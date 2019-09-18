import React, { Component } from "react"
import { Col } from "react-bootstrap"
import { Checker } from "./Checker"

import { connect } from "react-redux"
import { setActiveSquare, makeMove, makeJump } from "../actions"
//import { BoardSquare } from "../components/BoardSquare.js"

const mapStateToProps = state => {
    return {
        activeSquare: state.uiState.active_sq,
        debug: state.uiState.debug,
        game_id: state.uiState.game_id,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onBoardClick: id => {
            dispatch(setActiveSquare(id))
        },
        onMove: (game_id, path) => {
            dispatch(makeMove(game_id, path))
        },
        onJump: (game_id, path) => {
            dispatch(makeJump(game_id, path))
        }
    }
}

class BoardSquare extends Component {
    render() {
        if (this.props.square === 0) {
            //bg_class = "board-square white-square"
            return (
                <Col xs={1} className="board-square white-square" id={this.props.id}></Col>
            )
        }

        let bg_class = "board-square black-square"
        if (this.props.activeSquare === this.props.id) {
            bg_class = bg_class + " active"
        }

        let checker = null
        if (this.props.square > 1) {
            checker = <Checker type={this.props.square} />
        }

        let number = this.props.id.split("-")[1]
        let active_num = this.props.activeSquare.split("-")[1]
        let xy = number.split('')
        let sq_num = parseInt(xy[1])*4 + Math.floor(parseInt(xy[0])/2)
        let sq_txt = ""

        if(this.props.debug) {
            sq_txt = sq_num + " " + xy
        }

        return (
            <Col
                xs={1}
                className={bg_class}
                id={this.props.id}
                onClick={
                    () => {
                        // need a closure to wrap the functions and the parameters
                        // so that I can use the closure as the onclick and select
                        // two funcs with different parameters
                        if (this.props.activeSquare && this.props.activeSquare !== this.props.id) {
                            // we have an active square but this is not it. Try to move
                            // xy is the coords of this sq.
                            // need coords of active square
                            let xy_active = this.props.activeSquare.split('-')[1].split('')
                            if(Math.abs(xy[0] - xy_active[0]) > 1) {
                                this.props.onJump(this.props.game_id, 
                                    {from_sq: active_num, to_sq: number}) 
                            } else {
                                this.props.onMove(this.props.game_id, 
                                    {from_sq: active_num, to_sq: number}) 
                            }
                        } else {
                            // this is a clickable square (and maybe it's also the activeSquare)
                            this.props.onBoardClick(this.props.id)
                        }
                    }
                }
            >
                {checker}
                {sq_txt}
            </Col>
        )
    }
}

const ClickableBoardSquare = connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardSquare)

export { BoardSquare }
export default ClickableBoardSquare
