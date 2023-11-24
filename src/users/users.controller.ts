import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUsersDto, UsersDto } from './users.dto';
import { UsersPipe } from 'src/common/users/users.pipe';
import { UserLoginPipe } from 'src/common/users/user-login.pipe';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { GeneralModuleService } from 'src/general-module/general-module.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/auth-guard.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly UsersS: UsersService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}

  @Get('/')
  async testCreateRecord(@Request() req) {
    console.log(req.body.jsonWebTokenInfo);
    return await this.UsersS.testCreateRecord();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/')
  async Registro(@Body(UsersPipe) body: UsersDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.StatusCode = HttpStatus.OK;
    respM.Message = 'Registro Exitoso!';
    respM.Data = await this.UsersS.Registro(body);
    return respM;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async Login(@Body(UserLoginPipe) body: LoginUsersDto) {
    const ApiResponseM: ApiResponseModel = {
      Data: await this.UsersS.Login(body),
      StatusCode: HttpStatus.OK,
      Message: 'Login Exitoso!',
    };
    return ApiResponseM;
  }
}
