"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceModule = void 0;
const common_1 = require("@nestjs/common");
const notification_module_1 = require("../notifications/notification.module");
const voice_controller_1 = require("./voice.controller");
const voice_service_1 = require("./voice.service");
let VoiceModule = class VoiceModule {
};
VoiceModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule],
        controllers: [voice_controller_1.VoiceController],
        providers: [
            voice_service_1.VoiceService,
        ]
    })
], VoiceModule);
exports.VoiceModule = VoiceModule;
//# sourceMappingURL=voice.module.js.map