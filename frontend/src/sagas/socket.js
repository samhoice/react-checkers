import { take, put, call, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { connectSocket } from '../stream/index'
import { SOCKET_MESSAGE_RECV, SOCKET_MESSAGE_SEND } from '../constants/index'

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {

    const messageHandler = (event) => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(JSON.parse(event.data).message)
    }
  
    const errorHandler = (errorEvent) => {
      // create an Error object and put it into the channel
      emit(new Error(errorEvent.reason))
    }
  
    // setup the subscription
    socket.addEventListener('message', messageHandler)
    socket.addEventListener('error', errorHandler)
    
    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.removeEventListener('message')
    }
    
    return unsubscribe
  })
}

// reply with a `pong` message by invoking `socket.emit('pong')`
//function* pong(socket) {
//yield delay(5000)
//yield apply(socket, socket.emit, ['pong']) // call `emit` as a method with `socket` as context
//}

export function* socketReadSaga(action) {

  console.log("socketReadSaga")
  const socket = yield call(connectSocket, action.payload)
  const socketChannel = yield call(createSocketChannel, socket)

  const socketWrite  = function(action) {
    socket.send(JSON.stringify({'message': action.payload}))
  }
  
  yield takeEvery(SOCKET_MESSAGE_SEND, socketWrite)

  while (true) {
    console.log("socket read saga loop")
    try {
      const payload = yield take(socketChannel)
      yield put({ type: SOCKET_MESSAGE_RECV, payload })
//      yield fork(pong, socket)
    } catch(err) {
      console.error('socket error:', err)
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      socketChannel.close()
    }
  }
}

export function* socketWriteSaga(action) {
  console.log("socketWriteSaga" + action.payload)
}
