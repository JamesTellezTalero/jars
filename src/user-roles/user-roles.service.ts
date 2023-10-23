import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRoles } from 'src/database/entities/UsersRoles';
import { Repository } from 'typeorm';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UsersRoles)
    private readonly UsersRolesRepo: Repository<UsersRoles>,
  ) {}
  async testCreateRecord() {
    const tag = new UsersRoles();

    tag.name = 'stringDos';
    tag.createdAt = new Date();

    return await this.UsersRolesRepo.save(tag);
  }
}
