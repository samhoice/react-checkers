import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Cookies from 'js-cookie';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const axios = require("axios");

class Home extends Component {
    render() {
        return <div>Home</div>;
    }
}

class LoginForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }

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
        console.log("loginform - handleSubmit");
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
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Password:
                    <input 
                        name="password"
                        type="password" 
                        onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="submit" />
            </form>
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
        console.log("postCreds");
        console.log(username);
        console.log(password);
        const csrf = Cookies.get('csrftoken');
        axios.post("/skele/rest-auth/login/", {
                username: username,
                email: "",
                password: password,
            },
            {
                headers: {
                    "X-CSRFTOKEN": csrf,
                }
            })
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
                <Router basename="/skele/static/frontend/">
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>

                        <Route exact path="/" component={Home} />
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
