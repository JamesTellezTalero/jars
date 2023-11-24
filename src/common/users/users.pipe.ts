import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UsersDto } from 'src/users/users.dto';
import { ApiResponseModel } from 'src/general-models/api-response.model';

@Injectable()
export class UsersPipe implements PipeTransform {
  transform(user: UsersDto, metadata: ArgumentMetadata) {
    const ApiResponseM = new ApiResponseModel();
    if (user.username == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad username';
      throw new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else if (user.email == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad email';
      new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else if (user.password == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad password';
      new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else if (user.image == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad image';
      new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else {
      return user;
    }
  }
}
