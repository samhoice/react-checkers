import React, { Component } from "react"
import { Container, Row } from "react-bootstrap"
import { connect } from "react-redux"
import ClickableBoardSquare from "../components/BoardSquare"
import { getCurrentBoard } from "../actions"

const mapStateToProps = state => {
    return {
        boardState: state.boardLayout.layout
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBoard: id => {
            dispatch(getCurrentBoard(id))
        }
    }
}

class Game extends Component {
    componentWillMount() {
        this.props.getBoard(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                Game {this.props.match.params.id}
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
            </Container>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)
