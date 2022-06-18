import { User } from '../entities/user.entity';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersReadService } from '@users/services/users.read.service';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersReadService: UsersReadService) {}

  @Query('getUser')
  async getUser(@Args('id') id: number): Promise<User | null> {
    return this.usersReadService.findOne(id);
  }

  @Query('getUserList')
  async getUserList(): Promise<User[] | null> {
    return this.usersReadService.findAll();
  }
}
