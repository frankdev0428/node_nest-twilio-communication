import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import Question from "src/entity/question.entity";

@ApiExtraModels(Question)
export class UpdateQuestionDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // categoryId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsString()
  answer: string;
}
