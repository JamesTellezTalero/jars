import { Controller, Get } from '@nestjs/common';
import { JarsService } from './jars.service';

@Controller('jars')
export class JarsController {
  constructor(private readonly JarsS: JarsService) {}

  @Get('/')
  async testCreateRecord() {
    return await this.JarsS.testCreateRecord();
  }
}
