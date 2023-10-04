import { Controller, Get } from '@nestjs/common';
import { MovementTypesService } from './movement-types.service';

@Controller('movement-types')
export class MovementTypesController {
  constructor(private readonly MovementTypesS: MovementTypesService) {}

  @Get('/')
  async testCreateRecord() {
    return await this.MovementTypesS.testCreateRecord();
  }
}
