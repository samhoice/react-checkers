import React, { Component } from "react"
import { connect } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import { GameList } from "./screens/GameList"
import Header from "./components/Header"
import Game from "./screens/Game"
import UserList from "./screens/UserList"
import Login from "./screens/Login"
import NowPlaying from "./components/NowPlaying"
import { getActiveUser } from "./actions/index"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      now_playing: 0
    }
  }

  componentDidMount() {
    this.props.getActiveUser()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter basename="/">
          <div>
            <Header />
            <Route exact path="/" component={NowPlaying} />
            <Route exact path="/game/" component={GameList} />
            <Route path="/game/:id" component={Game} />
            <Route exact path="/users/" component={UserList} />
            <Route path="/users/login" component={Login} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getActiveUser: id => {
      dispatch(getActiveUser())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
