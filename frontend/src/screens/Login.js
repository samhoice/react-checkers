import React, { Component } from "react"
import { connect } from "react-redux"
import { Container, Row, Col } from "react-bootstrap"
import { Form, Button } from "react-bootstrap"

import { loginSend } from "../actions/index"

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  onSubmit = e => {
    e.preventDefault()
    console.log("login button")

    let payload = {
      username: this.state.username,
      password: this.state.password,
    }

    this.props.attemptLogin(payload)
  }

  render() {
    return (
      <Container fluid='true'>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Form onSubmit={ e => this.onSubmit(e)} method={"post"}>
              <Form.Group as={Row}>
                <Form.Label>
                  Username
                </Form.Label>
                <Form.Control 
                  type="text" 
                  onChange = {e => this.setState({
                    username: e.target.value
                  })}
                  placeholder="username" />
              </Form.Group>
    
              <Form.Group as={Row}>
                <Form.Label>
                  Password
                </Form.Label>
                <Form.Control 
                  type="password" 
                  onChange = {e => this.setState({
                    password: e.target.value
                  })}
                  placeholder="password" />
              </Form.Group>

              <Form.Group as={Row}>
                <Button
                  variant="primary"
                  type="submit">
                    Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  attemptLogin: payload => dispatch(loginSend(payload))
})

export default connect(
  null,
  mapDispatchToProps
)(Login)
