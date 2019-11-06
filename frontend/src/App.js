import React, { Component } from "react"
import "./App.css"
import { HashRouter as Router, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { GameList } from "./screens/GameList"
import Header from "./components/Header"
import Game from "./screens/Game"
import UserList from "./screens/UserList"

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
            <Header />
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

            <Route exact path="/game/" component={GameList} />
            <Route path="/game/:id" component={Game} />
            <Route path="/users/" component={UserList} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
