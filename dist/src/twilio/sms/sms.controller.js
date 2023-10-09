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
exports.SMSController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guard/jwt-auth.guard");
const notification_gateway_1 = require("../notifications/notification.gateway");
const send_sms_dto_1 = require("./dto/send-sms.dto");
const sms_service_1 = require("./sms.service");
let SMSController = class SMSController {
    constructor(smsService, notificationGateway) {
        this.smsService = smsService;
        this.notificationGateway = notificationGateway;
    }
    async getSMS(customerId) {
        return this.smsService.getSMS(customerId);
    }
    async sendSMS(content, req) {
        return this.smsService.sendSMS(content, req.body);
    }
    async receiveSMS(req) {
        console.log('----------------- receive sms ----------------');
        console.log(req.body);
        const obj = await this.smsService.saveReceivedSMS(req.body);
        if (obj) {
            this.notificationGateway.emitNewSMS(obj);
        }
        return 'success';
    }
};
__decorate([
    (0, common_1.Get)('sms/:customerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get SMS history, for now if type field is 0, it\'s sent sms, and otherwise received' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If SMS is successfully sent, returns 200 with sms history' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SMSController.prototype, "getSMS", null);
__decorate([
    (0, common_1.Post)('send'),
    (0, swagger_1.ApiOperation)({ summary: 'Send SMS and add to SMS history' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If SMS is successfully sent, returns 201 with sms response' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_sms_dto_1.SendSMSDto, Object]),
    __metadata("design:returntype", Promise)
], SMSController.prototype, "sendSMS", null);
__decorate([
    (0, common_1.Post)('receive'),
    (0, swagger_1.ApiOperation)({ summary: 'Receive SMS and add to SMS history' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If SMS is successfully sent, returns 201 with sms response' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SMSController.prototype, "receiveSMS", null);
SMSController = __decorate([
    (0, swagger_1.ApiTags)('SMSController'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, common_1.Controller)('sms'),
    __metadata("design:paramtypes", [sms_service_1.SMSService,
        notification_gateway_1.NotificationGateway])
], SMSController);
exports.SMSController = SMSController;
//# sourceMappingURL=sms.controller.js.map