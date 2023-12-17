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
import { MovementsService } from './movements.service';
import { MovementsDto, UpdateMovementsDto } from './movements.dto';
import { MovementsPipe } from 'src/common/movements/movements.pipe';
import { GeneralModuleService } from 'src/general-module/general-module.service';
import { MovementsUpdatePipe } from 'src/common/movements/movements-update.pipe';

@Controller('movements')
export class MovementsController {
  constructor(
    private readonly MovementsS: MovementsService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}

  private readonly ControllerContext = 'Movements: ';

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async Create(@Body(MovementsPipe) MovementsDto: MovementsDto) {
    let respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementsS.Create(MovementsDto);
    respM.Message = this.ControllerContext + 'Create Success.';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/')
  async Update(@Body(MovementsUpdatePipe) MovementsDto: UpdateMovementsDto) {
    let respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementsS.Update(MovementsDto);
    respM.Message = this.ControllerContext + 'Update Success.';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async GetById(@Param('id') id: string) {
    let respM = await this.GeneralModuleS.GetApiResponseModel();
    if (Number(id) == null || isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'id is not valid.';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      respM.Data = await this.MovementsS.GetById(Number(id));
      respM.Message = this.ControllerContext + 'Get By Id Success.';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  // @HttpCode(HttpStatus.OK)
  // @Get('/sender-jar/:id')
  // async GetBySenderJar(@Param('id') id: string) {
  //   let respM = await this.GeneralModuleS.GetApiResponseModel();
  //   if (Number(id) == null || isNaN(Number(id))) {
  //     respM.Data = null;
  //     respM.Message = this.ControllerContext + 'id is not valid.';
  //     respM.StatusCode = HttpStatus.FORBIDDEN;
  //     throw new HttpException(respM, HttpStatus.FORBIDDEN);
  //   } else {
  //     respM.Data = await this.MovementsS.GetBySenderJar(Number(id));
  //     respM.Message = this.ControllerContext + 'Get By Sender Jar Success.';
  //     respM.StatusCode = HttpStatus.OK;
  //     return respM;
  //   }
  // }

  // @HttpCode(HttpStatus.OK)
  // @Get('/receiver-jar/:id')
  // async GetByReceiverJar(@Param('id') id: string) {
  //   let respM = await this.GeneralModuleS.GetApiResponseModel();
  //   if (Number(id) == null || isNaN(Number(id))) {
  //     respM.Data = null;
  //     respM.Message = this.ControllerContext + 'id is not valid.';
  //     respM.StatusCode = HttpStatus.FORBIDDEN;
  //     throw new HttpException(respM, HttpStatus.FORBIDDEN);
  //   } else {
  //     respM.Data = await this.MovementsS.GetByReceiverJar(Number(id));
  //     respM.Message = this.ControllerContext + 'Get By Receiver Jar Success.';
  //     respM.StatusCode = HttpStatus.OK;
  //     return respM;
  //   }
  // }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async GetAll() {
    let respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementsS.GetAll();
    respM.Message = this.ControllerContext + 'Get All Success.';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }
}
