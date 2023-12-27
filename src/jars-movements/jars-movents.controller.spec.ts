import { Test, TestingModule } from '@nestjs/testing';
import { JarsMoventsController } from './jars-movents.controller';

describe('JarsMoventsController', () => {
  let controller: JarsMoventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JarsMoventsController],
    }).compile();

    controller = module.get<JarsMoventsController>(JarsMoventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
