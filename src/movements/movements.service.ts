import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movements } from 'src/database/entities/Movements';
import { JarsService } from 'src/jars/jars.service';
import { MovementTypesService } from 'src/movement-types/movement-types.service';
import { Repository } from 'typeorm';
import { MovementsDto, UpdateMovementsDto } from './movements.dto';
import { GeneralModuleService } from 'src/general-module/general-module.service';
import { UsersService } from 'src/users/users.service';
import { MovementTypes } from 'src/database/entities/MovementTypes';
import { TagsService } from 'src/tags/tags.service';

// import { InjectModel } from '@nestjs/mongoose';
// import { Movements } from './movements.entities';
// import { Model } from 'mongoose';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movements)
    private readonly MovementsRepo: Repository<Movements>,

    private readonly JarsS: JarsService,
    private readonly TagsS: TagsService,
    private readonly UsersS: UsersService,
    private readonly MovementsTypesS: MovementTypesService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}
  private readonly ControllerContext = 'Movements: ';

  async Create(movementsDto: MovementsDto): Promise<Movements | Movements[]> {
    const MovementType = await this.MovementsTypesS.GetById(
      Number(movementsDto.movementType),
    );

    switch (MovementType.name) {
      case 'GeneralInCome':
        return await this.CreateGeneralInCome(movementsDto, MovementType);
      case 'OutCome':
        return await this.CreateOutCome(movementsDto, MovementType);
      case 'JarMove':
        return await this.CreatJarMove(movementsDto, MovementType);
      case 'EspecificInCome':
        return await this.CreateEspecificInCome(movementsDto, MovementType);
      default:
        return await this.CreateDefaultIncome(movementsDto);
    }
  }
  async CreateDefaultIncome(
    movementsDto: MovementsDto,
  ): Promise<Movements | Movements[]> {
    /////////CREAR UNA FUNCION PARA DIVIDIR ESTO CON UN INTERCEPTOR
    const movement = new Movements();
    movement.title = movementsDto.title;
    movement.desc = movementsDto?.desc || '';
    movement.amount = movementsDto?.amount;
    movement.tag =
      movementsDto?.tagid != null
        ? await this.TagsS.ValidateByIdWithUserEmail(
            movementsDto.tagid,
            movementsDto.jsonWebTokenInfo.email,
          )
        : null;
    movement.senderJar =
      (await this.JarsS.GetById(movementsDto.senderJar)) || null;
    movement.receiverJar =
      (await this.JarsS.GetById(movementsDto.receiverJar)) || null;
    movement.createdAt = new Date();
    movement.updatedAt = new Date();
    return await this.MovementsRepo.save(movement);
  }

  async CreateGeneralInCome(
    movementsDto: MovementsDto,
    MovementType: MovementTypes,
  ): Promise<Movements | Movements[]> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();

    let user = await this.UsersS.ValidarUserByEmail(
      movementsDto.jsonWebTokenInfo.email,
    );
    if (user == null) {
      respM.Data = null;
      respM.Message =
        this.ControllerContext + 'Submitted user does not register';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
    let movements = user?.jars.map((e) => {
      let movement = new Movements();
      movement.title = movementsDto.title;
      movement.desc = movementsDto?.desc || '';
      movement.amount = (e?.percent * movementsDto?.amount) / 100;
      movement.receiverJar = e;
      movement.movementType = MovementType;
      movement.createdAt = new Date();
      movement.updatedAt = new Date();
      return movement;
    });
    return await this.MovementsRepo.save(movements);
  }

  async CreateEspecificInCome(
    movementsDto: MovementsDto,
    MovementType: MovementTypes,
  ): Promise<Movements | Movements[]> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();

    let user = await this.UsersS.ValidarUserByEmail(
      movementsDto.jsonWebTokenInfo.email,
    );
    let receiverJar = await this.JarsS.GetById(movementsDto?.receiverJar);
    if (receiverJar == null) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'receiverJar is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
    await this.JarsS.ValidateUserPertenency(receiverJar.id, user.email);
    let movement = new Movements();
    movement.title = movementsDto.title;
    movement.desc = movementsDto?.desc || '';
    movement.amount = movementsDto?.amount;
    movement.receiverJar = receiverJar;
    movement.movementType = MovementType;
    movement.tag =
      movementsDto?.tagid != null
        ? await this.TagsS.ValidateByIdWithUserEmail(
            movementsDto.tagid,
            movementsDto.jsonWebTokenInfo.email,
          )
        : null;
    movement.createdAt = new Date();
    movement.updatedAt = new Date();
    return await this.MovementsRepo.save(movement);
  }

  async CreateOutCome(
    movementsDto: MovementsDto,
    MovementType: MovementTypes,
  ): Promise<Movements | Movements[]> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    let user = await this.UsersS.ValidarUserByEmail(
      movementsDto.jsonWebTokenInfo.email,
    );
    let senderJar = await this.JarsS.GetById(movementsDto?.senderJar);
    if (senderJar == null) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'senderJar is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
    await this.JarsS.ValidateUserPertenency(senderJar.id, user.email);
    let movement = new Movements();
    movement.title = movementsDto.title;
    movement.desc = movementsDto?.desc || '';
    movement.amount = movementsDto?.amount;
    movement.senderJar = senderJar;
    movement.movementType = MovementType;
    movement.tag =
      movementsDto?.tagid != null
        ? await this.TagsS.ValidateByIdWithUserEmail(
            movementsDto.tagid,
            movementsDto.jsonWebTokenInfo.email,
          )
        : null;
    movement.createdAt = new Date();
    movement.updatedAt = new Date();
    return await this.MovementsRepo.save(movement);
  }

  async CreatJarMove(
    movementsDto: MovementsDto,
    MovementType: MovementTypes,
  ): Promise<Movements | Movements[]> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    let user = await this.UsersS.ValidarUserByEmail(
      movementsDto.jsonWebTokenInfo.email,
    );
    let senderJar = await this.JarsS.GetById(movementsDto?.senderJar);
    if (senderJar == null) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'senderJar is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
    let receiverJar = await this.JarsS.GetById(movementsDto?.receiverJar);
    if (receiverJar == null) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'receiverJar is not registered.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
    await this.JarsS.ValidateUserPertenencyForTwoJars(
      senderJar.id,
      receiverJar.id,
      user.email,
    );

    let movement = new Movements();
    movement.title = movementsDto.title;
    movement.desc = movementsDto?.desc || '';
    movement.amount = movementsDto?.amount;
    movement.senderJar = senderJar;
    movement.receiverJar = receiverJar;
    movement.movementType = MovementType;
    movement.tag =
      movementsDto?.tagid != null
        ? await this.TagsS.ValidateByIdWithUserEmail(
            movementsDto.tagid,
            movementsDto.jsonWebTokenInfo.email,
          )
        : null;
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
    movement.tag =
      movementsDto?.tagid != null
        ? await this.TagsS.ValidateByIdWithUserEmail(
            movementsDto.tagid,
            movementsDto.jsonWebTokenInfo.email,
          )
        : null;
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
      relations: ['tag'],
      order: {
        tag: {
          id: 'ASC',
        },
      },
    });
  }

  async GetAll(): Promise<Movements[]> {
    return await this.MovementsRepo.find();
  }
}
