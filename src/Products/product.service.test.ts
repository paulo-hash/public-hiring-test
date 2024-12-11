import { dataSource, GreenlyDataSource } from "../../config/dataSource";
import { getProduct } from "../seed-dev-data";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

let service: ProductService;
const hamCheesePizza_kg = getProduct("hamCheesePizza_kg");
const hamCheesePizza_gr = getProduct("hamCheesePizza_gr"); // same as before but with ingredient unit gramme

beforeAll(async () => {
  await dataSource.initialize();
  service = new ProductService(dataSource.getRepository(Product));
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
  await dataSource.getRepository(Product).save(hamCheesePizza_kg);
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("Product.service", () => {
  it("Should retreive product", async () => {
    const products: Product[] = await service.findAll();
    expect(products).toHaveLength(1);
  });

  it("Should create products", async () => {
    const retrievePorduct = await dataSource
      .getRepository(Product)
      .findOne({ where: { name: "hamCheesePizza_gr" } });
    expect(retrievePorduct?.name).toBe("hamCheesePizza_gr");
  });

  it("Shouldnt allow the creation of another product with the same name but different ingredients", async () => {
    // Creation of the product minus ingredients but same name
    const product = {
      name: "hamCheesePizza_kg",
      ingredients: [
        { name: "ham", quantity: 0.1, unit: "kg" },
        { name: "cheese", quantity: 0.15, unit: "kg" },
      ],
    };

    await expect(service.createProduct(product)).rejects.toThrow(
      "The product hamCheesePizza_kg already exist but with other ingredients.",
    );
  });

  it("Shouldn t allow the creation of a product without ingredients", async () => {
    // Creation of the product minus ingredients but same name
    const product = {
      name: "hamCheesePizza",
      ingredients: [],
    };
    await expect(service.createProduct(product)).rejects.toThrow(
      "A product must have ingredients",
    );
  });

  it("Shouldnt allow the creation of 2 identic products", async () => {
    await expect(service.createProduct(hamCheesePizza_kg)).rejects.toThrow(
      "The product already exist.",
    );
  });
});
