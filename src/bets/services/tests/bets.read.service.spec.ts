import { Test, TestingModule } from '@nestjs/testing';
import { PrismaConnection } from '@infra/database/prisma.connection';
import { expect, sinon } from 'test/utils/test.setup';
import { useContainer } from 'class-validator';
import { Bet } from '@bets/entities/bets.entity';
import { BetsRepository } from '@bets/repositories/bets.repository';
import { BetsReadService } from '../bets.read.service';

describe('BetsReadService', () => {
  let module: TestingModule;
  let service: BetsReadService;
  let betsRepository: BetsRepository;
  let betsRepositoryFindFirstStub: sinon.SinonStub;
  let betsRepositoryFindAllStub: sinon.SinonStub;

  before(async () => {
    module = await Test.createTestingModule({
      providers: [PrismaConnection, BetsRepository, BetsReadService],
    })
      .overrideProvider(PrismaConnection)
      .useClass(class {})
      .compile();

    useContainer(module, { fallbackOnErrors: true });
  });

  beforeEach(async () => {
    service = module.get<BetsReadService>(BetsReadService);
    betsRepository = module.get<BetsRepository>(BetsRepository);
    betsRepositoryFindFirstStub = sinon.stub(betsRepository, 'findFirst');
    betsRepositoryFindAllStub = sinon.stub(betsRepository, 'findAll');
  });

  afterEach(async () => {
    sinon.restore();
  });

  it('should validate not found bet', async () => {
    betsRepositoryFindFirstStub.onCall(0).resolves(undefined);
    const payload = { id: 1 };

    await service
      .findOne(payload.id)
      .should.to.be.rejectedWith(Error, `Bet not found: ${payload.id}`);

    expect(betsRepositoryFindFirstStub).to.have.been.calledOnce;
  });

  it('should validate successful read one', async () => {
    const expectedBet = {
      id: 1,
      userId: 1,
      betAmount: 10,
      chance: 1,
      payout: 100,
      win: false,
    };

    betsRepositoryFindFirstStub.onCall(0).resolves(Bet.fromModel(expectedBet));

    const result = await service.findOne(expectedBet.id);

    expect(result?.id).to.be.eql(expectedBet.id);
    expect(result?.userId).to.be.eql(expectedBet.userId);
    expect(result?.betAmount).to.be.eql(expectedBet.betAmount);
    expect(result?.chance).to.be.eql(expectedBet.chance);
    expect(result?.payout).to.be.eql(expectedBet.payout);
    expect(result?.win).to.be.eql(expectedBet.win);
    expect(betsRepositoryFindFirstStub).to.have.been.calledOnce;
  });

  it('should validate successful find all', async () => {
    const expectedBets = [
      {
        id: 1,
        userId: 1,
        betAmount: 10,
        chance: 1,
        payout: 100,
        win: false,
      },
      {
        id: 2,
        userId: 2,
        betAmount: 22,
        chance: 2,
        payout: 200,
        win: false,
      },
    ];

    betsRepositoryFindAllStub
      .onCall(0)
      .resolves(expectedBets.map((bet) => Bet.fromModel(bet)));

    const result = await service.findAll();

    expect(betsRepositoryFindFirstStub).to.have.not.been.called;
    expect(betsRepositoryFindAllStub).to.have.been.calledOnce;
    expect(result).to.be.eqls(expectedBets);
  });
});
