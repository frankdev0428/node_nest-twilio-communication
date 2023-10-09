import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import User from 'src/entity/user.entity';
import { SocketMap } from 'src/types/request';
import { jwt } from 'src/utils/utils';

console.log('notification');
@Injectable()
@WebSocketGateway({
  namespace: '/sms',
  cors: {
    origin: [process.env.WEB_SOCKET_ORIGIN, "https://*.communicate.io", "http://busin.communicate.io", "http://localhost:3000", "https://communicate-widget.netlify.app", "https://test.communicate.io", "https://business.communicate.io"],
    // origin: "*",
    methods: ['GET', 'POST'],
    // allowedHeaders: ["my-custom-header"],
    credentials: true
  },
  allowEIO3: true
})
// @WebSocketGateway()
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor() { console.log('---------------Notification WebSocket Server Initialized------------') }

  @WebSocketServer()
  server: Server;

  socketMap: SocketMap = {};

  afterInit(server: any) {
    this.server = server;

    this.server.use((socket: Socket, next: Function) => {
      try {
        if (socket.handshake.query && socket.handshake.query.token) {
          socket.data.decoded =  jwt.verify(socket.handshake.query.token as string);
          next();
        } else {
          next(new Error('Authentication Error'));
        }
      } catch (e) {
        next(new Error('Authentication Error'));
      }
    });
  }

  async handleConnection(socket: Socket) {
    // A client has connected
    console.log('connected', socket.data.decoded.email, socket.id);
    const user = await User.findOne({
      where: {
        id: socket.data.decoded.id,
      },
    });
    if (user) {
      this.addSocket(user.id, socket);
      // this.socketMap[`${socket.data.decoded.id}`] = socket;
    } else {
      socket.disconnect(true);
    }
  }

  handleDisconnect(socket: Socket) {
    // A client has disconnected
    console.log('disconnected', socket.id, socket.data.decoded.id);
    this.removeSocket(socket.data.decoded.id, socket);
    // const tempSocket = this.socketMap[`${socket.data.decoded.id}`];
    // if (socket === tempSocket) {
    //   delete this.socketMap[`${socket.data.decoded.id}`];
    // }
  }

  // @SubscribeMessage('send_message')
  // listenForMessages(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() socket: Socket
  // ) {
  //   console.log(data)
  //   socket.emit('receive_message', data);
  // }
  
  emitNewSMS({ smsHistory, userId }) {
    this.emitEvents(userId, 'new_message', smsHistory);
  }
  
  emitNewEmail({ emailHistory, userId }) {
    this.emitEvents(userId, 'new_message', emailHistory);
  }
  
  emitNewVoice({ voiceHistory, userId }) {
    this.emitEvents(userId, 'new_message', voiceHistory);
  }

  emitNewChat({ chatHistory, userId }) {
    this.emitEvents(userId, 'new_message', chatHistory);
  }

  emitNewFacebook({ facebookHistory, userId }) {
    this.emitEvents(userId, 'new_message', facebookHistory);
  }

  emitNewWebchat({ webchatHistory, userId }) {
    this.emitEvents(userId, 'new_message', webchatHistory);
  }

  addSocket(userId, socket) {
    const sockets: any[] = this.getSockets(userId);
    if (sockets.indexOf(socket) == -1) {
      sockets.push(socket);
    }
    this.socketMap[`${userId}`] = sockets;
    console.log('addSocket', sockets.length);
  }

  getSockets(userId) {
    return this.socketMap[`${userId}`] || [];
  }

  removeSocket(userId, socket) {
    const sockets: any[] = this.getSockets(userId);
    const index = sockets.indexOf(socket);
    if (index != -1) {
      sockets.splice(index, 1);
    }
    this.socketMap[`${userId}`] = sockets;
    console.log('removeSocket', sockets.length);
  }

  emitEvents(userId, msg, obj) {
    const sockets: Socket[] = this.getSockets(userId);

    console.log('userId', userId);
    for (const socket of sockets) {
      console.log('socketId', socket.id);
      socket.emit(msg, obj);
    }
  }
}
