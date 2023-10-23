import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementTypes } from 'src/database/entities/MovementTypes';
import { Repository } from 'typeorm';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { MovementTypes } from './movement-types.entities';

@Injectable()
export class MovementTypesService {
  constructor(
    @InjectRepository(MovementTypes)
    private readonly MovementTypesRepo: Repository<MovementTypes>,
  ) {}

  async testCreateRecord() {
    const movementType = new MovementTypes();

    {
      movementType.name = 'string';
      movementType.createdAt = new Date();
    }
    return await this.MovementTypesRepo.save(movementType);
  }

  async GetUserById(id: number) {
    return this.MovementTypesRepo.findOne({ where: { id } });
  }
}
