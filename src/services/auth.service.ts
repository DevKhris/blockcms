import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import PostgresErrorCodes from 'src/enums/enum.postgreserrorcodes';
import { UserService } from './user.service';
import { genSalt, hash, compare } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(userData: UserDto): Promise<User> {
    try {
      const user = await this.userService.findOne(userData.email);
      const match = await compare(userData.password, user.password);
      if (!match) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }

      user.password = undefined;
      return user;
    } catch (ex) {
      throw new HttpException(
        'Something went brong: ' + ex,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async registerUser(userData: CreateUserDto): Promise<any> {
    const salt = await genSalt(16);
    if (userData.password === userData.password_confirm) {
      const passwordHash = await hash(userData.password, salt);
      try {
        const user = await this.userService.create({
          ...userData,
          password: passwordHash,
        });

        return user;
      } catch (error) {
        if (error?.code === PostgresErrorCodes.UniqueViolation) {
          throw new HttpException(
            `User with that email already exists (${error.code}) `,
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      return {
        statusCode: 500,
        message: 'passwords and confirm password are not equal',
      };
    }
  }
}
