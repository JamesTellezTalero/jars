import { Controller, Get, Post } from '@nestjs/common';
import { TestDbConectionService } from './test-db-conection.service';

@Controller('test-db-conection')
export class TestDbConectionController {
  constructor(private readonly TestConectionS: TestDbConectionService) {}

  @Post('/')
  async CreateTest() {
    console.log('hola');
  }
  @Get('/')
  async GetTest() {
    console.log('hola');
    this.TestConectionS.hola2();
  }
  @Get('/hola3')
  async hola3() {
    console.log('hola');
    const resp = await this.TestConectionS.hola3();
    resp.forEach((element) => {
      console.log(element.id);
    });
    return resp;
  }
}
