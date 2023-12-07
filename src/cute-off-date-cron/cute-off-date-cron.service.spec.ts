import { Test, TestingModule } from '@nestjs/testing';
import { CuteOffDateCronService } from './cute-off-date-cron.service';

describe('CuteOffDateCronService', () => {
  let service: CuteOffDateCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuteOffDateCronService],
    }).compile();

    service = module.get<CuteOffDateCronService>(CuteOffDateCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
