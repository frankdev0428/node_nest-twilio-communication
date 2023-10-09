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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../guard/jwt-auth.guard");
const stripe_service_1 = require("./stripe.service");
let StripeController = class StripeController {
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    generateToken() {
        return this.stripeService.createSubscriptionSession();
    }
    listSubscription() {
        return this.stripeService.listSubscriptions();
    }
    listCustomers(email) {
        return this.stripeService.listCustomers(email);
    }
    sendInvoice(req) {
        return this.stripeService.sendInvoice(req.user);
    }
    enableInvoiceHistory(req) {
        return this.stripeService.enableInvoiceHistory(req.user);
    }
    createCustomerPortalSession(req) {
        return this.stripeService.createCustomerPortalSession(req.user);
    }
};
__decorate([
    (0, common_1.Post)('checkout'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a checkout session' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'return checkout url' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StripeController.prototype, "generateToken", null);
__decorate([
    (0, common_1.Get)('subscriptions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subscriptions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'return subscriptions' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StripeController.prototype, "listSubscription", null);
__decorate([
    (0, common_1.Get)('customers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get customers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'return customers' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StripeController.prototype, "listCustomers", null);
__decorate([
    (0, common_1.Post)('invoice'),
    (0, swagger_1.ApiOperation)({ summary: 'Send an invoice' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Send an invoice' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StripeController.prototype, "sendInvoice", null);
__decorate([
    (0, common_1.Post)('enable-invoice'),
    (0, swagger_1.ApiOperation)({ summary: 'enable an invoice' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'enable an invoice' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StripeController.prototype, "enableInvoiceHistory", null);
__decorate([
    (0, common_1.Post)('create-customer-portal-session'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a customer portal session' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns a url' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StripeController.prototype, "createCustomerPortalSession", null);
StripeController = __decorate([
    (0, swagger_1.ApiTags)('StripeController'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, common_1.Controller)('stripe'),
    __metadata("design:paramtypes", [stripe_service_1.StripeService])
], StripeController);
exports.StripeController = StripeController;
//# sourceMappingURL=stripe.controller.js.map