import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TestDbConection extends Document {
  @Prop({ unique: true, index: true })
  name: string;
  @Prop({ unique: true, index: true })
  url: string;
}

export const TestDbConectionSchema =
  SchemaFactory.createForClass(TestDbConection);
