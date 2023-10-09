import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import ChatHistory from "src/entity/chat-history.entity";

@ApiExtraModels(ChatHistory)
export class CreateChatDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  toUserId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;
}
