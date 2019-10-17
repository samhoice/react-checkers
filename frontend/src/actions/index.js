import {
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

TOGGLE_DEBUG_SYMBOLS,


} from '../constants/index'
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

export function getUserList() {
    return { type: USER_LIST_REQUESTED }
}

export function userListSuccess(list) {
    return { type: USER_LIST_SUCCESS, list }
}

export function userListFail(e) {
    return { type: USER_LIST_FAILURE, e }
}

export function setDebug(value) {
    return { type: TOGGLE_DEBUG_SYMBOLS, value }
}
