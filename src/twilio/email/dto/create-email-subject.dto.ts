import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import EmailHistory from "src/entity/email-history.entity";

@ApiExtraModels(EmailHistory)
export class CreateEmailSubjectDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNumber()
  customerId: number;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  attachments: any[];
}
