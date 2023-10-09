import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import SMSHistory from "src/entity/voice-history.entity";

@ApiExtraModels(SMSHistory)
export class RecordingStatusDto {
  @ApiProperty()
  @IsString()
  AccountSid: string;
  
  @ApiProperty()
  @IsString()
  CallSid: string;
  
  @ApiProperty()
  @IsString()
  RecordingSid: string;
  
  @ApiProperty()
  @IsString()
  RecordingUrl: string;
  
  @ApiProperty()
  @IsString()
  RecordingStatus: string;
  
  @ApiProperty()
  @IsString()
  RecordingDuration: string;
  
  @ApiProperty()
  @IsString()
  RecordingChannels: string;
  
  @ApiProperty()
  @IsString()
  RecordingSource: string;
}
