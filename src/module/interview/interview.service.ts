import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@Injectable()
export class InterviewService {
  constructor(private aiService: AiService) {}

  async generateQuestions(resumeText: string, role: string) {
    const prompt = `
        You are a senior technical interviewer.

        Generate interview questions based on:

        Role: ${role}
        Resume: ${resumeText}

        Return ONLY valid JSON:

        {
            "technical_questions": [],
            "hr_questions": [],
            "coding_questions": []
        }

        `;
    const result = await this.aiService.askAI(prompt);

    return result;
  }
}
