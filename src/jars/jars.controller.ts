import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JarsService } from './jars.service';
import { JarsPipe } from 'src/common/jars/jars.pipe';
import { JarsDto, UpdateJarsDto } from './jars.dto';
import { UpdateJarPipe } from 'src/common/jars/update-jar.pipe';
import { GeneralModuleService } from 'src/general-module/general-module.service';
import { ApiResponse } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/general-models/api-response.model';

@Controller('jars')
export class JarsController {
  constructor(
    private readonly JarsS: JarsService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}
  private readonly ControllerContext = 'Jars: ';

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Jars: Create Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Jars: The User sent is not registered or is invalid.',
    type: ApiResponseModel,
  })
  @Post('/')
  async Create(@Body(JarsPipe) jar: JarsDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.JarsS.Create(jar);
    respM.Message = this.ControllerContext + 'Create Success!';
    respM.StatusCode = HttpStatus.CREATED;
    return respM;
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Jars: Init Jars Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Jars: The user already registers Jars.',
    type: ApiResponseModel,
  })
  @Post('/InitJarsForUser/:email')
  async InitJarsForUser(@Param('email') email: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.JarsS.InitJarsForUser(email);
    respM.Message = this.ControllerContext + 'Init Jars Success!';
    respM.StatusCode = HttpStatus.CREATED;
    return respM;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Jars: Update Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Jars: The sent id is invalid.',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Jars: The sent Jar is not registered or is invalid.',
    type: ApiResponseModel,
  })
  @Put('/:id')
  async Update(
    @Body(UpdateJarPipe) jar: UpdateJarsDto,
    @Param('id') id: string,
  ) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'The sent id is invalid.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.JarsS.Update(jar, Number(id));
      respM.Message = this.ControllerContext + 'Update Success!';
      respM.StatusCode = HttpStatus.CREATED;
      return respM;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Jars: GetById Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Jars: The sent id is invalid.',
    type: ApiResponseModel,
  })
  @Get('/:id')
  async GetById(@Param('id') id: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'The sent id is invalid.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.JarsS.GetById(Number(id));
      respM.Message = this.ControllerContext + 'GetById Success!';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Jars: GetJarMovementsById Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Jars: The sent id is invalid.',
    type: ApiResponseModel,
  })
  @Get('/movements/:id')
  async GetJarMovementsById(@Param('id') id: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'The sent id is invalid.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.JarsS.GetJarMovementsById(Number(id));
      respM.Message = this.ControllerContext + 'GetJarMovementsById Success!';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Jars: GetReceiberMovementsByJarId Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Jars: The sent id is invalid.',
    type: ApiResponseModel,
  })
  @Get('/receiber-movements/:id')
  async GetReceiberMovementsByJarId(@Param('id') id: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'The sent id is invalid.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.JarsS.GetReceiberMovementsByJarId(Number(id));
      respM.Message =
        this.ControllerContext + 'GetReceiberMovementsByJarId Success!';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Jars: GetSenderMovementsByJarId Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Jars: The sent id is invalid.',
    type: ApiResponseModel,
  })
  @Get('/sender-movements/:id')
  async GetSenderMovementsByJarId(@Param('id') id: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'The sent id is invalid.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.JarsS.GetSenderMovementsByJarId(Number(id));
      respM.Message =
        this.ControllerContext + 'GetSenderMovementsByJarId Success!';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Jars: GetByUserId Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Jars: The sent id is invalid.',
    type: ApiResponseModel,
  })
  @Get('/user/:id')
  async GetByUserId(@Param('id') id: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'The sent id is invalid.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.JarsS.GetByUserId(Number(id));
      respM.Message = this.ControllerContext + 'GetByUserId Success!';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Jars: Delete Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Jars: The sent id is invalid.',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Jars: The sent Jar is not registered or is invalid.',
    type: ApiResponseModel,
  })
  @Delete('/:id')
  async Delete(@Param('id') id: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'The sent id is invalid.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.JarsS.Delete(Number(id));
      respM.Message = this.ControllerContext + 'Delete Success!';
      respM.StatusCode = HttpStatus.ACCEPTED;
      return respM;
    }
  }
}
