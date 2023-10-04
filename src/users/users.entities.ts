import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop({ unique: true, index: true })
  username: string;
  @Prop({ unique: true, index: true })
  email: string;
  @Prop({})
  password: string;
  @Prop({})
  img: string;
  @Prop({})
  darkmode: boolean;
  @Prop({})
  createdAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
