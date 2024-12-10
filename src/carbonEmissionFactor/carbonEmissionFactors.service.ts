import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarbonEmissionFactor } from "./carbonEmissionFactor.entity";
import { CreateCarbonEmissionFactorDto } from "./dto/create-carbonEmissionFactor.dto";
import { PatchCarbonEmissionFactorDto } from "./dto/patch-carbonEmissionFactor.dto";
import { UpdateCarbonEmissionFactorDto } from "./dto/update-carbonEmissionFactor.dto";

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


  /**
     * Create or update a carbon food print in bulk
     * @param carbonEmissionFactors a list of carbonEmissionFactors with id
     * @returns the list of carbon emission factor udpated and created
     */
  async updateOrCreate(carbonEmissionFactors: UpdateCarbonEmissionFactorDto[]): Promise<CarbonEmissionFactor[]> {
    const operations = carbonEmissionFactors.map(async (carbonEmissionFactor) => {
      try {
        // Check if the Id already exist
        const existingCef = await this.carbonEmissionFactorRepository.findOne({
          where: { id: carbonEmissionFactor.id },
        });

        if (existingCef && carbonEmissionFactor.id) {
          console.log(carbonEmissionFactor.id, existingCef)
          // Update if exist
          const merged = this.carbonEmissionFactorRepository.merge(
            existingCef,
            carbonEmissionFactor
          );
          Logger.log(
            `updateOrCreate: Updating emission factor for: ${merged.name}`
          );
          return await this.carbonEmissionFactorRepository.save(merged);
        } else {

          const { id, ...toSave } = carbonEmissionFactor;
          Logger.log(
            `updateOrCreate: Creating new emission factor without ID: ${toSave.name}`
          );
          return await this.carbonEmissionFactorRepository.save(toSave);
        }
      } catch (error) {
        Logger.error(
          `updateOrCreate: Error while processing emission factor with ID ${carbonEmissionFactor.id || 'unknown'
          }. Details: ${error}`
        );
        throw new Error(
          `Failed to process emission factor: ${error.message || error}`
        );
      }
    });

    return Promise.all(operations);
  }


  /**
   * Update on emission factor based on the Id
   * @param carbonEmissionFactor contains the fields to update
   * @param id id of the carbon emission factor to update
   * @returns the updated emission factor
   */
  async updateById(id: number, carbonEmissionFactor: PatchCarbonEmissionFactorDto) {
    let cef = await this.carbonEmissionFactorRepository.findOne({
      where: {
        id: id
      }
    })
    if (!cef) {
      throw new Error(`Product id :${id} not found`)
    }
    return this.carbonEmissionFactorRepository.save(this.carbonEmissionFactorRepository.merge(cef, carbonEmissionFactor))
  }

  async deleteById(id: number) {
    const exist = await this.carbonEmissionFactorRepository.findOne({
      where: { id: id }
    })
    if (!exist) {
      throw new Error(`Product id : ${id} does not exist.`)
    }
    return this.carbonEmissionFactorRepository.delete(id)
  }
}
