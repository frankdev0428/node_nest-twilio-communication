"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpService = void 0;
const common_1 = require("@nestjs/common");
const help_repository_1 = require("./repository/help.repository");
let HelpService = class HelpService {
    createCategory(createCategoryDto) {
        return help_repository_1.HelpRepository.createCategory(createCategoryDto);
    }
    getCategories() {
        return help_repository_1.HelpRepository.getCategories();
    }
    getCategoryById(id) {
        return help_repository_1.HelpRepository.getCategoryById(id);
    }
    updateCategory(id, updateCategoryDto) {
        return help_repository_1.HelpRepository.updateCategory(id, updateCategoryDto);
    }
    deleteCategory(id) {
        return help_repository_1.HelpRepository.deleteCategory(id);
    }
    createQuestion(createQuestionDto) {
        return help_repository_1.HelpRepository.createQuestion(createQuestionDto);
    }
    getQuestions(categoryId) {
        return help_repository_1.HelpRepository.getQuestions(categoryId);
    }
    getQuestionById(id) {
        return help_repository_1.HelpRepository.getQuestionById(id);
    }
    deleteQuestion(id) {
        return help_repository_1.HelpRepository.deleteQuestion(id);
    }
    updateQuestion(id, updateQuestionDto) {
        return help_repository_1.HelpRepository.updateQuestion(id, updateQuestionDto);
    }
};
HelpService = __decorate([
    (0, common_1.Injectable)()
], HelpService);
exports.HelpService = HelpService;
//# sourceMappingURL=help.service.js.map