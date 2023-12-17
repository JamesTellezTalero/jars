import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movements } from 'src/database/entities/Movements';
import { JarsService } from 'src/jars/jars.service';
import { MovementTypesService } from 'src/movement-types/movement-types.service';
import { Repository } from 'typeorm';
import { MovementsDto, UpdateMovementsDto } from './movements.dto';
import { GeneralModuleService } from 'src/general-module/general-module.service';

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
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}
  private readonly ControllerContext = 'Movements: ';

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

  async Create(movementsDto: MovementsDto): Promise<Movements> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const movement = new Movements();

    movement.title = movementsDto.title;
    movement.desc = movementsDto?.desc || '';
    movement.amount = movementsDto?.amount;
    movement.senderJar =
      (await this.JarsS.GetById(movementsDto.senderJar)) || null;
    movement.receiverJar =
      (await this.JarsS.GetById(movementsDto.receiverJar)) || null;
    movement.movementType = await this.MovementsTypesS.GetById(
      movementsDto.movementType,
    );
    if (movement.senderJar == null) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'senderJar is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else if (movement.receiverJar == null) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'receiverJar is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else if (movement.movementType == null) {
      respM.Data = null;
      respM.Message =
        this.ControllerContext + 'movementType is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
    // movement.tag = 'string';
    movement.createdAt = new Date();
    movement.updatedAt = new Date();

    return await this.MovementsRepo.save(movement);
  }

  async Update(movementsDto: UpdateMovementsDto): Promise<Movements> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const movement = await this.GetById(movementsDto.id);
    if (movement == null) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'id is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
    movement.title = movementsDto.title;
    movement.desc = movementsDto?.desc || '';
    movement.amount = movementsDto?.amount;
    movement.senderJar =
      (await this.JarsS.GetById(movementsDto.senderJar)) || null;
    movement.receiverJar =
      (await this.JarsS.GetById(movementsDto.receiverJar)) || null;
    movement.movementType = await this.MovementsTypesS.GetById(
      movementsDto.movementType,
    );
    if (movement.senderJar == null) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'senderJar is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else if (movement.receiverJar == null) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'receiverJar is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else if (movement.movementType == null) {
      respM.Data = null;
      respM.Message =
        this.ControllerContext + 'movementType is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
    movement.updatedAt = new Date();

    return await this.MovementsRepo.save(movement);
  }

  async GetById(id: number): Promise<Movements> {
    return await this.MovementsRepo.findOne({
      where: {
        id,
      },
    });
  }

  // async GetBySenderJar(id: number): Promise<Movements[]> {
  //   return await this.MovementsRepo.find({
  //     where: {
  //       senderJar: {
  //         id,
  //       },
  //     },
  //     relations: ['senderJar'],
  //   });
  // }

  // async GetByReceiverJar(id: number): Promise<Movements[]> {
  //   return await this.MovementsRepo.find({
  //     where: {
  //       receiverJar: {
  //         id,
  //       },
  //     },
  //     relations: ['receiverJar'],
  //   });
  // }

  async GetAll(): Promise<Movements[]> {
    return await this.MovementsRepo.find();
  }
}
