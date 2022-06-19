import { PrismaConnection } from '../../src/infra/database/prisma.connection';
import { expect, sinon } from '../utils/test.setup';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import { DataBaseHelper } from 'test/utils/database.test.helper';
import { AppModule } from '../../src/app.module';
import { User } from '@users/entities/user.entity';

describe('Users=>Read', () => {
  let app: INestApplication;
  let dbConnection: PrismaConnection;
  let insertedUSers: any;

  before(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    insertedUSers = [
      { id: 1, name: 'Sonali', balance: 100 },
      { id: 2, name: 'Alex', balance: 90 },
      { id: 3, name: 'Viv', balance: 80 },
    ];

    dbConnection = module.get(PrismaConnection);
    await dbConnection.users.createMany({
      data: insertedUSers,
    });
  });

  afterEach(async () => {
    sinon.restore();
    sinon.reset();
  });

  after(async () => {
    await app.close();
    await DataBaseHelper.clear(dbConnection);
    await DataBaseHelper.teardown(dbConnection);
  });

  it('should read one user', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query getUser { 
          getUser(id:1) { id name balance }
        }`,
      });

    status.should.equal(200);

    const user: User = body.data.getUser;
    user.should.been.eqls(insertedUSers.find((user) => user.id === 1));
  });

  it('should read all users', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query getUserList { 
          getUserList { id name balance }
        }`,
      });

    status.should.equal(200);

    const users: User[] = body.data.getUserList;
    users.length.should.equal(3);
    users.should.been.eqls(insertedUSers);
  });
});
