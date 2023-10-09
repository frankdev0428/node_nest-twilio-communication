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
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
const message_media_entity_1 = require("./message-media.entity");
let SMSHistory = class SMSHistory extends typeorm_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SMSHistory.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SMSHistory.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "numSegments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "direction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Date)
], SMSHistory.prototype, "dateUpdated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "errorMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "uri", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "accountSid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "numMedia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "messagingServiceSid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "sid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Date)
], SMSHistory.prototype, "dateSent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Date)
], SMSHistory.prototype, "dateCreated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], SMSHistory.prototype, "errorCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "priceUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "apiVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "subresourceUris", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "toCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "toState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "smsMessageSid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "toCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "fromZip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "smsSid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "fromState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "smsStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "fromCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "fromCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "toZip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "referralNumMedia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SMSHistory.prototype, "messageSid", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SMSHistory.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SMSHistory.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SMSHistory.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_entity_1.default, customer => customer.sms),
    __metadata("design:type", customer_entity_1.default)
], SMSHistory.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => message_media_entity_1.default, media => media.message),
    __metadata("design:type", Array)
], SMSHistory.prototype, "media", void 0);
SMSHistory = __decorate([
    (0, typeorm_1.Entity)('sms_history')
], SMSHistory);
exports.default = SMSHistory;
//# sourceMappingURL=sms-history.entity.js.map