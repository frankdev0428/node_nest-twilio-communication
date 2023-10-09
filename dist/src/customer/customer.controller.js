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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../guard/jwt-auth.guard");
const customer_service_1 = require("./customer.service");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const update_customer_dto_1 = require("./dto/update-customer.dto");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    create(createHistoryDto, req) {
        return this.customerService.create(createHistoryDto, req.user);
    }
    createMultiple(createHistoryDtos, req) {
        return this.customerService.createMultiple(createHistoryDtos, req.user);
    }
    findAll(req) {
        return this.customerService.findAll(req.user);
    }
    findOne(id) {
        return this.customerService.findOne(+id);
    }
    updateAvatar(id, avatar, req) {
        return this.customerService.updateAvatar(+id, avatar, req.user);
    }
    updateStatus(id, status, req) {
        return this.customerService.updateStatus(+id, status, req.user);
    }
    updateDepartment(id, department, req) {
        return this.customerService.updateDepartment(+id, department, req.user);
    }
    updatePriority(id, priority, req) {
        return this.customerService.updatePriority(+id, priority, req.user);
    }
    updateAgent(id, priority, req) {
        return this.customerService.updateAgent(+id, priority, req.user);
    }
    update(id, updateCustomerDto, req) {
        return this.customerService.update(+id, updateCustomerDto, req.user);
    }
    updateEmail(id, email, req) {
        return this.customerService.updateEmail(+id, email, req.user);
    }
    updateNumber(id, number, req) {
        return this.customerService.updateNumber(+id, number, req.user);
    }
    updateName(id, name, req) {
        return this.customerService.updateName(+id, name, req.user);
    }
    updateCityState(id, name, req) {
        return this.customerService.updateCityState(+id, name, req.user);
    }
    updateStreet(id, name, req) {
        return this.customerService.updateStreet(+id, name, req.user);
    }
    updateFacebookMessengerId(id, name, req) {
        return this.customerService.updateFacebookMessengerId(+id, name, req.user);
    }
    remove(id) {
        return this.customerService.remove(+id);
    }
    removeByIds(ids) {
        return this.customerService.removeByIds(ids);
    }
    mergeCustomerForFacebook(customerId1, customerId2) {
        return this.customerService.mergeCustomerForFacebook(customerId1, customerId2);
    }
    importFromHD(req) {
        return this.customerService.importFromHD(req.user);
    }
    importTransactionsFromHD(req) {
        return this.customerService.importTransactionsFromHD(req.user);
    }
    getTransactions(id) {
        return this.customerService.getTransactions(id);
    }
    importOrdersFromHD(req, id) {
        return this.customerService.importOrdersFromHD(id, req.user);
    }
    getWebhooks(req, id) {
        return this.customerService.getWebhooks(id, req.user);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a customer.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Created a customer successfully, returns "customer created"' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'When the user is not found, returns 401' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'When the customer with same email or phone number is existing, returns 400' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, swagger_1.ApiBody)({ type: [create_customer_dto_1.CreateCustomerDto] }),
    (0, swagger_1.ApiOperation)({ summary: 'Create customers from imported data.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Create customers successfully, returns "customers created" (when the customer with same email or phone number is existing, skip creation)' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'When the user is not found, returns 401' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "createMultiple", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get customers of the current user.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'return customers with latest sms and email history' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a customer by id.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'return a customer with sms and email history' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('avatar/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update avatar of a customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'If there is no customer with id, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('avatar')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Put)('status/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update status of a customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'If there is no customer with id, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)('department/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update department of a customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'If there is no customer with id, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('department')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.Put)('priority/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update priority of a customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'If there is no customer with id, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('priority')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "updatePriority", null);
__decorate([
    (0, common_1.Put)('agent/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update agent of a customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'If there is no customer with id, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('agent')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "updateAgent", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'If there is no customer with id, returns 400' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_dto_1.UpdateCustomerDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('email/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update email of customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'If there is no customer with id, returns 400' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('email')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "updateEmail", null);
__decorate([
    (0, common_1.Put)('number/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update number of customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'If there is no customer with id, returns 400' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('number')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "updateNumber", null);
__decorate([
    (0, common_1.Put)('name/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update number of customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'If there is no customer with id, returns 400' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "updateName", null);
__decorate([
    (0, common_1.Put)('city/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update city and state of customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'If there is no customer with id, returns 400' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "updateCityState", null);
__decorate([
    (0, common_1.Put)('street/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update street of customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'If there is no customer with id, returns 400' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "updateStreet", null);
__decorate([
    (0, common_1.Put)('facebook/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update facebook messenger id of customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a customer is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'If there is no customer with id, returns 400' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "updateFacebookMessengerId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a customer.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If the customer is deleted successfully, returns 200' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('delete-multiple'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete customers by ids. Body => { ids: [1,2,3] }' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If customers are deleted successfully, returns 201' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "removeByIds", null);
__decorate([
    (0, common_1.Post)('merge-customer-for-facebook'),
    (0, swagger_1.ApiOperation)({ summary: 'Merge customer1 to customer2' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If customers are merged successfully, returns 201' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)('customerId1')),
    __param(1, (0, common_1.Body)('customerId2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "mergeCustomerForFacebook", null);
__decorate([
    (0, common_1.Post)('import-hd'),
    (0, swagger_1.ApiOperation)({ summary: 'import customers from hd' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If customers are imported successfully, returns 201' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "importFromHD", null);
__decorate([
    (0, common_1.Post)('import-hd-transaction'),
    (0, swagger_1.ApiOperation)({ summary: 'import transactions from hd' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'If transactions are imported successfully, returns 201' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "importTransactionsFromHD", null);
__decorate([
    (0, common_1.Get)('transactions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'get transactions of a customer' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'returns transactions' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Post)('import-orders/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Import orders from HD' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'returns orders' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "importOrdersFromHD", null);
__decorate([
    (0, common_1.Get)('webhooks/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'get webhooks' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'returns webhooks' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getWebhooks", null);
CustomerController = __decorate([
    (0, swagger_1.ApiTags)('CustomerController'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map