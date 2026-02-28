import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Resume {
  @Prop()
  userId: string;

  @Prop()
  fileName: string;

  @Prop()
  extractedText: string;

  @Prop({ type: Object })
  analysis: any;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
