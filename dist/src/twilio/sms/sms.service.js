"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSService = void 0;
const common_1 = require("@nestjs/common");
const Twilio = require("twilio");
const sms_repository_1 = require("./repository/sms.repository");
const user_entity_1 = require("../../entity/user.entity");
let SMSService = class SMSService {
    async sendSMS(content, userData) {
        const user = await user_entity_1.default.findOne({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            return null;
        }
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = Twilio(accountSid, authToken);
        const res = await client.messages
            .create({
            body: content.body,
            from: user.phoneNumber,
            to: content.to,
            mediaUrl: content.mediaUrl,
        });
        console.log('sendSMS', res);
        const smsHistory = await sms_repository_1.SMSRepository.createSMSHistory(res, userData);
        return smsHistory;
    }
    async getSMS(customerId) {
        return sms_repository_1.SMSRepository.getSMSHistoryList(customerId);
    }
    async saveReceivedSMS(body) {
        return sms_repository_1.SMSRepository.saveReceivedSMS(body);
    }
};
SMSService = __decorate([
    (0, common_1.Injectable)()
], SMSService);
exports.SMSService = SMSService;
//# sourceMappingURL=sms.service.js.map