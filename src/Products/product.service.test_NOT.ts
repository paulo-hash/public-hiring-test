import { dataSource, GreenlyDataSource } from "../../config/dataSource";
import { getProduct } from '../seed-dev-data';
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

let service: ProductService
let hamCheesePizza_kg = getProduct("hamCheesePizza_kg")
let hamCheesePizza_gr = getProduct("hamCheesePizza_gr") // same as before but with ingredient unit gramme
let hamCheesePizza_l = getProduct("hamCheesePizza_l")  // contains an ingredient in liter 
let burger = getProduct("Burger") // contains an unavailable carbon factor ingredient



beforeAll(async () => {
  await dataSource.initialize();
  service = new ProductService(dataSource.getRepository(Product));
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
  await dataSource.getRepository(Product).save(hamCheesePizza_kg);

});

describe('Product.service', () => {

  it('Should retreive product', async () => {
    let products: Product[] = await service.findAll();
    expect(products).toHaveLength(1);
  });

  it('Should create products', async () => {
    let products = await service.createProduct(hamCheesePizza_gr);
    const retrievePorduct = await dataSource
      .getRepository(Product)
      .findOne({ where: { name: "hamCheesePizza_gr" } });
    expect(retrievePorduct?.name).toBe("hamCheesePizza_gr");
  });

  it('Shouldnt allow the creation of another product with the same name but different ingredients', async () => {
    // Creation of the product minus ingredients but same name
    let product = {
      name: "hamCheesePizza_kg",
      ingredients: [
        { name: "ham", quantity: 0.1, unit: "kg" },
        { name: "cheese", quantity: 0.15, unit: "kg" }]
    }

      ;
    await expect(service.createProduct(product)).rejects.toThrow(Error);
  });

  it('Shouldnt allow the creation of a product without ingredients', async () => {
    // Creation of the product minus ingredients but same name
    let product = {
      name: "hamCheesePizza",
      ingredients: []
    }

      ;
    await expect(service.createProduct(product)).rejects.toThrow(Error);
  });

  it('Shouldnt allow the creation of 2 identic products', async () => {
    await expect(service.createProduct(hamCheesePizza_kg)).rejects.toThrow(Error);
  });



});

afterAll(async () => {
  await dataSource.destroy();
});
