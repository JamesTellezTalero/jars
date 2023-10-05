import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { MovementTypes } from './movement-types.entities';

@Injectable()
export class MovementTypesService {
  // constructor(
  //   @InjectModel('MovementTypes')
  //   private readonly MovementTypesModel: Model<MovementTypes>,
  // ) {}

  async testCreateRecord() {
    // const movementType = new this.MovementTypesModel({
    //   name: 'string',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    return 'movementType.save()';
  }
}
