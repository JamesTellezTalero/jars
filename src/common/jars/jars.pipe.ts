import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { JarsDto } from 'src/jars/jars.dto';

@Injectable()
export class JarsPipe implements PipeTransform {
  transform(jar: JarsDto, metadata: ArgumentMetadata) {
    const ApiResponseM = new ApiResponseModel();
    if (jar.name == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad name';
      throw new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else if (jar.color == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad color';
      new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else if (jar.percent == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad percernt';
      new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else if (jar.userId == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad userId';
      new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else {
      return jar;
    }
  }
}
