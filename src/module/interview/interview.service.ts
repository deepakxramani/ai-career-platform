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

  async chat(message: string, role: string, history: any[]) {
    const prompt = `
    You are a senior technical interviewer.

    Conduct a mock interview for the role: ${role}

    Rules:
    - Ask one question at a time
    - Evaluate user's answer
    - Give feedback
    - Ask next question

    Conversation history:
    ${JSON.stringify(history)}

    User message:
    ${message}

    Return ONLY JSON:

    {
       "feedback": "",
      "score": "",
      "next_question": ""
    }

    `;

    return this.aiService.askAI(prompt);
  }
}
