import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { JarsStadisticsService } from './jars-stadistics.service';
import {
  jarsStadisticsDatesDto,
  jarsStadisticsDto,
  jarsStadisticsResponseDto,
} from './jars-stadistics.dto';
import { GeneralModuleService } from 'src/general-module/general-module.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('jars-stadistics')
export class JarsStadisticsController {
  constructor(
    private readonly JarsStadisticsS: JarsStadisticsService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}

  private readonly ControllerContext = 'Jars Stadistics: ';

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async GetGeneralStadistics(@Body() dto: jarsStadisticsDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.JarsStadisticsS.GetGeneralStadistics(dto);
    respM.Message = this.ControllerContext + 'GetGeneralStadistics Success';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/dates/')
  async GetGeneralStadisticsByDates(@Body() dto: jarsStadisticsDatesDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    respM.Data = await this.JarsStadisticsS.GetGeneralStadisticsByDates(dto);
    respM.Message =
      this.ControllerContext + 'GetGeneralStadisticsByDates Success';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:jarId')
  async GetJarStadistics(
    @Body() dto: jarsStadisticsDto,
    @Param('jarId') jarId: string,
  ) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (Number.isNaN(jarId)) {
      respM.Data = null;
      respM.Message = 'jarId was not received';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    }
    respM.Data = await this.JarsStadisticsS.GetJarStadistics(
      dto,
      Number(jarId),
    );
    respM.Message = this.ControllerContext + 'GetJarStadistics Success';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Jars Stadistics: GetJarStadisticsByDates Success',
    type: jarsStadisticsResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Jars Stadistics: jarId was not received',
  })
  @Get('/dates/:jarId')
  async GetJarStadisticsByDates(
    @Body() dto: jarsStadisticsDatesDto,
    @Param('jarId') jarId: string,
  ) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    if (Number.isNaN(jarId)) {
      respM.Data = null;
      respM.Message = 'jarId was not received';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    }
    respM.Data = await this.JarsStadisticsS.GetJarStadisticsByDates(
      dto,
      Number(jarId),
    );
    respM.Message = this.ControllerContext + 'GetJarStadisticsByDates Success';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }
}
