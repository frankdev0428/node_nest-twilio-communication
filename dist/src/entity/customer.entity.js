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
const email_history_entity_1 = require("./email-history.entity");
const facebook_history_entity_1 = require("./facebook-history.entity");
const hd_order_entity_1 = require("./hd-order.entity");
const sms_history_entity_1 = require("./sms-history.entity");
const transaction_entity_1 = require("./transaction.entity");
const user_entity_1 = require("./user.entity");
const voice_history_entity_1 = require("./voice-history.entity");
const web_chat_history_entity_1 = require("./web-chat-history.entity");
let Customer = class Customer extends typeorm_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "zipCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "agent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "instagram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "messenger", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "telegram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "wechat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "facebookMessageSid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "uid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Customer.prototype, "responseTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Customer.prototype, "resolutionTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Customer.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Customer.prototype, "agentUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "bid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "mergedCustomers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Customer.prototype, "completedDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.default, user => user.customers),
    __metadata("design:type", user_entity_1.default)
], Customer.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.default, user => user.assignedCustomers),
    __metadata("design:type", user_entity_1.default)
], Customer.prototype, "agentUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => sms_history_entity_1.default, history => history.customer),
    __metadata("design:type", Array)
], Customer.prototype, "sms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => email_history_entity_1.default, history => history.customer),
    __metadata("design:type", Array)
], Customer.prototype, "emails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => voice_history_entity_1.default, history => history.customer),
    __metadata("design:type", Array)
], Customer.prototype, "voices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => facebook_history_entity_1.default, history => history.customer),
    __metadata("design:type", Array)
], Customer.prototype, "facebook", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => web_chat_history_entity_1.default, webchat => webchat.customer),
    __metadata("design:type", Array)
], Customer.prototype, "webchat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => transaction_entity_1.default, transaction => transaction.customer),
    __metadata("design:type", Array)
], Customer.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => hd_order_entity_1.default, hdOrder => hdOrder.customer),
    __metadata("design:type", Array)
], Customer.prototype, "hdOrders", void 0);
Customer = __decorate([
    (0, typeorm_1.Entity)()
], Customer);
exports.default = Customer;
//# sourceMappingURL=customer.entity.js.map