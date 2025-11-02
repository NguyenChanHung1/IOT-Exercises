import { Test, TestingModule } from '@nestjs/testing';
import { Week3Service } from './week3.service';

describe('Week3Service', () => {
  let service: Week3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Week3Service],
    }).compile();

    service = module.get<Week3Service>(Week3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
