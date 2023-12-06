import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { UpdateMovementTypeDto } from 'src/movement-types/movement-types.dto';

@Injectable()
export class MovementTypesUpdatePipe implements PipeTransform {
  transform(MovementType: UpdateMovementTypeDto, metadata: ArgumentMetadata) {
    const ApiResponseM: ApiResponseModel = {
      Data: {},
      StatusCode: 0,
      Message: '',
    };
    if (MovementType.id == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad id';
      throw ApiResponseM;
    } else if (MovementType.name == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad name';
      throw ApiResponseM;
    } else {
      return MovementType;
    }
  }
}
