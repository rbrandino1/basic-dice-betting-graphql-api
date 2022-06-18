import { PrismaConnection } from '@infra/database/prisma.connection';
import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { UsersRepository } from '@users/repositories/users.repository';
import { BetsRepository } from './repositories/bets.repository';
import { BetsResolver } from './resolvers/bets.resolver';
import { BetsReadService } from './services/bets.read.service';
import { BetsCreateService } from './services/bets.create.service';

@Module({
  imports: [UsersModule],
  providers: [
    PrismaConnection,
    UsersRepository,
    BetsRepository,
    BetsResolver,
    BetsReadService,
    BetsCreateService,
  ],
  exports: [],
})
export class BetsModule {}
