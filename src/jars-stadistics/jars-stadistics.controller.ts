import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { JarsStadisticsService } from './jars-stadistics.service';
import { jarsStadisticsDto } from './jars-stadistics.dto';
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
}
