import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
@Injectable()
export class JobsService {
  constructor(private aiService: AiService) {}

  async match(resumeText: string, jobDescription: string) {
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
        }`;

    return this.aiService.askAI(prompt);
  }
}
