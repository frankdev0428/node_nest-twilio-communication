import { Controller, Get, Post, Body, UsePipes, ValidationPipe, HttpStatus, Res, UseGuards, Req, Put, UploadedFile, UseInterceptors, Query, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { EmailService } from 'src/twilio/email/email.service';
import { AuthService } from './auth.service';
import { CreateSubuserDto } from './dto/create-subuser.dto';
import { EmailIntegrationDto } from './dto/email-integration.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateSubuserDto } from './dto/update-subuser.dto';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) { }

  /**
   * @param loginDto 
   * @param res 
   * @returns 
   *  token if successful, 401 otherwise
   */
  @Post('/login')
  @ApiOperation({ summary: 'Login API' })
  @ApiResponse({ status: 200, description: 'If login is successful, returns token' })
  @ApiResponse({ status: 400, description: 'If user is not found, returns 400' })
  @ApiResponse({ status: 401, description: 'If invalid password, returns 401' })
  @UsePipes(ValidationPipe)
  async login(
    @Body() loginDto: LoginUserDto,
    @Res() res: Response
  ): Promise<any> {
    const token = await this.authService.login(loginDto);
    return res.status(HttpStatus.OK).send({ token });
  }

  /**
   * @param signupUserDto 
   * @param res 
   * @returns 
   *  200 if successful, 400 otherwise
   */
  @Post('/signup')
  @ApiOperation({ summary: 'Signup API' })
  @ApiResponse({ status: 201, description: 'If signup is successful, returns 201' })
  @ApiResponse({ status: 400, description: 'If already registered user, returns 400' })
  @UsePipes(ValidationPipe)
  async signup(
    @Body() signupUserDto: SignupUserDto
  ): Promise<any> {
    return this.authService.signup(signupUserDto);
  }

  /**
   * @param 
   * @param res 
   * @returns 
   *  returns profile
   */
  @Get('/profile')
  @ApiOperation({ summary: 'Get Userinfo' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'If token is verified, returns user\'s id and email' })
  @ApiResponse({ status: 401, description: 'If token is not verified, returns 401' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getProfile(@Req() req) {
    return this.authService.getProfile(req.user);
  }

  @Put('/update-facebook-feature')
  @ApiOperation({ summary: 'Update facebook feature' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Enable/disable facebook feature' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateFacebookFeature(@Req() req, @Body('enabled') enabled: boolean) {
    return this.authService.updateFacebookFeature(req.user, enabled);
  }

  @Put('/update-hd-feature')
  @ApiOperation({ summary: 'Enable/disable hd feature' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Update hd feature' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateHDFeature(@Req() req, @Body('enabled') enabled: boolean) {
    return this.authService.updateHDFeature(req.user, enabled);
  }

  @Put('/update-email-feature')
  @ApiOperation({ summary: 'Enable/disable hd feature' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Update hd feature' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateEmailFeature(@Req() req, @Body('enabled') enabled: boolean) {
    return this.authService.updateEmailFeature(req.user, enabled);
  }

  @Put('/update-livechat-feature')
  @ApiOperation({ summary: 'Enable/disable hd feature' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Update livechat feature' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateLivechatFeature(@Req() req, @Body('enabled') enabled: boolean) {
    return this.authService.updateLivechatFeature(req.user, enabled);
  }

  @Put('/update-call-feature')
  @ApiOperation({ summary: 'Enable/disable hd feature' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Update call feature' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateCallFeature(@Req() req, @Body('enabled') enabled: boolean) {
    return this.authService.updateCallFeature(req.user, enabled);
  }

  @Post('/hd-integrate')
  @ApiOperation({ summary: 'Set hd api key and import user data' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Set hd api key and import customer & order data' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  integrateHD(@Req() req, @Body('hdApiKey') hdApiKey: string) {
    return this.authService.integrateHD(req.user, hdApiKey);
  }

  @Post('/email-integrate')
  @ApiOperation({ summary: 'Set email and app password.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Set email and app password.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  integrateEmail(@Req() req, @Body() emailIntegrationDto: EmailIntegrationDto) {
    return this.authService.integrateEmail(req.user, emailIntegrationDto, this.emailService);
  }

  @Put('/update-password')
  @ApiOperation({ summary: 'Update a password.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Update a password.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updatePassword(@Req() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(req.user, updatePasswordDto);
  }

  @Put('/avatar')
  @ApiOperation({ summary: 'Update a avatar.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Update a avatar.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateAvatar(@Req() req, @Body('avatar') avatar: string) {
    return this.authService.updateAvatar(req.user, avatar);
  }

  @Post('/buy-phone-number')
  @ApiOperation({ summary: 'Buy a phone number.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Buy a phone number.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  buyPhoneNumber(@Req() req, @Body('areaCode') areaCode: string) {
    return this.authService.buyPhoneNumber(req.user, areaCode);
  }

  @Post('/port-phone-number')
  @ApiOperation({ summary: 'Port a phone number.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Port a phone number.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  portPhoneNumber(@Req() req, @Body('phoneNumber') phoneNumber: string) {
    return this.authService.portPhoneNumber(req.user, phoneNumber);
  }

  @Get('/live-chat-script')
  @ApiOperation({ summary: 'Get a live chat script.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Get a live chat script.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getLiveChatScript(@Req() req) {
    return this.authService.getLiveChatScript(req.user);
  }

  @Get('/analytics')
  @ApiOperation({ summary: 'Get analytics of business.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Get analytics of business.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getAnalytics(@Req() req) {
    return this.authService.getAnalytics(req.user);
  }

  // @Get('/analytics/incoming')
  // @ApiOperation({ summary: 'Get incoming messages of business.' })
  // @ApiBearerAuth('access-token')
  // @ApiHeader({
  //   name: 'Bearer',
  //   description: 'Auth token',
  // })
  // @ApiResponse({ status: 200, description: 'Get incoming messages of business.' })
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  // getIncomingMessages(@Req() req, @Query('duration') duration: string) {
  //   return this.authService.getIncomingMessages(req.user, duration);
  // }

  @Get('/analytics/incoming-range')
  @ApiOperation({ summary: 'Get incoming messages of business.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Get incoming messages of business.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getIncomingMessagesForRange(
    @Req() req,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('duration') duration: string,
    @Query('agentId') agentId: number
  ) {
    return this.authService.getIncomingMessagesForRange(req.user, startDate, endDate, duration, agentId);
  }

  @Post('/subadmin')
  @ApiOperation({ summary: 'Create a subadmin.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Create a subadmin.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createSubadmin(@Req() req, @Body() createSubuserDto: CreateSubuserDto) {
    return this.authService.createSubadmin(req.user, createSubuserDto);
  }

  @Get('/subadmin')
  @ApiOperation({ summary: 'Get subadmins.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Return list of subadmin.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getSubadmins(@Req() req) {
    return this.authService.getSubadmins(req.user);
  }

  @Get('/subadmin/:id')
  @ApiOperation({ summary: 'Get subadmin with id.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Return a subadmin with id.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  getSubadminById(@Req() req, @Param('id') id: number) {
    return this.authService.getSubadminById(req.user, id);
  }

  @Put('/subadmin')
  @ApiOperation({ summary: 'Update a subadmin.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Update a subadmin.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateSubadmin(@Req() req, @Body() updateSubuserDto: UpdateSubuserDto) {
    return this.authService.updateSubadmin(req.user, updateSubuserDto);
  }

  @Delete('/subadmin/:id')
  @ApiOperation({ summary: 'Delete subadmin with id.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Delete a subadmin.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  deleteSubadminById(@Req() req, @Param('id') id: number) {
    return this.authService.deleteSubadminById(req.user, id);
  }

  @Put('/sla/email')
  @ApiOperation({ summary: 'Update SLA of email.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Successfully updated.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateSLAEmail(@Req() req, @Body('slaEmail') slaEmail: number) {
    return this.authService.updateSLAEmail(req.user, slaEmail);
  }

  @Put('/sla/messenger')
  @ApiOperation({ summary: 'Update SLA of messenger.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Successfully updated.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateSLAMessenger(@Req() req, @Body('slaMessenger') slaMessenger: number) {
    return this.authService.updateSLAMessenger(req.user, slaMessenger);
  }

  @Put('/sla/call')
  @ApiOperation({ summary: 'Update SLA of call.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Successfully updated.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateSLACall(@Req() req, @Body('slaCall') slaCall: number) {
    return this.authService.updateSLACall(req.user, slaCall);
  }

  @Put('/sla/livechat')
  @ApiOperation({ summary: 'Update SLA of livechat.' })
  @ApiBearerAuth('access-token')
  @ApiHeader({
    name: 'Bearer',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: 'Successfully updated.' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  updateSLALivechat(@Req() req, @Body('slaLivechat') slaLivechat: number) {
    return this.authService.updateSLALivechat(req.user, slaLivechat);
  }

  @Post('/upload')
  @ApiOperation({ summary: 'Upload a file and send url.' })
  // @ApiBearerAuth('access-token')
  // @ApiHeader({
  //   name: 'Bearer',
  //   description: 'Auth token',
  // })
  @ApiResponse({ status: 200, description: 'Upload a file and send url.' })
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/upload',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`)
        },
      })
    })
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `${process.env.APP_URL}/${file.filename}`,
    };
  }
}
