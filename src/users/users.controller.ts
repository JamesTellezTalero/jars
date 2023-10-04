import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersS: UsersService) {}

  @Get('/')
  async testCreateRecord() {
    return await this.UsersS.testCreateRecord();
  }
}
