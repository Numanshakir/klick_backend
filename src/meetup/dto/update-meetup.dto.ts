import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMeetupDto } from './create-meetup.dto';
import { MeetupService } from '../meetup.service';
import { MeetupStatus } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateMeetupDto {


      @IsNotEmpty()
      @ApiProperty()
    status:MeetupStatus
}
