import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { MovementsDto } from 'src/movements/movements.dto';

@Injectable()
export class MovementsPipe implements PipeTransform {
  transform(movement: MovementsDto, metadata: ArgumentMetadata) {
    const ApiResponseM = new ApiResponseModel();
    if (movement.title == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad title';
      throw new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else if (movement.amount == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = HttpStatus.FORBIDDEN;
      ApiResponseM.Message = 'No se registra la propiedad amount';
      throw new HttpException(ApiResponseM, HttpStatus.FORBIDDEN);
    } else {
      return movement;
    }
  }
}
