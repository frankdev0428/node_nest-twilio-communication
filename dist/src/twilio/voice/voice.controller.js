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
exports.VoiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guard/jwt-auth.guard");
const notification_gateway_1 = require("../notifications/notification.gateway");
const voice_service_1 = require("./voice.service");
let VoiceController = class VoiceController {
    constructor(voiceService, notificationGateway) {
        this.voiceService = voiceService;
        this.notificationGateway = notificationGateway;
    }
    generateToken(req) {
        return this.voiceService.generateToken(req.user);
    }
    async receiveIncomingCall(req) {
        console.log('------------receiveCall-------------', req.body);
        if (req.body.Called) {
            return this.voiceService.receiveIncomingCall(req.body);
        }
        else {
            return this.voiceService.receiveOutgoingCall(req.body);
        }
    }
    async storeEndedCallInfo(req) {
        const obj = await this.voiceService.storeEndedCallInfo(req.body);
        if (obj) {
            this.notificationGateway.emitNewVoice(obj);
        }
    }
    async getCustomerByPhoneNumber(req, phoneNumber) {
        return this.voiceService.getCustomerByPhoneNumber(req.user, phoneNumber);
    }
    async startRecording(req, callSid) {
        return this.voiceService.startRecording(req.user, callSid);
    }
    async stopRecording(req, recordSid) {
        return this.voiceService.stopRecording(req.user, recordSid);
    }
    async pauseRecording(req, recordSid) {
        return this.voiceService.pauseRecording(req.user, recordSid);
    }
    async resumeRecording(req, recordSid) {
        return this.voiceService.resumeRecording(req.user, recordSid);
    }
    async downloadRecording(req, recordSid) {
        return this.voiceService.downloadRecording(req.user, recordSid);
    }
    async leaveVoicemail(req) {
        return this.voiceService.leaveVoicemail(req.body);
    }
    async startVoicemail(req) {
        return this.voiceService.startVoicemail(req.body);
    }
    async saveVoicemail(req) {
        return this.voiceService.saveVoicemail(req.body);
    }
};
__decorate([
    (0, common_1.Get)('token'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a token for twilio device' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns twilio token' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VoiceController.prototype, "generateToken", null);
__decorate([
    (0, common_1.Post)('receive_call'),
    (0, swagger_1.ApiOperation)({ summary: 'Receive phone call' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If SMS is successfully sent, returns 201 with sms response' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VoiceController.prototype, "receiveIncomingCall", null);
__decorate([
    (0, common_1.Post)('ended_call'),
    (0, swagger_1.ApiOperation)({ summary: 'Receive info about ended call' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Store the call information' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VoiceController.prototype, "storeEndedCallInfo", null);
__decorate([
    (0, common_1.Get)('customer'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a customer with a specific number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns a customer if existing, otherwise returns null' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('phoneNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoiceController.prototype, "getCustomerByPhoneNumber", null);
__decorate([
    (0, common_1.Get)('record/start/:callSid'),
    (0, swagger_1.ApiOperation)({ summary: 'Start a recording with callSid' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'if record has started, return 200' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('callSid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoiceController.prototype, "startRecording", null);
__decorate([
    (0, common_1.Get)('record/stop/:recordSid'),
    (0, swagger_1.ApiOperation)({ summary: 'Start a recording with callSid' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'if record has stopped, return 200' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('recordSid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoiceController.prototype, "stopRecording", null);
__decorate([
    (0, common_1.Get)('record/pause/:recordSid'),
    (0, swagger_1.ApiOperation)({ summary: 'Start a recording with callSid' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'if record has paused, return 200' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('recordSid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoiceController.prototype, "pauseRecording", null);
__decorate([
    (0, common_1.Get)('record/resume/:recordSid'),
    (0, swagger_1.ApiOperation)({ summary: 'Start a recording with callSid' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'if record has resumed, return 200' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('recordSid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoiceController.prototype, "resumeRecording", null);
__decorate([
    (0, common_1.Get)('record/download/:recordSid'),
    (0, swagger_1.ApiOperation)({ summary: 'Download a recording file with callSid' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns a recording file' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('recordSid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VoiceController.prototype, "downloadRecording", null);
__decorate([
    (0, common_1.Post)('leave_voicemail'),
    (0, swagger_1.ApiOperation)({ summary: 'Allow users leave a voicemail' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns twiml response' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VoiceController.prototype, "leaveVoicemail", null);
__decorate([
    (0, common_1.Post)('start_voicemail'),
    (0, swagger_1.ApiOperation)({ summary: 'Allow users start a voicemail' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns twiml response' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VoiceController.prototype, "startVoicemail", null);
__decorate([
    (0, common_1.Post)('save_voicemail'),
    (0, swagger_1.ApiOperation)({ summary: 'Save a voicemail' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns twiml response' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VoiceController.prototype, "saveVoicemail", null);
VoiceController = __decorate([
    (0, swagger_1.ApiTags)('VoiceController'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, common_1.Controller)('voice'),
    __metadata("design:paramtypes", [voice_service_1.VoiceService,
        notification_gateway_1.NotificationGateway])
], VoiceController);
exports.VoiceController = VoiceController;
//# sourceMappingURL=voice.controller.js.map