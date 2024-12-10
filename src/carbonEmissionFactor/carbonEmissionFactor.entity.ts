import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, VersionColumn } from "typeorm";

@Entity("carbon_emission_factors")
@Index(["name"])
export class CarbonEmissionFactor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true
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
  emissionCO2eInKgPerUnit: number;

  @Column({
    nullable: false,
  })
  source: string;

  // Colonne pour le versionnement
  @VersionColumn()
  version: number;

  sanitize() {
    if (this.source === "") {
      throw new Error("Source cannot be empty");
    }
  }

  constructor(props: {
    name: string;
    unit: string;
    emissionCO2eInKgPerUnit: number;
    source: string;
  }) {
    super();

    this.name = props?.name;
    this.unit = props?.unit;
    this.emissionCO2eInKgPerUnit = props?.emissionCO2eInKgPerUnit;
    this.source = props?.source;
    this.sanitize();
  }
}