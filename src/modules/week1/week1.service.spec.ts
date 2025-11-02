import { Test, TestingModule } from '@nestjs/testing';
import { Week1Service } from './week1.service';

describe('Week1Service', () => {
  let service: Week1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Week1Service],
    }).compile();

    service = module.get<Week1Service>(Week1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
