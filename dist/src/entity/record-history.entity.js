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
const voice_history_entity_1 = require("./voice-history.entity");
let RecordHistory = class RecordHistory extends typeorm_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RecordHistory.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "accountSid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "apiVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "callSid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "conferenceSid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Date)
], RecordHistory.prototype, "dateCreated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Date)
], RecordHistory.prototype, "dateUpdated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Date)
], RecordHistory.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "sid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], RecordHistory.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "uri", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "encryptionDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "priceUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], RecordHistory.prototype, "channels", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], RecordHistory.prototype, "errorCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], RecordHistory.prototype, "track", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RecordHistory.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RecordHistory.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => voice_history_entity_1.default, voice => voice.records),
    __metadata("design:type", voice_history_entity_1.default)
], RecordHistory.prototype, "voiceHistory", void 0);
RecordHistory = __decorate([
    (0, typeorm_1.Entity)('record_history')
], RecordHistory);
exports.default = RecordHistory;
//# sourceMappingURL=record-history.entity.js.map