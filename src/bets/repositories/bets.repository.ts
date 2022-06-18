import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaConnection } from '@infra/database/prisma.connection';
import { Bet } from '../entities/bets.entity';

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

  async add(bet: Bet) {
    const data: Prisma.BetsCreateInput = bet.toModel();
    const betModel = await this.prisma.bets.create({ data });
    return Bet.fromModel(betModel);
  }
}
