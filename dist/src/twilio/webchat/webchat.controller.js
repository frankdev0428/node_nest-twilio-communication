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
exports.WebchatController = void 0;
const common_1 = require("@nestjs/common");
const webchat_service_1 = require("./webchat.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guard/jwt-auth.guard");
const create_webchat_dto_1 = require("./dto/create-webchat.dto");
const search_customer_dto_1 = require("./dto/search-customer.dto");
let WebchatController = class WebchatController {
    constructor(webchatService) {
        this.webchatService = webchatService;
    }
    getWebchat(userId, customerId) {
        return this.webchatService.getWebchat(userId, customerId);
    }
    receiveWebchat(createWebchatDto) {
        return this.webchatService.receiveWebchat(createWebchatDto);
    }
    sendWebchat(createWebchatDto) {
        return this.webchatService.sendWebchat(createWebchatDto);
    }
    getPossibleCustomer(searchCustomerDto, userId) {
        return this.webchatService.getPossibleCustomer(userId, searchCustomerDto);
    }
};
__decorate([
    (0, common_1.Get)(':userId/:customerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get webchat history for customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If create a webchat history successfully, send history' }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], WebchatController.prototype, "getWebchat", null);
__decorate([
    (0, common_1.Post)('receive'),
    (0, swagger_1.ApiOperation)({ summary: 'Receive a webchat from widget.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If create a webchat history successfully, send 201' }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_webchat_dto_1.CreateWebchatDto]),
    __metadata("design:returntype", void 0)
], WebchatController.prototype, "receiveWebchat", null);
__decorate([
    (0, common_1.Post)('send'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a webchat to widget.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If create a webchat history successfully, send 201' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_webchat_dto_1.CreateWebchatDto]),
    __metadata("design:returntype", void 0)
], WebchatController.prototype, "sendWebchat", null);
__decorate([
    (0, common_1.Post)(':userId/search'),
    (0, swagger_1.ApiOperation)({ summary: 'returns customers for first name and last name.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'returns customers for first name and last name.' }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_customer_dto_1.SearchCustomerDto, Number]),
    __metadata("design:returntype", void 0)
], WebchatController.prototype, "getPossibleCustomer", null);
WebchatController = __decorate([
    (0, swagger_1.ApiTags)('WebchatController'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, common_1.Controller)('webchat'),
    __metadata("design:paramtypes", [webchat_service_1.WebchatService])
], WebchatController);
exports.WebchatController = WebchatController;
//# sourceMappingURL=webchat.controller.js.map