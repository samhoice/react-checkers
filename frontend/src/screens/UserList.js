import React, { Component } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { ListGroup } from "react-bootstrap"
import { connect } from "react-redux"
import { getUserList, logoutSend } from "../actions/index"
import UserName from "../components/UserName"

const mapStateToProps = state => {
  return {
    userList: state.userState.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserList: id => { dispatch(getUserList()) },
    onLogout: () => { dispatch(logoutSend()) }
  }
}

class UserListItem extends Component {
  render() {
    return (
          <ListGroup.Item>
            <UserName user_id={this.props.user.id} />
          </ListGroup.Item>
    )
  }
}

class UserList extends Component {
  componentDidMount() {
    this.props.onGetUserList()
  }

  render() {
    return (
      <Container>
        <h1>Users</h1>
        <Row>
          <Col xs={4}>
            <Button
              onClick={ () => {this.props.onLogout() }}
              variant="primary">
                Logout
            </Button>
          </Col>
          <Col xs={6}>
            <ListGroup>
              {this.props.userList.map(user => (
                <UserListItem 
                  key={"user_list_item" + user.name + '_' + user.id} user={user} 
                />
              ))}
            </ListGroup>
          </Col>
          <Col />
        </Row>
      </Container>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)

