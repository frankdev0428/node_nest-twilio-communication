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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guard/jwt-auth.guard");
const create_email_subject_dto_1 = require("./dto/create-email-subject.dto");
let EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    create(createEmailDto, req) {
        return this.emailService.sendEmailWithNewSubject(createEmailDto, req.user);
    }
    replyEmail(createEmailDto, req) {
        return this.emailService.replyEmail(createEmailDto, req.user);
    }
    startEmailServer() {
        return this.emailService.setupMailbox();
    }
};
__decorate([
    (0, common_1.Post)('send-new'),
    (0, swagger_1.ApiOperation)({ summary: 'Send an email with a new subject.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If create an email history successfully, send 201' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'When sending email false, send 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_email_subject_dto_1.CreateEmailSubjectDto, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('send'),
    (0, swagger_1.ApiOperation)({ summary: 'Reply an email.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If create an email history successfully, send 201' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'When sending email false, send 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_email_subject_dto_1.CreateEmailSubjectDto, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "replyEmail", null);
__decorate([
    (0, common_1.Post)('start'),
    (0, swagger_1.ApiOperation)({ summary: 'Start an email server.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If starting an email server successfully, send 201' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'When sending email false, send 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "startEmailServer", null);
EmailController = __decorate([
    (0, swagger_1.ApiTags)('EmailController'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
exports.EmailController = EmailController;
//# sourceMappingURL=email.controller.js.map