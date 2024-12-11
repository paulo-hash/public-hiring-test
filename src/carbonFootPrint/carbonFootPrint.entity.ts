import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../Products/product.entity';

@Entity({ name: 'carbon_foot_print' })
export class CarbonFootPrint extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: true,
    default: 'Agrybalise',
  })
  source: string;

  @Column({
    type: 'float',
    nullable: true,
  })
  emissionCO2: number | null;

  @ManyToOne(() => Product, (product) => product.emissionCO2)
  product: Product;

  constructor(props: {
    name: string;
    product: Product;
    emissionCO2: number | null;
  }) {
    super();
    this.product = props?.product;
    this.name = props?.name;
    this.emissionCO2 = props?.emissionCO2;
  }
}
