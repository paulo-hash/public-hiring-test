import { IsNumber, IsString } from "class-validator";

export class UpdateCarbonEmissionFactorDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  unit: string;

  @IsNumber()
  emissionCO2eInKgPerUnit: number;

  @IsString()
  source: string;
}
