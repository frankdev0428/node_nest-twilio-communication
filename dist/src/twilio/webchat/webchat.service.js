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
exports.WebchatService = void 0;
const common_1 = require("@nestjs/common");
const webchat_repository_1 = require("./repository/webchat.repository");
const notification_gateway_1 = require("../notifications/notification.gateway");
const webchat_notification_gateway_1 = require("../notifications/webchat-notification.gateway");
let WebchatService = class WebchatService {
    constructor(notificationGateway, webchatNotificationGateway) {
        this.notificationGateway = notificationGateway;
        this.webchatNotificationGateway = webchatNotificationGateway;
    }
    getWebchat(userId, customerId) {
        return webchat_repository_1.WebchatRepository.getWebchat(userId, customerId);
    }
    async receiveWebchat(createWebchatDto) {
        const { webchatHistory, userId } = await webchat_repository_1.WebchatRepository.receiveWebchat(createWebchatDto);
        if (userId) {
            this.notificationGateway.emitNewWebchat({ webchatHistory, userId });
        }
        return webchatHistory;
    }
    async sendWebchat(createWebchatDto) {
        const { webchatHistory, customerId } = await webchat_repository_1.WebchatRepository.sendWebchat(createWebchatDto);
        if (customerId) {
            this.webchatNotificationGateway.emitNewWebchat({ webchatHistory, customerId });
        }
        return webchatHistory;
    }
    getPossibleCustomer(userId, searchCustomerDto) {
        return webchat_repository_1.WebchatRepository.getPossibleCustomer(userId, searchCustomerDto);
    }
};
WebchatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway,
        webchat_notification_gateway_1.WebchatNotificationGateway])
], WebchatService);
exports.WebchatService = WebchatService;
//# sourceMappingURL=webchat.service.js.map