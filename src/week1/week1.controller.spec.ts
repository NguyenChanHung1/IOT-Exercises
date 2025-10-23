import { Test, TestingModule } from '@nestjs/testing';
import { Week1Controller } from './week1.controller';

describe('Week1Controller', () => {
  let controller: Week1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Week1Controller],
    }).compile();

    controller = module.get<Week1Controller>(Week1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
