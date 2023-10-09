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
exports.FacebookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guard/jwt-auth.guard");
const notification_gateway_1 = require("../notifications/notification.gateway");
const create_facebook_dto_1 = require("./dto/create-facebook.dto");
const send_facebook_dto_1 = require("./dto/send-facebook.dto");
const facebook_service_1 = require("./facebook.service");
let FacebookController = class FacebookController {
    constructor(facebookService, notificationGateway) {
        this.facebookService = facebookService;
        this.notificationGateway = notificationGateway;
    }
    async getFacebookWebhook(req) {
        return this.facebookService.getFacebookWebhook(req);
    }
    async receiveFacebookMessage(createFacebookDto) {
        const obj = await this.facebookService.receiveFacebookMessage(createFacebookDto);
        if (obj) {
            this.notificationGateway.emitNewFacebook(obj);
        }
    }
    async setFacebookWebhook(createFacebookDto) {
        this.facebookService.setFacebookWebhook(createFacebookDto);
    }
    async sendMessage(sendFacebookDto, req) {
        return this.facebookService.sendMessage(sendFacebookDto, req.user);
    }
    async receiveMessage(content, req) {
        return this.facebookService.receiveMessage(content, req.body);
    }
};
__decorate([
    (0, common_1.Get)('webhook'),
    (0, swagger_1.ApiOperation)({ summary: 'Add support for GET requests to our webhook' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If verifytoken is equal, returns 200 with challenge' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "getFacebookWebhook", null);
__decorate([
    (0, common_1.Post)('webhook'),
    (0, swagger_1.ApiOperation)({ summary: 'Create the endpoint for your webhook' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If request is for a page, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Then otherwise, returns 404' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_facebook_dto_1.CreateFacebookDto]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "receiveFacebookMessage", null);
__decorate([
    (0, common_1.Get)('set-webhook'),
    (0, swagger_1.ApiOperation)({ summary: 'set webhook url for your webhook' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If request is for a page, returns 200' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_facebook_dto_1.CreateFacebookDto]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "setFacebookWebhook", null);
__decorate([
    (0, common_1.Post)('send'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a facebook message and add to facebook history' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If message is successfully sent, returns 201 with response' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_facebook_dto_1.SendFacebookDto, Object]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('receive'),
    (0, swagger_1.ApiOperation)({ summary: 'Receive a facebook message and add to facebook history' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If message is successfully sent, returns 201 with response' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FacebookController.prototype, "receiveMessage", null);
FacebookController = __decorate([
    (0, swagger_1.ApiTags)('Facebookontroller'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, common_1.Controller)('facebook'),
    __metadata("design:paramtypes", [facebook_service_1.FacebookService,
        notification_gateway_1.NotificationGateway])
], FacebookController);
exports.FacebookController = FacebookController;
//# sourceMappingURL=facebook.controller.js.map