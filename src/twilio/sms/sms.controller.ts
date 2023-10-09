import { Body, Controller, forwardRef, Get, Inject, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import SMSHistory from "src/entity/sms-history.entity";
import { JwtAuthGuard } from "src/guard/jwt-auth.guard";
import { MessagingRequest } from "src/types/request";
import { NotificationGateway } from "../notifications/notification.gateway";
import { SendSMSDto } from "./dto/send-sms.dto";
import { SMSService } from "./sms.service";

@ApiTags('SMSController')
@ApiBearerAuth('access-token')
@ApiHeader({
  name: 'Bearer',
  description: 'Auth token',
})
@Controller('sms')
export class SMSController {
  constructor(
    private readonly smsService: SMSService,
    private readonly notificationGateway: NotificationGateway
  ) {}

  @Get('sms/:customerId')
  @ApiOperation({ summary: 'Get SMS history, for now if type field is 0, it\'s sent sms, and otherwise received' })
  @ApiResponse({ status: 200, description: 'If SMS is successfully sent, returns 200 with sms history'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async getSMS(@Param() customerId: number): Promise<SMSHistory[]> {
    return this.smsService.getSMS(customerId);
  }

  @Post('send')
  @ApiOperation({ summary: 'Send SMS and add to SMS history' })
  @ApiResponse({ status: 201, description: 'If SMS is successfully sent, returns 201 with sms response'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async sendSMS(@Body() content: SendSMSDto, @Req() req: Request): Promise<any> {
    return this.smsService.sendSMS(content, req.body);
  }

  @Post('receive')
  @ApiOperation({ summary: 'Receive SMS and add to SMS history' })
  @ApiResponse({ status: 201, description: 'If SMS is successfully sent, returns 201 with sms response'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  async receiveSMS(@Req() req: MessagingRequest): Promise<any> {
    console.log('----------------- receive sms ----------------');
    console.log(req.body);
    const obj: any = await this.smsService.saveReceivedSMS(req.body);
    if (obj) {
      this.notificationGateway.emitNewSMS(obj);
    }
    return 'success';
  }
}
