import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Movements, MovementsSchema } from './movements.entities';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: Movements.name,
    //     schema: MovementsSchema,
    //   },
    // ]),
  ],
  providers: [MovementsService],
  controllers: [MovementsController],
})
export class MovementsModule {}
