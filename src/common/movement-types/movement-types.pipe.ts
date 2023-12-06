import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { MovementTypeDto } from 'src/movement-types/movement-types.dto';

@Injectable()
export class MovementTypesPipe implements PipeTransform {
  transform(MovementType: MovementTypeDto, metadata: ArgumentMetadata) {
    const ApiResponseM: ApiResponseModel = {
      Data: {},
      StatusCode: 0,
      Message: '',
    };
    if (MovementType.name == null) {
      ApiResponseM.Data = null;
      ApiResponseM.StatusCode = 400;
      ApiResponseM.Message = 'No se registra la propiedad name';
      throw ApiResponseM;
    } else {
      return MovementType;
    }
  }
}
