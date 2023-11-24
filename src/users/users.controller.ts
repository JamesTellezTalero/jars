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
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { GeneralModuleService } from 'src/general-module/general-module.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly UsersS: UsersService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}

  @Get('/')
  async testCreateRecord() {
    return await this.UsersS.testCreateRecord();
  }

  @HttpCode(HttpStatus.OK)
  @Post('/')
  async Registro(@Body(UsersPipe) body: UsersDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();

    // if(body.darkMode ==){
    //   body.darkMode
    // }

    // if(body.username ==){
    //   body.username
    // }

    // if(body.email ==){
    //   body.email
    // }

    // if(body.image ==){
    //   body.image
    // }

    respM.StatusCode = HttpStatus.OK;
    respM.Message = 'Registro Exitoso!';
    respM.Data = { sss: 'sss' };
    // respM.Data = await this.UsersS.Registro(body);
    return respM;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async Login(@Body(UserLoginPipe) body: LoginUsersDto) {
    const ApiResponseM: ApiResponseModel = {
      Data: await this.UsersS.Login(body),
      StatusCode: HttpStatus.OK,
      Message: 'Usuario',
    };
    return ApiResponseM;
  }
}
