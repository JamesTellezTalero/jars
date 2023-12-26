import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ApiResponseModel } from 'src/general-models/api-response.model';
import { TagsDto } from 'src/tags/tags.dto';

@Injectable()
export class TagsPipe implements PipeTransform {
  transform(tag: TagsDto, metadata: ArgumentMetadata) {
    let ApiResponseM = new ApiResponseModel();
    if (tag.name == null) {
      ApiResponseM.Data = null;
      ApiResponseM.Message = 'No se registra la propiedad name.';
      ApiResponseM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(ApiResponseM, HttpStatus.NOT_FOUND);
    } else if (tag.userid == null) {
      ApiResponseM.Data = null;
      ApiResponseM.Message = 'No se registra la propiedad userid.';
      ApiResponseM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(ApiResponseM, HttpStatus.NOT_FOUND);
    } else {
      return tag;
    }
  }
}
