import { Injectable } from '@nestjs/common';
import { ApiResponseModel } from 'src/general-models/api-response.model';

@Injectable()
export class GeneralModuleService {
  async GetApiResponseModel(): Promise<ApiResponseModel> {
    return new ApiResponseModel();
  }
}
