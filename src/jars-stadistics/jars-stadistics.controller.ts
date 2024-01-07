import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { JarsStadisticsService } from './jars-stadistics.service';
import {
  jarsStadisticsDatesDto,
  jarsStadisticsDto,
} from './jars-stadistics.dto';
import { GeneralModuleService } from 'src/general-module/general-module.service';

@Controller('jars-stadistics')
export class JarsStadisticsController {
  constructor(
    private readonly JarsStadisticsS: JarsStadisticsService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}

  @Get('/')
  async GetGeneralStadistics(@Body() dto: jarsStadisticsDto) {
    return await this.JarsStadisticsS.GetGeneralStadistics(dto);
  }

  @Get('/dates/')
  async GetGeneralStadisticsByDates(@Body() dto: jarsStadisticsDatesDto) {
    return await this.JarsStadisticsS.GetGeneralStadisticsByDates(dto);
  }

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
    return await this.JarsStadisticsS.GetJarStadistics(dto, Number(jarId));
  }

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
    return await this.JarsStadisticsS.GetJarStadisticsByDates(
      dto,
      Number(jarId),
    );
  }
}
