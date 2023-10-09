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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const email_repository_1 = require("./repository/email.repository");
const imap_1 = require("../../utils/imap");
const notification_gateway_1 = require("../notifications/notification.gateway");
const auth_repository_1 = require("../../auth/repository/auth.repository");
let EmailService = class EmailService {
    constructor(notificationGateway) {
        this.notificationGateway = notificationGateway;
    }
    onModuleInit() {
        this.setupMailbox();
    }
    async setupMailbox() {
        const users = await auth_repository_1.AuthRepository.getAdminUsers();
        for (const user of users) {
            if (user.businessEmail) {
                (0, imap_1.setupMailbox)(user.businessEmail, user.appPassword, this.receiveEmail.bind(this));
            }
        }
    }
    sendEmailWithNewSubject(createEmailDto, user) {
        return email_repository_1.EmailRepository.sendEmailWithNewSubject(createEmailDto, user);
    }
    replyEmail(createEmailDto, user) {
        return email_repository_1.EmailRepository.replyEmail(createEmailDto, user);
    }
    async receiveEmail(from, to, subject, text, content, messageId) {
        console.log("---------------receiveEmail---------------", from, to, subject, messageId);
        console.log(content);
        const { emailHistory, userId } = await email_repository_1.EmailRepository.receiveEmail(from, to, subject, text, content, messageId);
        if (userId) {
            this.notificationGateway.emitNewEmail({ emailHistory, userId });
        }
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map