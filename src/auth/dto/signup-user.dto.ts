
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import User from 'src/entity/user.entity';

@ApiExtraModels(User)
export class SignupUserDto {
  @ApiProperty({
    description: 'This is an first name of a user'
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  businessName: string;
}
