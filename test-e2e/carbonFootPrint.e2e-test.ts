import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { dataSource, GreenlyDataSource } from "../config/dataSource";
import { AppModule } from "../src/app.module";
import { CarbonEmissionFactor } from "../src/carbonEmissionFactor/carbonEmissionFactor.entity";
import { Product } from "../src/Products/product.entity";
import { getProduct, TEST_CARBON_EMISSION_FACTORS } from "../src/seed-dev-data";

beforeAll(async () => {
  await dataSource.initialize();
  await GreenlyDataSource.cleanDatabase();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("CarbonFootPrintController", () => {
  let app: INestApplication;
  let defaultProduct: Product[];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await dataSource
      .getRepository(Product)
      .save([getProduct("hamCheesePizza_kg")]);

    await dataSource
      .getRepository(CarbonEmissionFactor)
      .save(TEST_CARBON_EMISSION_FACTORS);

    defaultProduct = await dataSource
      .getRepository(Product)
      .find({ relations: ['ingredients'] });
  });

  it("GET /product", async () => {
    return request(app.getHttpServer())
      .get("/product")
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(defaultProduct);
      });
  });

  it("POST /carbon-foot-print/computation", async () => {
    const pizzaProduct = {
      name: 'Pizza',

      ingredients: [
        { name: 'ham', quantity: 0.2, unit: 'kg' },
        { name: 'cheese', quantity: 0.1, unit: 'kg' },
        { name: 'tomato', quantity: 0.1, unit: 'kg' },
        { name: 'flour', quantity: 0.6, unit: 'kg' },
        { name: 'oliveOil', quantity: 0.1, unit: 'kg' },
      ],
    }
    return request(app.getHttpServer())
      .post("/carbon-foot-print/computation/")
      .send([pizzaProduct])
      .expect(201)
      .expect(({ body }) => {
        expect(body.emissionCO2).toEqual(0.22399999999999998);
      });
  });

  it("GET /carbon-foot-print/:product_name", async () => {

    return request(app.getHttpServer())
      .get(`/carbon-foot-print/hamCheesePizza_kg`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.emissionCO2).toEqual(0.22399999999999998);
      });
  });


});
