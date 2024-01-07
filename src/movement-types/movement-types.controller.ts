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
import { ApiResponse } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/general-models/api-response.model';

@Controller('movement-types')
export class MovementTypesController {
  constructor(
    private readonly MovementTypesS: MovementTypesService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}

  private readonly ControllerContext = 'Movement Types: ';

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Movement Types: Create Success!',
    type: ApiResponseModel,
  })
  @Post('/')
  async Create(@Body(MovementTypesPipe) body: MovementTypeDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementTypesS.Create(body);
    respM.Message = this.ControllerContext + 'Create Succes!';
    respM.StatusCode = HttpStatus.CREATED;
    return respM;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Movement Types: Update Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Movement Types: The movementType sent is not registered or is invalid.',
    type: ApiResponseModel,
  })
  @Put('/')
  async Update(@Body(MovementTypesUpdatePipe) body: UpdateMovementTypeDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementTypesS.Update(body);
    respM.Message = this.ControllerContext + 'Update Succes!';
    respM.StatusCode = HttpStatus.ACCEPTED;
    return respM;
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movement Types: GetById Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Movement Types: The sent id is invalid.',
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
      respM.Data = await this.MovementTypesS.GetById(Number(id));
      respM.Message = this.ControllerContext + 'GetById Succes!';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movement Types: GetAll Success!',
    type: ApiResponseModel,
  })
  @Get('/')
  async GetAll() {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.MovementTypesS.GetAll();
    respM.Message = this.ControllerContext + 'GetAll Succes!';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }
}
