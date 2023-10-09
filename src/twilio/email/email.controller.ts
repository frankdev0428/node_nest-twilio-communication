import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CreateEmailSubjectDto } from './dto/create-email-subject.dto';

@ApiTags('EmailController')
@ApiBearerAuth('access-token')
@ApiHeader({
  name: 'Bearer',
  description: 'Auth token',
})
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {
  }

  @Post('send-new')
  @ApiOperation({ summary: 'Send an email with a new subject.' })
  @ApiResponse({ status: 201, description: 'If create an email history successfully, send 201' })
  @ApiResponse({ status: 500, description: 'When sending email false, send 500' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  create(@Body() createEmailDto: CreateEmailSubjectDto, @Req() req) {
    return this.emailService.sendEmailWithNewSubject(createEmailDto, req.user);
  }

  @Post('send')
  @ApiOperation({ summary: 'Reply an email.' })
  @ApiResponse({ status: 201, description: 'If create an email history successfully, send 201' })
  @ApiResponse({ status: 500, description: 'When sending email false, send 500' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  replyEmail(@Body() createEmailDto: CreateEmailSubjectDto, @Req() req) {
    return this.emailService.replyEmail(createEmailDto, req.user);
  }

  @Post('start')
  @ApiOperation({ summary: 'Start an email server.' })
  @ApiResponse({ status: 201, description: 'If starting an email server successfully, send 201' })
  @ApiResponse({ status: 500, description: 'When sending email false, send 500' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  startEmailServer() {
    return this.emailService.setupMailbox();
  }
  // @Get('/customer/:customerId')
  // @ApiOperation({ summary: 'Get email history of the current customer.' })
  // @ApiResponse({ status: 200, description: 'return customers'})
  // @UseGuards(JwtAuthGuard)
  // findAll(@Param('customerId') customerId: number) {
  //   return this.historyService.findAll(customerId);
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get an email history by id.' })
  // @ApiResponse({ status: 200, description: 'return an email history with id'})
  // @UseGuards(JwtAuthGuard)
  // findOne(@Param('id') id: string) {
  //   return this.historyService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update an email history by id.' })
  // @ApiResponse({ status: 200, description: 'If an email history is updated successfully, returns 200'})
  // @ApiResponse({ status: 500, description: 'If there is no email history with id, returns 500'})
  // @UseGuards(JwtAuthGuard)
  // update(@Param('id') id: string, @Body() updateHistoryDto: UpdateEmailHistoryDto) {
  //   return this.historyService.update(+id, updateHistoryDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete an email history.' })
  // @ApiResponse({ status: 200, description: 'If an email history is deleted successfully, returns 200'})
  // @UseGuards(JwtAuthGuard)
  // remove(@Param('id') id: string) {
  //   return this.historyService.remove(+id);
  // }
}
