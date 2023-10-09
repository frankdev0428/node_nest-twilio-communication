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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebchatNotificationGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
console.log('Webchat notification');
let WebchatNotificationGateway = class WebchatNotificationGateway {
    constructor() {
        this.socketMap = {};
        console.log('---------------Webchat WebSocket Server Initialized------------');
    }
    afterInit(server) {
        this.server = server;
    }
    async handleConnection(socket) {
        console.log('------------------webchat client connected', socket.id);
    }
    async handleDisconnect(socket) {
        const customerId = socket.data.customerId;
        this.removeSocket(customerId, socket);
    }
    setCustomerId(data, socket) {
        const customerId = data.customerId;
        console.log('customerId', customerId);
        this.addSocket(customerId, socket);
    }
    emitNewWebchat({ webchatHistory, customerId }) {
        this.emitEvents(customerId, 'new_message', webchatHistory);
    }
    addSocket(customerId, socket) {
        const sockets = this.getSockets(customerId);
        if (sockets.indexOf(socket) == -1) {
            sockets.push(socket);
        }
        this.socketMap[`${customerId}`] = sockets;
    }
    getSockets(customerId) {
        return this.socketMap[`${customerId}`] || [];
    }
    removeSocket(customerId, socket) {
        const sockets = this.getSockets(customerId);
        const index = sockets.indexOf(socket);
        if (index != -1) {
            sockets.splice(index, 1);
        }
        this.socketMap[`${customerId}`] = sockets;
    }
    emitEvents(customerId, msg, obj) {
        const sockets = this.getSockets(customerId);
        console.log('userId', customerId);
        for (const socket of sockets) {
            console.log('socketId', socket.id);
            socket.emit(msg, obj);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebchatNotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('received_customer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebchatNotificationGateway.prototype, "setCustomerId", null);
WebchatNotificationGateway = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        namespace: '/webchat',
        allowEIO3: true
    }),
    __metadata("design:paramtypes", [])
], WebchatNotificationGateway);
exports.WebchatNotificationGateway = WebchatNotificationGateway;
//# sourceMappingURL=webchat-notification.gateway.js.map