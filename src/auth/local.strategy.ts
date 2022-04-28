import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/entities/user.entity';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const userData: UserDto = {
      email: email,
      password: password,
    };

    const user = await this.authService.validateUser(userData);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
