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
let FacebookHistory = class FacebookHistory extends typeorm_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FacebookHistory.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FacebookHistory.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "numSegments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "accountSid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "numMedia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "apiVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "smsMessageSid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "smsSid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "smsStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "referralNumMedia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], FacebookHistory.prototype, "messageSid", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FacebookHistory.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FacebookHistory.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FacebookHistory.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_entity_1.default, customer => customer.facebook),
    __metadata("design:type", customer_entity_1.default)
], FacebookHistory.prototype, "customer", void 0);
FacebookHistory = __decorate([
    (0, typeorm_1.Entity)('facebook_history')
], FacebookHistory);
exports.default = FacebookHistory;
//# sourceMappingURL=facebook-history.entity.js.map