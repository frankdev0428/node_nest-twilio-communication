import { Body, Controller, forwardRef, Get, Inject, Param, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import SMSHistory from "src/entity/sms-history.entity";
import { JwtAuthGuard } from "src/guard/jwt-auth.guard";
import { MessagingRequest } from "src/types/request";
import { NotificationGateway } from "../notifications/notification.gateway";
import { CreateFacebookDto } from "./dto/create-facebook.dto";
import { SendFacebookDto } from "./dto/send-facebook.dto";
// import { SendSMSDto } from "./dto/send-sms.dto";
import { FacebookService } from "./facebook.service";

@ApiTags('Facebookontroller')
@ApiBearerAuth('access-token')
@ApiHeader({
  name: 'Bearer',
  description: 'Auth token',
})
@Controller('facebook')
export class FacebookController {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly notificationGateway: NotificationGateway
  ) {}

  @Get('webhook')
  @ApiOperation({ summary: 'Add support for GET requests to our webhook' })
  @ApiResponse({ status: 200, description: 'If verifytoken is equal, returns 200 with challenge'})
  async getFacebookWebhook(@Req() req: Request): Promise<any> {
    return this.facebookService.getFacebookWebhook(req);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Create the endpoint for your webhook' })
  @ApiResponse({ status: 200, description: 'If request is for a page, returns 200'})
  @ApiResponse({ status: 404, description: 'Then otherwise, returns 404'})
  async receiveFacebookMessage(@Body() createFacebookDto: CreateFacebookDto): Promise<any> {
    const obj: any = await this.facebookService.receiveFacebookMessage(createFacebookDto);
    if (obj) {
      this.notificationGateway.emitNewFacebook(obj);
    }
  }

  @Get('set-webhook')
  @ApiOperation({ summary: 'set webhook url for your webhook' })
  @ApiResponse({ status: 200, description: 'If request is for a page, returns 200'})
  // @ApiResponse({ status: 404, description: 'Then otherwise, returns 404'})
  async setFacebookWebhook(@Body() createFacebookDto: CreateFacebookDto): Promise<any> {
    this.facebookService.setFacebookWebhook(createFacebookDto);
  }

  @Post('send')
  @ApiOperation({ summary: 'Send a facebook message and add to facebook history' })
  @ApiResponse({ status: 201, description: 'If message is successfully sent, returns 201 with response'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async sendMessage(@Body() sendFacebookDto: SendFacebookDto, @Req() req: Request): Promise<any> {
    return this.facebookService.sendMessage(sendFacebookDto, req.user);
  }

  @Post('receive')
  @ApiOperation({ summary: 'Receive a facebook message and add to facebook history' })
  @ApiResponse({ status: 201, description: 'If message is successfully sent, returns 201 with response'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async receiveMessage(@Body() content, @Req() req: Request): Promise<any> {
    return this.facebookService.receiveMessage(content, req.body);
  }
}
