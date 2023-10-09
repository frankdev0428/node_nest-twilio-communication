import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UsePipes, ValidationPipe, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { HelpService } from './help.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@ApiTags('HelpController')
@ApiBearerAuth('access-token')
@ApiHeader({
  name: 'Bearer',
  description: 'Auth token',
})
@Controller('help')
export class HelpController {
  constructor(private readonly helpService: HelpService) { }

  @Post('category')
  @ApiOperation({ summary: 'Create a category.' })
  @ApiResponse({ status: 201, description: 'Created a category successfully, returns a category created'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.helpService.createCategory(createCategoryDto);
  }

  @Get('category')
  @ApiOperation({ summary: 'Get categories.' })
  @ApiResponse({ status: 200, description: 'return categories with questions' })
  @UseGuards(JwtAuthGuard)
  getCategories() {
    return this.helpService.getCategories();
  }

  @Get('category/:id')
  @ApiOperation({ summary: 'Get a category with id.' })
  @ApiResponse({ status: 200, description: 'If a category is found, returns a category'})
  @ApiResponse({ status: 500, description: 'If there is no category with id, returns 500'})
  @UseGuards(JwtAuthGuard)
  getCategoryById(@Param('id') id: number) {
    return this.helpService.getCategoryById(id);
  }

  @Delete('category/:id')
  @ApiOperation({ summary: 'Delete a category.' })
  @ApiResponse({ status: 200, description: 'If a category is deleted successfully, returns 200 with "deleted"'})
  @UseGuards(JwtAuthGuard)
  deleteCategory(@Param('id') id: number) {
    return this.helpService.deleteCategory(id);
  }

  @Put('category/:id')
  @ApiOperation({ summary: 'Update a category.' })
  @ApiResponse({ status: 200, description: 'If a category is updated successfully, returns 200'})
  @ApiResponse({ status: 500, description: 'If there is no category with id, returns 500'})
  @UseGuards(JwtAuthGuard)
  updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.helpService.updateCategory(id, updateCategoryDto);
  }

  /**
   * Question Part
   */

  @Post('question')
  @ApiOperation({ summary: 'Create a question.' })
  @ApiResponse({ status: 200, description: 'If a question is created successfully, returns 200'})
  @ApiResponse({ status: 500, description: 'If there is no category with id, returns 500'})
  @UseGuards(JwtAuthGuard)
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.helpService.createQuestion(createQuestionDto);
  }

  @Get('question')
  @ApiOperation({ summary: 'Get questions.' })
  @ApiResponse({ status: 200, description: 'return questions with a category' })
  @UseGuards(JwtAuthGuard)
  getQuestions(@Query('categoryId') categoryId: number) {
    return this.helpService.getQuestions(categoryId);
  }

  @Get('question/:id')
  @ApiOperation({ summary: 'Get a question with id.' })
  @ApiResponse({ status: 200, description: 'If a question is found, returns a question'})
  @ApiResponse({ status: 500, description: 'If there is no question with id, returns 500'})
  @UseGuards(JwtAuthGuard)
  getQuestionById(@Param('id') id: number) {
    return this.helpService.getQuestionById(id);
  }

  @Delete('question/:id')
  @ApiOperation({ summary: 'Delete a question.' })
  @ApiResponse({ status: 200, description: 'If a question is deleted successfully, returns 200 with "deleted"'})
  @UseGuards(JwtAuthGuard)
  deleteQuestion(@Param('id') id: number) {
    return this.helpService.deleteQuestion(id);
  }

  @Put('question/:id')
  @ApiOperation({ summary: 'Update a question.' })
  @ApiResponse({ status: 200, description: 'If a question is updated successfully, returns 200'})
  @ApiResponse({ status: 500, description: 'If there is no question with id, returns 500'})
  @UseGuards(JwtAuthGuard)
  updateQuestion(@Param('id') id: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.helpService.updateQuestion(id, updateQuestionDto);
  }
}
