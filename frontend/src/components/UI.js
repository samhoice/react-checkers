import React, { Component } from "react"
import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        board_id: state.uiState.board_id
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

class UI extends Component {

    render() {
        return (
            <div>
                UI
                Board Id: {this.props.board_id}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UI)
