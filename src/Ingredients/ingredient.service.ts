import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ingredient } from "./ingredient.entity";

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly IngredientRepository: Repository<Ingredient>,
  ) {}

  async findAll(): Promise<Ingredient[]> {
    return await this.IngredientRepository.find();
  }
}
