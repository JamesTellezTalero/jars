import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { LoginUsersDto } from 'src/users/users.dto';

@Injectable()
export class UserLoginPipe implements PipeTransform {
  transform(user: LoginUsersDto, metadata: ArgumentMetadata) {
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
    } else if (user.password == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad password';
      throw ApiResponseM;
    } else {
      return user;
    }
  }
}
