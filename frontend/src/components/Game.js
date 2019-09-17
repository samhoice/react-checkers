import React, { Component } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { connect } from "react-redux"
import ClickableBoardSquare from "../components/BoardSquare"
import UI from "../components/UI"
import { getCurrentBoard, setGameId } from "../actions"

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

class Game extends Component {
    componentWillMount() {
        this.props.getBoard(this.props.match.params.id)
        this.props.setGameId(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                <Board boardState={this.props.boardState} />
            </div>
        )
    }
}

class Board extends Component {
    render() {
        var board = this.props.boardState.slice()
        // Draw the board from the top down
        board.reverse()
        return (
            <Container>
                <Row>
                <Col xs={2}>
                    <UI></UI>
                </Col>
                <Col xs={8}>
                {board.map((row, i) => (
                    <Row className="checker-row">
                        {row.map((sq, j) => (
                            <ClickableBoardSquare
                                key={"" + j.toString() + (7 - i).toString()}
                                id={"UI-" + j.toString() + (7 - i).toString()}
                                square={sq}
                            />
                        ))}
                    </Row>
                ))}
                </Col>
                <Col xs={2}>
                </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)
