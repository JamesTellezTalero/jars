import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { UsersDto, UsersUpdateDto } from 'src/users/users.dto';

@Injectable()
export class UsersUpdatePipe implements PipeTransform {
  transform(user: UsersUpdateDto, metadata: ArgumentMetadata) {
    const ApiResponseM = new ApiResponseModel();
    if (user.id == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad id';
      throw new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else if (user.username == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad username';
      throw new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else {
      return user;
    }
  }
}
