import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from 'src/interfaces/user.interface';

export class UserDto implements IUser {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
