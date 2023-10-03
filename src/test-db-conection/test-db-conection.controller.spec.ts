import { Test, TestingModule } from '@nestjs/testing';
import { TestDbConectionController } from './test-db-conection.controller';

describe('TestDbConectionController', () => {
  let controller: TestDbConectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestDbConectionController],
    }).compile();

    controller = module.get<TestDbConectionController>(TestDbConectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
