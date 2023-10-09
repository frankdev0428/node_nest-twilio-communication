/// <reference types="multer" />
import { Response } from 'express';
import { EmailService } from 'src/twilio/email/email.service';
import { AuthService } from './auth.service';
import { CreateSubuserDto } from './dto/create-subuser.dto';
import { EmailIntegrationDto } from './dto/email-integration.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateSubuserDto } from './dto/update-subuser.dto';
export declare class AuthController {
    private readonly authService;
    private readonly emailService;
    constructor(authService: AuthService, emailService: EmailService);
    login(loginDto: LoginUserDto, res: Response): Promise<any>;
    signup(signupUserDto: SignupUserDto): Promise<any>;
    getProfile(req: any): Promise<import("../entity/user.entity").default>;
    updateFacebookFeature(req: any, enabled: boolean): Promise<import("../entity/user.entity").default>;
    updateHDFeature(req: any, enabled: boolean): Promise<import("../entity/user.entity").default>;
    updateEmailFeature(req: any, enabled: boolean): Promise<import("../entity/user.entity").default>;
    updateLivechatFeature(req: any, enabled: boolean): Promise<import("../entity/user.entity").default>;
    updateCallFeature(req: any, enabled: boolean): Promise<import("../entity/user.entity").default>;
    integrateHD(req: any, hdApiKey: string): Promise<void>;
    integrateEmail(req: any, emailIntegrationDto: EmailIntegrationDto): Promise<import("../entity/user.entity").default>;
    updatePassword(req: any, updatePasswordDto: UpdatePasswordDto): any;
    updateAvatar(req: any, avatar: string): Promise<import("../entity/user.entity").default>;
    buyPhoneNumber(req: any, areaCode: string): Promise<any>;
    portPhoneNumber(req: any, phoneNumber: string): Promise<any>;
    getLiveChatScript(req: any): Promise<any>;
    getAnalytics(req: any): Promise<any>;
    getIncomingMessagesForRange(req: any, startDate: string, endDate: string, duration: string, agentId: number): Promise<{
        email: {};
        sms: {};
        calls: {};
        messenger: {};
        livechat: {};
    }>;
    createSubadmin(req: any, createSubuserDto: CreateSubuserDto): Promise<import("../entity/user.entity").default>;
    getSubadmins(req: any): Promise<import("../entity/user.entity").default[]>;
    getSubadminById(req: any, id: number): Promise<import("../entity/user.entity").default>;
    updateSubadmin(req: any, updateSubuserDto: UpdateSubuserDto): Promise<import("../entity/user.entity").default>;
    deleteSubadminById(req: any, id: number): Promise<any>;
    updateSLAEmail(req: any, slaEmail: number): Promise<any>;
    updateSLAMessenger(req: any, slaMessenger: number): Promise<any>;
    updateSLACall(req: any, slaCall: number): Promise<any>;
    updateSLALivechat(req: any, slaLivechat: number): Promise<any>;
    upload(file: Express.Multer.File): {
        url: string;
    };
}
