import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jars } from 'src/database/entities/Jars';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Jars } from './jars.entities';

@Injectable()
export class JarsService {
  constructor(
    @InjectRepository(Jars)
    private readonly JarsRepo: Repository<Jars>,

    private readonly UsersS: UsersService,
  ) {}

  async testCreateRecord() {
    const jar = new Jars();

    jar.name = 'string';
    jar.color = 'string';
    jar.user = await this.UsersS.GetUserById(2);
    jar.percent = 'string';
    jar.createdat = new Date();
    jar.updatedat = new Date();

    return this.JarsRepo.save(jar);
  }

  async GetUserById(id: number) {
    return this.JarsRepo.findOne({ where: { id } });
  }
}
