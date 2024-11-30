import { dataSource } from "../config/dataSource";
import { CarbonEmissionFactor } from "./carbonEmissionFactor/carbonEmissionFactor.entity";

export const TEST_CARBON_EMISSION_FACTORS = [
  {
    name: "ham",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.11,
    source: "Agrybalise",
  },
  {
    name: "cheese",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.12,
    source: "Agrybalise",
  },
  {
    name: "tomato",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.13,
    source: "Agrybalise",
  },
  {
    name: "flour",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.14,
    source: "Agrybalise",
  },
  {
    name: "blueCheese",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.34,
    source: "Agrybalise",
  },
  {
    name: "vinegar",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.14,
    source: "Agrybalise",
  },
  {
    name: "beef",
    unit: "kg",
    emissionCO2eInKgPerUnit: 14,
    source: "Agrybalise",
  },
  {
    name: "oliveOil",
    unit: "kg",
    emissionCO2eInKgPerUnit: 0.15,
    source: "Agrybalise",
  },
].map((args) => {
  return new CarbonEmissionFactor({
    name: args.name,
    unit: args.unit,
    emissionCO2eInKgPerUnit: args.emissionCO2eInKgPerUnit,
    source: args.source,
  });
});

export const PRODUCTS = [
  {
    name: "hamCheesePizza_kg",
    ingredients: [
      { name: "ham", quantity: 0.1, unit: "kg" },
      { name: "cheese", quantity: 0.15, unit: "kg" },
      { name: "tomato", quantity: 0.4, unit: "kg" },
      { name: "flour", quantity: 0.7, unit: "kg" },
      { name: "oliveOil", quantity: 0.3, unit: "kg" },
    ]
  },
  {
    name: "hamCheesePizza_kg",
    ingredients: [
      { name: "ham", quantity: 0.1, unit: "kg" },
      { name: "cheese", quantity: 0.15, unit: "kg" },
      { name: "tomato", quantity: 0.4, unit: "kg" },
      { name: "flour", quantity: 0.7, unit: "kg" },
      { name: "oliveOil", quantity: 0.3, unit: "kg" },
    ]
  },

  {
    name: "Burger",
    ingredients: [
      { name: "beef", quantity: 0.1, unit: "kg" },
      { name: "blueCheese", quantity: 0.15, unit: "kg" },
      { name: "flour", quantity: 0.4, unit: "kg" },
      { name: "vinegar", quantity: 0.7, unit: "kg" },
      { name: "MissingIngredient", quantity: 0.3, unit: "kg" },
    ]
  },
  {
    name: "hamCheesePizza_gr",
    ingredients: [
      { name: "ham", quantity: 0.1, unit: "gr" },
      { name: "cheese", quantity: 0.15, unit: "gr" },
      { name: "tomato", quantity: 0.4, unit: "gr" },
      { name: "flour", quantity: 0.7, unit: "gr" },
      { name: "oliveOil", quantity: 0.3, unit: "gr" },
    ]
  },
  {
    name: "hamCheesePizza_l",
    ingredients: [
      { name: "ham", quantity: 0.1, unit: "gr" },
      { name: "cheese", quantity: 0.15, unit: "gr" },
      { name: "tomato", quantity: 0.4, unit: "l" },
      { name: "flour", quantity: 0.7, unit: "gr" },
      { name: "oliveOil", quantity: 0.3, unit: "gr" },
    ]
  },

].map((args) => {
  return { name: args.name, ingredients: args.ingredients };
});

export const getProduct = (name: string) => {
  const product = PRODUCTS.find(
    (pr) => pr.name === name
  );
  if (!product) {
    throw new Error(
      `test emission factor with name ${name} could not be found`
    );
  }
  return product;
};

export const getTestEmissionFactor = (name: string) => {
  const emissionFactor = TEST_CARBON_EMISSION_FACTORS.find(
    (ef) => ef.name === name
  );
  if (!emissionFactor) {
    throw new Error(
      `test emission factor with name ${name} could not be found`
    );
  }
  return emissionFactor;
};

export const seedTestCarbonEmissionFactors = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const carbonEmissionFactorsService =
    dataSource.getRepository(CarbonEmissionFactor);

  await carbonEmissionFactorsService.save(TEST_CARBON_EMISSION_FACTORS);
};

if (require.main === module) {
  seedTestCarbonEmissionFactors().catch((e) => console.error(e));
}
