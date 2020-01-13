import { all, takeEvery, takeLatest } from "redux-saga/effects"
import {
    BOARD_REQUESTED,
    MOVE_REQUESTED,
    JUMP_REQUESTED,
    LOGIN_REQUESTED,
    LOGOUT_REQUESTED,
    LOGIN_SUCCESS,
    USER_LIST_REQUESTED,
    SOCKET_CREATE_REQUESTED,
    ACTIVE_USER_REQUESTED,
} from "../constants/index"

import * as api from '../api'
import { getUserList, login, logout, loginSuccess } from './user'
import { getBoard,
    sendMove,
    sendJump } from './game'
import { socketReadSaga } from './socket'
import { getActiveUser } from './activeUser'


function* boardSaga() {
    yield takeEvery(BOARD_REQUESTED, getBoard)
    console.log("board saga end")
}

function* moveSaga() {
    yield takeEvery(MOVE_REQUESTED, sendMove)
    yield takeEvery(JUMP_REQUESTED, sendJump)
    console.log("move saga end")
}

function* userSaga() {
    yield takeEvery(USER_LIST_REQUESTED, getUserList)
}

function* loginSaga() {
    yield takeEvery(LOGIN_REQUESTED, login)
}
function* loginSuccessSaga() {
    yield takeEvery(LOGIN_SUCCESS, loginSuccess)
}
function* logoutSaga() {
    yield takeEvery(LOGOUT_REQUESTED, logout)
}

function* activeUserSaga() {
    yield takeEvery(ACTIVE_USER_REQUESTED, getActiveUser, api)
}

function* socketCreateSaga() {
    console.log("socketCreateSaga")
    yield takeLatest(SOCKET_CREATE_REQUESTED, socketReadSaga)
}

function* rootSaga() {
    yield all([
        boardSaga(), 
        moveSaga(), 
        loginSaga(),
        loginSuccessSaga(),
        logoutSaga(),
        userSaga(), 
        activeUserSaga(),
        socketCreateSaga()])
}

export default rootSaga
