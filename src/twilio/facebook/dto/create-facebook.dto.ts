import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import FacebookHistory from "src/entity/facebook-history.entity";

@ApiExtraModels(FacebookHistory)
export class CreateFacebookDto {
  @ApiProperty()
  @IsString()
  SmsMessageSid: string;
  
  @ApiProperty()
  @IsString()
  NumMedia: string;
  
  @ApiProperty()
  @IsString()
  SmsSid: string;
  
  @ApiProperty()
  @IsString()
  SmsStatus: string;
  
  @ApiProperty()
  @IsString()
  Body: string;
  
  @ApiProperty()
  @IsString()
  To: string;
  
  @ApiProperty()
  @IsString()
  NumSegments: string;
  
  @ApiProperty()
  @IsString()
  ReferralNumMedia: string;
  
  @ApiProperty()
  @IsString()
  MessageSid: string;
  
  @ApiProperty()
  @IsString()
  AccountSid: string;
  
  @ApiProperty()
  @IsString()
  From: string;
  
  @ApiProperty()
  @IsString()
  ApiVersion: string;
}
