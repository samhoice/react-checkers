import { combineReducers } from "redux"

import {
    SET_ACTIVE_SQUARE,
    BOARD_REQUESTED,
    BOARD_RECEIVE_SUCCESS,
    BOARD_RECEIVE_FAILURE,
    MOVE_REQUESTED,
    MOVE_REQUEST_SUCCESS,
    MOVE_REQUEST_FAILURE
} from "./actions"

// UI State
const initialUIState = {
    game_id: 0,
    move: 0,
    turn_num: 0,
    board_id: 0,
    active_sq: "",

}
export function uiState(state = initialUIState, action) {
    switch (action.type) {
        case SET_ACTIVE_SQUARE:
            if (state.active_sq === action.id) {
                // already have an active square, and we clicked it again
                return ""
            } else {
                // no active square yet
                return { ...state, active_sq: action.id}
            }
        //case BOARD_RECEIVE_SUCCESS:
        //    return { ...state, board_id: action.board.id }
        default:
            return state
    }
}

// data
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
    req_pending: false,
    result: "",
    error: ""
}
export function gameState(state = initialBoardLayout, action) {
    switch (action.type) {
        case BOARD_REQUESTED:
            return { ...state, req_pending: true }
        case BOARD_RECEIVE_SUCCESS:
            return { ...state, layout: action.board.slice(), req_pending: false }
        case BOARD_RECEIVE_FAILURE:
            return { ...state, error: action.error.message, req_pending: false }
        default:
            return state
    }
}

const initialMoveState = {
    req_pending: false,
}
export function moveReducer(state = initialMoveState, action) {

}

const rootReducer = combineReducers({
    uiState,
    gameState
})

export default rootReducer
