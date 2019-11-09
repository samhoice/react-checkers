import { call, put } from 'redux-saga/effects'
import { activeUserSuccess, activeUserFailure, socketCreateRequested } from '../actions/index'

export function* getActiveUser(api) {
  const { response } = yield call(api.getActiveUser);

  if (response.status === 200) {
    yield put(activeUserSuccess(response.data))
    yield put(socketCreateRequested(response.data.id))
  } else {
    yield put(activeUserFailure(response.error))
  }
}
