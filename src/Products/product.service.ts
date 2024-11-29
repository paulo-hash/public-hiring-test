import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Ingredient } from '../Ingredients/Interface/ingredient.interface';
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

    /**
     * Query the database in order to retreive a product based on his name and list of ingredient
     * @param productName the product name
     * @param ingredients list of ingredients 
     * @returns return the result of the query
     */
    async findProductWithIngredients(productName: string, ingredients: Ingredient[]): Promise<Product | null> {
        const queryBuilder = this.ProductRepository.createQueryBuilder('product');
        let ingredientsNames: string[] = ingredients.map(ingredient => ingredient.name)
        const product = await queryBuilder
            .innerJoinAndSelect('product.ingredients', 'ingredient')
            .where('product.name = :productName', { productName })
            .andWhere('ingredient.name IN (:...ingredientNames)', { ingredientNames: ingredientsNames })
            .getOne();
        return product
    }

    /**
     * Insert new product if the product name is not already used by another product.
     * @param ingredients a list of ingredients
     * @returns THe newly created product or an error if the product is already in the database.
     */
    async createProduct(product: CreateProduct): Promise<Product | null> {

        // Check if a product already exist with this name
        if (product.ingredients.length === 0) {
            throw new ConflictException('A product must have ingredients')
        }
        let byName = await this.findByName(product.name)
        let byIngredient = await this.findProductWithIngredients(product.name, product.ingredients)

        // If not, the product is created
        if (!byName) {
            return await this.ProductRepository.save(product)
        }

        // If the product already exist we check if the ingredients are the same
        else if (byIngredient?.ingredients.length !== byName.ingredients.length) {
            throw new ConflictException(`The product ${product.name} already exist but with other ingredients.`)
        }
        else {
            throw new ConflictException(`The product already exist.`)
        }
    }

}