import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class InterviewSession {
  @Prop()
  userId: string;

  @Prop()
  role: string;

  @Prop({ type: Array })
  messages: any[];
}

export const InterviewSchema = SchemaFactory.createForClass(InterviewSession);
