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
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsDto, UpdateMovementsDto } from './movements.dto';
import { MovementsPipe } from 'src/common/movements/movements.pipe';
import { GeneralModuleService } from 'src/general-module/general-module.service';
import { MovementsUpdatePipe } from 'src/common/movements/movements-update.pipe';
import { ApiResponse } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/general-models/api-response.model';

@Controller('movements')
export class MovementsController {
  constructor(
    private readonly MovementsS: MovementsService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}

  private readonly ControllerContext = 'Movements: ';

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Movements: Create Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Jars: Submitted jar does not belong to sended user.',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Jars: One or More jars does not belong to sended user.',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movements: Submitted user does not register',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movements: senderJar is not registered.',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movements: receiverJar is not registered.',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tags: Submitted tag does not register',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tags: Submitted tag does not belong to sended user',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Users: Submitted user does not register',
    type: ApiResponseModel,
  })
  @Post('/')
  async Create(@Body(MovementsPipe) MovementsDto: MovementsDto) {
    let respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementsS.Create(MovementsDto);
    respM.Message = this.ControllerContext + 'Create Success!';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Movements: Update Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movements: id is not registered.',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movements: senderJar is not registered.',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movements: receiverJar is not registered.',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movement Types: movementType is not registered.',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tags: Submitted tag does not register',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tags: Submitted tag does not belong to sended user',
    type: ApiResponseModel,
  })
  @Put('/')
  async Update(@Body(MovementsUpdatePipe) MovementsDto: UpdateMovementsDto) {
    let respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementsS.Update(MovementsDto);
    respM.Message = this.ControllerContext + 'Update Success!';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movements: Get By Id Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Movements: id is not valid.',
    type: ApiResponseModel,
  })
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
      respM.Message = this.ControllerContext + 'Get By Id Success!';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movements: Get All Success!',
    type: ApiResponseModel,
  })
  @Get('/')
  async GetAll() {
    let respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementsS.GetAll();
    respM.Message = this.ControllerContext + 'Get All Success!';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }
}
