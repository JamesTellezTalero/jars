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

@Controller('tags')
export class TagsController {
  constructor(
    private readonly TagsS: TagsService,
    private readonly GeneralModoleS: GeneralModuleService,
  ) {}

  private readonly ControllerContext = 'Tags: ';

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async Create(@Body(TagsPipe) tag: TagsDto) {
    let respM = await this.GeneralModoleS.GetApiResponseModel();
    respM.Data = (await this.TagsS.Create(tag)) || {};
    respM.Message = this.ControllerContext + 'Created Success';
    respM.StatusCode = HttpStatus.CREATED;
    return respM;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/')
  async Update(@Body(UpdateTagsPipe) tag: UpdateTagsDto) {
    let respM = await this.GeneralModoleS.GetApiResponseModel();
    respM.Data = (await this.TagsS.Update(tag)) || {};
    respM.Message = this.ControllerContext + 'Updated Success';
    respM.StatusCode = HttpStatus.ACCEPTED;
    return respM;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async GetAll() {
    let respM = await this.GeneralModoleS.GetApiResponseModel();
    respM.Data = (await this.TagsS.GetAll()) || [];
    respM.Message = this.ControllerContext + 'GetAll Success';
    respM.StatusCode = HttpStatus.OK;
    return respM;
  }
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async GetById(@Param('id') id: string) {
    let respM = await this.GeneralModoleS.GetApiResponseModel();
    if (id == null || isNaN(Number(id))) {
      respM.Data = null;
      respM.Message =
        this.ControllerContext + 'Submitted tag does not register';
      respM.StatusCode = HttpStatus.NOT_FOUND;
    } else {
      respM.Data = (await this.TagsS.GetById(Number(id))) || {};
      respM.Message = this.ControllerContext + 'GetById Success';
      respM.StatusCode = HttpStatus.OK;
      return respM;
    }
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('/:id')
  async Delete(@Param('id') id: string) {
    let respM = await this.GeneralModoleS.GetApiResponseModel();
    if (id == null || isNaN(Number(id))) {
      respM.Data = null;
      respM.Message =
        this.ControllerContext + 'Submitted tag does not register';
      respM.StatusCode = HttpStatus.NOT_FOUND;
    } else {
      respM.Data = (await this.TagsS.Delete(Number(id))) || {};
      respM.Message = this.ControllerContext + 'Delete Success';
      respM.StatusCode = HttpStatus.ACCEPTED;
      return respM;
    }
  }
}
