import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('resume')
export class ResumeController {
    constructor(private resumeService: ResumeService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadResume(@UploadedFile() file: Express.Multer.File) {
        return this.resumeService.processResume(file);
    }
}
