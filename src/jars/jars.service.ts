import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jars } from 'src/database/entities/Jars';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
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

  async testCreateRecord() {
    const jar = new Jars();

    jar.name = 'string';
    jar.color = 'string';
    jar.user = await this.UsersS.GetUserById(2);
    jar.percent = 80;
    jar.createdAt = new Date();
    jar.updatedAt = new Date();

    return this.JarsRepo.save(jar);
  }

  async Create(jar: JarsDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const user = await this.UsersS.GetById(Number(jar.userId));
    if (user != null) {
      const newJar = new Jars();
      newJar.name = jar.name;
      newJar.color = jar.color;
      newJar.percent = jar.percent;
      newJar.user = user;
      newJar.createdAt = new Date();
      newJar.updatedAt = new Date();
      return await this.JarsRepo.save(newJar);
    } else {
      respM.Data = null;
      respM.Message = 'El Usuario enviado no se registra o es invalido.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
  }
  async Update(jar: UpdateJarsDto, id: number) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const existJar = await this.GetById(Number(id));
    if (existJar == null) {
      respM.Data = null;
      respM.Message = 'El Jar enviado no se registra o es invalido.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else {
      existJar.name = jar.name != existJar.name ? jar.name : existJar.name;
      existJar.color = jar.color != existJar.color ? jar.color : existJar.color;
      existJar.percent =
        jar.percent != existJar.percent ? jar.percent : existJar.percent;
      existJar.updatedAt = new Date();
      return await this.JarsRepo.save(existJar);
    }
  }
  async GetById(id: number) {
    return this.JarsRepo.findOne({ where: { id } });
  }
  async GetUserById(id: number) {
    return this.JarsRepo.findOne({
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
      respM.Message = 'El Jar enviado no se registra o es invalido.';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else {
      return this.JarsRepo.remove(await this.GetById(id));
    }
  }
}
