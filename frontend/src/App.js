import React, { Component } from "react"
import "./App.css"
import { BrowserRouter, Route } from "react-router-dom"
import { GameList } from "./screens/GameList"
import Header from "./components/Header"
import Game from "./screens/Game"
import UserList from "./screens/UserList"
import NowPlaying from "./components/NowPlaying"

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
        <BrowserRouter basename="/">
          <div>
            <Header />
            <Route exact path="/" component={NowPlaying} />
            <Route exact path="/game/" component={GameList} />
            <Route path="/game/:id" component={Game} />
            <Route path="/users/" component={UserList} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
