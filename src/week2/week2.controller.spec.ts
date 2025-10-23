import { Test, TestingModule } from '@nestjs/testing';
import { Week2Controller } from './week2.controller';

describe('Week2Controller', () => {
  let controller: Week2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Week2Controller],
    }).compile();

    controller = module.get<Week2Controller>(Week2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
