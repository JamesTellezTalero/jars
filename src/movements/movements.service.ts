import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Movements } from './movements.entities';
// import { Model } from 'mongoose';

@Injectable()
export class MovementsService {
  // constructor(
  //   @InjectModel('Movements')
  //   private readonly MovementsModel: Model<Movements>,
  // ) {}

  async testCreateRecord() {
    // const movement = new this.MovementsModel({
    //   title: 'string',
    //   amount: 'string',
    //   jarid: 'string',
    //   moventtypeid: 'string',
    //   tag: 'string',
    //   img: 'string',
    //   desc: 'string',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    return ' movement.save()';
  }
}
