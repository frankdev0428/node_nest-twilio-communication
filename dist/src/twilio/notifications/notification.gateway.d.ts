import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketMap } from 'src/types/request';
export declare class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    server: Server;
    socketMap: SocketMap;
    afterInit(server: any): void;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): void;
    emitNewSMS({ smsHistory, userId }: {
        smsHistory: any;
        userId: any;
    }): void;
    emitNewEmail({ emailHistory, userId }: {
        emailHistory: any;
        userId: any;
    }): void;
    emitNewVoice({ voiceHistory, userId }: {
        voiceHistory: any;
        userId: any;
    }): void;
    emitNewChat({ chatHistory, userId }: {
        chatHistory: any;
        userId: any;
    }): void;
    emitNewFacebook({ facebookHistory, userId }: {
        facebookHistory: any;
        userId: any;
    }): void;
    emitNewWebchat({ webchatHistory, userId }: {
        webchatHistory: any;
        userId: any;
    }): void;
    addSocket(userId: any, socket: any): void;
    getSockets(userId: any): Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>[];
    removeSocket(userId: any, socket: any): void;
    emitEvents(userId: any, msg: any, obj: any): void;
}
