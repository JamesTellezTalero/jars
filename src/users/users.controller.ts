import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUsersDto, UsersDto } from './users.dto';
import { UsersPipe } from 'src/common/users/users.pipe';
import { UserLoginPipe } from 'src/common/users/user-login.pipe';
import { ApiResponseModel } from 'src/general-interfaces/ApiResponse.model';

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

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async Login(@Body(UserLoginPipe) body: LoginUsersDto) {
    const ApiResponseM: ApiResponseModel = {
      item: await this.UsersS.Login(body),
      status: HttpStatus.OK,
      message: 'Usuario',
    };
    return ApiResponseM;
  }
}
