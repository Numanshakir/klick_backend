import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq'; // ✅ Correct Job type
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'database/database.service';

@Injectable()
@Processor('meetup-status')
export class MeetupStatusProcessor extends WorkerHost {
  constructor(private readonly prisma: DatabaseService) {
    super();
  }

  // ✅ Fix: Use `Job` from bullmq, not WorkerJob
  async process(job: Job<{ meetupId: number; nextStatus: string }>): Promise<void> {
    const { meetupId, nextStatus } = job.data;

    const meetup = await this.prisma.meetupRequest.findUnique({ where: { id: meetupId } });
    if (!meetup) return;

    if (nextStatus === 'CANCELLED' && meetup.status !== 'CANCELLED') {
      await this.prisma.meetupRequest.update({
        where: { id: meetupId },
        data: { status: 'CANCELLED' },
      });
    }

    if (nextStatus === 'DELETE') {
      await this.prisma.meetupRequest.delete({ where: { id: meetupId } });
    }
  }
}
