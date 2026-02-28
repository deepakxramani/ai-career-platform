import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InterviewSession } from 'src/models/interview.schema';

@Injectable()
export class InterviewService {
  constructor(
    private aiService: AiService,
    @InjectModel(InterviewSession.name)
    private interviewModel: Model<InterviewSession>,
  ) {}

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

    return this.aiService.askAI(prompt);
  }

  // ✅ CHAT WITH DB SAVE
  async chat(message: string, role: string, history: any[], userId: string) {
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

    const aiResponse = await this.aiService.askAI(prompt);

    // ✅ Add new message to history
    const updatedHistory = [
      ...history,
      {
        user: message,
        ai: aiResponse,
      },
    ];

    // ✅ Save session to DB
    await this.interviewModel.create({
      userId,
      role,
      messages: updatedHistory,
    });

    return aiResponse;
  }

  async getHistory(userId: string) {
    return this.interviewModel.find({ userId }).sort({ createdAt: -1 });
  }
}
