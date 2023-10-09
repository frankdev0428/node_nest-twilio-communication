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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendSMSDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const customer_entity_1 = require("../../../entity/customer.entity");
const sms_history_entity_1 = require("../../../entity/sms-history.entity");
let SendSMSDto = class SendSMSDto {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The phone number to receive sms. for example, +17015168317'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendSMSDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The content of sms'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendSMSDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SendSMSDto.prototype, "mediaUrl", void 0);
SendSMSDto = __decorate([
    (0, swagger_1.ApiExtraModels)(customer_entity_1.default),
    (0, swagger_1.ApiExtraModels)(sms_history_entity_1.default)
], SendSMSDto);
exports.SendSMSDto = SendSMSDto;
//# sourceMappingURL=send-sms.dto.js.map