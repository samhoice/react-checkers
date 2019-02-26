import { call,
    put,
    all,
    takeEvery,
    takeLatest } from 'redux-saga/effects'
import { BOARD_REQUESTED,
    BOARD_RECEIVE_SUCCESS,
    BOARD_RECEIVE_FAILURE } from './actions'

const axios = require("axios");

function API_requestBoard(id) {
    var url = "/skele/api/games/" + id
    return axios
        .get(url)
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

function* getBoard(action) {
    const { response, error } = yield call(API_requestBoard, action.game_id)
    if(response) {
        yield put({ type: BOARD_RECEIVE_SUCCESS, board: response.data.board_set[0].layout })
    } else {
        yield put({ type: BOARD_RECEIVE_FAILURE, error: response })
    }
}

function* boardSaga() {
    yield takeEvery(BOARD_REQUESTED, getBoard)
}

function* rootSaga () {
    yield all([
        boardSaga()
    ])
}

export default rootSaga
