import { Body, Controller, Get, Logger, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateProduct } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }
    @Get()
    async findAll(): Promise<Product[]> {
        const entity = await this.productService.findAll()
        Logger.log(
            `[product] [GET] getCafindAllrbonFootPrint: getting all product`
        )
        if (!entity) {
            throw new NotFoundException(`No product find, start by inserting a product.`);
        }
        return entity
    }
    @Get('/name/:product_name')
    async findProductByName(@Param("product_name") product_name: string) {
        Logger.log(
            `[product] [GET] findProductByName: find a product by name.`
        )
        const entity = await this.productService.findByName(product_name)
        if (!entity) {
            throw new NotFoundException(`No product find with name :${product_name}`);
        }
        return entity
    }

    @Get('/id/:id')
    async findProductById(@Param("id") id: number) {
        Logger.log(
            `[product] [GET] findProductById: find a product by id.`
        )
        const entity = await this.productService.findById(id)
        if (!entity) {
            throw new NotFoundException(`No product find with id :${id}`);
        }
        else { return entity }
    }

    @Post()
    createProduct(@Body() newProduct: CreateProduct): Promise<Product | null> {
        Logger.log(
            `[product] [POST] createProduct : create new product.`
        );

        return this.productService.createProduct(newProduct)
    }
}