import { combineReducers } from "redux"

import {
    SET_ACTIVE_SQUARE,
    BOARD_REQUESTED,
    BOARD_RECEIVE_SUCCESS,
    BOARD_RECEIVE_FAILURE,
    makeMove,
    MOVE_REQUESTED,
    MOVE_REQUEST_SUCCESS,
    MOVE_REQUEST_FAILURE
} from "./actions"

export function activeSquare(state = "", action) {
    switch (action.type) {
        case SET_ACTIVE_SQUARE:
            if (state === action.id) {
                // already have an active square, and we clicked it again
                return ""
            } else {
                // no active square yet
                return action.id
            }
        default:
            return state
    }
}

const initialBoardLayout = {
    layout: [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1]
    ],
    requested: false,
    result: ""
}

export function boardLayout(state = initialBoardLayout, action) {
    switch (action.type) {
        case BOARD_REQUESTED:
            return { ...state, requested: true }
        case BOARD_RECEIVE_SUCCESS:
            return { ...state, layout: action.board.slice(), requested: false }
        case BOARD_RECEIVE_FAILURE:
            return { ...state, error: action.error.message, requested: false }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    activeSquare,
    boardLayout
})

export default rootReducer
