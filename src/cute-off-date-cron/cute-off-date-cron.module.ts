import { Module } from '@nestjs/common';
import { CuteOffDateCronService } from './cute-off-date-cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ScheduleModule.forRoot(), UsersModule],
  providers: [CuteOffDateCronService],
})
export class CuteOffDateCronModule {}
