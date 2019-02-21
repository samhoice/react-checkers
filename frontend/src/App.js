import React, { Component } from "react";
import "./App.css";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { GameList } from "./components/GameList";
import { Game } from "./components/Game";
import { UserList } from "./components/UserList";

class NowPlaying extends Component {
    render() {
        if (this.props.now_playing === 0) {
            return <Redirect to="/game" />;
        } else {
            return <Redirect to={"/game/" + this.props.now_playing} />;
        }
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            now_playing: 0,
            active: "",
            board: [
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1]
            ]
        };
        this.processGameData = this.processGameData.bind(this);
        this.onSquareClick = this.onSquareClick.bind(this);
    }

    processGameData(response) {
        this.setState({ now_playing: response.data.id });
        this.setState({ board: response.data.board_set[0].layout.slice() });
    }

    onSquareClick(id) {
        console.log("onSquareClick " + id);
        this.setState({ active: id.slice() });
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
                                    now_playing={this.state.now_playing}
                                    boardState={this.state.board}
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/game/"
                            render={props => <GameList />}
                        />

                        <Route
                            path="/game/:id"
                            render={props => (
                                <Game
                                    {...props}
                                    boardState={this.state.board}
                                    processGameData={this.processGameData}
                                    onSquareClick={this.onSquareClick}
                                    active={this.state.active}
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
