import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import EmailHistory from "src/entity/email-history.entity";

@ApiExtraModels(EmailHistory)
export class UpdateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
