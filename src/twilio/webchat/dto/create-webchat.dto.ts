import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import WebChatHistory from "src/entity/web-chat-history.entity";

@ApiExtraModels(WebChatHistory)
export class CreateWebchatDto {
  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  customerId: any;

  @ApiProperty()
  userId: any;

  @ApiProperty()
  attachments: any[];
}
