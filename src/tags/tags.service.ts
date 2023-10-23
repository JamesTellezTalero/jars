import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from 'src/database/entities/Tags';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly TagsRepo: Repository<Tags>,

    private readonly UsersS: UsersService,
  ) {}
  async testCreateRecord() {
    const tag = new Tags();

    tag.name = 'string';
    tag.user = await this.UsersS.GetUserById(2);
    tag.createdAt = new Date();
    tag.updatedAt = new Date();

    return await this.TagsRepo.save(tag);
  }
}
