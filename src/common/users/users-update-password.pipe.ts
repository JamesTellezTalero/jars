import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { UsersUpdatePasswordDto } from 'src/users/users.dto';

@Injectable()
export class UsersUpdatePasswordPipe implements PipeTransform {
  transform(user: UsersUpdatePasswordDto, metadata: ArgumentMetadata) {
    const ApiResponseM: ApiResponseModel = {
      Data: {},
      StatusCode: 0,
      Message: '',
    };
    if (user.email == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad email';
      throw ApiResponseM;
    } else if (user.oldPassword == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad oldPassword';
      throw ApiResponseM;
    } else if (user.newPassword == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad newPassword';
      throw ApiResponseM;
    } else {
      return user;
    }
  }
}
