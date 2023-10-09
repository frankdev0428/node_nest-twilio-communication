import { Injectable } from '@nestjs/common';
import { CallStatusDto } from './dto/call-status.dto';
import { IncomingCallDto } from './dto/incoming-call.dto';
import { OutgoingCallDto } from './dto/outgoing-call.dto';
import { RecordingStatusDto } from './dto/recording-status.dto';
import { VoiceRepository } from './repository/voice.repository';


@Injectable()
export class VoiceService {
  async generateToken(userData: any): Promise<any> {
    return VoiceRepository.generateToken(userData);
  }

  async receiveIncomingCall(body: IncomingCallDto): Promise<any> {
    return VoiceRepository.receiveIncomingCall(body);
  }

  async receiveOutgoingCall(body: OutgoingCallDto): Promise<any> {
    return VoiceRepository.receiveOutgoingCall(body);
  }

  async getCustomerByPhoneNumber(userData: any, phoneNumber: string): Promise<any> {
    return VoiceRepository.getCustomerByPhoneNumber(userData, phoneNumber);
  }

  async storeEndedCallInfo(body: CallStatusDto): Promise<any> {
    return VoiceRepository.storeEndedCallInfo(body);
  }

  async startRecording(userData: any, callSid: string): Promise<any> {
    return VoiceRepository.startRecording(userData, callSid);
  }

  async stopRecording(userData: any, recordSid: string): Promise<any> {
    return VoiceRepository.stopRecording(userData, recordSid);
  }

  async pauseRecording(userData: any, recordSid: string): Promise<any> {
    return VoiceRepository.pauseRecording(userData, recordSid);
  }

  async resumeRecording(userData: any, recordSid: string): Promise<any> {
    return VoiceRepository.resumeRecording(userData, recordSid);
  }

  async downloadRecording(userData: any, recordSid: string): Promise<any> {
    return VoiceRepository.downloadRecording(userData, recordSid);
  }

  async leaveVoicemail(body: any): Promise<any> {
    return VoiceRepository.leaveVoicemail(body);
  }

  async startVoicemail(body: any): Promise<any> {
    return VoiceRepository.startVoicemail(body);
  }

  async saveVoicemail(body: RecordingStatusDto): Promise<any> {
    return VoiceRepository.saveVoicemail(body);
  }
}
