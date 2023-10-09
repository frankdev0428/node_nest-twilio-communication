"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookService = void 0;
const common_1 = require("@nestjs/common");
const facebook_repository_1 = require("./repository/facebook.repository");
let FacebookService = class FacebookService {
    async getFacebookWebhook(req) {
        console.log('--------------------------getFacebookWebhook-------------------------');
        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];
        if (mode && token) {
            if (mode === "subscribe" && token === process.env.FACEBOOK_VERIFY_TOKEN) {
                console.log("--------------------------WEBHOOK_VERIFIED-------------------------");
                return challenge;
            }
            else {
                throw new common_1.HttpException('Forbidden', 403);
            }
        }
    }
    async receiveFacebookMessage(createFacebookDto) {
        return facebook_repository_1.FacebookRepository.receiveFacebookMessage(createFacebookDto);
    }
    async setFacebookWebhook(createFacebookDto) {
        console.log(createFacebookDto);
    }
    async sendMessage(sendFacebookDto, userData) {
        return facebook_repository_1.FacebookRepository.sendMessage(sendFacebookDto, userData);
    }
    async receiveMessage(content, body) {
    }
};
FacebookService = __decorate([
    (0, common_1.Injectable)()
], FacebookService);
exports.FacebookService = FacebookService;
//# sourceMappingURL=facebook.service.js.map