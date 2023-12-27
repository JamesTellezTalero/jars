import { Test, TestingModule } from '@nestjs/testing';
import { JarsStadisticsController } from './jars-stadistics.controller';

describe('JarsStadisticsController', () => {
  let controller: JarsStadisticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JarsStadisticsController],
    }).compile();

    controller = module.get<JarsStadisticsController>(JarsStadisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
