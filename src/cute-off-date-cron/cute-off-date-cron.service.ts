import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CuteOffDateCronService {
  constructor(private readonly UsersS: UsersService) {}

  private readonly logger = new Logger('CuteOffDateCron');

  @Cron('*/10 * * * * *')
  async CuteOffDateCron() {
    let users = await this.UsersS.GeyByTodayCuteOffDates();
    users.map((e) => {
      this.logger.verbose(e.id);
    });
  }
}
