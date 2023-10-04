import { Controller, Get } from '@nestjs/common';
import { MovementsService } from './movements.service';

@Controller('movements')
export class MovementsController {
  constructor(private readonly MovementsS: MovementsService) {}

  @Get('/')
  async testCreateRecord() {
    return await this.MovementsS.testCreateRecord();
  }
}
