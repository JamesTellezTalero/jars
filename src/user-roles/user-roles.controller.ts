import { Controller, Get } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly UsersRolesS: UserRolesService) {}

  @Get('/')
  async testCreateRecord() {
    return await this.UsersRolesS.testCreateRecord();
  }
}
