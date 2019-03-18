import { connect } from "react-redux"
import { setActiveSquare } from "../actions"
import { BoardSquare } from "../components/BoardSquare.js"

const mapStateToProps = state => {
    return {
        activeSquare: state.activeSquare
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBoardClick: id => {
            dispatch(setActiveSquare(id))
        }
    }
}

const ClickableBoardSquare = connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardSquare)

export default ClickableBoardSquare
