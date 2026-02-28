import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class JobMatch {
  @Prop()
  userId: string;

  @Prop()
  jobDescription: string;

  @Prop()
  resumeText: string;

  @Prop({ type: Object })
  result: any;
}

export const JobMatchSchema = SchemaFactory.createForClass(JobMatch);
