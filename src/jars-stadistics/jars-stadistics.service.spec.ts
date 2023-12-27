import { Test, TestingModule } from '@nestjs/testing';
import { JarsStadisticsService } from './jars-stadistics.service';

describe('JarsStadisticsService', () => {
  let service: JarsStadisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JarsStadisticsService],
    }).compile();

    service = module.get<JarsStadisticsService>(JarsStadisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
