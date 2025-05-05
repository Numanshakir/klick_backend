import { Injectable } from '@nestjs/common';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'database/database.service';

@Injectable()
export class MeetupService {
  constructor(private prisma:DatabaseService){}
  create(createMeetupDto: CreateMeetupDto) {
    return this.prisma.meetupRequest.create({
      data:{
      fromUserId:createMeetupDto.fromUserId,
      toUserId:createMeetupDto.toUserId
    }
    });
  }

  findAll(userId:number) {
    return this.prisma.meetupRequest.findMany({
where:{
 OR:[
  {
    fromUserId:Number(userId),
  },
  {
    toUserId:Number(userId),
  }
 ] 
}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} meetup`;
  }

  update(id: number, updateMeetupDto: UpdateMeetupDto) {
    return this.prisma.meetupRequest.update({
      where: { id },
      data:updateMeetupDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} meetup`;
  }
}
