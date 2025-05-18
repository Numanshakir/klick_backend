import { Injectable } from '@nestjs/common';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupStatus, Prisma } from '@prisma/client';
import { DatabaseService } from 'database/database.service';
import { MeetupGateway } from './meetup.gateway';

@Injectable()
export class MeetupService {
  constructor(private prisma:DatabaseService,    private gateway: MeetupGateway,){}


    async updateStatus(id: number, status: MeetupStatus) {
    const updated = await this.prisma.meetupRequest.update({
      where: { id },
      data: { status },
      include: {
        fromUser: true,
        toUser: true,
      },
    });

    this.gateway.emitMeetupToUsers(updated);
    return updated;
  }
  create(createMeetupDto: CreateMeetupDto) {
  var meetup= this.prisma.meetupRequest.create({
      data:{
      fromUserId:createMeetupDto.fromUserId,
      toUserId:createMeetupDto.toUserId
    }
    });
     this.gateway.emitMeetupToUsers(meetup);
     return meetup;
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
 ],
 
},include:{
  toUser:true,
  fromUser:true
}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} meetup`;
  }

  update(id: number, updateMeetupDto: UpdateMeetupDto) {
    var meetup= this.prisma.meetupRequest.update({
      where: { id },
      data:updateMeetupDto,
    });
     this.gateway.emitMeetupToUsers(meetup);
     return meetup;
  }

  remove(id: number) {
   var meetup= this.prisma.meetupRequest.delete({
      where: { id },
    });
     this.gateway.emitMeetupToUsers(meetup);
     return meetup;
  }
}
