import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import FacebookHistory from "src/entity/facebook-history.entity";

@ApiExtraModels(FacebookHistory)
export class SendFacebookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  to: string;
  
  @ApiProperty()
  @IsString()
  content: string;
}
