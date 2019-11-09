import React, { Component } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { ListGroup } from "react-bootstrap"
import { connect } from "react-redux"
import { getUserList } from "../actions/index"

const mapStateToProps = state => {
  return {
    userList: state.userState.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserList: id => {
      dispatch(getUserList())
    }
  }
}

class UserListItem extends Component {
  render() {
    return <ListGroup.Item>{this.props.user.username}</ListGroup.Item>
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
            <a href="/checkers/auth/logout/">logout</a>
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

