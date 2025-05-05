import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Meetups')
@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Post()
  @ApiOperation({ summary: 'Create Meetup' }) // ✅ Short description
  @ApiResponse({ status: 201, description: 'Meetup created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    type: CreateMeetupDto,
  })
  create(@Body() createMeetupDto: CreateMeetupDto) {
    return this.meetupService.create(createMeetupDto);
  }
  @Get('myMeetups/:id')
  @ApiOperation({ summary: 'Fetch My Meetup' }) // ✅ Short description
  @ApiResponse({ status: 201, description: 'Meetup fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll(@Param('id') userId:number) {
    return this.meetupService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMeetupDto: UpdateMeetupDto) {
    return this.meetupService.update(+id, updateMeetupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetupService.remove(+id);
  }
}
