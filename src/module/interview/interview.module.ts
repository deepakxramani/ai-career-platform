import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';

@Module({
  providers: [InterviewService],
  controllers: [InterviewController]
})
export class InterviewModule {}
