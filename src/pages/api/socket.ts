import { Server } from 'Socket.IO'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      socket.on('send-message', (msg) => {
        socket.broadcast.emit('update-messages', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler
