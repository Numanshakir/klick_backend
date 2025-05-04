import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'database/database.service';

@Injectable()
export class ActivityService {
  constructor(private prisma: DatabaseService) {}

  create(createActivityDto: Prisma.ActivityCreateInput) {
    return 'This action adds a new activity';
  }

  findAll() {
    return  this.prisma.activity.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: Prisma.ActivityUpdateInput) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
  
  async bulkCreateActivities(activities: { name: string,image: string}[]) {
    return this.prisma.activity.createMany({
      data: activities,
      skipDuplicates: true,
    });
  }
}
