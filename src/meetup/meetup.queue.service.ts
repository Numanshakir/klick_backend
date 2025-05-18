// queue.service.ts
import { Queue } from 'bullmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
  private readonly queue: Queue;

  constructor() {
    this.queue = new Queue('meetup-status', {
      connection: { host: 'localhost', port: 6379 },
    });
  }

  async scheduleStatusJob(meetupId: number, currentStatus: string) {
    const jobId = `cancel_meetup_${meetupId}`;
    await this.queue.remove(jobId); // Remove any existing job

    let delay = 0;
    let nextAction: string | null = null;

    switch (currentStatus) {
      case 'PENDING':
        delay = 3 * 60 * 1000;
        nextAction = 'CANCELLED';
        break;
      case 'ACCEPTED':
      case 'INPROGRESS':
        delay = 5 * 60 * 1000;
        nextAction = 'CANCELLED';
        break;
      case 'REJECTED':
        delay = 5 * 60 * 1000;
        nextAction = 'DELETE';
        break;
      default:
        return; // No job needed
    }

    await this.queue.add(
      'status_expiry_handler',
      {
        meetupId,
        nextStatus: nextAction,
      },
      {
        delay,
        jobId,
      },
    );
  }

  async removeJob(meetupId: number) {
    const jobId = `cancel_meetup_${meetupId}`;
    await this.queue.remove(jobId);
  }
}
