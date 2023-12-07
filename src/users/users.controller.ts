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
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  LoginUsersDto,
  UsersDto,
  UsersUpdateCuteOffDateDto,
  UsersUpdateDto,
  UsersUpdatePasswordDto,
} from './users.dto';
import { UsersPipe } from 'src/common/users/users.pipe';
import { UserLoginPipe } from 'src/common/users/user-login.pipe';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { GeneralModuleService } from 'src/general-module/general-module.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/auth-guard.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import {
  editFileName,
  imageFileFilter,
} from 'src/general-module/general-module.utils';
import { UsersUpdatePipe } from 'src/common/users/users-update.pipe';
import { UsersUpdatePasswordPipe } from 'src/common/users/users-update-password.pipe';
import { UsersUpdateCuteOffDatePipe } from 'src/common/users/users-update-cute-off-date.pipe';

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

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/')
  async Update(@Body(UsersUpdatePipe) body: UsersUpdateDto) {
    const ApiResponseM = new ApiResponseModel();
    ApiResponseM.Data = await this.UsersS.Update(body);
    ApiResponseM.StatusCode = HttpStatus.ACCEPTED;
    ApiResponseM.Message = 'Update Exitoso!';
    return ApiResponseM;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/UpdatePassword/')
  async UpdatePassword(
    @Body(UsersUpdatePasswordPipe) body: UsersUpdatePasswordDto,
  ) {
    const ApiResponseM = new ApiResponseModel();
    ApiResponseM.Data = await this.UsersS.UpdatePassword(body);
    ApiResponseM.StatusCode = HttpStatus.ACCEPTED;
    ApiResponseM.Message = 'Update Exitoso!';
    return ApiResponseM;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/UpdateCuteOffDate/')
  async UpdateCuteOffDate(
    @Body(UsersUpdateCuteOffDatePipe) body: UsersUpdateCuteOffDateDto,
  ) {
    const ApiResponseM = new ApiResponseModel();
    ApiResponseM.Data = await this.UsersS.UpdateCuteOffDate(body);
    ApiResponseM.StatusCode = HttpStatus.ACCEPTED;
    ApiResponseM.Message = 'UpdateCuteOffDate Exitoso!';
    return ApiResponseM;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/:email')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/assets/UserImgs',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async UpdateImg(
    @Param('email') email: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const ApiResponseM = new ApiResponseModel();
    ApiResponseM.Data = await this.UsersS.UpdateImg(email, file.path);
    ApiResponseM.StatusCode = HttpStatus.ACCEPTED;
    ApiResponseM.Message = 'UpdateImg Exitoso!';
    return ApiResponseM;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async GetById(@Param('id') id: number) {
    const ApiResponseM = new ApiResponseModel();
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
    const ApiResponseM: ApiResponseModel = {
      Data: await this.UsersS.GetByEmail(email),
      StatusCode: HttpStatus.OK,
      Message: 'GetByEmail Exitoso!',
    };
    return ApiResponseM;
  }
}
