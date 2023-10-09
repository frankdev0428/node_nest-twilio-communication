"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceService = void 0;
const common_1 = require("@nestjs/common");
const voice_repository_1 = require("./repository/voice.repository");
let VoiceService = class VoiceService {
    async generateToken(userData) {
        return voice_repository_1.VoiceRepository.generateToken(userData);
    }
    async receiveIncomingCall(body) {
        return voice_repository_1.VoiceRepository.receiveIncomingCall(body);
    }
    async receiveOutgoingCall(body) {
        return voice_repository_1.VoiceRepository.receiveOutgoingCall(body);
    }
    async getCustomerByPhoneNumber(userData, phoneNumber) {
        return voice_repository_1.VoiceRepository.getCustomerByPhoneNumber(userData, phoneNumber);
    }
    async storeEndedCallInfo(body) {
        return voice_repository_1.VoiceRepository.storeEndedCallInfo(body);
    }
    async startRecording(userData, callSid) {
        return voice_repository_1.VoiceRepository.startRecording(userData, callSid);
    }
    async stopRecording(userData, recordSid) {
        return voice_repository_1.VoiceRepository.stopRecording(userData, recordSid);
    }
    async pauseRecording(userData, recordSid) {
        return voice_repository_1.VoiceRepository.pauseRecording(userData, recordSid);
    }
    async resumeRecording(userData, recordSid) {
        return voice_repository_1.VoiceRepository.resumeRecording(userData, recordSid);
    }
    async downloadRecording(userData, recordSid) {
        return voice_repository_1.VoiceRepository.downloadRecording(userData, recordSid);
    }
    async leaveVoicemail(body) {
        return voice_repository_1.VoiceRepository.leaveVoicemail(body);
    }
    async startVoicemail(body) {
        return voice_repository_1.VoiceRepository.startVoicemail(body);
    }
    async saveVoicemail(body) {
        return voice_repository_1.VoiceRepository.saveVoicemail(body);
    }
};
VoiceService = __decorate([
    (0, common_1.Injectable)()
], VoiceService);
exports.VoiceService = VoiceService;
//# sourceMappingURL=voice.service.js.map