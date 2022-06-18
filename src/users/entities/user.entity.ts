import { Users as UsersModel } from '@prisma/client';
import { IsNotEmpty, IsNumber, validate } from 'class-validator';

export class User {
  static fromModel(model: UsersModel): User {
    const user = new User();
    user.id = model.id;
    user.name = model.name;
    user.balance = model.balance;
    return user;
  }

  id?: number;

  @IsNotEmpty({ message: '$property must be informed', always: true })
  name: string;

  @IsNumber({}, { message: '$property must be informed', always: true })
  balance: number;

  //
  // Validators will be use in case of inserts\updates
  //
  async validateEntity() {
    const errors = await validate(this);
    if (errors && errors.length > 0) {
      throw new Error(`Invalid user: ${JSON.stringify(errors)}`);
    }
  }
}
