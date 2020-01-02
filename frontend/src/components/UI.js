import React, { Component } from "react"
import { connect } from "react-redux"
import { ListGroup, Badge } from "react-bootstrap"
import { setDebug, getCurrentBoard } from "../actions/index"

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
        <ListGroup>
          <ListGroup.Item>
            Game: {this.props.game_id}
          </ListGroup.Item>
          <ListGroup.Item>
            Turn #: {this.props.turn ? this.props.turn : 0}
          </ListGroup.Item>
          <ListGroup.Item>
            Moving: 
            {this.props.turn % 2 ? 
              <Badge variant={'danger'}>Red</Badge> : 
              <Badge variant={'dark'}>Black</Badge>} 
          </ListGroup.Item>
        </ListGroup>
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
