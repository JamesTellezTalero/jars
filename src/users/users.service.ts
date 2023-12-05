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
import { GeneralModuleService } from 'src/general-module/general-module.service';
import { AuthService } from 'src/auth/auth.service';

import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly UsersRepo: Repository<Users>,
    private readonly GeneralModuleS: GeneralModuleService,
    private readonly AuthS: AuthService,
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

    return user;
  }

  async GetUserById(id: number) {
    return this.UsersRepo.findOne({ where: { id } });
  }

  async GetUserByEmail(email: string) {
    return this.UsersRepo.findOne({ where: { email } });
  }

  async GetUserByEmailAndPassword(email: string, password: string) {
    return this.UsersRepo.findOne({ where: { email, password } });
  }

  async Register(users: UsersDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const prevExistence = await this.GetUserByEmail(users.email);
    if (prevExistence) {
      respM.Data = null;
      respM.Message = 'El email enviado ya se encuentra registrado';
      respM.StatusCode = HttpStatus.CONFLICT;
      throw new HttpException(respM, HttpStatus.CONFLICT);
    }
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

  async Login(userDto: LoginUsersDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const user = await this.GetUserByEmailAndPassword(
      userDto.email,
      userDto.password,
    );
    if (user != null) {
      return await this.AuthS.CreateJsonWebToken(user.email);
    } else {
      respM.Data = null;
      respM.Message = 'El usuario enviado no se registra';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
  }

  async UpdateImg(email: string, filePath: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const user = await this.GetByEmail(email);
    if (user != null) {
      if (user.image != null) {
        fs.unlink(user.image, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      user.image = filePath;
      return await this.UsersRepo.save(user);
    } else {
      respM.Data = null;
      respM.Message = 'El usuario enviado no se registra';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
  }

  async GetByEmail(email: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const user = await this.UsersRepo.findOne({
      where: {
        email,
      },
    });
    if (user != null) {
      return user;
    } else {
      respM.Data = null;
      respM.Message = 'El usuario enviado no se registra';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
  }

  async GetByEmailWithJars(email: string) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const user = await this.UsersRepo.findOne({
      where: {
        email,
      },
      relations: ['jars'],
    });
    if (user != null) {
      return user;
    } else {
      respM.Data = null;
      respM.Message = 'El usuario enviado no se registra';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
  }

  async GetById(id: number) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const user = await this.UsersRepo.findOne({
      where: {
        id,
      },
    });
    if (user != null) {
      return user;
    } else {
      respM.Data = null;
      respM.Message = 'El usuario enviado no se registra';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
  }

  async EncriptarPasswords(password: string): Promise<string> {
    const SECRET_KEY = process.env.PASSWORD_SECRET_ENC_KEY;
    const encryptedPassword = crypto.AES.encrypt(
      password,
      SECRET_KEY,
    ).toString();
    return encryptedPassword;
  }

  async DesencriptarPasswords(encryptedPassword: string): Promise<string> {
    const SECRET_KEY = process.env.PASSWORD_SECRET_ENC_KEY;
    const decryptedBytes = crypto.AES.decrypt(encryptedPassword, SECRET_KEY);
    const decryptedPassword = decryptedBytes.toString(crypto.enc.Utf8);
    return decryptedPassword;
  }
}
