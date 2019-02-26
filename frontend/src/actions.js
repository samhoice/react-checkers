export const SET_ACTIVE_SQUARE = "SET_ACTIVE_SQUARE"
export const BOARD_REQUESTED = "BOARD_REQUESTED"
export const BOARD_RECEIVE_SUCCESS = "BOARD_RECEIVE_SUCCESS"
export const BOARD_RECEIVE_FAILURE = "BOARD_RECEIVE_FAILURE"

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
