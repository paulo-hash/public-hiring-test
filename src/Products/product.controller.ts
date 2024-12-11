import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { Role } from "../auth/Role/role.enum";
import { Roles } from "../auth/Role/roles.decorator";
import { RolesGuard } from "../auth/Role/roles.guard";
import { CreateProduct } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@ApiTags("Product controller")
@Controller("product")
@UseGuards(JwtGuard, RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @ApiOperation({ summary: "Find all the products" })
  @ApiResponse({
    status: 200,
    description: "List of the product successfuly found.",
  })
  async findAll(): Promise<Product[]> {
    const entity = await this.productService.findAll();
    Logger.log(
      `[product] [GET] getCafindAllrbonFootPrint: getting all product`,
    );
    if (!entity) {
      throw new NotFoundException(
        `No product find, start by inserting a product.`,
      );
    }
    return entity;
  }
  @Get("/name/:product_name")
  @ApiOperation({ summary: "Find product by name" })
  @ApiResponse({ status: 200, description: "The product successfuly found." })
  async findProductByName(@Param("product_name") product_name: string) {
    Logger.log(`[product] [GET] findProductByName: find a product by name.`);
    const entity = await this.productService.findByName(product_name);
    if (!entity) {
      Logger.warn(`findProductByName product : ${product_name} not found.`);
      throw new NotFoundException(`No product find with name :${product_name}`);
    }
    return entity;
  }

  @Get("/id/:id")
  @ApiOperation({ summary: "Find all the products" })
  @ApiResponse({ status: 200, description: "The product successfuly found." })
  async findProductById(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    Logger.log(`[product] [GET] findProductById: find a product by id.`);
    const entity = await this.productService.findById(id);
    if (!entity) {
      Logger.warn(`findProductById product id: ${id} not found.`);
      throw new NotFoundException(`No product find with id :${id}`);
    } else {
      return entity;
    }
  }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Create a product" })
  @ApiResponse({ status: 201, description: "The has been created product." })
  async createProduct(
    @Body() newProduct: CreateProduct,
  ): Promise<Product | null> {
    Logger.log(`[product] [POST] createProduct : create new product.`);
    try {
      return await this.productService.createProduct(newProduct);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
