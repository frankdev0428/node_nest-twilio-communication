import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import Customer from "src/entity/customer.entity";
import SMSHistory from "src/entity/sms-history.entity";

@ApiExtraModels(Customer)
@ApiExtraModels(SMSHistory)
export class SendSMSDto {
  @ApiProperty({
    description: 'The phone number to receive sms. for example, +17015168317'
  })
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiProperty({
    description: 'The content of sms'
  })
  @IsNotEmpty()
  @IsString()
  body: string;

  @IsOptional()
  @IsArray()
  mediaUrl: string[];

  // [k: `MediaUrl${number}`]: string;
}
