import { Test, TestingModule } from '@nestjs/testing';
import { PrismaConnection } from '@infra/database/prisma.connection';
import { expect, sinon } from 'test/utils/test.setup';
import { useContainer } from 'class-validator';
import { BetInsertDto } from '@bets/dtos/bet.insert.dto';
import { BetsCalculateService } from '../bets.calculate.service';
import { BetCalculateResultDto } from '@bets/dtos/bet.calculate.result.dto';

describe('BetsCalculateService', () => {
  let module: TestingModule;
  let service: BetsCalculateService;

  let betInsertDto: BetInsertDto;

  before(async () => {
    module = await Test.createTestingModule({
      providers: [BetsCalculateService],
    })
      .overrideProvider(PrismaConnection)
      .useClass(class {})
      .compile();

    useContainer(module, { fallbackOnErrors: true });
  });

  beforeEach(async () => {
    service = module.get<BetsCalculateService>(BetsCalculateService);

    betInsertDto = {
      userId: 1,
      betAmount: 10,
      chance: 3,
    };
  });

  afterEach(async () => {
    sinon.restore();
  });

  it('should validate the calculation of the bet, when not win', () => {
    sinon.stub(Math, 'random').returns(0.9);

    const result: BetCalculateResultDto = service.calculateBet(betInsertDto);

    expect(result.win).to.be.eq(false);
    expect(result.payout).to.be.eq(0);
  });

  it('should validate the calculation of the bet, when its win', () => {
    sinon.stub(Math, 'random').returns(0.1);

    const result: BetCalculateResultDto = service.calculateBet(betInsertDto);

    expect(result.win).to.be.eq(true);
    expect(result.payout).to.be.closeTo(33.33, 1);
  });
});
