import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Jars extends Document {
  @Prop({ unique: true, index: true })
  name: string;
  @Prop({ unique: true, index: true })
  color: string;
  @Prop({})
  userid: string;
  @Prop({})
  percent: string;
  @Prop({})
  createdAt: Date;
  @Prop({})
  updatedAt: Date;
}

export const JarsSchema = SchemaFactory.createForClass(Jars);
