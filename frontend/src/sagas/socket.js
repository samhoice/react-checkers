import { take, put, call, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { connectSocket } from '../stream/index'
import { SOCKET_MESSAGE_RECV, 
    SOCKET_SYSTEM_MESSAGE_RECV,
    SOCKET_MESSAGE_SEND,
    BOARD_REQUESTED } from '../constants/index'

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {

    const messageHandler = (event) => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(JSON.parse(event.data))
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
    console.log("socket sending")
    console.log(action.payload)
    socket.send(JSON.stringify({...action.payload}))
  }
  
  yield takeEvery(SOCKET_MESSAGE_SEND, socketWrite)

  while (true) {
    console.log("socket read saga loop")
    try {
      const payload = yield take(socketChannel)
      if(payload.type === 'chat.message') {
        console.log("chat message ")
        yield put({
          type: SOCKET_MESSAGE_RECV,
          sender: payload.sender,
          message: payload.message })
      } else {
        console.log("system message")
        // sender should always be 0...
        yield put({
          type: SOCKET_SYSTEM_MESSAGE_RECV,
          sender: payload.sender,
          message: payload.message })
        let turn_message = payload.message.split(',')
        yield put({ type: BOARD_REQUESTED, game_id: turn_message[0] })
      }
    } catch(err) {
      console.error('socket error:', err)
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      socketChannel.close()
    }
  }
}

