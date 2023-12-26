import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from 'src/database/entities/Tags';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { TagsDto, UpdateTagsDto } from './tags.dto';
import { GeneralModuleService } from 'src/general-module/general-module.service';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly TagsRepo: Repository<Tags>,
    private readonly GeneralModuleS: GeneralModuleService,
    private readonly UsersS: UsersService,
  ) {}

  private readonly ControllerContext = 'Tags: ';

  async testCreateRecord() {
    const tag = new Tags();
    tag.name = 'string';
    tag.user = await this.UsersS.GetUserById(2);
    tag.createdAt = new Date();
    tag.updatedAt = new Date();
    return tag;
  }

  async Create(tag: TagsDto) {
    let newTag = new Tags();
    newTag.name = tag.name;
    newTag.user = await this.UsersS.GetByEmail(tag.jsonWebTokenInfo.email);
    newTag.createdAt = new Date();
    newTag.updatedAt = new Date();
    newTag = await this.TagsRepo.save(newTag);
    return this.GetById(newTag.id);
  }

  async Update(tag: UpdateTagsDto) {
    let respM = await this.GeneralModuleS.GetApiResponseModel();
    let newTag = await this.GetById(tag.id);
    if (newTag == null) {
      respM.Data = null;
      respM.Message =
        this.ControllerContext + 'Submitted tag does not register';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else {
      newTag.name = tag?.name || newTag.name;
      newTag.user = await this.UsersS.GetByEmail(tag.jsonWebTokenInfo.email);
      newTag.updatedAt = new Date();
      newTag = await this.TagsRepo.save(newTag);
      return this.GetById(newTag.id);
    }
  }

  async GetById(id: number) {
    return await this.TagsRepo.findOne({
      where: {
        id,
      },
    });
  }

  async GetAll() {
    return await this.TagsRepo.find();
  }

  async GetByUserId(id: number) {
    return await this.TagsRepo.find({
      where: {
        user: {
          id,
        },
      },
      relations: ['user'],
    });
  }

  async Delete(id: number) {
    let respM = await this.GeneralModuleS.GetApiResponseModel();
    let newTag = await this.GetById(id);
    if (newTag == null) {
      respM.Data = null;
      respM.Message =
        this.ControllerContext + 'Submitted tag does not register';
      respM.StatusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(respM, HttpStatus.NOT_FOUND);
    } else {
      return await this.TagsRepo.remove(newTag);
    }
  }
  // async testCreateRecord() {
  //   const tag = new Tags();

  //   tag.name = 'string';
  //   tag.user = await this.UsersS.GetUserById(2);
  //   tag.createdAt = new Date();
  //   tag.updatedAt = new Date();

  //   return await this.TagsRepo.save(tag);
  // }
}
