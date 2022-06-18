import { Bets as BetsModel, Prisma } from '@prisma/client';
import { IsNumber, validate } from 'class-validator';
import { BetInsertDto } from '../dtos/bet.insert.dto';

export class Bet {
  static fromDto(dto: BetInsertDto) {
    const bet = new Bet();
    bet.userId = dto.userId;
    bet.betAmount = dto.betAmount;
    bet.chance = dto.chance;
    return bet;
  }

  static fromModel(model: BetsModel): Bet {
    const bet = new Bet();
    bet.id = model.id;
    bet.userId = model.userId;
    bet.betAmount = model.betAmount;
    bet.chance = model.chance;
    bet.payout = model.payout;
    bet.win = model.win;
    return bet;
  }

  toModel(): Prisma.BetsCreateInput {
    return {
      user: { connect: { id: this.userId } },
      betAmount: this.betAmount,
      chance: this.chance,
      payout: this.payout || 0,
      win: this.win || false,
    };
  }

  id?: number;
  payout?: number;
  win?: boolean;

  @IsNumber({}, { message: '$property must be informed', always: true })
  userId: number;

  @IsNumber({}, { message: '$property must be informed', always: true })
  betAmount: number;

  @IsNumber({}, { message: '$property must be informed', always: true })
  chance: number;

  async validateEntity() {
    const errors = await validate(this);
    if (errors && errors.length > 0) {
      throw new Error(`Invalid bet: ${JSON.stringify(errors)}`);
    }
  }
}
