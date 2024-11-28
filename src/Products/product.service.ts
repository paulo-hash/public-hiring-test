import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { CreateProduct } from './dto/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly ProductRepository: Repository<Product>
    ) { }

    async findAll(): Promise<Product[]> {
        return await this.ProductRepository.find({ relations: ['ingredients'], });
    }

    async findByName(name: string): Promise<Product | null> {
        return await this.ProductRepository.findOne({ where: { name: name }, relations: ['ingredients'] });

    }

    async findById(id: number): Promise<Product | null> {
        return await this.ProductRepository.findOne({ where: { id: id }, relations: ['ingredients'] });

    }

    async createProduct(product: CreateProduct): Promise<Product | null> {
        return this.ProductRepository.save(product)
    }

}