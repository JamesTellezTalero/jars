import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/Users';
import { Repository } from 'typeorm';
import { UsersDto } from './users.dto';
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
    user.darkMode = true;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    return this.UsersRepo.save(user);
  }

  async GetUserById(id: number) {
    return this.UsersRepo.findOne({ where: { id } });
  }

  async Create(users: UsersDto) {
    const newUsers = new Users();
    newUsers.darkMode = users.darkMode;
    newUsers.username = users.username;
    newUsers.email = users.email;
    newUsers.password = users.password;
    newUsers.image = users.image;
    newUsers.createdAt = new Date();
    newUsers.updatedAt = new Date();
    return this.UsersRepo.save(newUsers);
  }
}
