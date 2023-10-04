import { Test, TestingModule } from '@nestjs/testing';
import { MovementTypesController } from './movement-types.controller';

describe('MovementTypesController', () => {
  let controller: MovementTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementTypesController],
    }).compile();

    controller = module.get<MovementTypesController>(MovementTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
