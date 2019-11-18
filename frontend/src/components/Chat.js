import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, ListGroup, Button } from "react-bootstrap"

import { socketMessageSend } from "../actions/index"



class Chat extends Component {
  state = {
      message: '',
  }

  onSubmit = e => {
    e.preventDefault()
    console.log("chat button")

    let payload = {
        game_id: this.props.game_id,
        message: this.state.message
    }

    this.props.sendMessage(payload)
  }

  render () {
    return (
      <div>
        <ListGroup>
        {this.props.messages.map(message => (
            <ListGroup.Item>{message}</ListGroup.Item>
          ))}
        </ListGroup>
        <Form onSubmit={(e) => this.onSubmit(e)} method={"post"}>
          <Form.Group>
          <Form.Control 
            size="md" 
            type="text" 
            onChange = {e => this.setState({
              message: e.target.value
            })}
            placeholder="Chat Message" />
          </Form.Group>
          <Button type="submit">Send</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = ({ messageState, uiState }) => ({
  game_id: uiState.game_id,
  messages: messageState.messages,
  error: messageState.error
})

const mapDispatchToProps = dispatch => ({
  sendMessage: payload => dispatch(socketMessageSend(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat)
