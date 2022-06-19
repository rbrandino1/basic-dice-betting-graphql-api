import { Injectable } from '@nestjs/common';
import { BetInsertDto } from '../dtos/bet.insert.dto';
import { BetCalculateResultDto } from '@bets/dtos/bet.calculate.result.dto';

@Injectable()
export class BetsCalculateService {
  private getRandomDiceFace(): number {
    const MAX_DICE_FACES = 6;

    return Math.floor(Math.random() * MAX_DICE_FACES);
  }

  calculateBet(betInsertDto: BetInsertDto): BetCalculateResultDto {
    const betCalculateResult: BetCalculateResultDto = { win: false, payout: 0 };

    const multiplier = 1 / betInsertDto.chance;
    const payout = multiplier * betInsertDto.betAmount * 10;
    const win = this.getRandomDiceFace() < betInsertDto.chance;

    betCalculateResult.win = win;
    betCalculateResult.payout = win ? payout : 0;

    return betCalculateResult;
  }
}
