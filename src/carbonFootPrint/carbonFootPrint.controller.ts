import { Body, Controller, Get, Logger, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateProduct } from '../Products/dto/create-product.dto';
import { CarbonFootPrint } from './carbonFootPrint.entity';
import { CarbonFootPrintService } from './carbonFootPrint.service';


@Controller('carbon-foot-print')
export class CarbonFootPrintController {

    constructor(private readonly carbonFootPrintService: CarbonFootPrintService) { }
    @Get()
    async findAll(): Promise<CarbonFootPrint[]> {
        Logger.log(
            `[carbon-foot-print] [GET] findAll: getting all CarbonFootPrint`
        );
        const entity = await this.carbonFootPrintService.findAll()
        if (!entity) {
            throw new NotFoundException(`No carbon calculation found.`);
        }
        return entity
    }
    @Get(':product_name')
    async getCarbonFootPrint(@Param("product_name") product_name: string): Promise<CarbonFootPrint | null> {
        Logger.log(
            `[carbon-foot-print] [GET] getCarbonFootPrint: getting all CarbonFootPrint by name`
        )
        const entity = await this.carbonFootPrintService.findByName(product_name);
        if (!entity) {
            throw new NotFoundException(`No carbon foot print found for product ${product_name}`);
        }
        return entity
    }

    @Post('/computation')
    postComputationFromProduct(@Body() newProduct: CreateProduct): Promise<CarbonFootPrint | null> {
        Logger.log(
            `[carbon-foot-print] [POST] postComputationFromProduct.`
        );
        return this.carbonFootPrintService.computationFromProduct(newProduct)
    }

    @Post('/computation/:id')
    postComputationFromProductId(@Param("id") id: number): Promise<CarbonFootPrint | null> {
        Logger.log(
            `[carbon-foot-print] [POST] postComputationFromProductId.`
        );
        return this.carbonFootPrintService.computationFromProductId(id)
    }

}