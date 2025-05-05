import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [MeetupController],
  providers: [MeetupService],
})
export class MeetupModule {}
