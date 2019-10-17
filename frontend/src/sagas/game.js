import { call, put } from "redux-saga/effects"
import {
    BOARD_RECEIVE_SUCCESS,
    BOARD_RECEIVE_FAILURE,
    MOVE_REQUEST_SUCCESS,
    MOVE_REQUEST_FAILURE,
    JUMP_REQUEST_SUCCESS,
    JUMP_REQUEST_FAILURE,
} from "../constants/index"

import * as api from '../api'

export function* getBoard(action) {
    const { response, error } = yield call(api.requestBoard, action.game_id)
    if (response) {
        yield put({
            type: BOARD_RECEIVE_SUCCESS,
            game_id: response.data.id,
            board: response.data.board_set[0].layout,
            turn: response.data.turn
        })
    } else {
        yield put({ type: BOARD_RECEIVE_FAILURE, error: error.response })
    }
}


export function* sendMove(action) {
    const { response, error } = yield call(
        api.makeMove,
        action.move.game_id,
        api.MOVE_ACTION,
        action.move.path
    )
    if (response) {
        yield put({ 
            type: MOVE_REQUEST_SUCCESS, 
            turn: response.data.turn, 
            board: response.data.board.layout 
        })
    } else {
        yield put({ type: MOVE_REQUEST_FAILURE, error: error.response })
    }
}

export function* sendJump(action) {
    const { response, error } = yield call(
        api.makeMove,
        action.jump.game_id,
        api.JUMP_ACTION,
        action.jump.path
    )
    if (response) {
        yield put({ 
            type: JUMP_REQUEST_SUCCESS, 
            turn: response.data.turn, 
            board: response.data.board.layout 
        })
    } else {
        yield put({ type: JUMP_REQUEST_FAILURE, error: error.response })
    }
}
