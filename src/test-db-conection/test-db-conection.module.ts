import { Module } from '@nestjs/common';
import { TestDbConectionService } from './test-db-conection.service';
import { TestDbConectionController } from './test-db-conection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TestDbConection,
  TestDbConectionSchema,
} from './test-db-conection.entitie';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TestDbConection.name,
        schema: TestDbConectionSchema,
      },
    ]),
  ],
  providers: [TestDbConectionService],
  controllers: [TestDbConectionController],
})
export class TestDbConectionModule {}
