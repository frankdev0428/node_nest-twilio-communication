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
let HDOrder = class HDOrder extends typeorm_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HDOrder.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "oid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "bid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "sid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "tasks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "subtotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "taxamount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "balancedue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "invoiceurl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "taxes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text', default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "payments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "purchased", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "zip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "beds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "baths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "sqft", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HDOrder.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HDOrder.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], HDOrder.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], HDOrder.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_entity_1.default, customer => customer.hdOrders),
    __metadata("design:type", customer_entity_1.default)
], HDOrder.prototype, "customer", void 0);
HDOrder = __decorate([
    (0, typeorm_1.Entity)('hd_order')
], HDOrder);
exports.default = HDOrder;
//# sourceMappingURL=hd-order.entity.js.map