"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSModule = void 0;
const common_1 = require("@nestjs/common");
const notification_module_1 = require("../notifications/notification.module");
const sms_controller_1 = require("./sms.controller");
const sms_service_1 = require("./sms.service");
let SMSModule = class SMSModule {
};
SMSModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule],
        controllers: [sms_controller_1.SMSController],
        providers: [
            sms_service_1.SMSService,
        ]
    })
], SMSModule);
exports.SMSModule = SMSModule;
//# sourceMappingURL=sms.module.js.map