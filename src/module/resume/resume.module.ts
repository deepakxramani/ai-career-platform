import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { AiModule } from '../ai/ai.module';

import { MongooseModule } from '@nestjs/mongoose';
import { Resume, ResumeSchema } from 'src/models/resume.schema';

@Module({
  imports: [
    AiModule,
    MongooseModule.forFeature([
      {
        name: Resume.name,
        schema: ResumeSchema,
      },
    ]),
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
