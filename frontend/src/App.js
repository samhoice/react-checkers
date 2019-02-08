import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Cookies from "js-cookie";
import { Container, Row, Col } from "react-bootstrap";
import { ListGroup, Navbar, Nav, NavItem } from "react-bootstrap";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const axios = require("axios");

class Home extends Component {
    render() {
        console.log("Home");
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.postCreds(this.state.username, this.state.password);
    }

    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <label>
                    Username:
                    <input
                        name="username"
                        type="text"
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        name="password"
                        type="password"
                        onChange={this.handleInputChange}
                    />
                </label>
                <input type="submit" value="submit" />
            </form>
        );
    }
}

class UserListItem extends Component {
    render() {
        return <ListGroup.Item>{this.props.user.username}</ListGroup.Item>;
    }
}

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        };
        this.procResponse = this.procResponse.bind(this);
    }

    procResponse(response) {
        const userList = response.data.results.slice();
        this.setState({ userList: userList });
    }

    componentDidMount() {
        axios
            .get("/skele/api/users/")
            .then(response => {
                this.procResponse(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
                <Container>
                    <Row>
                        <Col />
                        <Col xs={6}>
                            <ListGroup>
                                {this.state.userList.map(user => (
                                    <UserListItem user={user} />
                                ))}
                            </ListGroup>
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </div>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: ""
        };
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
                            <Navbar.Brand>Stuff Here</Navbar.Brand>
                            <Nav>
                                <NavItem>
                                    <LinkContainer to="/">
                                        <Nav.Link>Home</Nav.Link>
                                    </LinkContainer>
                                </NavItem>
                                <NavItem>
                                    <LinkContainer to="/users/">
                                        <Nav.Link>Users</Nav.Link>
                                    </LinkContainer>
                                </NavItem>
                            </Nav>
                        </Navbar>

                        <Route exact path="/" component={Home} />
                        <Route path="/users/" component={Users} />
                        <Route
                            path="/login"
                            render={props => (
                                <LoginForm
                                    {...props}
                                    postCreds={this.postCreds}
                                />
                            )}
                        />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
