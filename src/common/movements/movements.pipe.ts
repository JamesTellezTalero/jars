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
    if (movement.movementType == null || isNaN(movement.movementType)) {
      ApiResponseM.Data = null;
      ApiResponseM.Message = 'No se registra la movementType.';
      ApiResponseM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(ApiResponseM, HttpStatus.NOT_FOUND);
    }
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
