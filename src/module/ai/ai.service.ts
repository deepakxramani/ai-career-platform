import { Injectable } from '@nestjs/common';
import { model } from 'mongoose';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private client;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    });
  }

  async analyzeResume(resumeText: string) {
    const prompt = `
    You are a senior technical recruiter, career coach, and ATS (Applicant Tracking System) 
    expert with 15+ years of experience hiring software engineers.

    Your task is to deeply analyze the resume and provide a professional evaluation.

    IMPORTANT RULES:
    - Return ONLY valid JSON.
    - No explanation outside JSON.
    - Be honest, critical, and actionable.
    - Provide detailed suggestions for improvement.
    - Assume candidate is applying for software/tech roles unless specified.

    Analyze the resume and return JSON in the following structure:

    {
      "ats_score": number, 
      "ats_score_reason": "",
      "experience_level": "", 
      "skills": {
      "technical": [],
      "soft": [],
      "tools": []
    },
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "resume_issues": [],
    "improvement_suggestions": [],
    "project_suggestions": [],
    "recommended_roles": [],
    "market_readiness": "",
    "keyword_optimization_tips": [],
    "salary_estimate": "",
    "confidence_score": "",
    "top_3_improvements_for_fast_growth": [],
    "rewrite_tips": {
      "summary": "",
      "experience": "",
      "projects": "",
      "skills_section": ""
    }
  }

    SCORING GUIDELINES:
    ATS Score (0-100) based on:
    - Keyword optimization
    - Formatting clarity
    - Impact metrics (numbers, results)
    - Role relevance
    - Skills alignment with industry
    - Readability
    - Section completeness

    MARKET READINESS OPTIONS:
    - "Not Ready"
    - "Entry Level Ready"
    - "Junior Ready"
    - "Mid Level Ready"
    - "Strong Candidate"

    EXPERIENCE LEVEL OPTIONS:
    - "Fresher"
    - "Intern"
    - "Junior"
    - "Mid-Level"
    - "Senior"

    Resume:
    ${resumeText}
  `;

    const response = await this.client.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  }

  async askAI(prompt: string) {
    const response = await this.client.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;

    try {
      return JSON.parse(content);
    } catch {
      return content;
    }
  }
}
