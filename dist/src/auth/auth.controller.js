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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const jwt_auth_guard_1 = require("../guard/jwt-auth.guard");
const email_service_1 = require("../twilio/email/email.service");
const auth_service_1 = require("./auth.service");
const create_subuser_dto_1 = require("./dto/create-subuser.dto");
const email_integration_dto_1 = require("./dto/email-integration.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const signup_user_dto_1 = require("./dto/signup-user.dto");
const update_password_dto_1 = require("./dto/update-password.dto");
const update_subuser_dto_1 = require("./dto/update-subuser.dto");
let AuthController = class AuthController {
    constructor(authService, emailService) {
        this.authService = authService;
        this.emailService = emailService;
    }
    async login(loginDto, res) {
        const token = await this.authService.login(loginDto);
        return res.status(common_1.HttpStatus.OK).send({ token });
    }
    async signup(signupUserDto) {
        return this.authService.signup(signupUserDto);
    }
    getProfile(req) {
        return this.authService.getProfile(req.user);
    }
    updateFacebookFeature(req, enabled) {
        return this.authService.updateFacebookFeature(req.user, enabled);
    }
    updateHDFeature(req, enabled) {
        return this.authService.updateHDFeature(req.user, enabled);
    }
    updateEmailFeature(req, enabled) {
        return this.authService.updateEmailFeature(req.user, enabled);
    }
    updateLivechatFeature(req, enabled) {
        return this.authService.updateLivechatFeature(req.user, enabled);
    }
    updateCallFeature(req, enabled) {
        return this.authService.updateCallFeature(req.user, enabled);
    }
    integrateHD(req, hdApiKey) {
        return this.authService.integrateHD(req.user, hdApiKey);
    }
    integrateEmail(req, emailIntegrationDto) {
        return this.authService.integrateEmail(req.user, emailIntegrationDto, this.emailService);
    }
    updatePassword(req, updatePasswordDto) {
        return this.authService.updatePassword(req.user, updatePasswordDto);
    }
    updateAvatar(req, avatar) {
        return this.authService.updateAvatar(req.user, avatar);
    }
    buyPhoneNumber(req, areaCode) {
        return this.authService.buyPhoneNumber(req.user, areaCode);
    }
    portPhoneNumber(req, phoneNumber) {
        return this.authService.portPhoneNumber(req.user, phoneNumber);
    }
    getLiveChatScript(req) {
        return this.authService.getLiveChatScript(req.user);
    }
    getAnalytics(req) {
        return this.authService.getAnalytics(req.user);
    }
    getIncomingMessagesForRange(req, startDate, endDate, duration, agentId) {
        return this.authService.getIncomingMessagesForRange(req.user, startDate, endDate, duration, agentId);
    }
    createSubadmin(req, createSubuserDto) {
        return this.authService.createSubadmin(req.user, createSubuserDto);
    }
    getSubadmins(req) {
        return this.authService.getSubadmins(req.user);
    }
    getSubadminById(req, id) {
        return this.authService.getSubadminById(req.user, id);
    }
    updateSubadmin(req, updateSubuserDto) {
        return this.authService.updateSubadmin(req.user, updateSubuserDto);
    }
    deleteSubadminById(req, id) {
        return this.authService.deleteSubadminById(req.user, id);
    }
    updateSLAEmail(req, slaEmail) {
        return this.authService.updateSLAEmail(req.user, slaEmail);
    }
    updateSLAMessenger(req, slaMessenger) {
        return this.authService.updateSLAMessenger(req.user, slaMessenger);
    }
    updateSLACall(req, slaCall) {
        return this.authService.updateSLACall(req.user, slaCall);
    }
    updateSLALivechat(req, slaLivechat) {
        return this.authService.updateSLALivechat(req.user, slaLivechat);
    }
    upload(file) {
        return {
            url: `${process.env.APP_URL}/${file.filename}`,
        };
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login API' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If login is successful, returns token' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'If user is not found, returns 400' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'If invalid password, returns 401' }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, swagger_1.ApiOperation)({ summary: 'Signup API' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If signup is successful, returns 201' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'If already registered user, returns 400' }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_user_dto_1.SignupUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Userinfo' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If token is verified, returns user\'s id and email' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'If token is not verified, returns 401' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('/update-facebook-feature'),
    (0, swagger_1.ApiOperation)({ summary: 'Update facebook feature' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Enable/disable facebook feature' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('enabled')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateFacebookFeature", null);
__decorate([
    (0, common_1.Put)('/update-hd-feature'),
    (0, swagger_1.ApiOperation)({ summary: 'Enable/disable hd feature' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Update hd feature' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('enabled')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateHDFeature", null);
__decorate([
    (0, common_1.Put)('/update-email-feature'),
    (0, swagger_1.ApiOperation)({ summary: 'Enable/disable hd feature' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Update hd feature' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('enabled')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateEmailFeature", null);
__decorate([
    (0, common_1.Put)('/update-livechat-feature'),
    (0, swagger_1.ApiOperation)({ summary: 'Enable/disable hd feature' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Update livechat feature' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('enabled')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateLivechatFeature", null);
__decorate([
    (0, common_1.Put)('/update-call-feature'),
    (0, swagger_1.ApiOperation)({ summary: 'Enable/disable hd feature' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Update call feature' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('enabled')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateCallFeature", null);
__decorate([
    (0, common_1.Post)('/hd-integrate'),
    (0, swagger_1.ApiOperation)({ summary: 'Set hd api key and import user data' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Set hd api key and import customer & order data' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('hdApiKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "integrateHD", null);
__decorate([
    (0, common_1.Post)('/email-integrate'),
    (0, swagger_1.ApiOperation)({ summary: 'Set email and app password.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Set email and app password.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, email_integration_dto_1.EmailIntegrationDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "integrateEmail", null);
__decorate([
    (0, common_1.Put)('/update-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a password.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Update a password.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Put)('/avatar'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a avatar.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Update a avatar.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('avatar')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Post)('/buy-phone-number'),
    (0, swagger_1.ApiOperation)({ summary: 'Buy a phone number.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Buy a phone number.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('areaCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "buyPhoneNumber", null);
__decorate([
    (0, common_1.Post)('/port-phone-number'),
    (0, swagger_1.ApiOperation)({ summary: 'Port a phone number.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Port a phone number.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('phoneNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "portPhoneNumber", null);
__decorate([
    (0, common_1.Get)('/live-chat-script'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a live chat script.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Get a live chat script.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getLiveChatScript", null);
__decorate([
    (0, common_1.Get)('/analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get analytics of business.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Get analytics of business.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)('/analytics/incoming-range'),
    (0, swagger_1.ApiOperation)({ summary: 'Get incoming messages of business.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Get incoming messages of business.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('duration')),
    __param(4, (0, common_1.Query)('agentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getIncomingMessagesForRange", null);
__decorate([
    (0, common_1.Post)('/subadmin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a subadmin.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Create a subadmin.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_subuser_dto_1.CreateSubuserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createSubadmin", null);
__decorate([
    (0, common_1.Get)('/subadmin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subadmins.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return list of subadmin.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getSubadmins", null);
__decorate([
    (0, common_1.Get)('/subadmin/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subadmin with id.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a subadmin with id.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getSubadminById", null);
__decorate([
    (0, common_1.Put)('/subadmin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a subadmin.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Update a subadmin.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_subuser_dto_1.UpdateSubuserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateSubadmin", null);
__decorate([
    (0, common_1.Delete)('/subadmin/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete subadmin with id.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Delete a subadmin.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "deleteSubadminById", null);
__decorate([
    (0, common_1.Put)('/sla/email'),
    (0, swagger_1.ApiOperation)({ summary: 'Update SLA of email.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully updated.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('slaEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateSLAEmail", null);
__decorate([
    (0, common_1.Put)('/sla/messenger'),
    (0, swagger_1.ApiOperation)({ summary: 'Update SLA of messenger.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully updated.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('slaMessenger')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateSLAMessenger", null);
__decorate([
    (0, common_1.Put)('/sla/call'),
    (0, swagger_1.ApiOperation)({ summary: 'Update SLA of call.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully updated.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('slaCall')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateSLACall", null);
__decorate([
    (0, common_1.Put)('/sla/livechat'),
    (0, swagger_1.ApiOperation)({ summary: 'Update SLA of livechat.' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully updated.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('slaLivechat')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateSLALivechat", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a file and send url.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Upload a file and send url.' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/upload',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "upload", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('AuthController'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        email_service_1.EmailService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map