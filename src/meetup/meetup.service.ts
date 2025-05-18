import { Injectable } from '@nestjs/common';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupStatus, Prisma } from '@prisma/client';
import { DatabaseService } from 'database/database.service';
import { MeetupGateway } from './meetup.gateway';
import { QueueService } from './meetup.queue.service';

@Injectable()
export class MeetupService {
  constructor(private prisma:DatabaseService,    private gateway: MeetupGateway,


        private readonly queueService: QueueService,

  ){}


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
  async create(createMeetupDto: CreateMeetupDto) {
  var meetup=await this.prisma.meetupRequest.create({
      data:{
      fromUserId:createMeetupDto.fromUserId,
      toUserId:createMeetupDto.toUserId
    }
    });
     this.gateway.emitMeetupToUsers(meetup);
        this.queueService.scheduleStatusJob(meetup.id, 'PENDING');
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

 async update(id: number, updateMeetupDto: UpdateMeetupDto) {
    var meetup=await this.prisma.meetupRequest.update({
      where: { id },
      data:updateMeetupDto,
    });
     this.gateway.emitMeetupToUsers(meetup);
      await this.queueService.scheduleStatusJob(meetup.id, meetup.status);
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
