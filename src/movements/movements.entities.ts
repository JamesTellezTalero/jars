import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movements extends Document {
  @Prop()
  title: string;
  @Prop()
  amount: string;
  @Prop({})
  jarid: string;
  @Prop({})
  moventtypeid: string;
  @Prop({})
  tag: string;
  @Prop({})
  img: string;
  @Prop({})
  desc: string;
  @Prop({})
  createdAt: Date;
  @Prop({})
  updatedAt: Date;
}

export const MovementsSchema = SchemaFactory.createForClass(Movements);
