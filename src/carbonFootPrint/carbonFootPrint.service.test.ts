import { Test, TestingModule } from '@nestjs/testing';
import { CarbonFootPrintService } from './carbonFootPrint.service';

describe('TestService', () => {
  let service: CarbonFootPrintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarbonFootPrintService],
    }).compile();

    service = module.get<CarbonFootPrintService>(CarbonFootPrintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
