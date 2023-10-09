"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_repository_1 = require("./repository/chat.repository");
let ChatService = class ChatService {
    getUsersForHistory(userData) {
        return chat_repository_1.ChatRepository.getUsersForHistory(userData);
    }
    getChatHistory(userId, userData) {
        return chat_repository_1.ChatRepository.getChatHistory(userId, userData);
    }
    setAsRead(userId, userData) {
        return chat_repository_1.ChatRepository.setAsRead(userId, userData);
    }
    setChatHistoryAsRead(userId, chatHistoryId, userData) {
        return chat_repository_1.ChatRepository.setChatHistoryAsRead(userId, chatHistoryId, userData);
    }
    async sendChat(createChatDto, userData) {
        return chat_repository_1.ChatRepository.sendChat(createChatDto, userData);
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)()
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map