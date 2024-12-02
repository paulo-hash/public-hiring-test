import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarbonEmissionFactor } from "./carbonEmissionFactor.entity";
import { CreateCarbonEmissionFactorDto } from "./dto/create-carbonEmissionFactor.dto";

@Injectable()
export class CarbonEmissionFactorsService {
  constructor(
    @InjectRepository(CarbonEmissionFactor)
    private carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>
  ) { }

  findAll(): Promise<CarbonEmissionFactor[]> {
    return this.carbonEmissionFactorRepository.find();
  }

  findByName(name: string): Promise<CarbonEmissionFactor | null> {

    const entity = this.carbonEmissionFactorRepository.findOne({
      where: {
        name: name
      }
    });
    return entity

  }
  save(
    carbonEmissionFactor: CreateCarbonEmissionFactorDto[]
  ): Promise<CarbonEmissionFactor[] | null> {
    return this.carbonEmissionFactorRepository.save(carbonEmissionFactor);
  }
}
