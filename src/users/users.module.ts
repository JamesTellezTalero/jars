import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Users, UsersSchema } from './users.entities';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
