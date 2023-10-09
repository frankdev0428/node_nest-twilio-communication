import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketMap } from 'src/types/request';
export declare class WebchatNotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    server: Server;
    socketMap: SocketMap;
    afterInit(server: any): void;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): Promise<void>;
    setCustomerId(data: any, socket: Socket): void;
    emitNewWebchat({ webchatHistory, customerId }: {
        webchatHistory: any;
        customerId: any;
    }): void;
    addSocket(customerId: any, socket: any): void;
    getSockets(customerId: any): Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>[];
    removeSocket(customerId: any, socket: any): void;
    emitEvents(customerId: any, msg: any, obj: any): void;
}
