import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewSession, InterviewSchema } from 'src/models/interview.schema';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    AiModule,
    MongooseModule.forFeature([
      {
        name: InterviewSession.name,
        schema: InterviewSchema,
      },
    ]),
  ],
  providers: [InterviewService],
  controllers: [InterviewController],
})
export class InterviewModule {}
