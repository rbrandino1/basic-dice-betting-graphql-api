import { Injectable } from '@nestjs/common';
import { Bet } from '../entities/bets.entity';
import { BetInsertDto } from '../dtos/bet.insert.dto';
import { BetsRepository } from '../repositories/bets.repository';
import { UsersRepository } from '@users/repositories/users.repository';

@Injectable()
export class BetsCreateService {
  constructor(
    private readonly betsRepository: BetsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(betInsertDto: BetInsertDto): Promise<Bet | null> {
    const foundUser = await this.usersRepository.findFirst({
      id: betInsertDto.userId,
    });

    if (!foundUser) throw new Error(`User not found: ${betInsertDto.userId}`);

    const bet = Bet.fromDto(betInsertDto);
    await bet.validateEntity();

    // TODO: Implement BET Logical (Payout, win)
    return this.betsRepository.add(bet);
  }
}
