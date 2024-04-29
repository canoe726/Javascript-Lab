import dotenv from 'dotenv'

import { ExpressServer } from 'core/ExpressServer'
import { ExpressSocket } from 'core/ExpressSocket'
import { SocketMap } from 'core/core.type'
import conversations from 'lib/handlers/conversations/conversations'
import webhook from 'lib/handlers/webhook/webhook'
import { Socket } from 'socket.io'

dotenv.config()

const HOST_NAME = '127.0.0.1'
const PORT = Number(process.env.SERVER_PORT) || 4000
export const SOCKET_MAP: SocketMap = {
  CHAT: {
    namespace: '/chat',
    message: 'email',
  },
}

const expressServer = new ExpressServer(HOST_NAME, PORT)
expressServer.initialize()
expressServer.initRouters([
  {
    endPoint: '/conversations',
    router: conversations,
  },
  {
    endPoint: '/webhook',
    router: webhook,
  },
])
expressServer.useMiddlewares()
expressServer.startServer()

const { CHAT } = SOCKET_MAP
export const socketIo = new ExpressSocket(expressServer.server, SOCKET_MAP, [
  {
    key: 'CHAT',
    name: CHAT.namespace,
    message: CHAT.message,
    onConnection: function (socket: Socket) {
      console.log('connected namespace')
      socket.on(CHAT.message, function (data) {
        const name = data.name
        const room = data.room
        console.log('message from client: ', data, name, room)

        socket.join(room)
      })
    },
  },
])
