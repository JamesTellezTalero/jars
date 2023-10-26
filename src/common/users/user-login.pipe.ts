import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ApiResponseModel } from 'src/general-interfaces/ApiResponse.model';
import { LoginUsersDto } from 'src/users/users.dto';

@Injectable()
export class UserLoginPipe implements PipeTransform {
  transform(user: LoginUsersDto, metadata: ArgumentMetadata) {
    const ApiResponseM: ApiResponseModel = {
      item: {},
      status: 0,
      message: '',
    };
    if (user.email == null) {
      ApiResponseM.item = null;
      ApiResponseM.status = 400;
      ApiResponseM.message = 'No se registra la propiedad email';
      throw ApiResponseM;
    } else if (user.password == null) {
      ApiResponseM.item = null;
      ApiResponseM.status = 400;
      ApiResponseM.message = 'No se registra la propiedad password';
      throw ApiResponseM;
    } else {
      return user;
    }
  }
}
