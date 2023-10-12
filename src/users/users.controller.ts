import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './users.dto';
import { UsersPipe } from 'src/common/users/users.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersS: UsersService) {}

  @Get('/')
  async testCreateRecord() {
    return await this.UsersS.testCreateRecord();
  }

  @HttpCode(HttpStatus.OK)
  @Post('/')
  async Create(@Body(UsersPipe) body: UsersDto) {
    return await this.UsersS.Create(body);
  }
}
