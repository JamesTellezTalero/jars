import { Module } from '@nestjs/common';
import { JarsMoventsController } from './jars-movents.controller';
import { JarsMoventsService } from './jars-movents.service';

@Module({
  controllers: [JarsMoventsController],
  providers: [JarsMoventsService]
})
export class JarsMovementsModule {}
