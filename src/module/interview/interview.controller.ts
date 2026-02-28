import { Body, Controller, Post } from '@nestjs/common';
import { InterviewService } from './interview.service';

@Controller('interview')
export class InterviewController {
  constructor(private interviewService: InterviewService) {}

  @Post('generate')
  async generate(@Body() body: any) {
    const { resumeText, role } = body;

    return this.interviewService.generateQuestions(resumeText, role);
  }
}
