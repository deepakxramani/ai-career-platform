import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { AiModule } from './module/ai/ai.module';
import { ResumeModule } from './module/resume/resume.module';
import { InterviewModule } from './module/interview/interview.module';
import { JobsModule } from './module/jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    UsersModule,
    AiModule,
    ResumeModule,
    InterviewModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
