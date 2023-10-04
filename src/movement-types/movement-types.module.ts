import { Module } from '@nestjs/common';
import { MovementTypesService } from './movement-types.service';
import { MovementTypesController } from './movement-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovementTypes, MovementTypesSchema } from './movement-types.entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MovementTypes.name,
        schema: MovementTypesSchema,
      },
    ]),
  ],
  providers: [MovementTypesService],
  controllers: [MovementTypesController],
})
export class MovementTypesModule {}
