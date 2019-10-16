import React, { Component } from "react"
import { connect } from "react-redux"
import { setDebug, getCurrentBoard } from "../actions"

const mapStateToProps = state => {
    return {
        game_id: state.uiState.game_id,
        turn: state.uiState.turn_num,
        board_id: state.uiState.board_id,
        request: state.uiState.req_pending,
        status: state.uiState.status,
        emessage: state.uiState.emessage,
        debug: state.uiState.debug
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetDebug: (val) => {
            dispatch(setDebug(val))
        },
        onRefreshBoard: (game_id) => {
            dispatch(getCurrentBoard(game_id))
        }
    }
}

class UI extends Component {

    render() {
        return (
            <div>
                <ul>
                <li>Game: {this.props.game_id}</li>
                <li>Turn #: {this.props.turn} </li>
                <li>Moving: {this.props.turn % 2 ? "Red" : "Black"} </li>
                </ul>
                <hr/>
                <ul>
                <li>Request: {this.props.request ? "Active" : "Idle" }</li>
                <li>Status: {this.props.status}</li>
                <li>Error: {this.props.emessage}</li>
                <li><button className="btn btn-primary" onClick={() => this.props.onSetDebug(!this.props.debug)}>debug</button></li>
                <li>
                    <button className="btn btn-primary" onClick={() => this.props.onRefreshBoard(this.props.game_id)}>
                        refresh
                    </button>
                </li>
                </ul>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UI)
