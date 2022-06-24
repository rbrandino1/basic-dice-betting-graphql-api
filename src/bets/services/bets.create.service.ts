import { Injectable } from '@nestjs/common';
import { Bet } from '../entities/bets.entity';
import { BetInsertDto } from '../dtos/bet.insert.dto';
import { BetsRepository } from '../repositories/bets.repository';
import { UsersRepository } from '@users/repositories/users.repository';
import { BetsCalculateService } from './bets.calculate.service';
import { BetCalculateResultDto } from '@bets/dtos/bet.calculate.result.dto';

@Injectable()
export class BetsCreateService {
  constructor(
    private readonly betsRepository: BetsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly betsCalculateService: BetsCalculateService,
  ) {}

  async create(betInsert: BetInsertDto): Promise<Bet | null> {
    const user = await this.usersRepository.findFirst({
      id: betInsert.userId,
    });

    if (!user) {
      throw new Error(`User not found: ${betInsert.userId}`);
    }

    const bet = Bet.fromDto(betInsert);
    await bet.validateEntity();

    if (user.balance < betInsert.betAmount) {
      throw new Error(`User don't have sufficient balance`);
    }

    // Calculate Bet
    const betCalculateResult: BetCalculateResultDto =
      this.betsCalculateService.calculateBet(betInsert);

    // Decrease balance for bet | Payout increases balance if it's a win
    user.balance -= betInsert.betAmount;
    if (betCalculateResult.win) {
      user.balance += betCalculateResult.payout;
      bet.payout = betCalculateResult.payout;
      bet.win = betCalculateResult.win;
    }

    return this.betsRepository.addBetAndUpdateUserBalanceWithTransaction(
      bet,
      user,
    );
  }
}
