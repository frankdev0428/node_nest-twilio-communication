
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import User from 'src/entity/user.entity';

@ApiExtraModels(User)
export class UpdatePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
