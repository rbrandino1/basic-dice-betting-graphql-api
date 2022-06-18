import { BetsRepository } from '../repositories/bets.repository';
import { Injectable } from '@nestjs/common';
import { Bet } from '../entities/bets.entity';

@Injectable()
export class BetsReadService {
  constructor(private readonly betsRepository: BetsRepository) {}

  async findOne(id: number): Promise<Bet | null> {
    const bet = await this.betsRepository.findFirst({ id });
    if (!bet) throw new Error(`Bet not found: ${id}`);
    return bet;
  }

  async findAll(): Promise<Bet[] | null> {
    const bets = await this.betsRepository.findAll();
    if (!bets) return null;
    return bets;
  }
}
