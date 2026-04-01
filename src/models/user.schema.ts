import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  password?: string;

  @Prop({ default: 'local' })
  provider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
