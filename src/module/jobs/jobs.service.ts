import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobMatch } from 'src/models/job-match.schema';

@Injectable()
export class JobsService {
  constructor(
    private aiService: AiService,
    @InjectModel(JobMatch.name)
    private jobMatchModel: Model<JobMatch>,
  ) {}

  async match(resumeText: string, jobDescription: string, userId: string) {
    const prompt = `
You are an expert recruiter.

Compare the resume with job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY JSON:

{
  "match_score": number,
  "missing_skills": [],
  "strengths": [],
  "suggestions": []
}
`;

    const result = await this.aiService.askAI(prompt);

    // ✅ Save history
    await this.jobMatchModel.create({
      userId,
      resumeText,
      jobDescription,
      result,
    });

    return result;
  }

  async getHistory(userId: string) {
    return this.jobMatchModel.find({ userId }).sort({ createdAt: -1 });
  }
}
