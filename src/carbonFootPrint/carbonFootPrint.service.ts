import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { CarbonEmissionFactorsService } from "../carbonEmissionFactor/carbonEmissionFactors.service";
import { Ingredient } from '../Ingredients/Interface/ingredient.interface';
import { CreateProduct } from '../Products/dto/create-product.dto';
import { ProductService } from '../Products/product.service';
import { convertInKg } from '../unit_converter/convertInKg';
import { CarbonFootPrint } from './carbonFootPrint.entity';

@Injectable()
export class CarbonFootPrintService {
    constructor(
        private readonly carbonEmissionFactorsService: CarbonEmissionFactorsService,
        private readonly productService: ProductService,
        @InjectRepository(CarbonFootPrint) private readonly CarbonFootPrintRepository: Repository<CarbonFootPrint>
    ) { }

    async findAll(): Promise<CarbonFootPrint[]> {
        return await this.CarbonFootPrintRepository.find({ relations: ['product'] });
    }

    async findByName(product_name: string): Promise<CarbonFootPrint | null> {
        return await this.CarbonFootPrintRepository.findOne({ where: { name: product_name }, relations: ['product'] });
    }
    /**
     * Compute the carbon foot print for a lsit of ingredients if the ingredient exist
     * @param ingredients a list of ingredients
     * @returns the carbon foot print or null if the ingredient dosent exist
     */
    async Compute_carbon_foot_print(ingredients: Ingredient[]): Promise<null | number> {

        let total_emission: number = 0

        for (let ingredient of ingredients) {

            let emission = await this.carbonEmissionFactorsService.findByName(ingredient.name)
            if (emission) {
                let quantity: number = convertInKg(ingredient.quantity, ingredient.unit)
                total_emission += emission.emissionCO2eInKgPerUnit * quantity
            }
            else {
                Logger.warn(
                    `Ingredient ${ingredient.name} carbon factor dosent exist, the carbon foot print is set to null`);
                return null

            }

        }
        return total_emission
    }

    /**
   * Compute the carbon food print of a given product. 
   * If the product is already is the database, the method will take the already existing product for the computation.
   * Then store the result on the carbon foot print table and the product on the database if it didnt exist.
   * @param product a product
   * @returns The repository of the carbon foot print
   */
    async computationFromProduct(product: CreateProduct) {

        // Check if the product is already in the database
        let entity = await this.productService.findByName(product.name)

        // If not we create it
        if (!entity) {
            entity = await this.productService.createProduct(product)
        }

        // Check if the product as correctly been written
        if (!entity) {
            throw new InternalServerErrorException("Error while trying to write the product")
        }

        // Compute the carbon foot print based on the ingredients
        let total_emission = await this.Compute_carbon_foot_print(product.ingredients)

        let carbonFootPrint = {
            name: product.name,
            product: entity,
            emissionCO2: total_emission
        }
        return await this.CarbonFootPrintRepository.save(carbonFootPrint)
    }

    /**
    * Compute the carbon foot print of an already available product using the product id.
    * Then store the result on the carbon foot print table
    * @param id id of the product
    * @returns The repository of the carbon foot print
    */
    async computationFromProductId(id: number) {
        const product = await this.productService.findById(id)
        if (!product) {
            throw new NotFoundException("Product id not found in product table")
        }
        let total_emission = await this.Compute_carbon_foot_print(product.ingredients)
        let carbonFootPrint = {
            name: product.name,
            product: product,
            emissionCO2: total_emission
        }
        return await this.CarbonFootPrintRepository.save(carbonFootPrint)

    }

}