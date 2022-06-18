import { PrismaConnection } from '@infra/database/prisma.connection';
import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersReadService } from './services/users.read.service';

@Module({
  imports: [],
  providers: [
    PrismaConnection,
    UsersRepository,
    UsersResolver,
    UsersReadService,
  ],
  exports: [],
})
export class UsersModule {}
