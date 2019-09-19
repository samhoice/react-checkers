import React, { Component } from "react"
import "./App.css"
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { HashRouter as Router, Route, Redirect } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { connect } from "react-redux"
import { GameList } from "./components/GameList"
import Game from "./components/Game"
import UserList from "./components/UserList"

const mapStateToProps = state => {
    return {
        now_playing: state.uiState.game_id
    }
}

class NowPlaying extends Component {
    render() {
        if (this.props.now_playing === 0) {
            return <Redirect to="/game" />
        } else {
            return <Redirect to={"/game/" + this.props.now_playing} />
        }
    }
}

const WhatsNowPlaying = connect(
    mapStateToProps,
    null
)(NowPlaying)

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            now_playing: 0
        }
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
                                        <Nav.Link>Now Playing</Nav.Link>
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
                                <WhatsNowPlaying
                                    {...props}
                                    now_playing={this.props.now_playing}
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
                            render={props => <Game {...props} />}
                        />
                        <Route path="/users/" component={UserList} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App
