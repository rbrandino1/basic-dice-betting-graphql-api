import { PrismaConnection } from '@infra/database/prisma.connection';
import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { UsersRepository } from '@users/repositories/users.repository';
import { BetsRepository } from './repositories/bets.repository';
import { BetsResolver } from './resolvers/bets.resolver';
import { BetsReadService } from './services/bets.read.service';
import { BetsCreateService } from './services/bets.create.service';
import { BetsCalculateService } from './services/bets.calculate.service';

@Module({
  imports: [UsersModule],
  providers: [
    PrismaConnection,
    UsersRepository,
    BetsRepository,
    BetsResolver,
    BetsReadService,
    BetsCreateService,
    BetsCalculateService,
  ],
  exports: [],
})
export class BetsModule {}
