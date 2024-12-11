import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ingredient } from "../Ingredients/ingredient.entity";
import { CarbonFootPrint } from "../carbonFootPrint/carbonFootPrint.entity";

@Entity("product")
@Index(["name"], { unique: true })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true }) //One name per product per list of ingredients.
  name: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product, {
    cascade: true,
  })
  ingredients: Ingredient[];

  @OneToMany(
    () => CarbonFootPrint,
    (carbonFootPrint) => carbonFootPrint.product,
  )
  emissionCO2: CarbonFootPrint[];

  constructor(props: { name: string; ingredients: Ingredient[] }) {
    super();
    this.name = props?.name;
    this.ingredients = props?.ingredients;
  }
}
