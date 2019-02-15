import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Cookies from "js-cookie";
import { Container, Row, Col } from "react-bootstrap";
import { ListGroup, Navbar, Nav, NavItem } from "react-bootstrap";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { GameList } from "./GameList";
import { Game } from "./Game";
import { UserList } from "./UserList";

const axios = require("axios");

class NowPlaying extends Component {
    render() {
        if (this.props.now_playing == 0) {
            return <Redirect to='/game' />
        } else {
            return <Redirect to={'/game/'+this.props.now_playing} />
        }
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            now_playing: 0,
            board: [
                [0, 4, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 2, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 3, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 3, 0, 1, 0],
                [0, 1, 0, 1, 0, 3, 0, 1],
                [1, 0, 5, 0, 3, 0, 3, 0]
            ]
        };
        this.processGameData = this.processGameData.bind(this);
    }


    processGameData(response) {
        this.setState({board: response.data.board_set[0].layout.slice()});
    }

    // TODO: Change this to use session auth and log in through the regular
    // django login
    //
    postCreds(username, password) {
        const csrf = Cookies.get("csrftoken");
        axios
            .post(
                "/skele/rest-auth/login/",
                {
                    username: username,
                    email: "",
                    password: password
                },
                {
                    headers: {
                        "X-CSRFTOKEN": csrf
                    }
                }
            )
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
        // TODO: save state
    }

    render() {
        return (
            <div className="App">
                <Router basename="/">
                    <div>
                        <Navbar bg="light" expand="lg">
                            <Navbar.Brand>React Checkers</Navbar.Brand>
                            <Nav>
                                <NavItem>
                                    <LinkContainer to="/">
                                        <Nav.Link>Home</Nav.Link>
                                    </LinkContainer>
                                </NavItem>
                                <NavItem>
                                    <LinkContainer to="/game/">
                                        <Nav.Link>Games</Nav.Link>
                                    </LinkContainer>
                                </NavItem>
                                <NavItem>
                                    <LinkContainer to="/users/">
                                        <Nav.Link>Users</Nav.Link>
                                    </LinkContainer>
                                </NavItem>
                            </Nav>
                        </Navbar>

                        <Route 
                            exact
                            path="/" 
                            render={props => (
                                <NowPlaying
                                    {...props}
                                    now_playing={ this.state.now_playing }
                                    boardState={ this.state.board }
                                />
                            )}
                        />

                        <Route exact path="/game/" render={props => <GameList />} />

                        <Route 
                            path="/game/:id" 
                            render={props => (
                                <Game
                                    {...props}
                                    boardState={this.state.board}
                                    processGameData = {this.processGameData}
                                />
                            )}
                        />
                        <Route path="/users/" component={UserList} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
