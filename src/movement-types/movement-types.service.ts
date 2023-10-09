import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movementtypes } from 'src/database/entities/Movementtypes';
import { Repository } from 'typeorm';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { MovementTypes } from './movement-types.entities';

@Injectable()
export class MovementTypesService {
  constructor(
    @InjectRepository(Movementtypes)
    private readonly MovementTypesRepo: Repository<Movementtypes>,
  ) {}

  async testCreateRecord() {
    const movementType = new Movementtypes();

    {
      movementType.name = 'string';
      movementType.createdat = new Date();
    }
    return await this.MovementTypesRepo.save(movementType);
  }

  async GetUserById(id: number) {
    return this.MovementTypesRepo.findOne({ where: { id } });
  }
}
