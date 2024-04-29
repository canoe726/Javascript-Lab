import { Server } from 'http'
import { Namespace, Socket, Server as SocketServer } from 'socket.io'

import { SocketMap } from 'core/core.type'

interface SocketNamespace {
  name: string
  message: string
  instance: Namespace
}

interface SocketNamespaceProps extends Omit<SocketNamespace, 'instance'> {
  key: string
  onConnection: (socket: Socket) => void
}

export class ExpressSocket {
  socket: SocketServer
  socketMap: SocketMap
  namespaces: SocketNamespace[] = []

  constructor(server: Server, socketMap: SocketMap, namespaces: SocketNamespaceProps[]) {
    this.socketMap = socketMap
    this.socket = new SocketServer(server, {
      cors: {
        origin: ['http://localhost:3000'],
      },
    })

    namespaces.forEach((props) => {
      this.addNamespace(props)
    })
  }

  addNamespace({ key, name, message, onConnection }: SocketNamespaceProps) {
    if (key in this.socketMap) {
      const newNamespace = this.socket.of(name).on('connection', onConnection)

      this.namespaces.push({
        name,
        message,
        instance: newNamespace,
      })
    } else {
      console.error(`[${key}] key is not exist in socketMap`)
    }
  }

  getNamespace(name: string) {
    return this.namespaces.find((namespace) => namespace.name === name)
  }
}
