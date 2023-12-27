import { Test, TestingModule } from '@nestjs/testing';
import { JarsMoventsService } from './jars-movents.service';

describe('JarsMoventsService', () => {
  let service: JarsMoventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JarsMoventsService],
    }).compile();

    service = module.get<JarsMoventsService>(JarsMoventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
