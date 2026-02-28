import { Injectable } from '@nestjs/common';
import { PDFParse } from 'pdf-parse';
import * as mammoth from 'mammoth';
import { AiService } from '../ai/ai.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resume } from 'src/models/resume.schema';

@Injectable()
export class ResumeService {
  constructor(
    private aiService: AiService,
    @InjectModel(Resume.name)
    private resumeModel: Model<Resume>,
  ) {}

  async processResume(file: Express.Multer.File, userId: string) {
    const text = await this.extractText(file);

    const analysis = await this.aiService.analyzeResume(text);

    // ✅ Save to database
    await this.resumeModel.create({
      userId,
      fileName: file.originalname,
      extractedText: text,
      analysis,
    });

    return {
      message: 'Resume analyzed successfully',
      analysis,
    };
  }

  private async extractText(file: Express.Multer.File): Promise<string> {
    let text = '';

    if (file.mimetype === 'application/pdf') {
      const pdfParser = new PDFParse({ data: file.buffer });
      const data = await pdfParser.getText();
      text = data.text;
    }

    if (
      file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({
        buffer: file.buffer,
      });
      text = result.value;
    }

    return text;
  }

  async getHistory(userId: string) {
    return this.resumeModel.find({ userId }).sort({ createdAt: -1 });
  }
}
