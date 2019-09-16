export const BOARD_REQUESTED = "BOARD_REQUESTED"
export const BOARD_RECEIVE_SUCCESS = "BOARD_RECEIVE_SUCCESS"
export const BOARD_RECEIVE_FAILURE = "BOARD_RECEIVE_FAILURE"

export const SET_GAME_ID = "SET_GAME_ID"
export const SET_ACTIVE_SQUARE = "SET_ACTIVE_SQUARE"
export const MOVE_REQUESTED = "MOVE_REQUESTED"
export const MOVE_REQUEST_SUCCESS = "MOVE_REQUEST_SUCCESS"
export const MOVE_REQUEST_FAILURE = "MOVE_REQUEST_FAILURE"

export const TOGGLE_DEBUG_SYMBOLS = "TOGGLE_DEBUG_SYMBOLS"

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

export function setDebug(value) {
    return { type: TOGGLE_DEBUG_SYMBOLS, value }
}
