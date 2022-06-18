import { PrismaConnection } from '@infra/database/prisma.connection';

export class DataBaseHelper {
  static async teardown(connection: PrismaConnection) {
    await this.clear(connection);
    await connection.$disconnect();
  }

  static async clear(connection: PrismaConnection) {
    await connection.$executeRaw`DELETE FROM "Bets";`;
    await connection.$executeRaw`DELETE FROM "Users";`;
  }
}
