import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UsersDto } from 'src/users/users.dto';
import { ApiResponseModel } from 'src/general-interfaces/ApiResponse.model';

@Injectable()
export class UsersPipe implements PipeTransform {
  transform(user: UsersDto, metadata: ArgumentMetadata) {
    console.log(user);
    const ApiResponseM: ApiResponseModel = {
      item: {},
      status: 0,
      message: '',
    };
    if (user.username == null) {
      ApiResponseM.item = null;
      ApiResponseM.status = 400;
      ApiResponseM.message = 'No se registra la propiedad username';
      throw ApiResponseM;
    } else if (user.email == null) {
      ApiResponseM.item = null;
      ApiResponseM.status = 400;
      ApiResponseM.message = 'No se registra la propiedad email';
      throw ApiResponseM;
    } else if (user.password == null) {
      ApiResponseM.item = null;
      ApiResponseM.status = 400;
      ApiResponseM.message = 'No se registra la propiedad password';
      throw ApiResponseM;
    } else if (user.image == null) {
      ApiResponseM.item = null;
      ApiResponseM.status = 400;
      ApiResponseM.message = 'No se registra la propiedad image';
      throw ApiResponseM;
    } else {
      return user;
    }
  }
}
