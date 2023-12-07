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
import {
  LoginUsersDto,
  UsersDto,
  UsersUpdateCuteOffDateDto,
  UsersUpdateDto,
  UsersUpdatePasswordDto,
} from './users.dto';
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

  async Update(userDto: UsersUpdateDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const user = await this.GetById(userDto.id);
    if (user != null) {
      user.darkMode = userDto?.darkMode || user.darkMode;
      user.username = userDto.username;
      user.cute_off_date =
        new Date(userDto?.cute_off_date) || user.cute_off_date;
      user.updatedAt = new Date();
      return await this.UsersRepo.save(user);
    } else {
      respM.Data = null;
      respM.Message = 'El usuario enviado no se registra';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    }
  }

  async UpdatePassword(userDto: UsersUpdatePasswordDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const user = await this.GetUserByEmail(userDto.email);
    userDto.oldPassword = await this.EncriptarPasswords(userDto.oldPassword);
    userDto.newPassword = await this.EncriptarPasswords(userDto.newPassword);
    if (user == null) {
      respM.Data = null;
      respM.Message = 'El usuario enviado no se registra';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else if (user.password != userDto.oldPassword) {
      respM.Data = null;
      respM.Message =
        'La contraseña envida no coincide con la contraseña actual';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    } else {
      user.password = userDto.newPassword;
      user.updatedAt = new Date();
      return await this.UsersRepo.save(user);
    }
  }

  async UpdateCuteOffDate(userDto: UsersUpdateCuteOffDateDto) {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const user = await this.GetById(userDto.id);
    if (user == null) {
      respM.Data = null;
      respM.Message = 'El usuario enviado no se registra';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else {
      user.cute_off_date = new Date(userDto?.cute_off_date);
      return await this.UsersRepo.save(user);
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
    let encryptedPassword = crypto.SHA256(password);
    encryptedPassword = encryptedPassword.toString(crypto.enc.Base64);
    return encryptedPassword;
  }
}
