import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsPipe } from 'src/common/tags/tags.pipe';
import { TagsDto, UpdateTagsDto } from './tags.dto';
import { GeneralModuleService } from 'src/general-module/general-module.service';
import { UpdateTagsPipe } from 'src/common/tags/update-tags.pipe';
import { ApiResponse } from '@nestjs/swagger';
import { ApiResponseModel } from 'src/general-models/api-response.model';

@Controller('tags')
export class TagsController {
  constructor(
    private readonly TagsS: TagsService,
    private readonly GeneralModoleS: GeneralModuleService,
  ) {}

  private readonly ControllerContext = 'Tags: ';

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tags: Created Success!',
    type: ApiResponseModel,
  })
  @Post('/')
  async Create(@Body(TagsPipe) tag: TagsDto) {
    let respM = await this.GeneralModoleS.GetApiResponseModel();
    respM.Data = (await this.TagsS.Create(tag)) || {};
    respM.Message = this.ControllerContext + 'Created Success!';
    respM.StatusCode = HttpStatus.CREATED;
    return respM;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Tags: Updated Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tags: Submitted tag does not register',
    type: ApiResponseModel,
  })
  @Put('/')
  async Update(@Body(UpdateTagsPipe) tag: UpdateTagsDto) {
    let respM = await this.GeneralModoleS.GetApiResponseModel();
    respM.Data = await this.TagsS.Update(tag);
    respM.Message = this.ControllerContext + 'Updated Success!';
    respM.StatusCode = HttpStatus.ACCEPTED;
    return respM;
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tags: GetAll Success!',
    type: ApiResponseModel,
  })
  @Get('/')
  async GetAll() {
    let respM = await this.GeneralModoleS.GetApiResponseModel();
    respM.Data = (await this.TagsS.GetAll()) || [];
    respM.Message = this.ControllerContext + 'GetAll Success!';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tags: GetById Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Tags: The id property is not valid',
    type: ApiResponseModel,
  })
  @Get('/:id')
  async GetById(@Param('id') id: string) {
    let respM = await this.GeneralModoleS.GetApiResponseModel();
    if (id == null || isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'The id property is not valid';
      respM.StatusCode = HttpStatus.FORBIDDEN;
    } else {
      respM.Data = (await this.TagsS.GetById(Number(id))) || {};
      respM.Message = this.ControllerContext + 'GetById Success!';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Tags: Delete Success!',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Tags: The id property is not valid',
    type: ApiResponseModel,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tags: Submitted tag does not register',
    type: ApiResponseModel,
  })
  @Delete('/:id')
  async Delete(@Param('id') id: string) {
    let respM = await this.GeneralModoleS.GetApiResponseModel();
    if (id == null || isNaN(Number(id))) {
      respM.Data = null;
      respM.Message = this.ControllerContext + 'The id property is not valid';
      respM.StatusCode = HttpStatus.FORBIDDEN;
    } else {
      respM.Data = (await this.TagsS.Delete(Number(id))) || {};
      respM.Message = this.ControllerContext + 'Delete Success!';
      respM.StatusCode = HttpStatus.ACCEPTED;
      return respM;
    }
  }
}
