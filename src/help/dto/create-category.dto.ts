import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import Category from "src/entity/category.entity";

@ApiExtraModels(Category)
export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
