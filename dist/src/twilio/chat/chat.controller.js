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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guard/jwt-auth.guard");
const notification_gateway_1 = require("../notifications/notification.gateway");
const chat_service_1 = require("./chat.service");
const create_chat_dto_1 = require("./dto/create-chat.dto");
let ChatController = class ChatController {
    constructor(chatService, notificationGateway) {
        this.chatService = chatService;
        this.notificationGateway = notificationGateway;
    }
    getUsersForHistory(req) {
        return this.chatService.getUsersForHistory(req.user);
    }
    getChatHistory(userId, req) {
        return this.chatService.getChatHistory(userId, req.user);
    }
    setAsRead(userId, req) {
        return this.chatService.setAsRead(userId, req.user);
    }
    setChatHistoryAsRead(userId, chatHistoryId, req) {
        return this.chatService.setChatHistoryAsRead(userId, chatHistoryId, req.user);
    }
    async sendChat(createChatDto, req) {
        const chatHistory = await this.chatService.sendChat(createChatDto, req.user);
        if (chatHistory) {
            this.notificationGateway.emitNewChat({ userId: chatHistory.toUser.id, chatHistory });
        }
        return chatHistory;
    }
};
__decorate([
    (0, common_1.Get)('/users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get users except current user.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns users except current user' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'When the user with id is not existing, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getUsersForHistory", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a chat history of user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns chat history' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'When the user with id is not existing, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getChatHistory", null);
__decorate([
    (0, common_1.Put)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Set chat history as read' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns twilio token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'When the user with id is not existing, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "setAsRead", null);
__decorate([
    (0, common_1.Put)(':userId/:chatHistoryId'),
    (0, swagger_1.ApiOperation)({ summary: 'Set chat history as read' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns twilio token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'When the user with id is not existing, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('chatHistoryId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "setChatHistoryAsRead", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Send an internal chat to other user.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns 200 when it was sent successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'When the user with id is not existing, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_dto_1.CreateChatDto, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendChat", null);
ChatController = __decorate([
    (0, swagger_1.ApiTags)('ChatController'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        notification_gateway_1.NotificationGateway])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map