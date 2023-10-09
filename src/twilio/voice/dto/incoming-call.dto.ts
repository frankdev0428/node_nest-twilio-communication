import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import VoiceHistory from "src/entity/voice-history.entity";

@ApiExtraModels(VoiceHistory)
export class IncomingCallDto {
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
  CallToken: string;

  @ApiProperty()
  @IsString()
  Called: string;

  @ApiProperty()
  @IsString()
  CalledCity: string;

  @ApiProperty()
  @IsString()
  CalledCountry: string;

  @ApiProperty()
  @IsString()
  CalledState: string;

  @ApiProperty()
  @IsString()
  CalledZip: string;

  @ApiProperty()
  @IsString()
  Caller: string;

  @ApiProperty()
  @IsString()
  CallerCity: string;

  @ApiProperty()
  @IsString()
  CallerCountry: string;

  @ApiProperty()
  @IsString()
  CallerState: string;

  @ApiProperty()
  @IsString()
  CallerZip: string;

  @ApiProperty()
  @IsString()
  Direction: string;

  @ApiProperty()
  @IsString()
  From: string;

  @ApiProperty()
  @IsString()
  FromCity: string;

  @ApiProperty()
  @IsString()
  FromCountry: string;

  @ApiProperty()
  @IsString()
  FromState: string;
  
  @ApiProperty()
  @IsString()
  FromZip: string;

  @ApiProperty()
  @IsString()
  StirPassportToken: string;

  @ApiProperty()
  @IsString()
  StirVerstat: string;

  @ApiProperty()
  @IsString()
  To: string;

  @ApiProperty()
  @IsString()
  ToCity: string;

  @ApiProperty()
  @IsString()
  ToCountry: string;

  @ApiProperty()
  @IsString()
  ToState: string;

  @ApiProperty()
  @IsString()
  ToZip: string;
}
