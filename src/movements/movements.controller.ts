import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsDto } from './movements.dto';
import { MovementsPipe } from 'src/common/movements/movements.pipe';

@Controller('movements')
export class MovementsController {
  constructor(private readonly MovementsS: MovementsService) {}

  @Get('/')
  async testCreateRecord() {
    return await this.MovementsS.testCreateRecord();
  }

  @Post('/')
  async Create(@Body(MovementsPipe) MovementsDto: MovementsDto) {
    console.log(MovementsDto);
    return await this.MovementsS.Create(MovementsDto);
  }
}
