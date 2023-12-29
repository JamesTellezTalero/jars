import { Body, Controller, Get } from '@nestjs/common';
import { JarsStadisticsService } from './jars-stadistics.service';
import { jarsStadisticsDto } from './jars-stadistics.dto';

@Controller('jars-stadistics')
export class JarsStadisticsController {
  constructor(private readonly JarsStadisticsS: JarsStadisticsService) {}

  @Get('/')
  async GetGeneralStadistics(@Body() dto: jarsStadisticsDto) {
    return await this.JarsStadisticsS.GetGeneralStadistics(dto);
  }
}
