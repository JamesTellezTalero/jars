import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly TagsS: TagsService) {}

  @Get('/')
  async testCreateRecord() {
    return await this.TagsS.testCreateRecord();
  }
}
