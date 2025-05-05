import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateMeetupDto {
      @IsString()
      @IsNotEmpty()
      @ApiProperty()
    fromUserId:number
      @IsString()
      @IsNotEmpty()
      @ApiProperty()
    toUserId:number
}
