import { call, put } from "redux-saga/effects"
import {
    USER_LIST_SUCCESS,
    USER_LIST_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    ACTIVE_USER_REQUESTED,
} from "../constants/index"

import * as api from '../api'

export function* getUserList(action) {

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

export function* login(action) {

    console.log("login saga")
    const { response, error } = yield call(api.login, action.payload)
    if(response) {
        yield put({
            type: LOGIN_SUCCESS,
        })
    } else {
        yield put({ type: LOGIN_FAILURE, error: error.response })
    }
}

export function* logout(action) {

    console.log("logout saga")
    const { response, error } = yield call(api.logout)
    if(response) {
        yield put({
            type: LOGOUT_SUCCESS,
        })
    } else {
        yield put({ type: LOGOUT_FAILURE, error: error.response })
    }
}

export function* loginSuccess() {

    yield put({ type: ACTIVE_USER_REQUESTED })
}
