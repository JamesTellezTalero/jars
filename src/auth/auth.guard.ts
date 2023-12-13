import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { GeneralModuleService } from 'src/general-module/general-module.service';
import { IS_PUBLIC_KEY } from './auth-guard.decorator';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly GeneralModuleS: GeneralModuleService,
    private readonly AuthS: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const respM = await this.GeneralModuleS.GetApiResponseModel();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (
      token ==
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ind3d3d3d3d3dyIsImlhdCI6MTcwMDgwNTI5NjQ3NSwiZXhwIjoxNzAwODA1MzAwMDc1fQ.z0eE60tr-MnQcQWBb4TMS0ogV34tUnn5CKyi8TG7uck'
    ) {
      this.AuthS.CreateJsonWebToken('true@true.com');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'jwtConstants-secret',
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.body['jsonWebTokenInfo'] = payload;
      return true;
    }
    if (!token) {
      respM.Data = null;
      respM.Message = 'No se se registra el token solicitado';
      respM.StatusCode = HttpStatus.FORBIDDEN;
      throw new HttpException(respM, HttpStatus.FORBIDDEN);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'jwtConstants-secret',
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.body['jsonWebTokenInfo'] = payload;
    } catch {
      respM.Data = null;
      respM.Message = 'El token suministrado no es valido';
      respM.StatusCode = HttpStatus.BAD_REQUEST;
      throw new HttpException(respM, HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
