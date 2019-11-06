import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

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

export default connect(
  mapStateToProps,
  null
)(NowPlaying)
