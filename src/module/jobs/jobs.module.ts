import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { AiModule } from '../ai/ai.module';

import { MongooseModule } from '@nestjs/mongoose';
import { JobMatch, JobMatchSchema } from 'src/models/job-match.schema';

@Module({
  imports: [
    AiModule,
    MongooseModule.forFeature([
      { name: JobMatch.name, schema: JobMatchSchema },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
