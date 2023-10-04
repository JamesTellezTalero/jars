import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MovementTypes extends Document {
  @Prop()
  name: string;
  @Prop({})
  createdAt: Date;
  @Prop({})
  updatedAt: Date;
}

export const MovementTypesSchema = SchemaFactory.createForClass(MovementTypes);
