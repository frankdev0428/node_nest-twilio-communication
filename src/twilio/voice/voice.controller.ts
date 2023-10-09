import { Body, Controller, forwardRef, Get, Inject, Param, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import SMSHistory from "src/entity/sms-history.entity";
import { JwtAuthGuard } from "src/guard/jwt-auth.guard";
import { MessagingRequest } from "src/types/request";
import { NotificationGateway } from "../notifications/notification.gateway";
// import { SendSMSDto } from "./dto/send-sms.dto";
import { VoiceService } from "./voice.service";

@ApiTags('VoiceController')
@ApiBearerAuth('access-token')
@ApiHeader({
  name: 'Bearer',
  description: 'Auth token',
})
@Controller('voice')
export class VoiceController {
  constructor(
    private readonly voiceService: VoiceService,
    private readonly notificationGateway: NotificationGateway
  ) {}

  @Get('token')
  @ApiOperation({ summary: 'Generate a token for twilio device' })
  @ApiResponse({ status: 200, description: 'returns twilio token'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  generateToken(@Req() req) {
    return this.voiceService.generateToken(req.user);
  }

  @Post('receive_call')
  @ApiOperation({ summary: 'Receive phone call' })
  @ApiResponse({ status: 201, description: 'If SMS is successfully sent, returns 201 with sms response'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  async receiveIncomingCall(@Req() req: Request): Promise<any> {
    console.log('------------receiveCall-------------', req.body);
    if (req.body.Called) {
      return this.voiceService.receiveIncomingCall(req.body);
    } else {
      return this.voiceService.receiveOutgoingCall(req.body);
    }
  }

  @Post('ended_call')
  @ApiOperation({ summary: 'Receive info about ended call' })
  @ApiResponse({ status: 201, description: 'Store the call information'})
  // @ApiResponse({ status: 500, description: 'When the user of an inquiry is not valid, returns 500'})
  async storeEndedCallInfo(@Req() req: Request): Promise<any> {
    const obj = await this.voiceService.storeEndedCallInfo(req.body);
    if (obj) {
      this.notificationGateway.emitNewVoice(obj);
    }
  }

  @Get('customer')
  @ApiOperation({ summary: 'Get a customer with a specific number' })
  @ApiResponse({ status: 200, description: 'returns a customer if existing, otherwise returns null'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async getCustomerByPhoneNumber(@Req() req, @Query('phoneNumber') phoneNumber: string) {
    return this.voiceService.getCustomerByPhoneNumber(req.user, phoneNumber);
  }

  @Get('record/start/:callSid')
  @ApiOperation({ summary: 'Start a recording with callSid' })
  @ApiResponse({ status: 200, description: 'if record has started, return 200'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async startRecording(@Req() req, @Param('callSid') callSid: string) {
    return this.voiceService.startRecording(req.user, callSid);
  }

  @Get('record/stop/:recordSid')
  @ApiOperation({ summary: 'Start a recording with callSid' })
  @ApiResponse({ status: 200, description: 'if record has stopped, return 200'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async stopRecording(@Req() req, @Param('recordSid') recordSid: string) {
    return this.voiceService.stopRecording(req.user, recordSid);
  }

  @Get('record/pause/:recordSid')
  @ApiOperation({ summary: 'Start a recording with callSid' })
  @ApiResponse({ status: 200, description: 'if record has paused, return 200'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async pauseRecording(@Req() req, @Param('recordSid') recordSid: string) {
    return this.voiceService.pauseRecording(req.user, recordSid);
  }

  @Get('record/resume/:recordSid')
  @ApiOperation({ summary: 'Start a recording with callSid' })
  @ApiResponse({ status: 200, description: 'if record has resumed, return 200'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async resumeRecording(@Req() req, @Param('recordSid') recordSid: string) {
    return this.voiceService.resumeRecording(req.user, recordSid);
  }

  @Get('record/download/:recordSid')
  @ApiOperation({ summary: 'Download a recording file with callSid' })
  @ApiResponse({ status: 200, description: 'returns a recording file'})
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async downloadRecording(@Req() req, @Param('recordSid') recordSid: string) {
    return this.voiceService.downloadRecording(req.user, recordSid);
  }

  @Post('leave_voicemail')
  @ApiOperation({ summary: 'Allow users leave a voicemail' })
  @ApiResponse({ status: 200, description: 'returns twiml response'})
  async leaveVoicemail(@Req() req) {
    return this.voiceService.leaveVoicemail(req.body);
  }

  @Post('start_voicemail')
  @ApiOperation({ summary: 'Allow users start a voicemail' })
  @ApiResponse({ status: 200, description: 'returns twiml response'})
  async startVoicemail(@Req() req) {
    return this.voiceService.startVoicemail(req.body);
  }

  @Post('save_voicemail')
  @ApiOperation({ summary: 'Save a voicemail' })
  @ApiResponse({ status: 200, description: 'returns twiml response'})
  async saveVoicemail(@Req() req) {
    return this.voiceService.saveVoicemail(req.body);
  }
}
