import { IsNumber, IsOptional, IsString } from "class-validator";

export class PatchCarbonEmissionFactorDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsNumber()
  @IsOptional()
  emissionCO2eInKgPerUnit?: number;

  @IsString()
  @IsOptional()
  source?: string;
}
