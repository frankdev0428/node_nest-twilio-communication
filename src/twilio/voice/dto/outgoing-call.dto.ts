import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import VoiceHistory from "src/entity/voice-history.entity";

@ApiExtraModels(VoiceHistory)
export class OutgoingCallDto {
  @ApiProperty()
  @IsString()
  AccountSid: string;

  @ApiProperty()
  @IsString()
  ApiVersion: string;

  @ApiProperty()
  @IsString()
  ApplicationSid: string;

  @ApiProperty()
  @IsString()
  CallSid: string;

  @ApiProperty()
  @IsString()
  CallStatus: string;

  @ApiProperty()
  @IsString()
  Called: string;

  @ApiProperty()
  @IsString()
  Caller: string;

  @ApiProperty()
  @IsString()
  Direction: string;

  @ApiProperty()
  @IsString()
  From: string;

  @ApiProperty()
  @IsString()
  To: string;
}
