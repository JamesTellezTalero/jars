import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movements } from 'src/database/entities/Movements';
import { JarsModule } from 'src/jars/jars.module';
import { MovementTypesModule } from 'src/movement-types/movement-types.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Movements, MovementsSchema } from './movements.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movements]),
    JarsModule,
    MovementTypesModule,
  ],
  providers: [MovementsService],
  controllers: [MovementsController],
})
export class MovementsModule {}
