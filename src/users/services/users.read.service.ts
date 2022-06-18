import { UsersRepository } from '../repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersReadService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findFirst({ id });
    if (!user) throw new Error(`User not found: ${id}`);
    return user;
  }

  async findAll(): Promise<User[] | null> {
    const users = await this.usersRepository.findAll();
    if (!users) return null;
    return users;
  }
}
