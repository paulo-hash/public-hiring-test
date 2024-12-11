import { GreenlyDataSource, dataSource } from "../../config/dataSource";
import { getTestEmissionFactor } from "../seed-dev-data";
import { CarbonEmissionFactor } from "./carbonEmissionFactor.entity";
import { CarbonEmissionFactorsService } from "./carbonEmissionFactors.service";

const flourEmissionFactor = getTestEmissionFactor("flour");
const hamEmissionFactor = getTestEmissionFactor("ham");
const olivedOilEmissionFactor = getTestEmissionFactor("oliveOil");
let carbonEmissionFactorService: CarbonEmissionFactorsService;

beforeAll(async () => {
  await dataSource.initialize();
  await GreenlyDataSource.cleanDatabase();
  carbonEmissionFactorService = new CarbonEmissionFactorsService(
    dataSource.getRepository(CarbonEmissionFactor),
  );
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
  await dataSource
    .getRepository(CarbonEmissionFactor)
    .save(olivedOilEmissionFactor);
});

describe("CarbonEmissionFactors.service", () => {
  it("should save new emissionFactors", async () => {
    await carbonEmissionFactorService.save([
      hamEmissionFactor,
      flourEmissionFactor,
    ]);
    const retrieveChickenEmissionFactor = await dataSource
      .getRepository(CarbonEmissionFactor)
      .findOne({ where: { name: "flour" } });
    expect(retrieveChickenEmissionFactor?.name).toBe("flour");
  });
  it("should retrieve emission Factors", async () => {
    const carbonEmissionFactors = await carbonEmissionFactorService.findAll();
    expect(carbonEmissionFactors).toHaveLength(1);
  });
  it("should retrieve find by name", async () => {
    const retrieveOliveOilFactor =
      await carbonEmissionFactorService.findByName("oliveOil");
    expect(retrieveOliveOilFactor?.name).toBe("oliveOil");
  });
});

afterAll(async () => {
  await dataSource.destroy();
});
