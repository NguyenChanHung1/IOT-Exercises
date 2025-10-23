import { Test, TestingModule } from '@nestjs/testing';
import { Week2Service } from './week2.service';

describe('Week2Service', () => {
  let service: Week2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Week2Service],
    }).compile();

    service = module.get<Week2Service>(Week2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
