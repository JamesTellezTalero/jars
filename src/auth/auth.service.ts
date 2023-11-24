import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiJwtModel } from 'src/general-models/api-jwt.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async CreateJsonWebToken(email: string) {
    const payload = new ApiJwtModel();
    payload.email = email;
    payload.iat = new Date();
    payload.iat = payload.iat.getTime();
    return {
      access_token: await this.jwtService.signAsync({ ...payload }),
    };
  }
}
