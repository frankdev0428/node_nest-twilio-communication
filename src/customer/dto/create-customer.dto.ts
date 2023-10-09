import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import EmailHistory from "src/entity/email-history.entity";

@ApiExtraModels(EmailHistory)
export class CreateCustomerDto {
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
  zipCode: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  department: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  priority: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  agent: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  whatsapp: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  instagram: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  messenger: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  telegram: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  wechat: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar: string;
}
