import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonEmissionFactorsModule } from '../carbonEmissionFactor/carbonEmissionFactors.module';
import { Product } from '../Products/product.entity';
import { ProductModule } from '../Products/product.module';
import { CarbonFootPrintController } from './carbonFootPrint.controller';
import { CarbonFootPrint } from './carbonFootPrint.entity';
import { CarbonFootPrintService } from './carbonFootPrint.service';

@Module({
    controllers: [CarbonFootPrintController],
    providers: [CarbonFootPrintService],
    imports: [
        TypeOrmModule.forFeature([CarbonFootPrint, Product]),
        CarbonEmissionFactorsModule,
        ProductModule
    ]
})
export class CarbonFootPrintModule { }