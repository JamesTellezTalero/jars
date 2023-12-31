import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementTypes } from 'src/database/entities/MovementTypes';
import { Repository } from 'typeorm';
import { MovementTypeDto, UpdateMovementTypeDto } from './movement-types.dto';
import { GeneralModuleService } from 'src/general-module/general-module.service';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { MovementTypes } from './movement-types.entities';

@Injectable()
export class MovementTypesService {
  constructor(
    @InjectRepository(MovementTypes)
    private readonly MovementTypesRepo: Repository<MovementTypes>,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}
  private readonly ControllerContext = 'Movement Types: ';

  async Create(body: MovementTypeDto) {
    let newMovementType = new MovementTypes();
    newMovementType.name = body.name;
    newMovementType.createdAt = new Date();
    return this.MovementTypesRepo.save(newMovementType);
  }

  async Update(body: UpdateMovementTypeDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const MovementType = await this.GetById(Number(body.id));
    if (MovementType == null) {
      respM.Data = null;
      respM.Message =
        this.ControllerContext +
        'The movementType sent is not registered or is invalid.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else {
      MovementType.name = body?.name || MovementType.name;
      return this.MovementTypesRepo.save(MovementType);
    }
  }

  async GetAll() {
    return this.MovementTypesRepo.find();
  }

  async GetById(id: number) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    let data = await this.MovementTypesRepo.findOne({ where: { id: id } });
    if (data == null) {
      respM.Data = null;
      respM.Message =
        this.ControllerContext + 'movementType is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else {
      return data;
    }
  }
}
