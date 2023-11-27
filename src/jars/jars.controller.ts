import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { JarsService } from './jars.service';
import { JarsPipe } from 'src/common/jars/jars.pipe';
import { JarsDto } from './jars.dto';

@Controller('jars')
export class JarsController {
  constructor(private readonly JarsS: JarsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async Create(@Body(JarsPipe) jar: JarsDto) {
    return await this.JarsS.Create(jar);
  }
  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/')
  async Update() {
    return await this.JarsS.testCreateRecord();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async GetById() {
    return await this.JarsS.testCreateRecord();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async GetByUserId() {
    return await this.JarsS.testCreateRecord();
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('/:id')
  async Delete() {
    return await this.JarsS.testCreateRecord();
  }
}
