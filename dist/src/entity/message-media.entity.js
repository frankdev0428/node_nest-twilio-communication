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
const sms_history_entity_1 = require("./sms-history.entity");
let MessageMedia = class MessageMedia extends typeorm_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MessageMedia.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MessageMedia.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], MessageMedia.prototype, "contentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], MessageMedia.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MessageMedia.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MessageMedia.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => sms_history_entity_1.default, message => message.media),
    __metadata("design:type", sms_history_entity_1.default)
], MessageMedia.prototype, "message", void 0);
MessageMedia = __decorate([
    (0, typeorm_1.Entity)('message_media')
], MessageMedia);
exports.default = MessageMedia;
//# sourceMappingURL=message-media.entity.js.map