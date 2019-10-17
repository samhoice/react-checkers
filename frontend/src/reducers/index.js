import { combineReducers } from "redux"

import {
    SET_GAME_ID,
    SET_ACTIVE_SQUARE,
    BOARD_REQUESTED,
    BOARD_RECEIVE_SUCCESS,
    BOARD_RECEIVE_FAILURE,
    MOVE_REQUESTED,
    MOVE_REQUEST_SUCCESS,
    MOVE_REQUEST_FAILURE,
    JUMP_REQUESTED,
    JUMP_REQUEST_SUCCESS,
    JUMP_REQUEST_FAILURE,
    USER_LIST_REQUESTED,
    USER_LIST_SUCCESS,
    USER_LIST_FAILURE,
    TOGGLE_DEBUG_SYMBOLS
} from "../constants/index"

// UI State
const initialUIState = {
    game_id: 0,
    move: 0,
    turn_num: 0,
    active_sq: "",
    debug: false,
    status: 200,
    emessage: "",
}
export function uiState(state = initialUIState, action) {
    switch (action.type) {
        case SET_GAME_ID: 
            return { ...state, game_id: action.id}
        case SET_ACTIVE_SQUARE:
            if (state.active_sq === action.id) {
                // already have an active square, and we clicked it again
                return { ...state, active_sq: ""}
            } else {
                // no active square yet
                return { ...state, active_sq: action.id}
            }
        case BOARD_REQUESTED:
            return { ...state, req_pending: true }
        case BOARD_RECEIVE_SUCCESS:
            return { ...state, 
                status: "200", 
                emessage: "",
                game_id: action.game_id,
                turn_num: action.turn, 
                req_pending: false }
        case BOARD_RECEIVE_FAILURE:
            return { ...state, 
                status: action.error.status, 
                emessage: action.error.data.error, 
                req_pending: false }
        case TOGGLE_DEBUG_SYMBOLS:
            return { ...state, debug: action.value }
        case MOVE_REQUESTED:
        case JUMP_REQUESTED:
        case USER_LIST_REQUESTED:
            return { ...state, req_pending: true }
        case MOVE_REQUEST_SUCCESS:
        case JUMP_REQUEST_SUCCESS:
        case USER_LIST_SUCCESS:
            return { ...state, 
                status: "200", 
                emessage: "",
                active_sq: "", 
                turn_num: action.turn, 
                req_pending: false}
        case MOVE_REQUEST_FAILURE:
        case JUMP_REQUEST_FAILURE:
        case USER_LIST_FAILURE:
            return { ...state, 
                status: action.error.status, 
                emessage: action.error.data.error,
                req_pending: false}
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
        case MOVE_REQUEST_SUCCESS:
        case JUMP_REQUEST_SUCCESS:
            return { ...state, layout: action.board.slice() }
        default:
            return state
    }
}

// Started this, TODO may need it at some point. Show the move history?
const initialMoveState = {
    req_pending: false,
}
export function moveReducer(state = initialMoveState, action) {

}

const initialUserState = {
    userList: []
}
export function userState(state = initialUserState, action) {
    switch (action.type) {
        case USER_LIST_SUCCESS:
            return { ...state, userList: action.userList }
        case USER_LIST_FAILURE:
            return { ...state, userList: [] }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    uiState,
    gameState,
    userState
})

export default rootReducer
