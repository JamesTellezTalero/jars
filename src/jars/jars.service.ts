import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jars } from 'src/database/entities/Jars';
import { UsersService } from 'src/users/users.service';
import { In, Repository } from 'typeorm';
import { JarsDto, UpdateJarsDto } from './jars.dto';
import { GeneralModuleService } from 'src/general-module/general-module.service';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Jars } from './jars.entities';

@Injectable()
export class JarsService {
  constructor(
    @InjectRepository(Jars)
    private readonly JarsRepo: Repository<Jars>,
    private readonly UsersS: UsersService,
    private readonly GeneralModuleS: GeneralModuleService,
  ) {}

  private readonly ControllerContext = 'Jars: ';

  private readonly InitJarsData: JarsDto[] = [
    { color: 'Morado', name: 'Necessities', percent: 55, userId: 0 },
    { color: 'Azul', name: 'Education', percent: 10, userId: 0 },
    { color: 'Amarillo', name: 'Saving', percent: 10, userId: 0 },
    { color: 'Verde', name: 'Play', percent: 10, userId: 0 },
    { color: 'AzulAguaMarina', name: 'Invest', percent: 10, userId: 0 },
    { color: 'Rosa', name: 'Saving', percent: 5, userId: 0 },
  ];

  async InitJarsForUser(Email: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const user = await this.UsersS.GetByEmailWithJars(Email);
    if (user.jars.length == 0) {
      for (let i = 0; i < this.InitJarsData.length; i++) {
        const e = this.InitJarsData[i];
        e.userId = user.id;
        await this.Create(e);
        if (i == this.InitJarsData.length - 1) {
          return await this.GetUserById(user.id);
        }
      }
    } else {
      respM.Data = null;
      respM.Message =
        this.ControllerContext + 'The user already registers Jars';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
  }

  async Create(jar: JarsDto): Promise<Jars> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const user = await this.UsersS.GetById(Number(jar.userId));
    if (user != null) {
      const newJar = new Jars();
      await this.ValidateUserPercentForNewJar(Number(jar.userId), jar.percent);
      newJar.name = jar.name;
      newJar.color = jar.color;
      newJar.percent = jar.percent;
      newJar.user = user;
      newJar.createdAt = new Date();
      newJar.updatedAt = new Date();
      return await this.JarsRepo.save(newJar);
    } else {
      respM.Data = null;
      respM.Message =
        this.ControllerContext +
        'The User sent is not registered or is invalid.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
  }

  async Update(jar: UpdateJarsDto, id: number): Promise<Jars> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const existJar = await this.GetById(Number(id));
    if (existJar == null) {
      respM.Data = null;
      respM.Message =
        this.ControllerContext +
        'The sent Jar is not registered or is invalid.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else {
      existJar.name = jar.name || existJar.name;
      existJar.color = jar.color || existJar.color;
      existJar.percent = jar.percent || existJar.percent;
      existJar.updatedAt = new Date();
      return await this.JarsRepo.save(existJar);
    }
  }

  async GetJarMovementsByIds(ids: number[]): Promise<Jars[]> {
    return this.JarsRepo.find({
      where: { id: In(ids) },
      relations: [
        'incomeMovements',
        'incomeMovements.movementType',
        'outcomeMovements',
        'outcomeMovements.movementType',
      ],
    });
  }

  async GetJarMovementsById(id: number): Promise<Jars> {
    return this.JarsRepo.findOne({
      where: { id },
      relations: [
        'incomeMovements',
        'incomeMovements.movementType',
        'outcomeMovements',
        'outcomeMovements.movementType',
      ],
    });
  }

  async GetReceiberMovementsByJarId(id: number): Promise<Jars> {
    return this.JarsRepo.findOne({
      where: { id },
      relations: ['incomeMovements'],
    });
  }

  async GetSenderMovementsByJarId(id: number): Promise<Jars> {
    return this.JarsRepo.findOne({
      where: { id },
      relations: ['outcomeMovements'],
    });
  }

  async GetById(id: number): Promise<Jars> {
    return this.JarsRepo.findOne({ where: { id } });
  }

  async ValidateUserPertenency(id: number, email: string): Promise<boolean> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    let jar = await this.GetById(id);
    let user = await this.UsersS.GetByEmailWithJars(email);
    let exist = user.jars.find((e) => e.id == jar?.id);
    if (exist != null) {
      return true;
    } else {
      respM.Data = null;
      respM.Message =
        this.ControllerContext +
        'Submitted jar does not belong to sended user.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
  }

  async ValidateUserPertenencyForTwoJars(
    id1: number,
    id2: number,
    email: string,
  ): Promise<boolean> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    let jar1 = await this.GetById(id1);
    let jar2 = await this.GetById(id2);
    let user = await this.UsersS.GetByEmailWithJars(email);
    let exist = user.jars.filter((e) => e.id == jar1?.id || e.id == jar2?.id);
    if (exist.length >= 2) {
      return true;
    } else {
      respM.Data = null;
      respM.Message =
        this.ControllerContext +
        'One or More jars does not belong to sended user.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
  }

  async GetUserById(id: number): Promise<Jars[]> {
    return this.JarsRepo.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  async Delete(id: number) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const existJar = await this.GetById(Number(id));
    if (existJar == null) {
      respM.Data = null;
      respM.Message =
        this.ControllerContext +
        'The sent Jar is not registered or is invalid.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else {
      return this.JarsRepo.remove(await this.GetById(id));
    }
  }

  async ValidateUserPercentForNewJar(
    userId: number,
    incomePercent: number,
  ): Promise<boolean> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const Jars = await this.GetUserById(Number(userId));
    if (Jars.length == 0) {
      return true;
    } else {
      Jars.map((e) => {
        incomePercent += e.percent;
      });
      if (incomePercent <= 100) {
        return true;
      } else {
        respM.Data = null;
        respM.Message =
          this.ControllerContext + 'The total percentage exceeds that allowed.';
        respM.StatusCode = HttpStatus.FORBIDDEN;
        throw new HttpException(respM, HttpStatus.FORBIDDEN);
      }
    }
  }
}
