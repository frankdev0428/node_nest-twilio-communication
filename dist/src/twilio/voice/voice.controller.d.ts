import { Request } from "express";
import { NotificationGateway } from "../notifications/notification.gateway";
import { VoiceService } from "./voice.service";
export declare class VoiceController {
    private readonly voiceService;
    private readonly notificationGateway;
    constructor(voiceService: VoiceService, notificationGateway: NotificationGateway);
    generateToken(req: any): Promise<any>;
    receiveIncomingCall(req: Request): Promise<any>;
    storeEndedCallInfo(req: Request): Promise<any>;
    getCustomerByPhoneNumber(req: any, phoneNumber: string): Promise<any>;
    startRecording(req: any, callSid: string): Promise<any>;
    stopRecording(req: any, recordSid: string): Promise<any>;
    pauseRecording(req: any, recordSid: string): Promise<any>;
    resumeRecording(req: any, recordSid: string): Promise<any>;
    downloadRecording(req: any, recordSid: string): Promise<any>;
    leaveVoicemail(req: any): Promise<any>;
    startVoicemail(req: any): Promise<any>;
    saveVoicemail(req: any): Promise<any>;
}
