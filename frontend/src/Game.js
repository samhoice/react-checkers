import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

const axios = require("axios");

class Game extends Component {

    componentDidMount() {
        var url = "/skele/api/games/" + this.props.match.params.id;
        axios
            .get(url)
            .then(response => {
                this.props.processGameData(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>Game {this.props.match.params.id}
            
                <Board boardState={this.props.boardState} />
            </div>

        );
    }
}

class Checker extends Component {
    render() {
        let checker_class = 0;
        if (this.props.type == 2) {
            checker_class = "checker red-checker";
        } else if (this.props.type == 3) {
            checker_class = "checker black-checker";
        } else if (this.props.type == 4) {
            checker_class = "checker red-checker king";
        } else {
            checker_class = "checker black-checker king";
        }
        return <div className={checker_class}>
                <div className="bar horizontal"/>
                <div className="bar vertical"/>
            </div>;
    }
}

class BoardSquare extends Component {
    render() {
        let bg_class = "board-square black-square";
        if (this.props.square == 0) {
            bg_class = "board-square white-square";
        }

        let checker = null;
        if (this.props.square > 1) {
            checker = <Checker type={this.props.square} />;
        }

        return (
            <Col xs={1} className={bg_class}>
                {checker}
            </Col>
        );
    }
}

class Board extends Component {
    render() {
        var board = this.props.boardState.slice()
        board.reverse()
        return (
            <Container>
                {board.map(row => (
                    <Row className="checker-row">
                        {row.map(sq => (
                            <BoardSquare square={sq} />
                        ))}
                    </Row>
                ))}
            </Container>
        );
    }
}

export { Game };
