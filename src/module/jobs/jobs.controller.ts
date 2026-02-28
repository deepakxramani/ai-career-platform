import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post('match')
  async match(@Body() body: any) {
    const { resumeText, jobDescription, userId } = body;

    return this.jobsService.match(
      resumeText,
      jobDescription,
      userId || 'demo-user',
    );
  }

  @Get('history/:userId')
  async getHistory(@Param('userId') userId: string) {
    return this.jobsService.getHistory(userId);
  }
}
