import { HttpException } from "@nestjs/common";
import { CustomerRepository } from "src/customer/repository/customer.repository";
import { AppDataSource } from "src/data-source";
import Customer from "src/entity/customer.entity";
import RecordHistory from "src/entity/record-history.entity";
import User from "src/entity/user.entity";
import VoiceHistory from "src/entity/voice-history.entity";
import * as twilio from "twilio";
import { CallInstance } from "twilio/lib/rest/api/v2010/account/call";
import { RecordingInstance } from "twilio/lib/rest/api/v2010/account/call/recording";
import { CallStatusDto } from "../dto/call-status.dto";
import { IncomingCallDto } from "../dto/incoming-call.dto";
import { OutgoingCallDto } from "../dto/outgoing-call.dto";
import { RecordingStatusDto } from "../dto/recording-status.dto";

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
const VoiceResponse = twilio.twiml.VoiceResponse;
const Client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const VoiceRepository = AppDataSource.getRepository(VoiceHistory).extend({
  async generateToken(userData: any): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException('History not found', 500);
    }
    const accessToken = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
    );
    accessToken.identity = user.phoneNumber;
    const grant = new VoiceGrant({
      outgoingApplicationSid: process.env.TWILIO_APP_SID,
      incomingAllow: true,
    });
    accessToken.addGrant(grant);
    return {
      token: accessToken.toJwt(),
    };
  },

  async receiveIncomingCall(body: IncomingCallDto): Promise<any> {
    const twiml = new VoiceResponse();
    console.log('------------receiveIncomingCall-------------');
    console.log(body.CallSid);

    const user = await User.findOne({
      where: {
        phoneNumber: body.Called,
      },
    });
    if (!user || !user.isCallEnabled) {
      twiml.reject();
      return twiml.toString();
    }

    let customer = await Customer.findOne({
      where: {
        user: {
          id: user.id,
        },
        number: body.Caller,
      },
    });

    if (!customer) {
      // const curIndex = await CustomerRepository.getMaxId();
      customer = new Customer();

      customer.firstName = 'First';
      customer.lastName = 'Last';
      customer.street = '';
      customer.city = body.FromCity;
      customer.zipCode = body.FromZip;
      customer.email = 'Email';
      customer.number = body.Caller;
      customer.status = 'New';
      customer.priority = 'Medium';
      customer.agentUser = null;
      customer.user = user;
      await customer.save();
    }

    const phoneNumber = body.Called;
    const callerId = body.Caller;
    const dial = twiml.dial({ callerId, timeout: 10, action: 'https://damp-garden-28261.herokuapp.com/voice/leave_voicemail' });
    dial.client(phoneNumber);

    const voiceHistory = new VoiceHistory();
    voiceHistory.type = 1;
    voiceHistory.accountSid = body.AccountSid;
    voiceHistory.apiVersion = body.ApiVersion;
    voiceHistory.applicationSid = body.ApplicationSid;
    voiceHistory.callSid = body.CallSid;
    voiceHistory.callStatus = body.CallStatus;
    voiceHistory.callToken = body.CallToken;
    voiceHistory.called = body.Called;
    voiceHistory.calledCity = body.CalledCity;
    voiceHistory.calledCountry = body.CalledCountry;
    voiceHistory.calledState = body.CalledState;
    voiceHistory.calledZip = body.CalledZip;
    voiceHistory.caller = body.Caller;
    voiceHistory.callerCity = body.CallerCity;
    voiceHistory.callerCountry = body.CallerCountry;
    voiceHistory.callerState = body.CallerState;
    voiceHistory.callerZip = body.CallerZip;
    voiceHistory.direction = body.Direction;
    voiceHistory.from = body.From;
    voiceHistory.fromCity = body.FromCity;
    voiceHistory.fromCountry = body.FromCountry;
    voiceHistory.fromState = body.FromState;
    voiceHistory.fromZip = body.FromZip;
    voiceHistory.stirPassportToken = body.StirPassportToken;
    voiceHistory.stirVerstat = body.StirVerstat;
    voiceHistory.to = body.To;
    voiceHistory.toCity = body.ToCity;
    voiceHistory.toCountry = body.ToCountry;
    voiceHistory.toState = body.ToState;
    voiceHistory.toZip = body.ToZip;
    voiceHistory.customer = customer;

    await voiceHistory.save();
    // twiml.say("===================================================");
    // twiml.say("hello I'm drashti from your office at twillo. Have fun!");
    // twiml.say('Please leave a message on the call.\nPress the star key when finished.');
    // twiml.record({
    //     action: 'https://b39598d5a6d5.ngrok.io/api/voicemail',
    //     method: 'POST',
    //     maxLength: '20',
    //     finishOnKey: '*'
    // });
    console.log(twiml.toString());
    return twiml.toString();
  },

  async receiveOutgoingCall(body: OutgoingCallDto): Promise<any> {
    const twiml = new VoiceResponse();
    console.log('------------receiveOutgoingCall-------------');
    console.log(body.CallSid);
    console.log(body);

    const user = await User.findOne({
      where: {
        phoneNumber: body.From,
      },
    });
    if (!user || user.isCallEnabled) {
      twiml.reject();
      return twiml.toString();
    }

    if (!body.To) {
      twiml.reject();
      return twiml.toString();
    }

    let customer = await Customer.findOne({
      where: {
        user: {
          id: user.id,
        },
        number: body.To,
      },
    });

    if (!customer) {
      // const curIndex = await CustomerRepository.getMaxId();

      customer = new Customer();
      customer.firstName = 'First';
      customer.lastName = 'Last';
      customer.street = '';
      customer.city = 'Location';
      customer.zipCode = '';
      customer.email = 'Email';
      customer.number = body.Caller;
      customer.status = 'New';
      customer.priority = 'Medium';
      customer.agentUser = null;
      customer.user = user;
      await customer.save();
    }

    const callerId = body.From;
    const dial = twiml.dial({ callerId });
    dial.number(body.To);

    const voiceHistory = new VoiceHistory();
    voiceHistory.type = 0;
    voiceHistory.accountSid = body.AccountSid;
    voiceHistory.apiVersion = body.ApiVersion;
    voiceHistory.applicationSid = body.ApplicationSid;
    voiceHistory.callSid = body.CallSid;
    voiceHistory.callStatus = body.CallStatus;
    voiceHistory.called = body.Called;
    voiceHistory.caller = body.Caller;
    voiceHistory.direction = body.Direction;
    voiceHistory.from = body.From;
    voiceHistory.to = body.To;
    voiceHistory.customer = customer;

    await voiceHistory.save();
    console.log(twiml.toString());
    return twiml.toString();
  },

  async getCustomerByPhoneNumber(userData: any, phoneNumber: string): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      return null;
    }
    console.log('---------------getCustomerByPhoneNumber---------', phoneNumber);

    if (!phoneNumber) {
      return;
    }

    const customer = await Customer.findOne({
      where: {
        user: {
          id: user.id,
        },
        number: phoneNumber,
      },
    });

    // console.log(customer);

    if (!customer) {
      return null;
    }

    return customer;
  },

  async storeEndedCallInfo(body: CallStatusDto): Promise<any> {
    console.log('----------storeEndedCallInfo-----------');
    console.log(body.CallSid);
    console.log('duration = ', body.CallDuration);

    const voice = await VoiceHistory.findOne({
      where: {
        callSid: body.CallSid,
      },
      relations: ['customer', 'customer.user'],
    });

    const childCalls = await Client.calls.list({
      parentCallSid: body.CallSid,
    });

    const childSids = childCalls.map((call) => call.sid);
    console.log(childSids);

    if (!voice) {
      return null;
    }

    voice.timestamp = body.Timestamp;
    voice.callbackSource = body.CallbackSource;
    voice.sequenceNumber = body.SequenceNumber;
    voice.duration = body.Duration;
    voice.callDuration = body.CallDuration;
    voice.childSids = childSids.join(',');

    await voice.save();

    if (voice.customer.status == 'Completed') {
      voice.customer.createdDate = new Date();
      voice.customer.status = 'New';
      voice.customer.agentUser = null;
      await voice.customer.save();
    }

    return {
      userId: voice.customer.user.id,
      voiceHistory: voice,
    };
  },

  async startRecording(userData: any, callSid: string): Promise<any> {
    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      return {
        recordSid: null,
      };
    }

    const callInstance: CallInstance = await Client.calls(callSid).fetch();
    let parentCallSid = null;

    if (callInstance.parentCallSid) {
      parentCallSid = callInstance.parentCallSid;
    }

    console.log('--------startRecording----------');
    console.log(callInstance);
    console.log('--------parentCallSid----------');
    console.log(callInstance.sid, callInstance.parentCallSid);

    const query = VoiceHistory.createQueryBuilder('voice_history')
      .where('voice_history.callSid = :callSid', { callSid })
      .orWhere('voice_history.childSids LIKE :expr', { expr: `%${callSid}%` })

    if (parentCallSid) {
      query.orWhere('voice_history.callSid = :callSid1', { callSid1: parentCallSid })
        .orWhere('voice_history.childSids LIKE :expr1', { expr1: `%${parentCallSid}%` })
    }

    const voiceHistory = await query.getOne();
    if (!voiceHistory) {
      return {
        recordSid: null,
      };
    }

    const recording: RecordingInstance = await Client.calls(callSid)
      .recordings
      .create();

    const recordHistory = new RecordHistory();
    recordHistory.accountSid = recording.accountSid;
    recordHistory.apiVersion = recording.apiVersion;
    recordHistory.callSid = recording.callSid;
    recordHistory.conferenceSid = recording.conferenceSid;
    recordHistory.dateCreated = recording.dateCreated;
    recordHistory.dateUpdated = recording.dateUpdated;
    recordHistory.startTime = recording.startTime;
    recordHistory.duration = recording.duration;
    recordHistory.sid = recording.sid;
    recordHistory.price = recording.price;
    recordHistory.uri = recording.uri;
    recordHistory.encryptionDetails = recording.encryptionDetails;
    recordHistory.priceUnit = recording.priceUnit;
    recordHistory.status = recording.status;
    recordHistory.channels = recording.channels;
    recordHistory.source = recording.source;
    recordHistory.errorCode = recording.errorCode;
    recordHistory.track = recording.track;
    recordHistory.voiceHistory = voiceHistory;

    await recordHistory.save();

    console.log('RECORD', recordHistory.sid)
    return {
      recordSid: recordHistory.sid,
    };
  },

  async stopRecording(userData: any, recordSid: string): Promise<any> {
    console.log('------------------stopRecording', recordSid);

    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException('Unregistered User', 500);
    }

    const recordHistory = await RecordHistory.findOne({
      where: {
        sid: recordSid,
      },
    });

    if (!recordHistory) {
      throw new HttpException('Record history not found', 500);
    }

    const record = await Client.calls(recordHistory.callSid).recordings(recordSid).update({ status: 'stopped' });
    console.log('------------------stopRecording success', record.sid);
    console.log(record);
    return 'stop recording';
  },

  async pauseRecording(userData: any, recordSid: string): Promise<any> {
    console.log('------------------pauseRecording', recordSid);

    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException('Unregistered User', 500);
    }

    const recordHistory = await RecordHistory.findOne({
      where: {
        sid: recordSid,
      },
    });

    if (!recordHistory) {
      throw new HttpException('Record history not found', 500);
    }

    const record = await Client.calls(recordHistory.callSid).recordings(recordSid).update({
      pauseBehavior: 'skip',
      status: 'paused',
    });
    console.log('------------------pauseRecording success', record.sid);
    console.log(record);
    return 'pause recording';
  },

  async resumeRecording(userData: any, recordSid: string): Promise<any> {
    console.log('------------------resumeRecording', recordSid);

    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException('Unregistered User', 500);
    }

    const recordHistory = await RecordHistory.findOne({
      where: {
        sid: recordSid,
      },
    });

    if (!recordHistory) {
      throw new HttpException('Record history not found', 500);
    }

    const record = await Client.calls(recordHistory.callSid).recordings(recordSid).update({ status: 'in-progress' });
    console.log('------------------resumeRecording success', record.sid);
    console.log(record);
    return 'resume recording';
  },

  async getRecordMediaUrl(recordSid: string): Promise<any> {
    const recordHistory = await RecordHistory.findOne({
      where: {
        sid: recordSid,
      },
    });

    if (!recordHistory) {
      return null;
    }

    try {
      const recordData = await Client.recordings(recordSid).fetch();
      // console.log(recordData);
      if (recordData.status !== 'completed') {
        return null;
      }
      return {
        mediaUrl: recordData.mediaUrl,
        duration: recordData.duration,
      };
    } catch (e) {
      console.log('downloadRecording: ', e.message)
    }
    return null;
  },

  async downloadRecording(userData: any, recordSid: string): Promise<any> {
    console.log('------------------downloadRecording', recordSid);

    const user = await User.findOne({
      where: {
        id: userData.id,
      },
    });

    if (!user) {
      throw new HttpException('Unregistered User', 500);
    }

    const recordHistory = await RecordHistory.findOne({
      where: {
        sid: recordSid,
      },
    });

    if (!recordHistory) {
      throw new HttpException('Record history not found', 500);
    }

    try {
      const recordData = await Client.recordings(recordSid).fetch();
      // console.log(recordData);
      if (recordData.status !== 'completed') {
        return {
          mediaUrl: null,
        };
      }
      return {
        mediaUrl: recordData.mediaUrl
      };
    } catch (e) {
      console.log('downloadRecording: ', e.message)
      return {
        mediaUrl: null,
      };
    }
  },

  async leaveVoicemail(body: any): Promise<any> {
    console.log('---------------leaveVoicemail---------');
    console.log(body);

    const voiceHistory = await VoiceHistory.findOne({
      where: {
        callSid: body.CallSid,
      },
    });

    if (voiceHistory) {
      voiceHistory.dialBridged = body.DialBridged;
      voiceHistory.dialCallSid = body.DialCallSid;
      voiceHistory.dialCallStatus = body.DialCallStatus;
      await voiceHistory.save();
    }

    const twiml = new VoiceResponse();

    twiml.say('Please leave a message on the call.\nPress the star key when finished.');
    // twiml.gather({
    //   numDigits: 1,
    //   timeout: 30,
    //   action: 'https://damp-garden-28261.herokuapp.com/voice/start_voicemail'
    // }).say('The person you are trying to reach is unavailable.');
    // twiml.pause();
    twiml.record({
      action: 'https://damp-garden-28261.herokuapp.com/voice/save_voicemail',
      method: 'POST',
      maxLength: 20,
      timeout: 10,
      finishOnKey: '*',
      recordingStatusCallback: 'https://damp-garden-28261.herokuapp.com/voice/save_voicemail',
      // playBeep: true,
    });
    console.log(twiml.toString());
    return twiml.toString();
  },

  async startVoicemail(body: any): Promise<any> {
    console.log('--------------startVoicemail-------------');
    console.log(body);
    const twiml = new VoiceResponse();
    twiml.say("Please let us know what you are calling about by leaving a message after the beep.");
    twiml.pause();
    twiml.record({
      action: 'https://damp-garden-28261.herokuapp.com/voice/save_voicemail',
      method: 'POST',
      maxLength: 20,
      timeout: 10,
      finishOnKey: '*',
      recordingStatusCallback: 'https://damp-garden-28261.herokuapp.com/voice/save_voicemail',
      // playBeep: true,
    });

    console.log(twiml.toString());
    return twiml.toString();
  },

  async saveVoicemail(body: RecordingStatusDto): Promise<any> {
    console.log('-------------------------------saveVoicemail---------------------------');
    console.log(body);
    const twiml = new VoiceResponse();
    const callSid = body.CallSid;
    twiml.hangup();

    const callInstance: CallInstance = await Client.calls(callSid).fetch();
    let parentCallSid = null;

    if (callInstance.parentCallSid) {
      parentCallSid = callInstance.parentCallSid;
    }

    console.log(callInstance);
    console.log('--------parentCallSid----------');
    console.log(callInstance.sid, callInstance.parentCallSid);

    const query = VoiceHistory.createQueryBuilder('voice_history')
      .where('voice_history.callSid = :callSid', { callSid })
      .orWhere('voice_history.childSids LIKE :expr', { expr: `%${callSid}%` })

    if (parentCallSid) {
      query.orWhere('voice_history.callSid = :callSid1', { callSid1: parentCallSid })
        .orWhere('voice_history.childSids LIKE :expr1', { expr1: `%${parentCallSid}%` })
    }

    const voiceHistory = await query.getOne();
    if (!voiceHistory) {
      return twiml.toString();
    }

    let recording = null;
    // try {
    //   recording = await Client.calls(callSid)
    //     .recordings
    //     .create();
    // } catch (err) {
    recording = await Client.recordings(body.RecordingSid).fetch();

    if (!recording) {
      return twiml.toString();
    }
    // }

    let recordHistory = await RecordHistory.findOne({
      where: {
        sid: body.RecordingSid,
      },
    });

    if (!recordHistory) {
      recordHistory = new RecordHistory();
    }
    recordHistory.accountSid = recording.accountSid;
    recordHistory.apiVersion = recording.apiVersion;
    recordHistory.callSid = recording.callSid;
    recordHistory.conferenceSid = recording.conferenceSid;
    recordHistory.dateCreated = recording.dateCreated;
    recordHistory.dateUpdated = recording.dateUpdated;
    recordHistory.startTime = recording.startTime;
    recordHistory.duration = recording.duration;
    recordHistory.sid = recording.sid;
    recordHistory.price = recording.price;
    recordHistory.uri = recording.uri;
    recordHistory.encryptionDetails = recording.encryptionDetails;
    recordHistory.priceUnit = recording.priceUnit;
    recordHistory.status = recording.status;
    recordHistory.channels = recording.channels;
    recordHistory.source = recording.source;
    recordHistory.errorCode = recording.errorCode;
    recordHistory.track = recording.track;
    recordHistory.voiceHistory = voiceHistory;

    await recordHistory.save();

    console.log('RECORD', recordHistory.sid)

    return twiml.toString();
  },
})