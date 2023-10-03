import { Test, TestingModule } from '@nestjs/testing';
import { TestDbConectionService } from './test-db-conection.service';

describe('TestDbConectionService', () => {
  let service: TestDbConectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestDbConectionService],
    }).compile();

    service = module.get<TestDbConectionService>(TestDbConectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
