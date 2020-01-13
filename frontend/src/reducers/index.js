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
    TOGGLE_DEBUG_SYMBOLS,
    ACTIVE_USER_REQUESTED,
    ACTIVE_USER_SUCCESS,
    ACTIVE_USER_FAILURE,
    SOCKET_MESSAGE_RECV,
    SOCKET_SYSTEM_MESSAGE_RECV,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
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
                game_id: action.game.id,
                turn_num: action.game.turn, 
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
                active_sq: "",
                status: "200", 
                emessage: "",
                req_pending: false}
        case MOVE_REQUEST_FAILURE:
        case JUMP_REQUEST_FAILURE:
        case USER_LIST_FAILURE:
            return { ...state, 
                status: action.error.status, 
                emessage: action.error.data.error,
                req_pending: false}
        case LOGOUT_SUCCESS:
            return { initialUIState }
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
    error: "",
    game: {
        id: 0,
        white_player: 0,
        black_player: 0,
        winner: null,
        board_set: [
            {
                id: 0,
                layout: [
                    [1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1],
                    [1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1],
                    [1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1],
                    [1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1]
                ]
            },
        ]
    }
}
export function gameState(state = initialBoardLayout, action) {
    switch (action.type) {
        case BOARD_REQUESTED:
            return { ...state, req_pending: true }
        case BOARD_RECEIVE_SUCCESS:
            return { 
              ...state,
              game: action.game,
              //layout: action.board.slice(), 
              req_pending: false }
        case BOARD_RECEIVE_FAILURE:
            return { ...state, error: action.error.message, req_pending: false }
        case MOVE_REQUEST_SUCCESS:
        case JUMP_REQUEST_SUCCESS:
            return { ...state, layout: action.board.slice() }
        case LOGOUT_SUCCESS:
            return { initialBoardLayout }
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
    activeUser: {
        name: "not logged in",
        id: ''
    },
    userList: [],
}
export function userState(state = initialUserState, action) {
    switch (action.type) {
        case USER_LIST_SUCCESS:
            return { ...state, userList: action.userList }
        case USER_LIST_FAILURE:
            return { ...state, userList: [] }
        case ACTIVE_USER_SUCCESS:
            return { ...state, activeUser: {
                    name: action.payload.username,
                    id: action.payload.id 
                }
            }
        case ACTIVE_USER_FAILURE:
            return { ...state, activeUser: {
                name: "not logged in",
                id: ''}
            }
        case LOGOUT_SUCCESS:
            return initialUserState
        default:
            return state
    }
}

const initialMessageState = {
    messages: [],
    error: '',
}

export function messageState(state = initialMessageState, action) {
    switch(action.type) {
        case SOCKET_MESSAGE_RECV:
            return { ...state, messages: [...state.messages, [action.sender, action.message]] }
        case SOCKET_SYSTEM_MESSAGE_RECV:
            // should look like <game_id>,<turn>
            return { ...state, messages: [...state.messages, "Next turn!"] }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    uiState,
    gameState,
    userState,
    messageState,
})

export default rootReducer
