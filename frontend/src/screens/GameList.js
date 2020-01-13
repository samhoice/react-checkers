import React, { Component } from "react"
import { Container, Row, Col, Table } from "react-bootstrap"
// eslint-disable-next-line
import { HashRouter as Router, Route, Link } from "react-router-dom"
import { Redirect } from "react-router-dom"

import UserName from "../components/UserName"
import * as api from '../api'
import Cookies from "js-cookie"

const axios = require("axios")


class GameListItem extends Component {
  state = {
      next_game: null
  }
  render() {
    if(this.state.next_game) {
      return <Redirect to={"/game/" + this.state.next_game} />
    }
    return (
        <tr onClick={ e=> {
            this.setState({ next_game: this.props.game.id})
        }}>
          <td>
            <a href={"/game/" + this.props.game.id}>
            {this.props.game.id}
            </a>
          </td>
          <td>
            <UserName
              user_id = {this.props.game.black_player}
            />
          </td>
          <td>
            <UserName
              user_id = {this.props.game.white_player}
            />
          </td>
          <td>
            <UserName
              user_id = {this.props.game.winner}
            />
          </td>
          <td>
            {this.props.game.created}
          </td>
        </tr>
    )
  }
}

class GameList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameList: []
    }
    this.processList = this.processList.bind(this)
    this.processListItem = this.processListItem.bind(this)
  }

  processList(response) {
    if (response.data.count === 0) {
      this.setState({ gameList: [] })
    } else {
      const gameList = response.data.results.slice()
      this.setState({ gameList: gameList })
    }
  }

  processListItem(response) {
    const gameList = this.state.gameList.concat([response.data])
    this.setState({ gameList: gameList })
  }

  componentWillMount() {
    var url = [api.BASE_URL, api.GAMES_ENDPOINT].join("/")
    url = url.endsWith('/') ? url : url + "/"
    axios
      .get(url, {
          withCredentials: true,
        })
      .then(response => {
        this.processList(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  createGame(e) {
    e.preventDefault()

    var url = [api.BASE_URL, api.GAMES_ENDPOINT].join("/")
    url = url.endsWith('/') ? url : url + "/"
    var csrftoken = Cookies.get('csrftoken')
    axios({
      method: 'post',
      url: url,
      withCredentials: true,
      headers: {"X-CSRFToken": csrftoken}
    }).then(response => {
      this.processListItem(response)
    }).catch(function(error) {
      console.log(error)
    })
  }

  render() {
    return (
      <Container>
        <h1>Game List</h1>
        <Table striped bordered hover>
        <thead>
        <tr>
          <th>GameID</th>
          <th>Black</th>
          <th>Red</th>
          <th>Winner</th>
          <th>Created</th>
        </tr>
        </thead>
        <tbody>
        {
          this.state.gameList.map(game => (
            <GameListItem 
              key={'game_list_' +game.id + '_' + game.created} game={game} />
          ))
        }
        </tbody>
        </Table>
        <form onSubmit={e => this.createGame(e)}>
          <input
            className="btn btn-primary"
            type="submit"
            name="submit"
            value="Create Game"
          />
        </form>
      </Container>
    )
  }
}

export { GameList }
