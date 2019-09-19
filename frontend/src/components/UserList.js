import React, { Component } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { ListGroup } from "react-bootstrap"
import { connect } from "react-redux"
import { getUserList } from "../actions"

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
            <div>
                <h1>Users</h1>
                <Container>
                    <Row>
                        <Col xs={4}>
                            <a href="#">login</a>
                        </Col>
                        <Col xs={6}>
                            <ListGroup>
                                {this.props.userList.map(user => (
                                    <UserListItem user={user} />
                                ))}
                            </ListGroup>
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </div>
        )
    }
}

const ComponentUserList = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)

export { UserList }
export default ComponentUserList
