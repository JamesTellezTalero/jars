import { Module } from '@nestjs/common';
import { JarsStadisticsController } from './jars-stadistics.controller';
import { JarsStadisticsService } from './jars-stadistics.service';
import { JarsModule } from 'src/jars/jars.module';
import { UsersModule } from 'src/users/users.module';
import { MovementsModule } from 'src/movements/movements.module';

@Module({
  imports: [MovementsModule, JarsModule, UsersModule],
  controllers: [JarsStadisticsController],
  providers: [JarsStadisticsService],
})
export class JarsStadisticsModule {}
