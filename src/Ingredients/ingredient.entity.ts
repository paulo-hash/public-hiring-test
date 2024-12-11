import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "../Products/product.entity";

@Entity("ingredients")
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  unit: string;

  @Column({
    type: "float",
    nullable: false,
  })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.ingredients)
  product: Product;

  constructor(props: { name: string; unit: string; quantity: number }) {
    super();

    this.name = props?.name;
    this.unit = props?.unit;
    this.quantity = props?.quantity;
  }
}
