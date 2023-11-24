import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UsersDto } from 'src/users/users.dto';
import { ApiResponseModel } from 'src/general-models/api-response.model';

@Injectable()
export class UsersPipe implements PipeTransform {
  transform(user: UsersDto, metadata: ArgumentMetadata) {
    console.log(user);
    const ApiResponseM: ApiResponseModel = {
      Data: {},
      StatusCode: 0,
      Message: '',
    };
    if (user.username == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad username';
      throw ApiResponseM;
    } else if (user.email == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad email';
      throw ApiResponseM;
    } else if (user.password == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad password';
      throw ApiResponseM;
    } else if (user.image == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad image';
      throw ApiResponseM;
    } else {
      return user;
    }
  }
}
