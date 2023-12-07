import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { UsersUpdateCuteOffDateDto } from 'src/users/users.dto';

@Injectable()
export class UsersUpdateCuteOffDatePipe implements PipeTransform {
  transform(user: UsersUpdateCuteOffDateDto, metadata: ArgumentMetadata) {
    const ApiResponseM: ApiResponseModel = {
      Data: {},
      StatusCode: 0,
      Message: '',
    };
    if (user.id == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad id';
      throw ApiResponseM;
    } else if (user.cute_off_date == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad cute_off_date';
      throw ApiResponseM;
    } else {
      return user;
    }
  }
}
