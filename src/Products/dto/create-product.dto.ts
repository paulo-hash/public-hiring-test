import { ApiProperty } from "@nestjs/swagger";
import { Ingredient } from "../../Ingredients/Interface/ingredient.interface";

export class CreateProduct {
  @ApiProperty({ example: 'Pizza', description: 'Name of the product', required: true })
  name: string;
  @ApiProperty({ example: 'ingredients: [{ name: "ham", quantity: 0.1, unit: "kg" },{ name: "cheese", quantity: 0.15, unit: "kg" }]', description: 'Ingredient object list', required: true })
  ingredients: Ingredient[];
}