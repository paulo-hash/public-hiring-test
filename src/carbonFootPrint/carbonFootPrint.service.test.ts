import { dataSource, GreenlyDataSource } from "../../config/dataSource";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import { CarbonEmissionFactorsService } from "../carbonEmissionFactor/carbonEmissionFactors.service";
import { Product } from "../Products/product.entity";
import { ProductService } from "../Products/product.service";
import { getProduct, TEST_CARBON_EMISSION_FACTORS } from "../seed-dev-data";
import { CarbonFootPrint } from "./carbonFootPrint.entity";
import { CarbonFootPrintService } from "./carbonFootPrint.service";

let service: CarbonFootPrintService;
const hamCheesePizza_kg = getProduct("hamCheesePizza_kg");
const hamCheesePizza_gr = getProduct("hamCheesePizza_gr"); // same as before but with ingredient unit gramme
const hamCheesePizza_l = getProduct("hamCheesePizza_l"); // contains an ingredient in liter
const burger = getProduct("Burger"); // contains an unavailable carbon factor ingredient

beforeAll(async () => {
  await dataSource.initialize();
  service = new CarbonFootPrintService(
    new CarbonEmissionFactorsService(
      dataSource.getRepository(CarbonEmissionFactor),
    ),
    new ProductService(dataSource.getRepository(Product)),
    dataSource.getRepository(CarbonFootPrint),
  );
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
  await dataSource
    .getRepository(CarbonEmissionFactor)
    .save(TEST_CARBON_EMISSION_FACTORS);
  await dataSource.getRepository(Product).save(hamCheesePizza_kg);
});

describe("CarbonFootPrint.service", () => {
  it("should compute the carbon foot print by id", async () => {
    // First we retreive the product id in order to compute it
    const productHamCheesePizza_kg = await dataSource
      .getRepository(Product)
      .findOne({ where: { name: "hamCheesePizza_kg" } });
    if (productHamCheesePizza_kg) {
      const cfpHamCheesePizza_kg = await service.computationFromProductId(
        productHamCheesePizza_kg.id,
      );

      expect(cfpHamCheesePizza_kg?.emissionCO2).toBe(
        0.1 * 0.11 + 0.15 * 0.12 + 0.4 * 0.13 + 0.7 * 0.14 + 0.3 * 0.15,
      );
    }
  });

  it("Should compute  the carbon food print from a new product and insert the product in the database", async () => {
    const cfpHamCheesePizza_gr =
      await service.computationFromProduct(hamCheesePizza_gr);
    const product = await dataSource
      .getRepository(Product)
      .findOne({ where: { name: "hamCheesePizza_gr" } });

    expect(cfpHamCheesePizza_gr?.emissionCO2).toBe(
      (0.1 / 1000) * 0.11 +
        (0.15 / 1000) * 0.12 +
        (0.4 / 1000) * 0.13 +
        (0.7 / 1000) * 0.14 +
        (0.3 / 1000) * 0.15,
    );
    expect(product).not.toBeNull();
  });

  it("Should throw an error if the unit is not correct", async () => {
    await expect(
      service.Compute_carbon_foot_print(hamCheesePizza_l.ingredients),
    ).rejects.toThrow(Error);
  });

  it("Should set the result to null if one carbon factor is missing", async () => {
    expect(
      await service.Compute_carbon_foot_print(burger.ingredients),
    ).toBeNull();
  });
});

afterAll(async () => {
  await dataSource.destroy();
});
