import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>Home</div>
    );
  }
}

class LoginForm extends Component {
  render() {
    return (
      <form>
        <label>
	  Username:
	</label>
	<input type="text" />
	<label>
	  Password:
	</label>
	<input type="password" />
      </form>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Router>
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
	    <Route path="/login" component={LoginForm} />
	  </div>
	</Router>
      </div>
    );
  }
}

export default App;
