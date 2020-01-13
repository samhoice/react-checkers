import { call, put } from 'redux-saga/effects'
import { activeUserSuccess, activeUserFailure, socketCreateRequested } from '../actions/index'

export function* getActiveUser(api) {
  const { response, error } = yield call(api.getActiveUser);

  if (response && response.status === 200) {
    yield put(activeUserSuccess(response.data))
    yield put(socketCreateRequested(response.data.id))
  } else {
    yield put(activeUserFailure(error.response))
  }
}
