// src/meetup/meetup.gateway.ts
import {
    OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';
import { DatabaseService } from 'database/database.service';

@WebSocketGateway({
  namespace: '/meetup',
  cors: {
    origin: '*',
  },
})
export class MeetupGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private prisma: DatabaseService) {
  }


 async handleConnection(client: Socket) {
    const userId = this.extractUserId(client);
    if (userId) {
      client.join(`user_${userId}`);
        const allMeetups = await this.prisma.meetupRequest.findMany({
            where:{
                 OR:[
  {
    fromUserId:Number(userId),
  },
  {
    toUserId:Number(userId),
  }
 ],

            },
          include: {
            fromUser: true,
            toUser: true,
          },
        });

        this.server.emit('meetup-updated', allMeetups);
    }
  }

  private extractUserId(client: Socket): number | null {
    const userId = Number(client.handshake.query.userId);
    return isNaN(userId) ? null : userId;
  }

  emitMeetupToUsers(meetup: any) {
    const { fromUserId, toUserId } = meetup;

    this.server.to(`user_${fromUserId}`).emit('meetup-updated', meetup);
    this.server.to(`user_${toUserId}`).emit('meetup-updated', meetup);
  }
}
