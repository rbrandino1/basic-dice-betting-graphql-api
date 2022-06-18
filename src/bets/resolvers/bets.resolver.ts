import { Bet } from '../entities/bets.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BetsReadService } from '../services/bets.read.service';
import { BetsCreateService } from '../services/bets.create.service';
import { BetInsertDto } from '../dtos/bet.insert.dto';

@Resolver('Bets')
export class BetsResolver {
  constructor(
    private readonly betsReadService: BetsReadService,
    private readonly betsCreateService: BetsCreateService,
  ) {}

  @Query('getBet')
  async getUser(@Args('id') id: number): Promise<Bet | null> {
    return this.betsReadService.findOne(id);
  }

  @Query('getBetList')
  async getUserList(): Promise<Bet[] | null> {
    return this.betsReadService.findAll();
  }

  @Query('getBestBetPerUser')
  async getBestBetPerUser(@Args('id') limit: number): Promise<Bet[] | null> {
    return this.betsReadService.findAll();
  }

  @Mutation('createBet')
  async createBet(
    @Args('betInsert') betInsert: BetInsertDto,
  ): Promise<Bet | null> {
    return this.betsCreateService.create(betInsert);
  }
}
