import { Body, Controller, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post('match')
  async match(@Body() body: any) {
    const { resumeText, jobDescription } = body;

    return this.jobsService.match(resumeText, jobDescription);
  }
}
