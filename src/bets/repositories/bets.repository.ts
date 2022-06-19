import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaConnection } from '@infra/database/prisma.connection';
import { Bet } from '../entities/bets.entity';
import { User } from '@users/entities/user.entity';

@Injectable()
export class BetsRepository {
  constructor(private readonly prisma: PrismaConnection) {}

  async findFirst(where: Prisma.BetsWhereInput): Promise<Bet | null> {
    const betModel = await this.prisma.bets.findFirst({
      where,
    });

    return betModel ? Bet.fromModel(betModel) : null;
  }

  async findAll(): Promise<Bet[] | null> {
    const betsModel = await this.prisma.bets.findMany({});

    if (!betsModel.length) return null;
    return betsModel.map((betModel) => Bet.fromModel(betModel));
  }

  async addBetAndUpdateUserBalanceWithTransaction(
    bet: Bet,
    user: User,
  ): Promise<Bet> {
    const betModel: Prisma.BetsCreateInput = bet.toModel();
    const userModel = user.toModel();

    const addBet = this.prisma.bets.create({ data: betModel });

    const updateUser = this.prisma.users.update({
      where: { id: user.id },
      data: userModel,
    });

    const [newBet, updatedUser] = await this.prisma.$transaction([
      addBet,
      updateUser,
    ]);

    return Bet.fromModel(newBet);
  }
}
