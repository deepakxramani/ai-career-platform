import { Injectable } from '@nestjs/common';
import { PDFParse } from 'pdf-parse';
import * as mammoth from 'mammoth';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ResumeService {
  constructor(private aiService: AiService) {}

  async processResume(file: Express.Multer.File) {
    let text = '';

    if (file.mimetype === 'application/pdf') {
      const parser = new PDFParse({ data: file.buffer });
      const data = await parser.getText();
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

    const analysis = await this.aiService.analyzeResume(text);

    return {
      message: 'Resume analyzed successfully',
      analysis,
    };
  }
}
