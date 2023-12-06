import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovementTypesService } from './movement-types.service';
import { MovementTypesPipe } from 'src/common/movement-types/movement-types.pipe';
import { MovementTypeDto, UpdateMovementTypeDto } from './movement-types.dto';
import { GeneralModuleService } from 'src/general-module/general-module.service';
import { MovementTypesUpdatePipe } from 'src/common/movement-types/movement-types-update.pipe';

@Controller('movement-types')
export class MovementTypesController {
  constructor(
    private readonly MovementTypesS: MovementTypesService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async Create(@Body(MovementTypesPipe) body: MovementTypeDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementTypesS.Create(body);
    respM.Message = 'Movement Type Generado!';
    respM.StatusCode = HttpStatus.CREATED;
    return respM;
  }

  @HttpCode(HttpStatus.CREATED)
  @Put('/')
  async Update(@Body(MovementTypesUpdatePipe) body: UpdateMovementTypeDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementTypesS.Update(body);
    respM.Message = 'Movement Type Actualizado!';
    respM.StatusCode = HttpStatus.CREATED;
    return respM;
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
      respM.Data = await this.MovementTypesS.GetById(Number(id));
      respM.Message = 'Movement Type GetById!';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async GetAll() {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementTypesS.GetAll();
    respM.Message = 'Movement Type GetAll!';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }
}
