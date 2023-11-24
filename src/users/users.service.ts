import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import * as crypto from 'crypto-js';

import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/Users';
import { Repository } from 'typeorm';
import { LoginUsersDto, UsersDto } from './users.dto';
import { ApiResponseModel } from 'src/general-models/api-response.model';
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
    user.password = await this.EncriptarPasswords('2222222222');
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

  async Registro(users: UsersDto) {
    const newUsers = new Users();
    newUsers.darkMode = users.darkMode;
    newUsers.username = users.username;
    newUsers.email = users.email;
    newUsers.image = users.image;
    newUsers.password = await this.EncriptarPasswords(users.password);
    newUsers.createdAt = new Date();
    newUsers.updatedAt = new Date();
    return this.UsersRepo.save(newUsers);
  }

  async Login(users: LoginUsersDto) {
    const ApiResponseM: ApiResponseModel = {
      Data: {},
      StatusCode: 0,
      Message: '',
    };
    const user = await this.GetUserByEmailAndPassword(
      users.email,
      users.password,
    );
    if (user != null) {
      return user;
    } else {
      ApiResponseM.Message = 'El usuario enviado no se registra';
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    }
  }

  async EncriptarPasswords(password: string): Promise<string> {
    const SECRET_KEY = 'jars-secret';
    const encryptedPassword = crypto.AES.encrypt(
      password,
      SECRET_KEY,
    ).toString();
    return encryptedPassword;
  }

  async DesencriptarPasswords(encryptedPassword: string): Promise<string> {
    const SECRET_KEY = 'jars-secret';
    const decryptedBytes = crypto.AES.decrypt(encryptedPassword, SECRET_KEY);
    const decryptedPassword = decryptedBytes.toString(crypto.enc.Utf8);
    return decryptedPassword;
  }
}
