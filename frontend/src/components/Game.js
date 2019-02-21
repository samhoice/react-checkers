import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import ClickableBoardSquare from '../containers/ClickableBoardSquare'
//import { BoardSquare, Checker } from './BoardSquare'

const axios = require("axios");

class Game extends Component {
    componentDidMount() {
        var url = "/skele/api/games/" + this.props.match.params.id;
        axios
            .get(url)
            .then(response => {
                this.props.processGameData(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                Game {this.props.match.params.id}
                <Board
                    boardState={this.props.boardState}
                    onSquareClick={this.props.onSquareClick}
                    active={this.props.active}
                />
            </div>
        );
    }
}

class Board extends Component {
    render() {
        console.log("board render");
        var board = this.props.boardState.slice();
        board.reverse();
        return (
            <Container>
                {board.map((row, i) => (
                    <Row className="checker-row">
                        {row.map((sq, j) => (
                            <ClickableBoardSquare
                                key={"" + j.toString() + (7 - i).toString()}
                                id={"UI-" + j.toString() + (7 - i).toString()}
                                square={sq}
                                active={this.props.active}
                                onSquareClick={this.props.onSquareClick}
                            />
                        ))}
                    </Row>
                ))}
            </Container>
        );
    }
}

export { Game };
