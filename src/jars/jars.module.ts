import { Module } from '@nestjs/common';
import { JarsService } from './jars.service';
import { JarsController } from './jars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jars } from 'src/database/entities/Jars';
import { UsersModule } from 'src/users/users.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Jars, JarsSchema } from './jars.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Jars]), UsersModule],
  providers: [JarsService],
  controllers: [JarsController],
  exports: [JarsService],
})
export class JarsModule {}
