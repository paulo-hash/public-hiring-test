import { GreenlyDataSource, dataSource } from "../../config/dataSource";
import { CarbonEmissionFactor } from "./carbonEmissionFactor.entity";

let chickenEmissionFactor: CarbonEmissionFactor;
beforeAll(async () => {
  await dataSource.initialize();
  chickenEmissionFactor = new CarbonEmissionFactor({
    emissionCO2eInKgPerUnit: 2.4,
    unit: "kg",
    name: "chicken",
    source: "Agrybalise",
  });
});
beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
});
describe("FoodProductEntity", () => {
  describe("constructor", () => {
    it("should create an emission factor", () => {
      expect(chickenEmissionFactor.name).toBe("chicken");
    });
    it("should throw an error if the source is empty", () => {
      expect(() => {
        const carbonEmissionFactor = new CarbonEmissionFactor({
          emissionCO2eInKgPerUnit: 2.4,
          unit: "kg",
          name: "chicken",
          source: "",
        });
      }).toThrow();
    });
  });
});

afterAll(async () => {
  await dataSource.destroy();
});
