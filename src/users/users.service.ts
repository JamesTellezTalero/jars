import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/Users';
import { Repository } from 'typeorm';
import { LoginUsersDto, UsersDto } from './users.dto';
import { ApiResponseModel } from 'src/general-interfaces/ApiResponse.model';
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

  async GetUserByEmailAndPassword(email: string, password: string) {
    return this.UsersRepo.findOne({ where: { email, password } });
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

  async Login(users: LoginUsersDto) {
    const ApiResponseM: ApiResponseModel = {
      item: {},
      status: 0,
      message: '',
    };
    const user = await this.GetUserByEmailAndPassword(
      users.email,
      users.password,
    );
    if (user != null) {
      return user;
    } else {
      ApiResponseM.message = 'El usuario enviado no se registra';
      ApiResponseM.status = HttpStatus.FORBIDDEN;
      throw new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    }
  }
}
