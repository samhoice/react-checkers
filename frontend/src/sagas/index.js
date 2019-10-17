import { all, takeEvery } from "redux-saga/effects"
import {
    BOARD_REQUESTED,
    MOVE_REQUESTED,
    JUMP_REQUESTED,
    USER_LIST_REQUESTED,
} from "../constants/index"

import { getUserList } from './user'
import { getBoard,
    sendMove,
    sendJump } from './game'


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
