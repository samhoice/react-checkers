import React, { Component } from "react"
import { connect } from "react-redux"
import { setDebug } from "../actions"

const mapStateToProps = state => {
    return {
        game_id: state.uiState.game_id,
        board_id: state.uiState.board_id,
        status: state.uiState.status,
        emessage: state.uiState.emessage,
        debug: state.uiState.debug
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetDebug: (val) => {
            dispatch(setDebug(val))
        }
    }
}

class UI extends Component {

    render() {
        return (
            <div>
                UI
                <ul>
                <li>Game: {this.props.game_id}</li>
                <li>Status: {this.props.status}</li>
                <li>Error: {this.props.emessage}</li>
                <li><button class="btn btn-primary" onClick={() => this.props.onSetDebug(!this.props.debug)}>debug</button></li>
                </ul>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UI)
