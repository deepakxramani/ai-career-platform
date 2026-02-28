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

  @Post('chat')
  async chat(@Body() body: any) {
    if (!body) {
      return { error: 'Request body missing' };
    }

    const { message, role, history } = body;

    return this.interviewService.chat(message, role, history || []);
  }
}
