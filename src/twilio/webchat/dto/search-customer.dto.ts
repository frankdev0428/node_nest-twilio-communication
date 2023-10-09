import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import WebChatHistory from "src/entity/web-chat-history.entity";

@ApiExtraModels(WebChatHistory)
export class SearchCustomerDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
