import { Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { Users } from './users.entities';
// import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  // constructor(
  //   @InjectModel('Users')
  //   private readonly UsersModel: Model<Users>,
  // ) {}

  async testCreateRecord() {
    // const user = new this.UsersModel({
    //   username: '2222222',
    //   email: 'wwwwwwwww',
    //   password: '2222222222',
    //   darkmode: true,
    //   createdAt: new Date(),
    // });

    return 'user.save()';
  }
}
