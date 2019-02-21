import { combineReducers } from 'redux'

import { SET_ACTIVE_SQUARE } from './actions'

export function activeSquare(state="", action) {
    switch(action.type) {
        case SET_ACTIVE_SQUARE:
            return action.id
        default:
            return state
    }
}

const checkersGame = combineReducers({
    activeSquare,
})

export default checkersGame

