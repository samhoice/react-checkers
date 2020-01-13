import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

const mapStateToProps = state => {
  return {
    now_playing: state.uiState.game_id,
    logged_in: state.userState.activeUser.id
  }
}

class NowPlaying extends Component {
  render() {
    if (this.props.logged_in) {
      if (this.props.now_playing) {
        return <Redirect to={"/game/" + this.props.now_playing} />
      } else {
        return <Redirect to="/game" />
      }
    } else {
      return <Redirect to="/users/login/" />
    }
  }
}

export default connect(
  mapStateToProps,
  null
)(NowPlaying)
