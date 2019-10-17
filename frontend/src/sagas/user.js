import { call, put } from "redux-saga/effects"
import {
    USER_LIST_SUCCESS,
    USER_LIST_FAILURE
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
