import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import EmailHistory from "src/entity/email-history.entity";

@ApiExtraModels(EmailHistory)
export class UpdateCustomerDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  number: string;
  
  @ApiProperty()
  @IsString()
  street: string;
  
  @ApiProperty()
  @IsString()
  city: string;
  
  @ApiProperty()
  @IsString()
  state: string;
  
  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  department: string;
  
  @ApiProperty()
  @IsString()
  priority: string;

  @ApiProperty()
  @IsString()
  agent: string;

  @ApiProperty()
  @IsString()
  whatsapp: string;

  @ApiProperty()
  @IsString()
  instagram: string;

  @ApiProperty()
  @IsString()
  messenger: string;

  @ApiProperty()
  @IsString()
  telegram: string;

  @ApiProperty()
  @IsString()
  wechat: string;

  @ApiProperty()
  @IsString()
  avatar: string;
}
