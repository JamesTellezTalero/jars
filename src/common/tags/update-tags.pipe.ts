import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { UpdateTagsDto } from 'src/tags/tags.dto';

@Injectable()
export class UpdateTagsPipe implements PipeTransform {
  transform(tag: UpdateTagsDto, metadata: ArgumentMetadata) {
    let ApiResponseM = new ApiResponseModel();
    if (tag.id == null) {
      ApiResponseM.Data = null;
      ApiResponseM.Message = 'No se registra la propiedad id.';
      ApiResponseM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(ApiResponseM, HttpStatus.NOT_FOUND);
    } else if (tag.name == null) {
      ApiResponseM.Data = null;
      ApiResponseM.Message = 'No se registra la propiedad name.';
      ApiResponseM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(ApiResponseM, HttpStatus.NOT_FOUND);
    } else {
      return tag;
    }
  }
}
