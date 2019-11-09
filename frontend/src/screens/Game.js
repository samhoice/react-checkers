import React, { Component } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { connect } from "react-redux"
import UI from "../components/UI"
import Board from "../components/Board"
import Chat from "../components/Chat"
import { getCurrentBoard, setGameId } from "../actions/index"


class Game extends Component {

  componentWillMount() {
    this.props.setGameId(this.props.match.params.id)
    this.props.getBoard(this.props.match.params.id)
  }

  render() {
    return (
      <Container fluid='true'>
        <Row>
          <Col xs={2} sm={1}>
            <UI />
          </Col>
          <Col xs={12} sm={8}>
            <Board 
              boardState={this.props.boardState} />
          </Col>
          <Col xs={4} sm={3}>
            <Chat />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    gameId: state.uiState.game_id,
    boardState: state.gameState.layout
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBoard: id => {
      dispatch(getCurrentBoard(id))
    },
    setGameId: id => {
      dispatch(setGameId(id))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
