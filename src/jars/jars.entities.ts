import { Prop, Schema as SchemaN, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { Users } from 'src/users/users.entities';

@SchemaN()
export class Jars extends Document {
  @Prop()
  name: string;
  @Prop()
  color: string;
  @Prop({ type: Schema.Types.ObjectId, ref: 'Users' })
  userid: Users;
  @Prop({})
  percent: string;
  @Prop({})
  createdAt: Date;
  @Prop({})
  updatedAt: Date;
}

export const JarsSchema = SchemaFactory.createForClass(Jars);
