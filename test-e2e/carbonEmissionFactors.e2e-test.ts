import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { dataSource } from '../config/dataSource';
import { AppModule } from '../src/app.module';
import { CarbonEmissionFactor } from '../src/carbonEmissionFactor/carbonEmissionFactor.entity';
import { getTestEmissionFactor } from '../src/seed-dev-data';

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe('CarbonEmissionFactorsController', () => {
  let app: INestApplication;
  let defaultCarbonEmissionFactors: CarbonEmissionFactor[];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await dataSource
      .getRepository(CarbonEmissionFactor)
      .save([getTestEmissionFactor('ham'), getTestEmissionFactor('beef')]);

    defaultCarbonEmissionFactors = await dataSource
      .getRepository(CarbonEmissionFactor)
      .find();
  });

  it('GET /carbon-emission-factors', async () => {
    return request(app.getHttpServer())
      .get('/carbon-emission-factors')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(defaultCarbonEmissionFactors);
      });
  });

  it('POST /carbon-emission-factors', async () => {
    const carbonEmissionFactorArgs = {
      name: 'Test Carbon Emission Factor',
      unit: 'kg',
      emissionCO2eInKgPerUnit: 12,
      source: 'Test Source',
    };
    return request(app.getHttpServer())
      .post('/carbon-emission-factors')
      .send([carbonEmissionFactorArgs])
      .expect(201)
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        expect(body[0]).toMatchObject(carbonEmissionFactorArgs);
      });
  });
});
