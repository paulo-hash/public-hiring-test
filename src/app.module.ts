import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeorm } from '../config/dataSource';
import { AuthModule } from './auth/auth.module';
import { CarbonEmissionFactorsModule } from './carbonEmissionFactor/carbonEmissionFactors.module';
import { CarbonFootPrintModule } from './carbonFootPrint/carbonFootPrint.module';
import { IngredientModule } from './Ingredients/ingredient.module';
import { ProductModule } from './Products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getOrThrow('typeorm'),
    }),
    CarbonEmissionFactorsModule,
    CarbonFootPrintModule,
    IngredientModule,
    ProductModule,
    AuthModule,
  ],
})
export class AppModule {}
