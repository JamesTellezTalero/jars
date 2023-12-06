import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movements } from 'src/database/entities/Movements';
import { JarsService } from 'src/jars/jars.service';
import { MovementTypesService } from 'src/movement-types/movement-types.service';
import { Repository } from 'typeorm';

// import { InjectModel } from '@nestjs/mongoose';
// import { Movements } from './movements.entities';
// import { Model } from 'mongoose';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movements)
    private readonly MovementsRepo: Repository<Movements>,

    private readonly JarsS: JarsService,
    private readonly MovementsTypesS: MovementTypesService,
  ) {}

  async testCreateRecord() {
    const movement = new Movements();

    movement.title = 'string';
    movement.desc = 'string';
    movement.amount = 222;
    movement.senderJar = (await this.JarsS.GetUserById(1))[0];
    movement.receiverJar = (await this.JarsS.GetUserById(1))[0];
    movement.movementType = await this.MovementsTypesS.GetById(1);
    // movement.tag = 'string';
    movement.desc = 'string';
    movement.createdAt = new Date();
    movement.updatedAt = new Date();

    return await this.MovementsRepo.save(movement);
  }
}
