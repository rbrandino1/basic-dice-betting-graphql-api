import { Test, TestingModule } from '@nestjs/testing';
import { PrismaConnection } from '@infra/database/prisma.connection';
import { expect, sinon } from 'test/utils/test.setup';
import { useContainer } from 'class-validator';
import { UsersRepository } from '@users/repositories/users.repository';
import { User } from '@users/entities/user.entity';
import { Bet } from '@bets/entities/bets.entity';
import { BetsRepository } from '@bets/repositories/bets.repository';
import { BetInsertDto } from '@bets/dtos/bet.insert.dto';
import { BetsCreateService } from '../bets.create.service';

describe('BetsCreateService', () => {
  let module: TestingModule;
  let service: BetsCreateService;
  let usersRepository: UsersRepository;
  let betsRepository: BetsRepository;
  let usersRepositoryFindFirstStub: sinon.SinonStub;
  let betsRepositoryAddStub: sinon.SinonStub;

  let betInsertDto: BetInsertDto;

  before(async () => {
    module = await Test.createTestingModule({
      providers: [
        PrismaConnection,
        BetsRepository,
        UsersRepository,
        BetsCreateService,
      ],
    })
      .overrideProvider(PrismaConnection)
      .useClass(class {})
      .compile();

    useContainer(module, { fallbackOnErrors: true });
  });

  beforeEach(async () => {
    service = module.get<BetsCreateService>(BetsCreateService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    betsRepository = module.get<BetsRepository>(BetsRepository);

    usersRepositoryFindFirstStub = sinon.stub(usersRepository, 'findFirst');
    betsRepositoryAddStub = sinon.stub(betsRepository, 'add');

    betInsertDto = {
      userId: 1,
      betAmount: 10,
      chance: 1,
    };
  });

  afterEach(async () => {
    sinon.restore();
  });

  it('should validate not found user', async () => {
    usersRepositoryFindFirstStub.resolves(undefined);

    await service
      .create(betInsertDto)
      .should.to.be.rejectedWith(
        Error,
        `User not found: ${betInsertDto.userId}`,
      );

    expect(usersRepositoryFindFirstStub).to.have.been.calledOnceWith({
      id: betInsertDto.userId,
    });
    expect(betsRepositoryAddStub).to.have.not.been.called;
  });

  it('should validate successful creation', async () => {
    const expectedUser = {
      id: 1,
      name: 'fake-use-name',
      balance: 100,
    };

    const expectedBet = {
      id: 1,
      userId: 1,
      betAmount: 10,
      chance: 1,
      payout: 100,
      win: false,
    };

    usersRepositoryFindFirstStub
      .onCall(0)
      .resolves(User.fromModel(expectedUser));

    betsRepositoryAddStub.onCall(0).resolves(Bet.fromModel(expectedBet));

    const result = await service.create(betInsertDto);

    expect(result?.id).to.be.eql(expectedBet.id);
    expect(result?.userId).to.be.eql(expectedBet.userId);
    expect(result?.betAmount).to.be.eql(expectedBet.betAmount);
    expect(result?.chance).to.be.eql(expectedBet.chance);
    expect(result?.payout).to.be.eql(expectedBet.payout);
    expect(result?.win).to.be.eql(expectedBet.win);

    expect(usersRepositoryFindFirstStub).to.have.been.calledOnce;
    expect(betsRepositoryAddStub).to.have.been.calledOnce;
  });
});
