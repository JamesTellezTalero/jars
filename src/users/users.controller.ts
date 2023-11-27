import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
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

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async Register(@Body(UsersPipe) body: UsersDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.StatusCode = HttpStatus.OK;
    respM.Message = 'Registro Exitoso!';
    respM.Data = await this.UsersS.Register(body);
    return respM;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/login')
  async Login(@Body(UserLoginPipe) body: LoginUsersDto) {
    const ApiResponseM: ApiResponseModel = {
      Data: await this.UsersS.Login(body),
      StatusCode: HttpStatus.OK,
      Message: 'Login Exitoso!',
    };
    return ApiResponseM;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async GetById(@Param('id') id: number) {
    const ApiResponseM = new ApiResponseModel();
    console.log('!isNaN(id)');
    console.log(!isNaN(id));
    if (!isNaN(id)) {
      ApiResponseM.Data = await this.UsersS.GetById(Number(id));
      ApiResponseM.StatusCode = HttpStatus.OK;
      ApiResponseM.Message = 'GetById Exitoso!';
      return ApiResponseM;
    } else {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'La propiedad id no es valida,';
      throw new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/GetByEmail/:email')
  async GetByEmail(@Param('email') email: string) {
    console.log('GetByEmail');
    const ApiResponseM: ApiResponseModel = {
      Data: await this.UsersS.GetByEmail(email),
      StatusCode: HttpStatus.OK,
      Message: 'GetByEmail Exitoso!',
    };
    return ApiResponseM;
  }
}
