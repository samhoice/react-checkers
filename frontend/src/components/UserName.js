import React, { Component } from "react"
import { connect } from "react-redux"
import { getUserList } from "../actions/index"
import { Badge } from "react-bootstrap"

class UserName extends Component {
  componentWillMount() {
    if(Array.isArray(this.props.user_list) && this.props.user_list.length === 0) {
      this.props.getUserList()
    }
  }

  render() {
    console.log(this.props.user_id)
    if(this.props.user_id === 0) {
      return (<Badge variant={'primary'}>System</Badge>)
    } else if(this.props.user_id === this.props.active_user.id) {
      return (<Badge variant={'success'}>{this.props.active_user.name}</Badge>)
    }
    for(const user of this.props.user_list) {
      if(user.id === this.props.user_id) {
        return (<Badge variant={'dark'}>{user.username}</Badge>)
      }
    }
    return (<Badge variant={'dark'}>{ this.props.user_id }</Badge>)
  }
}

const mapStateToProps = ({userState}) => ({
  user_list: userState.userList,
  active_user: userState.activeUser,
})

const mapDispatchToProps = dispatch => ({
    getUserList: () => dispatch(getUserList()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserName)
