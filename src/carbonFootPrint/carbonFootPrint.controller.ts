import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Role } from '../auth/Role/role.enum';
import { Roles } from '../auth/Role/roles.decorator';
import { RolesGuard } from '../auth/Role/roles.guard';
import { CreateProduct } from '../Products/dto/create-product.dto';
import { CarbonFootPrint } from './carbonFootPrint.entity';
import { CarbonFootPrintService } from './carbonFootPrint.service';

@ApiTags('Carbon foot print controller')
@Controller('carbon-foot-print')
@UseGuards(JwtGuard, RolesGuard)
export class CarbonFootPrintController {
  constructor(
    private readonly carbonFootPrintService: CarbonFootPrintService
  ) {}
  @Get()
  @ApiOperation({ summary: 'Find all the carbon foot print' })
  @ApiResponse({
    status: 200,
    description: 'Carbon foot prints successfuly found.',
  })
  async findAll(): Promise<CarbonFootPrint[]> {
    Logger.log(
      `[carbon-foot-print] [GET] findAll: getting all CarbonFootPrint`
    );
    const entity = await this.carbonFootPrintService.findAll();
    if (!entity) {
      throw new NotFoundException(`No carbon calculation found.`);
    }
    return entity;
  }
  @Get(':product_name')
  @ApiOperation({ summary: 'Find the carbon foot print by product name' })
  @ApiResponse({
    status: 200,
    description: 'Carbon foot print successfuly found.',
  })
  async getCarbonFootPrint(
    @Param('product_name') product_name: string
  ): Promise<CarbonFootPrint | null> {
    Logger.log(
      `[carbon-foot-print] [GET] getCarbonFootPrint: getting all CarbonFootPrint by name`
    );
    try {
      return await this.carbonFootPrintService.findByName(product_name);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post('/computation')
  @Roles(Role.Admin)
  @ApiOperation({
    summary:
      'Compute the carbon foot print and create new product if necessary',
  })
  @ApiResponse({
    status: 201,
    description: 'Carbon foot print successfuly computed.',
  })
  async postComputationFromProduct(
    @Body() newProduct: CreateProduct
  ): Promise<CarbonFootPrint | null> {
    Logger.log(`[carbon-foot-print] [POST] postComputationFromProduct.`);
    try {
      return await this.carbonFootPrintService.computationFromProduct(
        newProduct
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/computation/:id')
  @ApiOperation({ summary: 'Compute the carbon foot print of a product by id' })
  @ApiResponse({
    status: 200,
    description: 'Carbon foot print successfuly computed.',
  })
  async postComputationFromProductId(
    @Param('id') id: number
  ): Promise<CarbonFootPrint | null> {
    Logger.log(`[carbon-foot-print] [POST] postComputationFromProductId.`);
    try {
      return await this.carbonFootPrintService.computationFromProductId(id);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      throw error; // Rejette les autres erreurs sans modification
    }
  }
}
