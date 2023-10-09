import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/twilio/email/email.service';
import { CreateSubuserDto } from './dto/create-subuser.dto';
import { EmailIntegrationDto } from './dto/email-integration.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateSubuserDto } from './dto/update-subuser.dto';
import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {
  login(loginUserDto: LoginUserDto) {
    return AuthRepository.login(loginUserDto);
  }

  signup(signupUserDto: SignupUserDto) {
    return AuthRepository.signup(signupUserDto);
  }

  updateFacebookFeature(userData: any, enabled: boolean) {
    return AuthRepository.updateFacebookFeature(userData, enabled);
  }

  updateHDFeature(userData: any, enabled: boolean) {
    return AuthRepository.updateHDFeature(userData, enabled);
  }

  updateEmailFeature(userData: any, enabled: boolean) {
    return AuthRepository.updateEmailFeature(userData, enabled);
  }

  updateLivechatFeature(userData: any, enabled: boolean) {
    return AuthRepository.updateLivechatFeature(userData, enabled);
  }

  updateCallFeature(userData: any, enabled: boolean) {
    return AuthRepository.updateCallFeature(userData, enabled);
  }

  getProfile(userData: any) {
    return AuthRepository.getProfile(userData);
  }

  integrateHD(userData: any, hdApiKey: string) {
    return AuthRepository.integrateHD(userData, hdApiKey);
  }

  integrateEmail(userData: any, emailIntegrationDto: EmailIntegrationDto, emailService: EmailService) {
    return AuthRepository.integrateEmail(userData, emailIntegrationDto, emailService);
  }

  updatePassword(userData: any, updatePasswordDto: UpdatePasswordDto) {
    return AuthRepository.updatePassword(userData, updatePasswordDto);
  }

  updateAvatar(userData: any, avatar: string) {
    return AuthRepository.updateAvatar(userData, avatar);
  }

  buyPhoneNumber(userData: any, areaCode: string) {
    return AuthRepository.buyPhoneNumber(userData, areaCode);
  }

  portPhoneNumber(userData: any, phoneNumber: string) {
    return AuthRepository.portPhoneNumber(userData, phoneNumber);
  }

  getLiveChatScript(userData: any) {
    return AuthRepository.getLiveChatScript(userData);
  }

  getAnalytics(userData: any) {
    return AuthRepository.getAnalytics(userData);
  }

  // getIncomingMessages(userData: any, duration: string) {
  //   return AuthRepository.getIncomingMessages(userData, duration);
  // }

  createSubadmin(userData: any, createSubuserDto: CreateSubuserDto) {
    return AuthRepository.createSubadmin(userData, createSubuserDto);
  }

  updateSLAEmail(userData: any, slaEmail: number) {
    return AuthRepository.updateSLAEmail(userData, slaEmail);
  }

  updateSLAMessenger(userData: any, slaMessenger: number) {
    return AuthRepository.updateSLAMessenger(userData, slaMessenger);
  }

  updateSLACall(userData: any, slaCall: number) {
    return AuthRepository.updateSLACall(userData, slaCall);
  }

  updateSLALivechat(userData: any, slaLivechat: number) {
    return AuthRepository.updateSLALivechat(userData, slaLivechat);
  }

  getIncomingMessagesForRange(userData: any, startDate: string, endDate: string, duration: string, agentId: number) {
    return AuthRepository.getIncomingMessagesForRange(userData, startDate, endDate, duration, agentId);
  }

  getSubadmins(userData: any) {
    return AuthRepository.getSubadmins(userData);
  }

  getSubadminById(userData: any, id: number) {
    return AuthRepository.getSubadminById(userData, id);
  }

  updateSubadmin(userData: any, updateSubuserDto: UpdateSubuserDto) {
    return AuthRepository.updateSubadmin(userData, updateSubuserDto);
  }

  deleteSubadminById(userData: any, id: number) {
    return AuthRepository.deleteSubadminById(userData, id);
  }
}
