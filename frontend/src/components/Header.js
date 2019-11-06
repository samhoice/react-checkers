import React, { Component } from "react"
import { connect } from "react-redux"
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

class Header extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>React Checkers</Navbar.Brand>
        <Nav>
          <NavItem>
            <LinkContainer to="/">
              <Nav.Link>Now Playing</Nav.Link>
            </LinkContainer>
          </NavItem>
          <NavItem>
            <LinkContainer to="/game/">
              <Nav.Link>Games</Nav.Link>
            </LinkContainer>
          </NavItem>
          <NavItem>
            <LinkContainer to="/users/">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>
          </NavItem>
          <NavItem>
            <LinkContainer to="#">
            <Nav.Link>{ this.props.activeUser }</Nav.Link>
            </LinkContainer>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

const mapStateToProps = ({ userState }) => ({
    activeUser: userState.activeUser,
})

const mapDispatchToProps = dispatch => ({
    // dict
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

