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
const user_entity_1 = require("./user.entity");
let ChatHistory = class ChatHistory extends typeorm_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChatHistory.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], ChatHistory.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ChatHistory.prototype, "bRead", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChatHistory.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChatHistory.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.default, user => user.sentMessages),
    __metadata("design:type", user_entity_1.default)
], ChatHistory.prototype, "fromUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.default, user => user.receivedMessages),
    __metadata("design:type", user_entity_1.default)
], ChatHistory.prototype, "toUser", void 0);
ChatHistory = __decorate([
    (0, typeorm_1.Entity)('chat_history')
], ChatHistory);
exports.default = ChatHistory;
//# sourceMappingURL=chat-history.entity.js.map