import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaConnection } from '@infra/database/prisma.connection';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaConnection) {}

  async findFirst(where: Prisma.UsersWhereInput): Promise<User | null> {
    const userModel = await this.prisma.users.findFirst({
      where,
    });

    return userModel ? User.fromModel(userModel) : null;
  }

  async findAll(): Promise<User[] | null> {
    const usersModel = await this.prisma.users.findMany({
      include: { bets: true },
    });

    if (!usersModel.length) return null;
    return usersModel.map((userModel) => User.fromModel(userModel));
  }
}
