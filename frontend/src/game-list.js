import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

const axios = require("axios");

class GameListItem extends Component {
    render() {
        return (
            <Row>
                <Col>{this.props.game.id}</Col>
                <Col>{this.props.game.created}</Col>
            </Row>
        );
    }
}

class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameList: []
        };
        this.procResponse = this.procResponse.bind(this);
    }

    procResponse(response) {
        if (response.data.count == 0) {
            this.setState({ gameList: [] });
        } else {
            const gameList = response.data.results.slice();
            this.setState({ gameList: gameList });
        }
    }

    componentDidMount() {
        axios
            .get("/skele/api/games")
            .then(response => {
                this.procResponse(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <Container>
                <h1>Game List</h1>
                {this.state.gameList.map(game => (
                    <GameListItem game={game} />
                ))}
            </Container>
        );
    }
}

export { GameList };
