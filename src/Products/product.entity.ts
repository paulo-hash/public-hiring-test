import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Ingredient } from "../Ingredients/ingredient.entity";
import { CarbonFootPrint } from "../carbonFootPrint/carbonFootPrint.entity";

@Entity("product")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @OneToMany(() => Ingredient, (ingredient) => ingredient.product, {
        cascade: true,
    })
    ingredients: Ingredient[];

    @OneToMany(() => CarbonFootPrint, (carbonFootPrint) => carbonFootPrint.product,)
    emissionCO2: CarbonFootPrint[];

    @BeforeInsert()
    sanitize() {
        if (this.ingredients.length === 0) {
            throw new Error("The product must contains ingredients !");
        }
    }

    constructor(props: { name: string; ingredients: Ingredient[] }) {
        super();
        this.name = props?.name;
        this.ingredients = props?.ingredients;
    }
}