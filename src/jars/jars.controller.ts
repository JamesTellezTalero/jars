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

@Controller('jars')
export class JarsController {
  constructor(
    private readonly JarsS: JarsService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async Create(@Body(JarsPipe) jar: JarsDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.JarsS.Create(jar);
    respM.Message = 'Jar Generado!';
    respM.StatusCode = HttpStatus.CREATED;
    return respM;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/:id')
  async Update(
    @Body(UpdateJarPipe) jar: UpdateJarsDto,
    @Param('id') id: string,
  ) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = 'El id enviado es invalido.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.JarsS.Update(jar, Number(id));
      respM.Message = 'Jar Actualizado!';
      respM.StatusCode = HttpStatus.CREATED;
      return respM;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async GetById(@Param('id') id: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = 'El id enviado es invalido.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.JarsS.GetById(Number(id));
      respM.Message = 'GetById Exitoso!';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/user/:id')
  async GetByUserId(@Param('id') id: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = 'El id enviado es invalido.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.JarsS.GetUserById(Number(id));
      respM.Message = 'GetUserById Exitoso!';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('/:id')
  async Delete(@Param('id') id: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = 'El id enviado es invalido.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.JarsS.Delete(Number(id));
      respM.Message = 'Delete Exitoso!';
      respM.StatusCode = HttpStatus.ACCEPTED;
      return respM;
    }
  }
}
