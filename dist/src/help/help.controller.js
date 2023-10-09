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
exports.HelpController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../guard/jwt-auth.guard");
const help_service_1 = require("./help.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const create_question_dto_1 = require("./dto/create-question.dto");
const update_question_dto_1 = require("./dto/update-question.dto");
let HelpController = class HelpController {
    constructor(helpService) {
        this.helpService = helpService;
    }
    createCategory(createCategoryDto) {
        return this.helpService.createCategory(createCategoryDto);
    }
    getCategories() {
        return this.helpService.getCategories();
    }
    getCategoryById(id) {
        return this.helpService.getCategoryById(id);
    }
    deleteCategory(id) {
        return this.helpService.deleteCategory(id);
    }
    updateCategory(id, updateCategoryDto) {
        return this.helpService.updateCategory(id, updateCategoryDto);
    }
    createQuestion(createQuestionDto) {
        return this.helpService.createQuestion(createQuestionDto);
    }
    getQuestions(categoryId) {
        return this.helpService.getQuestions(categoryId);
    }
    getQuestionById(id) {
        return this.helpService.getQuestionById(id);
    }
    deleteQuestion(id) {
        return this.helpService.deleteQuestion(id);
    }
    updateQuestion(id, updateQuestionDto) {
        return this.helpService.updateQuestion(id, updateQuestionDto);
    }
};
__decorate([
    (0, common_1.Post)('category'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a category.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Created a category successfully, returns a category created' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], HelpController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('category'),
    (0, swagger_1.ApiOperation)({ summary: 'Get categories.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'return categories with questions' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HelpController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('category/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a category with id.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a category is found, returns a category' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'If there is no category with id, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HelpController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Delete)('category/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a category.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a category is deleted successfully, returns 200 with "deleted"' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HelpController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Put)('category/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a category.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a category is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'If there is no category with id, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], HelpController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Post)('question'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a question.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a question is created successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'If there is no category with id, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", void 0)
], HelpController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Get)('question'),
    (0, swagger_1.ApiOperation)({ summary: 'Get questions.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'return questions with a category' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HelpController.prototype, "getQuestions", null);
__decorate([
    (0, common_1.Get)('question/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a question with id.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a question is found, returns a question' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'If there is no question with id, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HelpController.prototype, "getQuestionById", null);
__decorate([
    (0, common_1.Delete)('question/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a question.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a question is deleted successfully, returns 200 with "deleted"' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HelpController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Put)('question/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a question.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'If a question is updated successfully, returns 200' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'If there is no question with id, returns 500' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", void 0)
], HelpController.prototype, "updateQuestion", null);
HelpController = __decorate([
    (0, swagger_1.ApiTags)('HelpController'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiHeader)({
        name: 'Bearer',
        description: 'Auth token',
    }),
    (0, common_1.Controller)('help'),
    __metadata("design:paramtypes", [help_service_1.HelpService])
], HelpController);
exports.HelpController = HelpController;
//# sourceMappingURL=help.controller.js.map