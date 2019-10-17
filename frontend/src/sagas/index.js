import { call, put, all, takeEvery } from "redux-saga/effects"
import {
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
    USER_LIST_FAILURE
} from "../constants/index"

import * as api from '../api'

function* getBoard(action) {
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


function* sendMove(action) {
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

function* sendJump(action) {
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

function* getUserList(action) {
    const {response, error } = yield call(api.userList)
    if (response) {
        yield put({
            type: USER_LIST_SUCCESS,
            userList: response.data.results,
        })
    } else {
        yield put({ type: USER_LIST_FAILURE, error: error.response })
    }
}

function* boardSaga() {
    yield takeEvery(BOARD_REQUESTED, getBoard)
}

function* moveSaga() {
    yield takeEvery(MOVE_REQUESTED, sendMove)
    yield takeEvery(JUMP_REQUESTED, sendJump)
}

function* userSaga() {
    yield takeEvery(USER_LIST_REQUESTED, getUserList)
}

function* rootSaga() {
    yield all([boardSaga(), moveSaga(), userSaga()])
}

export default rootSaga
