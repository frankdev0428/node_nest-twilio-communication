"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_repository_1 = require("./repository/auth.repository");
let AuthService = class AuthService {
    login(loginUserDto) {
        return auth_repository_1.AuthRepository.login(loginUserDto);
    }
    signup(signupUserDto) {
        return auth_repository_1.AuthRepository.signup(signupUserDto);
    }
    updateFacebookFeature(userData, enabled) {
        return auth_repository_1.AuthRepository.updateFacebookFeature(userData, enabled);
    }
    updateHDFeature(userData, enabled) {
        return auth_repository_1.AuthRepository.updateHDFeature(userData, enabled);
    }
    updateEmailFeature(userData, enabled) {
        return auth_repository_1.AuthRepository.updateEmailFeature(userData, enabled);
    }
    updateLivechatFeature(userData, enabled) {
        return auth_repository_1.AuthRepository.updateLivechatFeature(userData, enabled);
    }
    updateCallFeature(userData, enabled) {
        return auth_repository_1.AuthRepository.updateCallFeature(userData, enabled);
    }
    getProfile(userData) {
        return auth_repository_1.AuthRepository.getProfile(userData);
    }
    integrateHD(userData, hdApiKey) {
        return auth_repository_1.AuthRepository.integrateHD(userData, hdApiKey);
    }
    integrateEmail(userData, emailIntegrationDto, emailService) {
        return auth_repository_1.AuthRepository.integrateEmail(userData, emailIntegrationDto, emailService);
    }
    updatePassword(userData, updatePasswordDto) {
        return auth_repository_1.AuthRepository.updatePassword(userData, updatePasswordDto);
    }
    updateAvatar(userData, avatar) {
        return auth_repository_1.AuthRepository.updateAvatar(userData, avatar);
    }
    buyPhoneNumber(userData, areaCode) {
        return auth_repository_1.AuthRepository.buyPhoneNumber(userData, areaCode);
    }
    portPhoneNumber(userData, phoneNumber) {
        return auth_repository_1.AuthRepository.portPhoneNumber(userData, phoneNumber);
    }
    getLiveChatScript(userData) {
        return auth_repository_1.AuthRepository.getLiveChatScript(userData);
    }
    getAnalytics(userData) {
        return auth_repository_1.AuthRepository.getAnalytics(userData);
    }
    createSubadmin(userData, createSubuserDto) {
        return auth_repository_1.AuthRepository.createSubadmin(userData, createSubuserDto);
    }
    updateSLAEmail(userData, slaEmail) {
        return auth_repository_1.AuthRepository.updateSLAEmail(userData, slaEmail);
    }
    updateSLAMessenger(userData, slaMessenger) {
        return auth_repository_1.AuthRepository.updateSLAMessenger(userData, slaMessenger);
    }
    updateSLACall(userData, slaCall) {
        return auth_repository_1.AuthRepository.updateSLACall(userData, slaCall);
    }
    updateSLALivechat(userData, slaLivechat) {
        return auth_repository_1.AuthRepository.updateSLALivechat(userData, slaLivechat);
    }
    getIncomingMessagesForRange(userData, startDate, endDate, duration, agentId) {
        return auth_repository_1.AuthRepository.getIncomingMessagesForRange(userData, startDate, endDate, duration, agentId);
    }
    getSubadmins(userData) {
        return auth_repository_1.AuthRepository.getSubadmins(userData);
    }
    getSubadminById(userData, id) {
        return auth_repository_1.AuthRepository.getSubadminById(userData, id);
    }
    updateSubadmin(userData, updateSubuserDto) {
        return auth_repository_1.AuthRepository.updateSubadmin(userData, updateSubuserDto);
    }
    deleteSubadminById(userData, id) {
        return auth_repository_1.AuthRepository.deleteSubadminById(userData, id);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map