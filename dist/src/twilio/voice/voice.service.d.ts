import { CallStatusDto } from './dto/call-status.dto';
import { IncomingCallDto } from './dto/incoming-call.dto';
import { OutgoingCallDto } from './dto/outgoing-call.dto';
import { RecordingStatusDto } from './dto/recording-status.dto';
export declare class VoiceService {
    generateToken(userData: any): Promise<any>;
    receiveIncomingCall(body: IncomingCallDto): Promise<any>;
    receiveOutgoingCall(body: OutgoingCallDto): Promise<any>;
    getCustomerByPhoneNumber(userData: any, phoneNumber: string): Promise<any>;
    storeEndedCallInfo(body: CallStatusDto): Promise<any>;
    startRecording(userData: any, callSid: string): Promise<any>;
    stopRecording(userData: any, recordSid: string): Promise<any>;
    pauseRecording(userData: any, recordSid: string): Promise<any>;
    resumeRecording(userData: any, recordSid: string): Promise<any>;
    downloadRecording(userData: any, recordSid: string): Promise<any>;
    leaveVoicemail(body: any): Promise<any>;
    startVoicemail(body: any): Promise<any>;
    saveVoicemail(body: RecordingStatusDto): Promise<any>;
}
