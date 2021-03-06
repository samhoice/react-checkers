import {
LOGIN_REQUESTED,
LOGIN_SUCCESS,
LOGIN_FAILED,

LOGOUT_REQUESTED,
LOGOUT_SUCCESS,
LOGOUT_FAILED,

BOARD_REQUESTED,
BOARD_RECEIVE_SUCCESS,
BOARD_RECEIVE_FAILURE,

SET_GAME_ID,
SET_ACTIVE_SQUARE,
MOVE_REQUESTED,
MOVE_REQUEST_SUCCESS,
MOVE_REQUEST_FAILURE,

JUMP_REQUESTED,
JUMP_REQUEST_SUCCESS,
JUMP_REQUEST_FAILURE,

USER_LIST_REQUESTED,
USER_LIST_SUCCESS,
USER_LIST_FAILURE,

ACTIVE_USER_REQUESTED,
ACTIVE_USER_SUCCESS,
ACTIVE_USER_FAILURE,

TOGGLE_DEBUG_SYMBOLS,

SOCKET_CREATE_REQUESTED,
SOCKET_OPEN,
SOCKET_MESSAGE_RECV,
SOCKET_MESSAGE_SEND,
SOCKET_ERR,

} from '../constants/index'


export function loginSend(payload) {
    return { type: LOGIN_REQUESTED, payload }
}

export function logoutSend(payload=null) {
    return { type: LOGOUT_REQUESTED, payload }
}

export function setGameId(id) {
    return { type: SET_GAME_ID, id}
}

export function setActiveSquare(id) {
    return { type: SET_ACTIVE_SQUARE, id }
}

/* getting a board */
export function getCurrentBoard(game_id) {
    return { type: BOARD_REQUESTED, game_id }
}

export function boardReceiveSuccess(board) {
    return { type: BOARD_RECEIVE_SUCCESS, board }
}

export function boardReceiveFail(e) {
    return { type: BOARD_RECEIVE_FAILURE, e }
}

/* making a move */
export function makeMove(game_id, path) {
    return { type: MOVE_REQUESTED, move: { game_id: game_id, path: path } }
}

export function moveSuccess(path) {
    return { type: MOVE_REQUEST_SUCCESS, path }
}

export function moveFail(e) {
    return { type: MOVE_REQUEST_FAILURE, e }
}

export function makeJump(game_id, path) {
    return { type: JUMP_REQUESTED, jump: { game_id: game_id, path: path } }
}

export function jumpSuccess(path) {
    return { type: JUMP_REQUEST_SUCCESS, path }
}

export function jumpFail(e) {
    return { type: JUMP_REQUEST_FAILURE, e }
}

// USER LIST
export function getUserList() {
    return { type: USER_LIST_REQUESTED }
}
export function userListSuccess(list) {
    return { type: USER_LIST_SUCCESS, list }
}
export function userListFail(e) {
    return { type: USER_LIST_FAILURE, e }
}

// ACTIVE_USER
export function getActiveUser() {
    return { type: ACTIVE_USER_REQUESTED }
}
export function activeUserSuccess(payload) {
    return { type: ACTIVE_USER_SUCCESS, payload }
}
export function activeUserFailure(payload) {
    return { type: ACTIVE_USER_FAILURE, payload }
}

// debug
export function setDebug(value) {
    return { type: TOGGLE_DEBUG_SYMBOLS, value }
}

export function socketCreateRequested(payload) {
    return { type: SOCKET_CREATE_REQUESTED, payload }
}
export function socketOpen(payload) {
    return { type: SOCKET_OPEN, payload }
}
export function socketMessageRecv(payload) {
    return { type: SOCKET_MESSAGE_RECV, payload }
}
export function socketMessageSend(payload) {
    return { type: SOCKET_MESSAGE_SEND, payload }
}
export function socketError(payload) {
    return { type: SOCKET_ERR, payload }
}
