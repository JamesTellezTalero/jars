import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jars } from './jars.entities';

@Injectable()
export class JarsService {
  constructor(
    @InjectModel('Jars')
    private readonly JarsModel: Model<Jars>,
  ) {}

  async testCreateRecord() {
    const jar = new this.JarsModel({
      name: 'string',
      color: 'string',
      userid: 'string',
      percent: 'string',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return jar.save();
  }
}
