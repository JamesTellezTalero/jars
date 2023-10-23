import { Module } from '@nestjs/common';
import { MovementTypesService } from './movement-types.service';
import { MovementTypesController } from './movement-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementTypes } from 'src/database/entities/MovementTypes';
// import { MongooseModule } from '@nestjs/mongoose';
// import { MovementTypes, MovementTypesSchema } from './movement-types.entities';

@Module({
  imports: [TypeOrmModule.forFeature([MovementTypes])],
  providers: [MovementTypesService],
  controllers: [MovementTypesController],
  exports: [MovementTypesService],
})
export class MovementTypesModule {}
