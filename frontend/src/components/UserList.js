import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

const axios = require("axios");


class UserListItem extends Component {
    render() {
        return <ListGroup.Item>{this.props.user.username}</ListGroup.Item>;
    }
}

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        };
        this.procResponse = this.procResponse.bind(this);
    }

    procResponse(response) {
        const userList = response.data.results.slice();
        this.setState({ userList: userList });
    }

    componentDidMount() {
        axios
            .get("/skele/api/users/")
            .then(response => {
                this.procResponse(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
                <Container>
                    <Row>
                        <Col />
                        <Col xs={6}>
                            <ListGroup>
                                {this.state.userList.map(user => (
                                    <UserListItem user={user} />
                                ))}
                            </ListGroup>
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </div>
        );
    }
}

export { UserList };
