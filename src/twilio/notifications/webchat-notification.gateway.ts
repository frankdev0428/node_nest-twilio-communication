import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketMap } from 'src/types/request';

console.log('Webchat notification');
@Injectable()
@WebSocketGateway({
  namespace: '/webchat',
  // cors: {
  //   origin: ["https://thriving-clafoutis-22f6ba.netlify.app", "http://localhost:3000"],
  //   methods: ['GET', 'POST'],
  //   // allowedHeaders: ["my-custom-header"],
  //   // credentials: true
  // },
  allowEIO3: true
})
// @WebSocketGateway()
export class WebchatNotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor() { console.log('---------------Webchat WebSocket Server Initialized------------') }

  @WebSocketServer()
  server: Server;

  socketMap: SocketMap = {};

  afterInit(server: any) {
    this.server = server;
  }

  async handleConnection(socket: Socket) {
    // A client has connected
    console.log('------------------webchat client connected', socket.id);
    // this.socketMap[socket.data.decoded.customerId] = socket;
  }

  async handleDisconnect(socket: Socket) {
    // A client has disconnected
    const customerId = socket.data.customerId;
    this.removeSocket(customerId, socket);
  }

  @SubscribeMessage('received_customer')
  setCustomerId(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket
  ) {
    const customerId = data.customerId;
    console.log('customerId', customerId);
    this.addSocket(customerId, socket);
  }

  emitNewWebchat({ webchatHistory, customerId }) {
    this.emitEvents(customerId, 'new_message', webchatHistory);
  }

  addSocket(customerId, socket) {
    const sockets: any[] = this.getSockets(customerId);
    if (sockets.indexOf(socket) == -1) {
      sockets.push(socket);
    }
    this.socketMap[`${customerId}`] = sockets;
  }

  getSockets(customerId) {
    return this.socketMap[`${customerId}`] || [];
  }

  removeSocket(customerId, socket) {
    const sockets: any[] = this.getSockets(customerId);
    const index = sockets.indexOf(socket);
    if (index != -1) {
      sockets.splice(index, 1);
    }
    this.socketMap[`${customerId}`] = sockets;
  }

  emitEvents(customerId, msg, obj) {
    const sockets: Socket[] = this.getSockets(customerId);

    console.log('userId', customerId);
    for (const socket of sockets) {
      console.log('socketId', socket.id);
      socket.emit(msg, obj);
    }
  }
}
