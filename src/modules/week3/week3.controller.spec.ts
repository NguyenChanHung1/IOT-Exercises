import { Test, TestingModule } from '@nestjs/testing';
import { Week3Controller } from './week3.controller';

describe('Week3Controller', () => {
  let controller: Week3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Week3Controller],
    }).compile();

    controller = module.get<Week3Controller>(Week3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
