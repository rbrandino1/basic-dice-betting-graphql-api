import { Test, TestingModule } from '@nestjs/testing';
import { PrismaConnection } from '@infra/database/prisma.connection';
import { expect, sinon } from 'test/utils/test.setup';
import { useContainer } from 'class-validator';
import { User } from '@users/entities/user.entity';
import { UsersRepository } from '@users/repositories/users.repository';
import { UsersReadService } from '../users.read.service';

describe('UsersReadService', () => {
  let module: TestingModule;
  let service: UsersReadService;
  let usersRepository: UsersRepository;
  let usersRepositoryFindFirstStub: sinon.SinonStub;
  let usersRepositoryFindAllStub: sinon.SinonStub;

  before(async () => {
    module = await Test.createTestingModule({
      providers: [PrismaConnection, UsersRepository, UsersReadService],
    })
      .overrideProvider(PrismaConnection)
      .useClass(class {})
      .compile();

    useContainer(module, { fallbackOnErrors: true });
  });

  beforeEach(async () => {
    service = module.get<UsersReadService>(UsersReadService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    usersRepositoryFindFirstStub = sinon.stub(usersRepository, 'findFirst');
    usersRepositoryFindAllStub = sinon.stub(usersRepository, 'findAll');
  });

  afterEach(async () => {
    sinon.restore();
  });

  it('should validate not found user', async () => {
    usersRepositoryFindFirstStub.onCall(0).resolves(undefined);
    const payload = { id: 1 };

    await service
      .findOne(payload.id)
      .should.to.be.rejectedWith(Error, `User not found: ${payload.id}`);

    expect(usersRepositoryFindFirstStub).to.have.been.calledOnce;
  });

  it('should validate successful read one', async () => {
    const expectedUser = {
      id: 1,
      name: 'fake-use-name',
      balance: 100,
    };

    usersRepositoryFindFirstStub
      .onCall(0)
      .resolves(User.fromModel(expectedUser));

    const result = await service.findOne(expectedUser.id);

    expect(result?.id).to.be.eql(expectedUser.id);
    expect(result?.name).to.be.eql(expectedUser.name);
    expect(result?.balance).to.be.eql(expectedUser.balance);
    expect(usersRepositoryFindFirstStub).to.have.been.calledOnce;
  });

  it('should validate successful find all', async () => {
    const expectedUsers = [
      {
        id: 1,
        name: 'fake-use-name',
        balance: 100,
      },
      {
        id: 2,
        name: 'fake-use-name-2',
        balance: 200,
      },
    ];

    usersRepositoryFindAllStub
      .onCall(0)
      .resolves(expectedUsers.map((user) => User.fromModel(user)));

    const result = await service.findAll();

    expect(usersRepositoryFindFirstStub).to.have.not.been.called;
    expect(usersRepositoryFindAllStub).to.have.been.calledOnce;
    expect(result).to.be.eqls(expectedUsers);
  });
});
