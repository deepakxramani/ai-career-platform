import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    const { message, role, history, userId } = body;

    return this.interviewService.chat(
      message,
      role,
      history || [],
      userId || 'demo-user',
    );
  }

  @Get('history/:userId')
  async getHistory(@Param('userId') userId: string) {
    return this.interviewService.getHistory(userId);
  }
}
