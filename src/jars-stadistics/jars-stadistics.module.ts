import { Module } from '@nestjs/common';
import { JarsStadisticsController } from './jars-stadistics.controller';
import { JarsStadisticsService } from './jars-stadistics.service';

@Module({
  controllers: [JarsStadisticsController],
  providers: [JarsStadisticsService]
})
export class JarsStadisticsModule {}
