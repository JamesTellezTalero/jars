import { Test, TestingModule } from '@nestjs/testing';
import { GeneralModuleService } from './general-module.service';

describe('GeneralModuleService', () => {
  let service: GeneralModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralModuleService],
    }).compile();

    service = module.get<GeneralModuleService>(GeneralModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
