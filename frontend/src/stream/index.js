// This is like the api module but for the streaming data (turn notification and chat)

import { HOSTNAME } from "../api/index"

export function connectSocket(user_id) {
  console.log("connectSocket")
  let url = 'ws://' + HOSTNAME + '/ws/chat/' + user_id + '/'
  const socket = new WebSocket(url)
  socket.addEventListener('open', (e) => {
    console.log("socket connected")
  })
  return socket
}

export function socketSend(socket, message) {
  socket.send(message)
}
