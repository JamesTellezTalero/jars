import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/Users';
import { Repository } from 'typeorm';
// import { Model } from 'mongoose';
// import { Users } from './users.entities';
// import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly UsersRepo: Repository<Users>,
  ) {}

  async testCreateRecord() {
    const user = new Users();
    user.username = '2222222';
    user.email = 'wwwwwwwww';
    user.password = '2222222222';
    user.image = '2222222222';
    user.darkmode = true;
    user.createdat = new Date();
    user.updatedat = new Date();

    return this.UsersRepo.save(user);
  }

  async GetUserById(id: number) {
    return this.UsersRepo.findOne({ where: { id } });
  }
}
