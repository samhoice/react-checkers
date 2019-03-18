import { call, put, all, takeEvery } from "redux-saga/effects"
import {
    BOARD_REQUESTED,
    BOARD_RECEIVE_SUCCESS,
    BOARD_RECEIVE_FAILURE,
    MOVE_REQUESTED,
    MOVE_REQUEST_SUCCESS,
    MOVE_REQUEST_FAILURE
} from "./actions"

const axios = require("axios")

function API_requestBoard(id) {
    var url = "/skele/api/games/" + id
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
            board: response.data.board_set[0].layout
        })
    } else {
        yield put({ type: BOARD_RECEIVE_FAILURE, error: response })
    }
}

function* boardSaga() {
    yield takeEvery(BOARD_REQUESTED, getBoard)
}

function API_makeMove(game_id, path) {
    var url = "/skele/api/games/" + game_id + "/move/"
    return axios({
        method: "post",
        url: url,
        data: {
            path: path
        }
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

function* sendMove(action) {
    const { response, error } = yield call(
        API_makeMove,
        action.move.game_id,
        action.move.path
    )
    if (response) {
        yield put({ type: MOVE_REQUEST_SUCCESS, move: response.data.move })
    } else {
        yield put({ type: MOVE_REQUEST_FAILURE, error: response })
    }
}

function* moveSaga() {
    yield takeEvery(MOVE_REQUESTED, sendMove)
}

function* rootSaga() {
    yield all([boardSaga(), moveSaga()])
}

export default rootSaga
