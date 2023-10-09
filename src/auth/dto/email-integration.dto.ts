
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import User from 'src/entity/user.entity';

@ApiExtraModels(User)
export class EmailIntegrationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
