import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jars } from './jars.entities';
import { lookupService } from 'dns';

@Injectable()
export class JarsService {
  constructor(
    @InjectModel('Jars')
    private readonly JarsModel: Model<Jars>,
  ) {}

  // async testCreateRecord() {
  //   const jar = new this.JarsModel({
  //     name: 'string',
  //     color: 'string',
  //     userid: '651cc49ffab1fc981378c5bd',
  //     percent: 'string',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });

  //   return jar.save();
  // }

  async testCreateRecord() {
    const jar = await this.JarsModel.find({
      userid: '651cc49ffab1fc981378c5bd',
    });

    return jar;
  }
}
