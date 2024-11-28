import { Test, TestingModule } from '@nestjs/testing';
import { CarbonFootPrintController } from './carbonFootPrint.controller';

describe('CarbonFootPrintController', () => {
  let controller: CarbonFootPrintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarbonFootPrintController],
    }).compile();

    controller = module.get<CarbonFootPrintController>(CarbonFootPrintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});