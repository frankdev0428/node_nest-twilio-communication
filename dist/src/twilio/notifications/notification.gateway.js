"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const user_entity_1 = require("../../entity/user.entity");
const utils_1 = require("../../utils/utils");
console.log('notification');
let NotificationGateway = class NotificationGateway {
    constructor() {
        this.socketMap = {};
        console.log('---------------Notification WebSocket Server Initialized------------');
    }
    afterInit(server) {
        this.server = server;
        this.server.use((socket, next) => {
            try {
                if (socket.handshake.query && socket.handshake.query.token) {
                    socket.data.decoded = utils_1.jwt.verify(socket.handshake.query.token);
                    next();
                }
                else {
                    next(new Error('Authentication Error'));
                }
            }
            catch (e) {
                next(new Error('Authentication Error'));
            }
        });
    }
    async handleConnection(socket) {
        console.log('connected', socket.data.decoded.email, socket.id);
        const user = await user_entity_1.default.findOne({
            where: {
                id: socket.data.decoded.id,
            },
        });
        if (user) {
            this.addSocket(user.id, socket);
        }
        else {
            socket.disconnect(true);
        }
    }
    handleDisconnect(socket) {
        console.log('disconnected', socket.id, socket.data.decoded.id);
        this.removeSocket(socket.data.decoded.id, socket);
    }
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
        const sockets = this.getSockets(userId);
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
        const sockets = this.getSockets(userId);
        const index = sockets.indexOf(socket);
        if (index != -1) {
            sockets.splice(index, 1);
        }
        this.socketMap[`${userId}`] = sockets;
        console.log('removeSocket', sockets.length);
    }
    emitEvents(userId, msg, obj) {
        const sockets = this.getSockets(userId);
        console.log('userId', userId);
        for (const socket of sockets) {
            console.log('socketId', socket.id);
            socket.emit(msg, obj);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
NotificationGateway = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        namespace: '/sms',
        cors: {
            origin: [process.env.WEB_SOCKET_ORIGIN, "https://*.communicate.io", "http://busin.communicate.io", "http://localhost:3000", "https://communicate-widget.netlify.app", "https://test.communicate.io", "https://business.communicate.io"],
            methods: ['GET', 'POST'],
            credentials: true
        },
        allowEIO3: true
    }),
    __metadata("design:paramtypes", [])
], NotificationGateway);
exports.NotificationGateway = NotificationGateway;
//# sourceMappingURL=notification.gateway.js.map