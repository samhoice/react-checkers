import { call, put, all, takeEvery } from "redux-saga/effects"
import Cookies from "js-cookie"
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
} from "./actions"

const axios = require("axios")

const BASE_URL = "/checkers/api"
const GAMES_ENDPOINT = "games"
const USER_ENDPOINT = "users"
const MOVE_ACTION = "move"
const JUMP_ACTION = "jump"

function API_requestBoard(id) {
    var url = [BASE_URL, GAMES_ENDPOINT, id].join("/")
    url = url.endsWith('/') ? url : url + "/"
    return axios
        .get(url)
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

function* getBoard(action) {
    const { response, error } = yield call(API_requestBoard, action.game_id)
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

function* boardSaga() {
    yield takeEvery(BOARD_REQUESTED, getBoard)
}

function API_makeMove(game_id, endpoint, path) {
    var url = [BASE_URL, GAMES_ENDPOINT, game_id, endpoint].join("/")
    url = url.endsWith('/') ? url : url + "/"
    var csrftoken = Cookies.get('csrftoken')
    return axios({
        method: "post",
        url: url,
        headers: {'X-CSRFToken': csrftoken},
        data: {
            from_sq: path['from_sq'],
            to_sq: path['to_sq']
        }
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

function* sendMove(action) {
    const { response, error } = yield call(
        API_makeMove,
        action.move.game_id,
        MOVE_ACTION,
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
        API_makeMove,
        action.jump.game_id,
        JUMP_ACTION,
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

function* moveSaga() {
    yield takeEvery(MOVE_REQUESTED, sendMove)
    yield takeEvery(JUMP_REQUESTED, sendJump)
}

function API_userList() {
    var url = [BASE_URL, USER_ENDPOINT].join("/")
    url = url.endsWith('/') ? url : url + "/"
    return axios({
        method: "get",
        url: url,
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

function* getUserList(action) {
    const {response, error } = yield call(API_userList)
    if (response) {
        yield put({
            type: USER_LIST_SUCCESS,
            userList: response.data.results,
        })
    } else {
        yield put({ type: USER_LIST_FAILURE, error: error.response })
    }
}

function* userSaga() {
    yield takeEvery(USER_LIST_REQUESTED, getUserList)
}

function* rootSaga() {
    yield all([boardSaga(), moveSaga(), userSaga()])
}

export default rootSaga
