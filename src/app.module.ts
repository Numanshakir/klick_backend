import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'database/database.module';
import { ActivityModule } from './activity/activity.module';
import { MeetupModule } from './meetup/meetup.module';
import { BullModule } from '@nestjs/bullmq';
@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ActivityModule,
    MeetupModule,
     BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
      BullModule.registerQueue({
      name: 'meetup-status',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
