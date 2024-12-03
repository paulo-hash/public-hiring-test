import { Test, TestingModule } from '@nestjs/testing';
import { AutghService } from './autgh.service';

describe('AutghService', () => {
  let service: AutghService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutghService],
    }).compile();

    service = module.get<AutghService>(AutghService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
