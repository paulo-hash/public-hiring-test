import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put } from "@nestjs/common";
import { CarbonEmissionFactor } from "./carbonEmissionFactor.entity";
import { CarbonEmissionFactorsService } from "./carbonEmissionFactors.service";
import { CreateCarbonEmissionFactorDto } from "./dto/create-carbonEmissionFactor.dto";
import { PatchCarbonEmissionFactorDto } from "./dto/patch-carbonEmissionFactor.dto";
import { UpdateCarbonEmissionFactorDto } from "./dto/update-carbonEmissionFactor.dto";

@Controller("carbon-emission-factors")
export class CarbonEmissionFactorsController {
  constructor(
    private readonly carbonEmissionFactorService: CarbonEmissionFactorsService
  ) { }

  @Get()
  getCarbonEmissionFactors(): Promise<CarbonEmissionFactor[]> {
    Logger.log(
      `[carbon-emission-factors] [GET] CarbonEmissionFactor: getting all CarbonEmissionFactors`
    );
    return this.carbonEmissionFactorService.findAll();
  }
  @Get(':name')
  getCarbonEmissionFactor(@Param("name") name: string): Promise<CarbonEmissionFactor | null> {
    return this.carbonEmissionFactorService.findByName(name);
  }
  @Post()
  createCarbonEmissionFactors(
    @Body() carbonEmissionFactors: CreateCarbonEmissionFactorDto[]
  ): Promise<CarbonEmissionFactor[] | null> {
    ``;
    Logger.log(
      `[carbon-emission-factors] [POST] CarbonEmissionFactor: ${carbonEmissionFactors} created`
    );
    return this.carbonEmissionFactorService.save(carbonEmissionFactors);
  }

  @Put()
  async updateOrCreateCarbonEmissionFactor(@Body() carbonEmissionFactors: UpdateCarbonEmissionFactorDto[]) {
    try {
      return await this.carbonEmissionFactorService.updateOrCreate(carbonEmissionFactors)
    }
    catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  updateByIdCarbonEmissionFactor(@Param('id') id: number, @Body() carbonEmissionFactors: PatchCarbonEmissionFactorDto) {
    return this.carbonEmissionFactorService.updateById(id, carbonEmissionFactors)
  }

  @Delete(':id')
  deleteByIdCarbonEmissionFactor(@Param('id') id: number) {
    try {
      return this.carbonEmissionFactorService.deleteById(id)
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
