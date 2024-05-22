import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 200 on /', function () {
    return request(app.getHttpServer())
        .get('/api/games')
        .expect(200);
  });

  it('/api/games/[id] (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/games/cac0a606-0dfd-4ee2-8ea6-5f2db582068c')
      .expect(200)
  });
});
