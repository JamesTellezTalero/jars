import { Injectable } from '@nestjs/common';
import { TestDbConection } from './test-db-conection.entitie';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TestDbConectionService {
  constructor(
    @InjectModel('TestDbConection')
    private readonly TestConectionModel: Model<TestDbConection>,
  ) {}

  async hola2() {
    console.log('hola2');
    const newConection = new this.TestConectionModel({
      name: 'pepito',
      url: 'Aja',
    });
    newConection.save();
  }

  async hola3(): Promise<TestDbConection[]> {
    console.log('hola3');
    return this.TestConectionModel.find().exec();
  }
}
